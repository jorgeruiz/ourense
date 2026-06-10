"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader, type LoaderHandle } from "./Loader";

interface TransitionCtx {
  navigate(href: string): void;
}

const Ctx = createContext<TransitionCtx>({ navigate: () => {} });

export function useTransition() {
  return useContext(Ctx);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const loaderRef    = useRef<LoaderHandle>(null);
  const isNavigating = useRef(false);
  const pendingHref  = useRef<string | null>(null);
  const initialDone  = useRef(false);
  const router       = useRouter();
  const pathname     = usePathname();

  /* ── Initial page load ─────────────────────────────────────────── */
  useEffect(() => {
    if (initialDone.current) return;
    initialDone.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    loaderRef.current?.playFull();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Detect navigation complete → lift wipe ─────────────────────── */
  useEffect(() => {
    if (!isNavigating.current) return;
    isNavigating.current = false;

    // Small delay ensures Next.js has painted the new page content
    setTimeout(() => {
      loaderRef.current?.hideOverlay();
    }, 80);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* ── navigate(): wipe up → arcs draw → push route ─────────────── */
  const navigate = useCallback((href: string) => {
    if (isNavigating.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    isNavigating.current = true;
    pendingHref.current  = href;

    const loader = loaderRef.current;
    if (!loader) { router.push(href); return; }

    // 1. Dark wipe slides up from bottom
    loader.showOverlay();

    // 2. After wipe in (500ms), start arcs
    setTimeout(() => {
      loader.playShort().then(() => {
        // 3. Navigate — new page renders under the wipe
        const h = pendingHref.current;
        if (h) router.push(h);
      });
    }, 500);
  }, [router]);

  return (
    <Ctx.Provider value={{ navigate }}>
      <Loader ref={loaderRef} />
      {children}
    </Ctx.Provider>
  );
}

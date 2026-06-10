"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader, type LoaderHandle } from "./Loader";

/* ─── Context ───────────────────────────────────────────────────────── */

interface TransitionCtx {
  navigate(href: string): void;
}

const Ctx = createContext<TransitionCtx>({ navigate: () => {} });

export function useTransition() {
  return useContext(Ctx);
}

/* ─── Provider ──────────────────────────────────────────────────────── */

export function TransitionProvider({ children }: { children: ReactNode }) {
  const loaderRef      = useRef<LoaderHandle>(null);
  const pendingHref    = useRef<string | null>(null);
  const isNavigating   = useRef(false);
  const router         = useRouter();
  const pathname       = usePathname();

  /* Initial page load — play full loader once */
  const [initialDone, setInitialDone] = useState(false);
  useEffect(() => {
    if (initialDone) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInitialDone(true);
      return;
    }

    loaderRef.current?.playFull().then(() => {
      setInitialDone(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* When pathname changes (navigation complete) — loader is already resolving;
     nothing needed here. If we want a reveal-in effect on entry, add it here. */
  useEffect(() => {
    if (!isNavigating.current) return;
    isNavigating.current = false;
  }, [pathname]);

  /* Internal navigate: play short loader → push route */
  const navigate = useCallback((href: string) => {
    if (isNavigating.current) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    isNavigating.current = true;
    pendingHref.current  = href;

    loaderRef.current?.playShort().then(() => {
      const h = pendingHref.current;
      if (h) router.push(h);
    });
  }, [router]);

  return (
    <Ctx.Provider value={{ navigate }}>
      <Loader ref={loaderRef} />
      {children}
    </Ctx.Provider>
  );
}

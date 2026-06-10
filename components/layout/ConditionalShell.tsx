"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders children only on routes that are NOT proposal pages.
 * Prevents the global Navbar, Footer, and CustomCursor from showing
 * on /propuesta-2 and /propuesta-3 which have their own UI shells.
 */
export function ConditionalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/propuesta-")) return null;
  return <>{children}</>;
}

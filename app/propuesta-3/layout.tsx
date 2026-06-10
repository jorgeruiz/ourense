import type { ReactNode } from "react";
import { TransitionProvider } from "./components/TransitionProvider";

export default function PropuestaThreeLayout({ children }: { children: ReactNode }) {
  return <TransitionProvider>{children}</TransitionProvider>;
}

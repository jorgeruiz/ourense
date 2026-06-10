"use client";

import { useTransition } from "./TransitionProvider";
import type { MouseEvent, ReactNode, CSSProperties } from "react";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

/**
 * Drop-in <a> replacement that plays the propuesta-3 page transition
 * before navigating. Use instead of next/link for cross-page nav within
 * the propuesta-3 experience.
 */
export function TransitionLink({ href, children, className, style, onClick }: Props) {
  const { navigate } = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    navigate(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

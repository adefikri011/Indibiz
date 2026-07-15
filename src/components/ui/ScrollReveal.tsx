"use client";

import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  return (
    <div
      data-reveal="visible"
      className={className}
      style={{ ["--reveal-delay" as never]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
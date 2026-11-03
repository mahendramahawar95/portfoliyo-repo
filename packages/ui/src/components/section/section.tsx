import { cn } from "../../lib/cn";
import { HTMLAttributes } from "react";

interface SectionGradient {
  from: string; // bottom color
  to: string; // top color
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  bg?: string;
  id?: string;
  gradient?: SectionGradient;
}

export function Section({
  bg,
  gradient,
  className,
  id,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("w-full", className, bg, gradient)}
      id={id}
      {...props}
    >
      {children}
    </section>
  );
}

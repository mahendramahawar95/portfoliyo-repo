import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  /** Background color — any valid CSS color or var(--color-...) token */
  className?: string;
  /** Text color — any valid CSS color or var(--color-...) token */
  children?: ReactNode;
};

export function Badge({ className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        `inline-flex w-fit uppercase items-center gap-1 rounded-full px-sm py-1 text-xs font-medium ${className}`,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

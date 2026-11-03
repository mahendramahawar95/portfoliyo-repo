import { cn } from "../../lib/cn";
import { HTMLAttributes, ReactNode } from "react";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  descClass?: string;
  headingClass?: string;
  badgeClass?: string;
  heading: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  descClass,
  headingClass,
  heading,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-xs mb-10",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      <h2
        className={cn(
          "text-h2 font-bold tracking-tight text-primary",
          headingClass,
        )}
      >
        {heading}
      </h2>

      {description && (
        <p
          className={cn(
            "max-w-[60ch] text-body text-content-secondary",
            descClass,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

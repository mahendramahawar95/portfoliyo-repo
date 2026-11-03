import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "ripple-host relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 no-underline select-none disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary text-background hover:opacity-90",
        outline:
          "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        ghost: "text-foreground hover:bg-secondary",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-5 py-2.5 text-small",
        lg: "px-6 py-3 text-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

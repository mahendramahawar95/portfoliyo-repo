"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
  useId,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "../../lib/cn";

const inputVariants = cva(
  "w-full rounded-lg border bg-background text-foreground placeholder:text-muted-foreground transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border focus:border-primary focus:ring-2 focus:ring-primary/20",
        filled:
          "border-transparent bg-muted focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20",
        underline:
          "rounded-none border-0 border-b-2 border-border bg-transparent px-0 focus:border-primary",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3.5 text-sm",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "",
        error:
          "border-destructive focus:border-destructive focus:ring-destructive/20",
        success:
          "border-green-500 focus:border-green-500 focus:ring-green-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "default",
    },
  },
);

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      variant,
      size,
      state,
      type = "text",
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      disabled,
      required,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const resolvedType = isPassword && showPassword ? "text" : type;
    const resolvedState = errorText ? "error" : state;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            required={required}
            aria-invalid={resolvedState === "error"}
            aria-describedby={
              errorText
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            className={cn(
              inputVariants({ variant, size, state: resolvedState }),
              leftIcon && "pl-9",
              (rightIcon || isPassword || resolvedState === "error") && "pr-9",
              className,
            )}
            {...props}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          {/* Error icon (only if not password, to avoid icon collision) */}
          {!isPassword && resolvedState === "error" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
              <AlertCircle size={16} />
            </span>
          )}

          {/* Custom right icon (only if not password/error, to avoid collision) */}
          {!isPassword && resolvedState !== "error" && rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </span>
          )}
        </div>

        {errorText ? (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs text-destructive"
          >
            {errorText}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

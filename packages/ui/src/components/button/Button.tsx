"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { buttonVariants } from "./button.variants";
import { ButtonProps, ButtonAsButton } from "./button.types";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);

  const createRipple = <T extends HTMLButtonElement | HTMLAnchorElement>(
    event: React.MouseEvent<T>,
  ) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now();

    setRipples((prev) => [
      ...prev,
      {
        id,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      },
    ]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  // ----------------------------
  // Button
  // ----------------------------

  const {
    className,
    variant,
    size,
    children,
    onClick,
    disabled,
    isLoading,
    loadingText,
    ...buttonProps
  } = props as ButtonAsButton;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={[buttonVariants({ variant, size }), className]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={(e) => {
        createRipple(e);
        onClick?.(e);
      }}
      {...buttonProps}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          <span>{loadingText ?? "Submitting..."}</span>
        </>
      ) : (
        children
      )}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          aria-hidden="true"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
});

Button.displayName = "Button";

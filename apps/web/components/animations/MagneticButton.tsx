"use client";

import { useRef } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type MagneticButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Render as a link instead of a button */
  as?: "button" | "a";
  href?: string;
  /** How much the button follows the cursor (0-1). 0.3 = subtle */
  strength?: number;
  /** Extra movement of the label for a parallax feel (0-1) */
  labelStrength?: number;
  /** Extend the magnetic field this many px beyond the button edges */
  area?: number;
};

export default function MagneticButton({
  children,
  className = "",
  as = "button",
  strength = 0.3,
  labelStrength = 0.15,
  area = 16,
  ...props
}: MagneticButtonProps) {
  const fieldRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const Tag = as as ElementType;

  const move = (e: React.PointerEvent<HTMLSpanElement>) => {
    // Skip touch: no hover on touch devices
    if (e.pointerType === "touch") return;

    const field = fieldRef.current;
    const button = buttonRef.current;
    const label = labelRef.current;
    if (!field || !button || !label) return;

    const { clientX, clientY } = e;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      // The field wrapper never moves, so the center stays stable
      const rect = field.getBoundingClientRect();
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);

      button.style.transition = "transform 150ms ease-out";
      label.style.transition = "transform 150ms ease-out";

      button.style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px, 0)`;
      label.style.transform = `translate3d(${(dx * labelStrength).toFixed(1)}px, ${(dy * labelStrength).toFixed(1)}px, 0)`;
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    const button = buttonRef.current;
    const label = labelRef.current;
    if (!button || !label) return;

    // Slight overshoot gives a springy return
    const spring = "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)";
    button.style.transition = spring;
    label.style.transition = spring;
    button.style.transform = "translate3d(0, 0, 0)";
    label.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      ref={fieldRef}
      className="magnetic-field"
      // Extends the hover area without affecting layout
      style={{ padding: area, margin: -area }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <Tag ref={buttonRef} className={`magnetic-btn ${className}`} {...props}>
        <span ref={labelRef} className="magnetic-btn__label">
          {children}
        </span>
      </Tag>
    </span>
  );
}

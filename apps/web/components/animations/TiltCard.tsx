"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./TiltCard.css"

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Maximum tilt in degrees on each axis */
  maxTilt?: number;
  /** CSS perspective in px (lower = more dramatic) */
  perspective?: number;
  /** Scale applied while hovering */
  scale?: number;
  /** Show a soft light that follows the cursor */
  glare?: boolean;
  /** Invert the tilt direction */
  reverse?: boolean;
};

export default function TiltCard({
  children,
  className = "",
  style,
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  reverse = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore touch so scrolling isn't affected
    if (e.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const { clientX, clientY } = e;

    // Batch updates into one write per animation frame
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width; // 0 - 1
      const py = (clientY - rect.top) / rect.height; // 0 - 1
      const dir = reverse ? -1 : 1;

      const rotateY = (px - 0.5) * 2 * maxTilt * dir;
      const rotateX = (0.5 - py) * 2 * maxTilt * dir;

      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    });
  };

  const handleEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--s", String(scale));
    card.style.setProperty("--glare", "1");
    // Fast response while moving
    card.style.transition = "transform 120ms ease-out";
  };

  const handleLeave = () => {
    cancelAnimationFrame(frame.current);
    const card = cardRef.current;
    if (!card) return;
    // Slower, smooth return to rest
    card.style.transition = "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--s", "1");
    card.style.setProperty("--glare", "0");
  };

  return (
    <div style={{ perspective: `${perspective}px` }} className="block w-full">
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        className={`relative ${className}`}
        style={{
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--s, 1))",
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
      >
        {children}

        {glare && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)",
              opacity: "var(--glare, 0)",
              transition: "opacity 300ms ease",
            }}
          />
        )}
      </div>
    </div>
  );
}

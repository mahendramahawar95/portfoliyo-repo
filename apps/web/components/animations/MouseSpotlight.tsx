"use client";

import { useEffect, useRef } from "react";

type MouseSpotlightProps = {
  /** Diameter of the main spotlight in px */
  size?: number;
  /** Main spotlight color as "r, g, b" */
  color?: string;
  /** Trailing secondary glow color as "r, g, b" (set to "" to disable) */
  trailColor?: string;
  /** Peak opacity of the glow (0-1) */
  intensity?: number;
  /** 0-1. Lower = smoother, more lag. 1 = no lag */
  follow?: number;
  /** CSS mix-blend-mode, e.g. "normal", "multiply", "screen", "soft-light" */
  blendMode?: React.CSSProperties["mixBlendMode"];
};

export default function MouseSpotlight({
  size = 520,
  color = "3, 167, 255",
  trailColor = "255, 115, 0",
  intensity = 0.35,
  follow = 0.14,
  blendMode = "normal",
}: MouseSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const main = mainRef.current;
    const trail = trailRef.current;
    if (!container || !main) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const k = reduceMotion ? 1 : follow;

    let animationFrame = 0;
    let visible = true;
    let rect = container.getBoundingClientRect();

    // Target = real cursor, main/trail = eased positions
    const target = { x: rect.width / 2, y: rect.height / 2 };
    const pos = { x: target.x, y: target.y };
    const trailPos = { x: target.x, y: target.y };
    let active = false;
    let fade = 0;

    const onPointerMove = (e: PointerEvent) => {
      rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      active = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (active) {
        // First entry: snap so the glow doesn't fly in from the center
        if (fade < 0.02) {
          pos.x = trailPos.x = x;
          pos.y = trailPos.y = y;
        }
        target.x = x;
        target.y = y;
      }
    };

    const onPointerLeave = () => {
      active = false;
    };

    const frame = () => {
      animationFrame = requestAnimationFrame(frame);
      if (!visible) return;

      fade += ((active ? 1 : 0) - fade) * 0.1;

      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      trailPos.x += (target.x - trailPos.x) * k * 0.4;
      trailPos.y += (target.y - trailPos.y) * k * 0.4;

      const half = size / 2;
      main.style.transform = `translate3d(${pos.x - half}px, ${pos.y - half}px, 0)`;
      main.style.opacity = String(fade);

      if (trail) {
        const th = (size * 1.25) / 2;
        trail.style.transform = `translate3d(${trailPos.x - th}px, ${trailPos.y - th}px, 0)`;
        trail.style.opacity = String(fade);
      }
    };

    const onVisibility = (entries: IntersectionObserverEntry[]) => {
      visible = entries[0]?.isIntersecting ?? true;
    };
    const intersectionObserver = new IntersectionObserver(onVisibility, {
      threshold: 0,
    });
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      rect = container.getBoundingClientRect();
    });
    resizeObserver.observe(container);

    // Window-level listener so it works even with content layered on top
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    animationFrame = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrame);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
    };
  }, [size, follow]);

  const layer: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "50%",
    opacity: 0,
    willChange: "transform, opacity",
    pointerEvents: "none",
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ mixBlendMode: blendMode }}
      aria-hidden="true"
    >
      {/* Trailing glow (slower, larger, softer) */}
      {trailColor && (
        <div
          ref={trailRef}
          style={{
            ...layer,
            width: size * 1.25,
            height: size * 1.25,
            background: `radial-gradient(circle, rgba(${trailColor}, ${intensity * 0.55}) 0%, rgba(${trailColor}, 0) 68%)`,
          }}
        />
      )}
      {/* Main spotlight */}
      <div
        ref={mainRef}
        style={{
          ...layer,
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(${color}, ${intensity}) 0%, rgba(${color}, 0) 70%)`,
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type LightGradientMeshProps = {
  /** Light base color behind the gradients */
  background?: string;
  /** Animation speed multiplier */
  speed?: number;
  /** Size of the circles relative to the container's larger side */
  size?: number;
  /** Horizontal center of the orange (left) and blue (right) circles, 0-1 */
  orangeX?: number;
  blueX?: number;
  /** How far each circle drifts (0-1 of container). Keep small to preserve the gap. */
  drift?: number;
  /** Optional extra CSS blur in px (gradients are already soft) */
  blur?: number;
};

// Your exact gradients
const ORANGE_CIRCLE =
  "radial-gradient(circle, rgba(255, 115, 0, 0.5) 0%, rgba(255, 115, 0, 0) 68%)";
const BLUE_CIRCLE =
  "radial-gradient(circle, rgba(3, 167, 255, 0.5) 0%, rgba(3, 167, 255, 0) 70%)";
const MIX_ELLIPSE =
  "radial-gradient(ellipse at center, rgba(3, 167, 255, 0.3) 0%, rgba(255, 115, 0, 0.1) 45%, transparent 72%)";

export default function LightGradientMesh({
  background = "#FFFFFF",
  speed = 1,
  size = 0.5,
  orangeX = 0.22,
  blueX = 0.78,
  drift = 0.05,
  blur = 0,
}: LightGradientMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const mixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const orange = orangeRef.current;
    const blue = blueRef.current;
    const mix = mixRef.current;
    if (!container || !orange || !blue || !mix) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let circle = 0;
    let visible = true;
    let start = 0;

    const place = (
      el: HTMLDivElement,
      cx: number,
      cy: number,
      w: number,
      h: number,
    ) => {
      el.style.transform = `translate3d(${cx - w / 2}px, ${cy - h / 2}px, 0)`;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      circle = Math.max(width, height) * size;

      orange.style.width = orange.style.height = `${circle}px`;
      blue.style.width = blue.style.height = `${circle}px`;
      mix.style.width = `${circle * 1.6}px`;
      mix.style.height = `${circle * 1.2}px`;
    };

    const frame = (time: number) => {
      if (!start) start = time;
      const t = ((time - start) / 1000) * speed;

      // Orange: stays on the LEFT, small drift so it never crosses the middle
      const ox = width * (orangeX + drift * Math.sin(t * 0.35));
      const oy = height * (0.38 + 0.12 * Math.cos(t * 0.28));
      place(orange, ox, oy, circle, circle);

      // Blue: stays on the RIGHT, drifts in opposite phase to keep the gap
      const bx = width * (blueX - drift * Math.sin(t * 0.35));
      const by = height * (0.62 + 0.12 * Math.sin(t * 0.28));
      place(blue, bx, by, circle, circle);

      // Soft mixed ellipse: sits in the gap between them
      const mx = width * (0.5 + 0.03 * Math.sin(t * 0.2));
      const my = height * (0.5 + 0.06 * Math.cos(t * 0.23));
      place(mix, mx, my, circle * 1.6, circle * 1.2);
    };

    const loop = (time: number) => {
      animationFrame = requestAnimationFrame(loop);
      if (visible) frame(time);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) frame(0);
    });
    resizeObserver.observe(container);

    resize();

    if (reduceMotion) {
      frame(0);
    } else {
      animationFrame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [speed, size, orangeX, blueX, drift]);

  const layer: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    willChange: "transform",
    pointerEvents: "none",
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ background }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined}
      >
        {/* Mixed ellipse (behind, centered in the gap) */}
        <div ref={mixRef} style={{ ...layer, background: MIX_ELLIPSE }} />
        {/* Orange circle (left) */}
        <div
          ref={orangeRef}
          style={{ ...layer, background: ORANGE_CIRCLE, borderRadius: "50%" }}
        />
        {/* Blue circle (right) */}
        <div
          ref={blueRef}
          style={{ ...layer, background: BLUE_CIRCLE, borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}

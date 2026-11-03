"use client";

import { useEffect, useRef } from "react";

type GradientMeshProps = {
  /** Blob colors (hex). Blobs cycle through this list. */
  colors?: string[];
  /** Base background color behind the blobs */
  background?: string;
  blobCount?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Blob size relative to the container's larger side (0.3–0.8 works well) */
  blobSize?: number;
  /** CSS blur in px applied on top for a smoother mesh look */
  blur?: number;
  /** A blob follows the cursor */
  mouseInteraction?: boolean;
  /** Film grain overlay (0 = off, ~0.08 is subtle) */
  grain?: number;
};

type Blob = {
  // Home position (0–1 of container)
  cx: number;
  cy: number;
  // Orbit amplitude (0–1)
  ax: number;
  ay: number;
  // Orbit frequency and phase
  fx: number;
  fy: number;
  px: number;
  py: number;
  // Radius multiplier and breathing
  size: number;
  pulse: number;
  color: string;
};

const DEFAULT_COLORS = ["#9BD5FF", "#F3B58C", "#7C6CFF", "#3DDBD9"];

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function GradientMesh({
  colors = DEFAULT_COLORS,
  background = "#0B1220",
  blobCount = 6,
  speed = 1,
  blobSize = 0.55,
  blur = 40,
  mouseInteraction = true,
  grain = 0.07,
}: GradientMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Render at lower resolution: the gradients are soft anyway,
    // so this saves a lot of GPU/CPU work with no visible loss.
    const RENDER_SCALE = 0.5;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let visible = true;
    let start = 0;

    const rgbColors = colors.map(hexToRgb);

    const blobs: Blob[] = Array.from({ length: blobCount }, (_, i) => ({
      cx: 0.15 + Math.random() * 0.7,
      cy: 0.15 + Math.random() * 0.7,
      ax: 0.1 + Math.random() * 0.2,
      ay: 0.1 + Math.random() * 0.2,
      fx: 0.12 + Math.random() * 0.18,
      fy: 0.1 + Math.random() * 0.18,
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      size: 0.7 + Math.random() * 0.6,
      pulse: 0.3 + Math.random() * 0.4,
      color: String(i % colors.length),
    }));

    // Mouse blob (eased toward the cursor)
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, strength: 0 };
    let mouseActive = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * RENDER_SCALE));
      height = Math.max(1, Math.round(rect.height * RENDER_SCALE));
      canvas.width = width;
      canvas.height = height;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseActive = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      if (mouseActive) {
        mouse.tx = x;
        mouse.ty = y;
      }
    };

    const onPointerLeave = () => {
      mouseActive = false;
    };

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      rgb: { r: number; g: number; b: number },
      alpha: number,
    ) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
      g.addColorStop(
        0.5,
        `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.35})`,
      );
      g.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    const draw = (time: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (!visible) return;

      if (!start) start = time;
      const t = ((time - start) / 1000) * speed;

      // Base fill
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      // Blend blobs additively so overlaps create new colors (the "mesh" look)
      ctx.globalCompositeOperation = "screen";

      const maxSide = Math.max(width, height);

      for (const blob of blobs) {
        const x = (blob.cx + Math.sin(t * blob.fx + blob.px) * blob.ax) * width;
        const y =
          (blob.cy + Math.cos(t * blob.fy + blob.py) * blob.ay) * height;
        const radius =
          maxSide *
          blobSize *
          blob.size *
          (1 + Math.sin(t * blob.pulse + blob.px) * 0.12);

        const rgb = rgbColors[Number(blob.color)] ?? rgbColors[0];
        if (rgb) drawBlob(x, y, radius, rgb, 0.55);
      }

      // Cursor-following blob
      if (mouseInteraction) {
        mouse.strength += ((mouseActive ? 1 : 0) - mouse.strength) * 0.05;
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;

        if (mouse.strength > 0.01) {
          const rgb = rgbColors[0];
          if (rgb) {
            drawBlob(
              mouse.x * width,
              mouse.y * height,
              maxSide * blobSize * 0.55,
              rgb,
              0.5 * mouse.strength,
            );
          }
        }
      }

      ctx.globalCompositeOperation = "source-over";
    };

    // Pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    resizeObserver.observe(container);

    resize();

    if (reduceMotion) {
      // One static frame
      draw(0);
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(draw);
      if (mouseInteraction) {
        window.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });
        document.documentElement.addEventListener(
          "pointerleave",
          onPointerLeave,
        );
      }
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
    };
  }, [colors, background, blobCount, speed, blobSize, mouseInteraction]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ background }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          // Scale up slightly so blurred edges don't show a dark border
          transform: blur > 0 ? "scale(1.15)" : undefined,
        }}
      />
      {grain > 0 && (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{ backgroundImage: GRAIN_SVG, opacity: grain }}
        />
      )}
    </div>
  );
}

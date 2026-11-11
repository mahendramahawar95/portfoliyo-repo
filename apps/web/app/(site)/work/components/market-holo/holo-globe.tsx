"use client";

// apps/web/components/sections/holo-globe.tsx
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { cn } from "@repo/ui/lib/cn";
import type { Market } from "./markets";

export interface HoloGlobeProps {
  markets: Market[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

interface Vec {
  x: number;
  y: number;
  z: number;
}

interface ScreenPoint {
  x: number;
  y: number;
  visible: boolean;
}

interface Tooltip {
  index: number;
  x: number;
  y: number;
}

const DOT_COUNT = 700;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const HIT_RADIUS = 14;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const wrap = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

/** Evenly spread points on a unit sphere. */
const fibonacciSphere = (count: number): Vec[] =>
  Array.from({ length: count }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / count;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * GOLDEN_ANGLE;
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
  });

const fromLatLng = (lat: number, lng: number): Vec => {
  const phi = toRad(lat);
  const lambda = toRad(lng);
  return {
    x: Math.cos(phi) * Math.sin(lambda),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(lambda),
  };
};

/** Turns the globe so (lat, lng) faces the viewer. z > 0 means the front side. */
const rotate = (v: Vec, lng: number, lat: number): Vec => {
  const cl = Math.cos(lng);
  const sl = Math.sin(lng);
  const ca = Math.cos(lat);
  const sa = Math.sin(lat);
  const x1 = v.x * cl - v.z * sl;
  const z1 = v.x * sl + v.z * cl;
  return { x: x1, y: v.y * ca - z1 * sa, z: v.y * sa + z1 * ca };
};

/** Latitude rings and longitude lines drawn faintly over the sphere. */
const graticule: Vec[][] = [
  ...[-60, -30, 0, 30, 60].map((lat) =>
    Array.from({ length: 73 }, (_, i) => fromLatLng(lat, i * 5)),
  ),
  ...Array.from({ length: 12 }, (_, m) =>
    Array.from({ length: 37 }, (_, i) => fromLatLng(-90 + i * 5, m * 30)),
  ),
];

/** Reads a theme color so the canvas follows globals.css. */
const readColor = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
  fallback;

export function HoloGlobe({
  markets,
  activeIndex,
  onSelect,
  className,
}: HoloGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const live = useRef({ markets, activeIndex });
  const screen = useRef<ScreenPoint[]>([]);
  const hovered = useRef<number | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  // The animation loop reads the latest props from this ref.
  useEffect(() => {
    live.current = { markets, activeIndex };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const blue = readColor("--color-trust-blue", "#03a7ff");
    const orange = readColor("--color-trust-orange", "#ff7300");
    const dots = fibonacciSphere(DOT_COUNT);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let lng = 0;
    let lat = 0;
    let ready = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const frame = (time: number) => {
      const { markets: items, activeIndex: active } = live.current;
      const target = items[active];
      if (!target) {
        ctx.clearRect(0, 0, width, height);
        frameId = requestAnimationFrame(frame);
        return;
      }

      // Ease the globe toward the active market.
      const targetLng = toRad(target.lng);
      const targetLat = toRad(target.lat) * 0.6;
      if (!ready || reduceMotion) {
        lng = targetLng;
        lat = targetLat;
        ready = true;
      } else {
        lng += wrap(targetLng - lng) * 0.06;
        lat += (targetLat - lat) * 0.06;
      }
      const viewLng = lng + (reduceMotion ? 0 : Math.sin(time / 2500) * 0.1);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.4;

      const project = (v: Vec) => {
        const p = rotate(v, viewLng, lat);
        return { x: cx + radius * p.x, y: cy - radius * p.y, z: p.z };
      };

      ctx.clearRect(0, 0, width, height);
      ctx.setLineDash([]);

      // Sphere body and outline
      ctx.fillStyle = blue;
      ctx.globalAlpha = 0.07;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = blue;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.stroke();

      // Graticule lines
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.18;
      for (const line of graticule) {
        ctx.beginPath();
        let drawing = false;
        for (const v of line) {
          const p = project(v);
          if (p.z <= 0) {
            drawing = false;
            continue;
          }
          if (drawing) ctx.lineTo(p.x, p.y);
          else {
            ctx.moveTo(p.x, p.y);
            drawing = true;
          }
        }
        ctx.stroke();
      }

      // Dots, brighter toward the center
      ctx.fillStyle = blue;
      for (const dot of dots) {
        const p = project(dot);
        if (p.z <= 0) continue;
        ctx.globalAlpha = 0.15 + p.z * 0.55;
        ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
      }

      // Arcs from the active market to every other one
      const vectors = items.map((m) => fromLatLng(m.lat, m.lng));
      const from = vectors[active];
      if (from) {
        const pa = project(from);
        ctx.strokeStyle = blue;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.45;
        ctx.setLineDash([4, 5]);
        ctx.lineDashOffset = reduceMotion ? 0 : -time / 60;
        vectors.forEach((to, i) => {
          if (i === active) return;
          const sum = { x: from.x + to.x, y: from.y + to.y, z: from.z + to.z };
          const length = Math.hypot(sum.x, sum.y, sum.z);
          if (length < 1e-6) return;
          const angle = Math.acos(
            Math.min(1, from.x * to.x + from.y * to.y + from.z * to.z),
          );
          const lift = (1 + angle * 0.18) / length;
          const pb = project(to);
          const pm = project({ x: sum.x * lift, y: sum.y * lift, z: sum.z * lift });
          if (pa.z <= 0 || pb.z <= 0 || pm.z <= 0) return;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.quadraticCurveTo(
            2 * pm.x - (pa.x + pb.x) / 2,
            2 * pm.y - (pa.y + pb.y) / 2,
            pb.x,
            pb.y,
          );
          ctx.stroke();
        });
      }
      ctx.setLineDash([]);

      // Markers
      const pulse = reduceMotion ? 0 : (time / 1400) % 1;
      screen.current = vectors.map((v, i) => {
        const p = project(v);
        if (p.z <= 0) return { x: p.x, y: p.y, visible: false };

        const isActive = i === active;
        const isHovered = i === hovered.current;
        ctx.fillStyle = isActive ? orange : blue;
        ctx.strokeStyle = isActive ? orange : blue;

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isActive ? 4 : isHovered ? 4 : 2.8, 0, Math.PI * 2);
        ctx.fill();

        if (isActive) {
          ctx.globalAlpha = 1 - pulse;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6 + pulse * 14, 0, Math.PI * 2);
          ctx.stroke();
        } else if (isHovered) {
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
          ctx.stroke();
        }
        return { x: p.x, y: p.y, visible: true };
      });

      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(frame);
    };

    frameId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  const handleMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let nearest: number | null = null;
    let nearestDistance = HIT_RADIUS;
    for (let i = 0; i < screen.current.length; i++) {
      const point = screen.current[i];
      if (!point?.visible) continue;
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }
    }

    if (nearest === hovered.current) return;
    hovered.current = nearest;
    setTooltip(
      nearest === null
        ? null
        : {
            index: nearest,
            x: screen.current[nearest]?.x ?? 0,
            y: screen.current[nearest]?.y ?? 0,
          },
    );
  };

  const clearHover = () => {
    hovered.current = null;
    setTooltip(null);
  };

  const tooltipMarket = tooltip ? markets[tooltip.index] : null;

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Holographic network globe of our markets"
        onPointerMove={handleMove}
        onPointerLeave={clearHover}
        onClick={() => {
          if (hovered.current !== null) onSelect(hovered.current);
        }}
        className={cn("size-full", tooltip && "cursor-pointer")}
      />

      {tooltip && tooltipMarket && (
        <div
          style={{ left: tooltip.x, top: tooltip.y }}
          className="pointer-events-none absolute -mt-3 -translate-x-1/2 -translate-y-full rounded-lg border border-trust-blue/40 bg-ink-900/90 px-md py-2 text-white shadow-lg"
        >
          <strong className="block text-small font-semibold">
            {tooltipMarket.name}
          </strong>
          <span className="block text-xs text-white/70">
            {tooltipMarket.region}
          </span>
        </div>
      )}
    </div>
  );
}

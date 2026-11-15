"use client";

// apps/web/components/sections/holo-globe.tsx
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
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

interface Dot extends Vec {
  land: boolean;
}

interface Projected extends Vec {
  x: number;
  y: number;
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

type LatLng = [number, number];

const DOT_COUNT = 1600;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const HIT_RADIUS = 14;
const MARKER_COLOR = "#8fdcff";
const LAND_COLOR = "#e6f7ff";
const SPHERE_RATIO = 0.44;

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

/** Simplified continent and island outlines as [lat, lng] rings. */
const LAND_RINGS: LatLng[][] = [
  [[71, -156], [70, -140], [69, -128], [67, -115], [68, -100], [66, -88], [69, -82], [63, -80], [62, -72], [60, -64], [58, -62], [53, -56], [47, -60], [45, -64], [44, -67], [42, -70], [40, -74], [37, -76], [35, -76], [32, -80], [28, -80], [25, -80], [27, -82], [30, -85], [30, -89], [29, -94], [27, -97], [22, -97], [19, -95], [18, -92], [18, -88], [21, -87], [16, -88], [16, -84], [12, -83], [9, -79], [8, -77], [9, -80], [7, -80], [8, -83], [10, -86], [13, -88], [14, -92], [16, -96], [18, -102], [20, -105], [24, -110], [31, -114], [34, -120], [38, -123], [42, -124], [46, -124], [49, -126], [52, -130], [55, -133], [58, -137], [60, -146], [59, -152], [57, -156], [55, -161], [58, -162], [60, -165], [63, -161], [65, -166], [66, -162], [68, -166], [70, -160]],
  [[83, -30], [82, -20], [76, -18], [70, -22], [65, -38], [60, -44], [60, -50], [64, -52], [70, -54], [76, -68], [80, -68], [83, -50]],
  [[73, -80], [70, -68], [67, -62], [63, -66], [65, -74], [70, -90], [73, -88]],
  [[12, -72], [11, -64], [10, -60], [8, -57], [6, -52], [2, -50], [-2, -44], [-5, -35], [-9, -35], [-13, -39], [-18, -40], [-23, -42], [-28, -48], [-33, -53], [-36, -57], [-39, -62], [-42, -64], [-46, -67], [-51, -69], [-54, -68], [-52, -75], [-46, -75], [-40, -73], [-30, -71], [-18, -70], [-14, -76], [-6, -81], [-2, -80], [2, -78], [8, -77], [10, -75]],
  [[37, 10], [33, 11], [31, 20], [31, 32], [29, 33], [22, 37], [12, 43], [11, 51], [2, 51], [-4, 40], [-10, 40], [-15, 40], [-20, 35], [-26, 33], [-30, 31], [-34, 26], [-35, 20], [-33, 18], [-28, 16], [-22, 14], [-17, 12], [-10, 13], [-5, 9], [0, 9], [4, 9], [4, -2], [5, -8], [7, -13], [12, -17], [15, -17], [21, -17], [27, -13], [30, -10], [35, -6], [36, 0]],
  [[-12, 49], [-16, 50], [-25, 47], [-25, 44], [-20, 44], [-15, 47]],
  [[43, -9], [36, -6], [36, -2], [38, 0], [41, 2], [42, 3], [43, 6], [44, 8], [43, 10], [41, 12], [38, 16], [40, 18], [41, 16], [44, 13], [45, 14], [44, 19], [40, 20], [38, 22], [36, 23], [40, 26], [41, 29], [38, 27], [36, 30], [36, 35], [34, 36], [32, 35], [29.5, 34.5], [28, 34], [25, 37], [22, 39], [17, 42], [13, 43], [13, 45], [15, 49], [16, 53], [17, 55], [22, 59], [25, 57], [26, 56], [27, 52], [30, 49], [26, 50], [24, 54], [25, 61], [25, 67], [22, 69], [22, 70], [20, 73], [16, 73], [12, 75], [8, 77], [11, 80], [16, 82], [19, 85], [21, 87], [22, 90], [20, 92], [16, 95], [10, 98], [6, 100], [2, 102], [1, 104], [5, 101], [8, 99], [11, 99], [13, 100], [10, 104], [8, 105], [10, 107], [14, 109], [18, 106], [21, 107], [22, 111], [22, 114], [23, 116], [26, 119], [30, 122], [35, 120], [38, 118], [40, 122], [39, 125], [38, 126], [35, 129], [37, 129], [40, 129], [42, 130], [43, 131], [46, 137], [49, 140], [53, 141], [56, 137], [59, 143], [62, 150], [60, 160], [58, 163], [62, 165], [64, 172], [66, 180], [69, 180], [70, 170], [69, 160], [70, 150], [73, 140], [72, 130], [76, 105], [74, 90], [72, 80], [68, 70], [68, 60], [68, 44], [66, 40], [69, 33], [71, 27], [70, 20], [68, 16], [65, 12], [60, 5], [58, 6], [59, 10], [57, 11], [56, 13], [55, 10], [54, 9], [54, 8], [51, 4], [50, 2], [48, -4], [47, -2], [44, -1], [43, -2]],
  [[31, 130], [34, 135], [35, 139], [38, 141], [41, 141], [40, 140], [36, 137], [34, 134], [33, 131]],
  [[42, 140], [45, 142], [44, 145], [42, 143]],
  [[50, -5], [52, 1], [54, -2], [57, -2], [59, -3], [58, -6], [55, -6], [53, -4], [51, -3]],
  [[52, -6], [55, -6], [54, -9], [52, -10]],
  [[64, -22], [66, -16], [66, -22], [65, -24]],
  [[5, 95], [2, 104], [-3, 106], [-6, 105], [-5, 101], [0, 98], [3, 96]],
  [[7, 117], [1, 109], [-3, 111], [-4, 115], [1, 118], [5, 118]],
  [[-6, 105], [-8, 114], [-8, 106]],
  [[-1, 131], [-2, 141], [-8, 147], [-10, 150], [-6, 146], [-4, 138], [-2, 134]],
  [[18, 121], [13, 124], [7, 126], [7, 122], [14, 120]],
  [[9, 80], [7, 81], [6, 80]],
  [[22, -80], [23, -75], [20, -74], [20, -77]],
  [[-11, 130], [-14, 127], [-18, 122], [-22, 114], [-32, 115], [-35, 117], [-35, 137], [-38, 140], [-38, 146], [-39, 148], [-37, 150], [-31, 153], [-25, 153], [-19, 147], [-14, 145], [-11, 142], [-15, 136], [-12, 132]],
  [[-35, 174], [-41, 176], [-46, 169], [-45, 167], [-41, 172]],
  [[-70, -180], [-70, -120], [-70, -60], [-70, 0], [-70, 60], [-70, 120], [-70, 180], [-90, 180], [-90, -180]],
];

const inside = (lat: number, lng: number, ring: LatLng[]) => {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [latI, lngI] = ring[i] ?? [0, 0];
    const [latJ, lngJ] = ring[j] ?? [0, 0];
    if (latI > lat !== latJ > lat) {
      const crossing = ((lngJ - lngI) * (lat - latI)) / (latJ - latI) + lngI;
      if (lng < crossing) hit = !hit;
    }
  }
  return hit;
};

const isLand = (v: Vec) => {
  const lat = (Math.asin(v.y) * 180) / Math.PI;
  const lng = (Math.atan2(v.x, v.z) * 180) / Math.PI;
  return LAND_RINGS.some((ring) => inside(lat, lng, ring));
};

const dots: Dot[] = fibonacciSphere(DOT_COUNT).map((v) => ({
  ...v,
  land: isLand(v),
}));

const coastlines: Vec[][] = LAND_RINGS.map((ring) =>
  [...ring, ...ring.slice(0, 1)].map(([lat, lng]) => fromLatLng(lat, lng)),
);

/** Latitude rings and longitude lines drawn faintly over the sphere. */
const graticule: Vec[][] = [
  ...[-60, -30, 0, 30, 60].map((lat) =>
    Array.from({ length: 73 }, (_, i) => fromLatLng(lat, i * 5)),
  ),
  ...Array.from({ length: 12 }, (_, m) =>
    Array.from({ length: 37 }, (_, i) => fromLatLng(-90 + i * 5, m * 30)),
  ),
];

const ORBITS = [
  { rx: 1.5, ry: 0.36, tilt: -0.35, speed: 0.00002 },
  { rx: 1.62, ry: 0.5, tilt: 0.55, speed: -0.000015 },
  { rx: 1.35, ry: 0.28, tilt: 0.1, speed: 0.000025 },
];

const hash = (n: number) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

const STARS = Array.from({ length: 120 }, (_, i) => ({
  x: hash(i * 5 + 1),
  y: hash(i * 5 + 2),
  size: 0.6 + hash(i * 5 + 3) * 1.2,
  alpha: 0.2 + hash(i * 5 + 4) * 0.6,
}));

/** Reads a theme color so the canvas follows globals.css. */
const readColor = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
  fallback;

const strokePath = (
  ctx: CanvasRenderingContext2D,
  line: Vec[],
  project: (v: Vec) => Projected,
) => {
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
};

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
      const drift = reduceMotion ? 0 : time;

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * SPHERE_RATIO;

      const project = (v: Vec): Projected => {
        const p = rotate(v, viewLng, lat);
        return { x: cx + radius * p.x, y: cy - radius * p.y, z: p.z };
      };

      ctx.clearRect(0, 0, width, height);
      ctx.setLineDash([]);

      // Starfield
      ctx.fillStyle = blue;
      for (const star of STARS) {
        ctx.globalAlpha = star.alpha;
        ctx.fillRect(star.x * width, star.y * height, star.size, star.size);
      }

      // Orbit rings behind the sphere
      ctx.strokeStyle = blue;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.16;
      for (const orbit of ORBITS) {
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          radius * orbit.rx,
          radius * orbit.ry,
          orbit.tilt + drift * orbit.speed,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }

      // Sphere body with a rim glow
      const body = ctx.createRadialGradient(cx, cy, radius * 0.55, cx, cy, radius);
      body.addColorStop(0, "rgba(0, 0, 0, 0)");
      body.addColorStop(1, blue);
      ctx.fillStyle = body;
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = blue;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.7;
      ctx.shadowColor = blue;
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Graticule lines
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.16;
      for (const line of graticule) strokePath(ctx, line, project);

      // Dots: land is bright, ocean recedes into the dark
      ctx.fillStyle = blue;
      for (const dot of dots) {
        const p = project(dot);
        if (p.z <= 0) continue;
        ctx.globalAlpha = dot.land ? 0.3 + p.z * 0.7 : 0.07 + p.z * 0.2;
        ctx.fillRect(p.x - 0.7, p.y - 0.7, 1.4, 1.4);
      }

      // Continent outlines
      ctx.strokeStyle = LAND_COLOR;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.9;
      for (const line of coastlines) strokePath(ctx, line, project);

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

      // Markers: the active one carries a ringed planet look
      const pulse = reduceMotion ? 0 : (time / 1400) % 1;
      screen.current = vectors.map((v, i) => {
        const p = project(v);
        if (p.z <= 0) return { x: p.x, y: p.y, visible: false };

        const isActive = i === active;
        const isHovered = i === hovered.current;
        const color = isActive ? orange : MARKER_COLOR;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isActive ? 16 : 10;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isActive ? 6 : isHovered ? 6 : 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (isActive) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(-0.35);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, 14, 4.5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          ctx.globalAlpha = 1 - pulse;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8 + pulse * 14, 0, Math.PI * 2);
          ctx.stroke();
        } else if (isHovered) {
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
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
    <div className={["relative pt-6", className].filter(Boolean).join(" ")}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Holographic network globe of our markets"
        onPointerMove={handleMove}
        onPointerLeave={clearHover}
        onClick={() => {
          if (hovered.current !== null) onSelect(hovered.current);
        }}
        className={["size-full", tooltip && "cursor-pointer"]
          .filter(Boolean)
          .join(" ")}
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

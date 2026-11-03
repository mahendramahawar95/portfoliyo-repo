"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  bx: number; // base velocity (particle eases back to this)
  by: number;
  radius: number;
  color: string;
};

type ParticleNetworkProps = {
  /** Particles per 100,000 px² of area (scales with container size) */
  density?: number;
  maxParticles?: number;
  speed?: number;
  connectionDistance?: number;
  /** How far the mouse influences particles */
  mouseRadius?: number;
  /** "attract" pulls particles to the cursor, "repel" pushes them away */
  interaction?: "attract" | "repel";
};

const COLORS = ["#9BD5FF", "#9BD5FF", "#F3B58C"];

export default function ParticleNetwork({
  density = 9,
  maxParticles = 140,
  speed = 0.4,
  connectionDistance = 150,
  mouseRadius = 190,
  interaction = "attract",
}: ParticleNetworkProps) {
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

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let lastTime = 0;
    let visible = true;
    const particles: Particle[] = [];

    // Mouse is tracked on window so it works even when
    // other content sits on top of this background.
    const mouse = { x: 0, y: 0, active: false, strength: 0 };

    const makeParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = speed * (0.5 + Math.random());
      const bx = Math.cos(angle) * velocity;
      const by = Math.sin(angle) * velocity;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: bx,
        vy: by,
        bx,
        by,
        radius: Math.random() * 1.8 + 1.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
      };
    };

    // Adjust particle count on resize without resetting everything
    const syncParticles = () => {
      const target = Math.min(
        maxParticles,
        Math.max(12, Math.round(((width * height) / 100000) * density)),
      );
      while (particles.length < target) particles.push(makeParticle());
      if (particles.length > target) particles.length = target;
      for (const p of particles) {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      syncParticles();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
      mouse.active = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    // Click burst: push particles away from the click point
    const onPointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (cx < 0 || cx > rect.width || cy < 0 || cy > rect.height) return;

      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < mouseRadius * 1.6) {
          const force = (1 - dist / (mouseRadius * 1.6)) * 7;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
    };

    const draw = (time: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (!visible) return;

      // Frame-rate independent movement (1 = 60fps)
      const dt = Math.min((time - (lastTime || time)) / 16.67, 2.5);
      lastTime = time;

      // Smoothly fade mouse effect in/out
      mouse.strength += ((mouse.active ? 1 : 0) - mouse.strength) * 0.1 * dt;

      ctx.clearRect(0, 0, width, height);

      const pull = interaction === "attract" ? -1 : 1;

      // Update particles
      for (const p of particles) {
        if (mouse.strength > 0.01) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius && dist > 0.001) {
            const force = (1 - dist / mouseRadius) * 0.12 * mouse.strength;
            // Attract only until particles get close, so they orbit
            // the cursor instead of collapsing into one point
            const k = pull === -1 && dist < 40 ? 0 : force;
            p.vx += (dx / dist) * k * pull * dt * 6;
            p.vy += (dy / dist) * k * pull * dt * 6;
          }
        }

        // Ease velocity back to base velocity (keeps motion alive)
        p.vx += (p.bx - p.vx) * 0.03 * dt;
        p.vy += (p.by - p.vy) * 0.03 * dt;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < 0 || p.x > width) {
          p.vx *= -1;
          p.bx *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
        }
        if (p.y < 0 || p.y > height) {
          p.vy *= -1;
          p.by *= -1;
          p.y = Math.max(0, Math.min(height, p.y));
        }
      }

      // Lines between nearby particles
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (!a) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (!b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > connectionDistance * connectionDistance) continue;

          const distance = Math.sqrt(distSq);
          let opacity = (1 - distance / connectionDistance) * 0.55;

          // Brighten lines that are near the cursor
          if (mouse.strength > 0.01) {
            const mx = (a.x + b.x) / 2 - mouse.x;
            const my = (a.y + b.y) / 2 - mouse.y;
            const md = Math.hypot(mx, my);
            if (md < mouseRadius) {
              opacity += (1 - md / mouseRadius) * 0.45 * mouse.strength;
            }
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(116, 195, 255, ${Math.min(opacity, 1)})`;
          ctx.stroke();
        }
      }

      // Lines from cursor to nearby particles
      if (mouse.strength > 0.01) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseRadius) {
            const opacity = (1 - dist / mouseRadius) * 0.8 * mouse.strength;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(243, 181, 140, ${opacity})`;
            ctx.stroke();
          }
        }

        // Soft glow at the cursor
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius * 0.6,
        );
        g.addColorStop(0, `rgba(155, 213, 255, ${0.22 * mouse.strength})`);
        g.addColorStop(1, "rgba(155, 213, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes with halo, larger and brighter near the cursor
      for (const p of particles) {
        let boost = 0;
        if (mouse.strength > 0.01) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < mouseRadius) boost = (1 - d / mouseRadius) * mouse.strength;
        }

        const r = p.radius * (1 + boost * 0.9);

        // Halo
        ctx.globalAlpha = 0.12 + boost * 0.25;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = 0.85 + boost * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    resize();

    if (reduceMotion) {
      // Single static frame for users who prefer reduced motion
      for (const p of particles) {
        p.vx = p.vy = p.bx = p.by = 0;
      }
      draw(0);
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(draw);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
    };
  }, [
    density,
    maxParticles,
    speed,
    connectionDistance,
    mouseRadius,
    interaction,
  ]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

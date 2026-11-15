// apps/web/components/sections/careers-banner.tsx
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@repo/ui/lib/cn";
import Image from "next/image";
import { Section } from "@repo/ui";

type NodeTone = "blue" | "ink" | "orange";

interface ConstellationNode {
  x: number;
  y: number;
  r: number;
  tone: NodeTone;
}

export interface BannerChip {
  title: string;
  subtitle: string;
  /** Position classes inside the stage, for example "top-[8%] -start-[2%]". */
  position: string;
  /** Shows the pulsing orange dot. */
  live?: boolean;
  /** Float animation class. */
  motion: string;
}

export interface BannerLink {
  label: string;
  href: string;
}

export interface CareersBannerProps {
  badge?: string;
  heading?: ReactNode;
  lead?: ReactNode;
  leadMuted?: ReactNode;
  primaryCta?: BannerLink;
  secondaryCta?: BannerLink;
  image?: { src: string; alt?: string };
  chips?: BannerChip[];
  className?: string;
}

/** Network drawn inside a 480 x 480 box. Index 0 is the center. */
const nodes: ConstellationNode[] = [
  { x: 240, y: 240, r: 8, tone: "blue" },
  { x: 120, y: 110, r: 5, tone: "ink" },
  { x: 360, y: 95, r: 4.5, tone: "orange" },
  { x: 395, y: 230, r: 5.5, tone: "blue" },
  { x: 340, y: 370, r: 4, tone: "ink" },
  { x: 140, y: 365, r: 5, tone: "orange" },
  { x: 85, y: 230, r: 4.5, tone: "blue" },
];

/** Pairs of node indexes to connect. */
const links: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 2],
  [3, 4],
  [5, 6],
];

const nodeFill: Record<NodeTone, string> = {
  blue: "fill-trust-blue",
  ink: "fill-ink-900",
  orange: "fill-trust-orange",
};

const defaultChips: BannerChip[] = [
  {
    title: "We're hiring",
    subtitle: "Build with us",
    position: "top-[14%] start-[4%]",
    live: true,
    motion: "animate-float",
  },
  {
    title: "Bengaluru",
    subtitle: "Hybrid-friendly",
    position: "bottom-[16%] end-[4%]",
    motion: "animate-float-slow [animation-delay:-3s]",
  },
];

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

const linkBase =
  "inline-flex items-center gap-2 rounded-button px-6 py-3 text-small font-semibold transition duration-300 ease-smooth hover:-translate-y-0.5";

export function CareersBanner({
  badge = "Careers at FullstackDev",
  heading = (
    <>
      Join Us in Building{" "}
      <span className="font-bold italic text-trust-blue">Smarter</span> Digital
      Experiences
    </>
  ),
  lead = "We create high-impact digital products -",
  leadMuted = "and we are growing a team that thrives on learning, collaboration, and building what matters, with a focus on quality, ownership, and continuous growth.",
  primaryCta = { label: "View openings", href: "#openings" },
  secondaryCta = { label: "Get in touch", href: "/contact" },
  image = { src: "/images/team-game.jpg", alt: "" },
  chips = defaultChips,
  className,
}: CareersBannerProps) {
  return (
    <Section
      aria-label={badge}
      className={cn("relative z-1 pt-0", className)}
    >
      <div className="container">
        <div className="grid items-center gap-2xl lg:grid-cols-2">
          {/* Copy */}
          <div>
            <span
              style={stagger(0)}
              className="stagger-item mb-md inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm"
            >
              <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                {badge}
              </span>
            </span>

            <h1
              style={stagger(1)}
              className="stagger-item mb-md text-h1 font-bold tracking-tight text-primary-dark"
            >
              {heading}
            </h1>

            <p
              style={stagger(2)}
              className="stagger-item mb-lg  text-body-lg text-primary-dark"
            >
              {lead} <span className="text-content-secondary">{leadMuted}</span>
            </p>

            <div
              style={stagger(3)}
              className="stagger-item flex flex-wrap items-center gap-sm"
            >
              <Link
                href={primaryCta.href}
                className={cn(linkBase, "bg-primary text-background shadow-md")}
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className={cn(
                  linkBase,
                  "border border-primary-dark/20 text-primary-dark hover:bg-primary-dark/5",
                )}
              >
                {secondaryCta.label}
                <ArrowRight className="size-3 rtl:-scale-x-100" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Stage */}
          <div
            aria-hidden="true"
            style={{ animationDelay: "150ms" }}
            className="relative mx-auto aspect-square w-full  animate-fade-up"
          >
            <span className="pointer-events-none absolute -top-4 -inset-e-6 z-0 size-48 rounded-full bg-radial-[circle] from-trust-blue/16 to-transparent to-70% blur-[2px]" />
            <span className="pointer-events-none absolute -inset-s-6 bottom-0 z-0 size-40 rounded-full bg-radial-[circle] from-trust-orange/16 to-transparent to-70% blur-[2px]" />

            {/* Constellation */}
            <svg
              viewBox="0 0 480 480"
              fill="none"
              className="absolute inset-0 size-full"
            >
              <g strokeWidth={1.2}>
                {links.map(([from, to], i) => {
                  const a = nodes[from];
                  const b = nodes[to];
                  if (!a || !b) return null;

                  return (
                    <line
                      key={`${from}-${to}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      style={{ animationDelay: `${-i * 0.3}s` }}
                      className="animate-dash-flow stroke-ink-900/12 [stroke-dasharray:4_6]"
                    />
                  );
                })}
              </g>
              <g>
                {nodes.map((node, i) => (
                  <circle
                    key={`${node.x}-${node.y}`}
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    style={{ animationDelay: `${-i * 0.45}s` }}
                    className={cn(
                      "origin-center animate-node-pulse transform-fill",
                      nodeFill[node.tone],
                    )}
                  />
                ))}
              </g>
            </svg>

            {/* Portrait */}
            <figure className="absolute inset-[16%] z-2 m-0 overflow-hidden rounded-full bg-ink-900/4 shadow-portrait">
              {/* Plain img: swap for next/image once the image source is final */}
              <Image
                src="/career.jpg"
                alt={image.alt ?? ""}
                width={720}
                height={720}
                loading="eager"
                decoding="async"
                className="size-full object-cover"
              />
              <span className="absolute inset-0 rounded-full border-2 border-white/70" />
            </figure>

            {/* Glass chips */}
            {chips.map((chip) => (
              <aside
                key={chip.title}
                className={cn(
                  "absolute z-3 flex items-center gap-2 rounded-lg border border-white/65 bg-linear-145 from-white/72 to-white/42 px-3 py-2 text-ink-900 shadow-chip backdrop-blur-lg backdrop-saturate-130",
                  chip.position,
                  chip.motion,
                )}
              >
                {chip.live && (
                  <span className="relative size-2 shrink-0 rounded-full bg-trust-orange after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-trust-orange" />
                )}
                <div>
                  <strong className="block text-small font-semibold">
                    {chip.title}
                  </strong>
                  <span className="block text-kicker font-medium text-ink-900/52">
                    {chip.subtitle}
                  </span>
                </div>
              </aside>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// apps/web/components/services-orbit.tsx
import type { CSSProperties, ReactNode } from "react";
import {
  Bot,
  Cloud,
  Code2,
  Layers,
  Palette,
  Server,
  Smartphone,
} from "lucide-react";
import { cn } from "@repo/ui/lib/cn";

type Tone = "blue" | "orange";

export interface OrbitItem {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  tone?: Tone;
}

export interface OrbitRing {
  items: OrbitItem[];
  /** Ring diameter as a percentage of the orbit area. */
  size: number;
  /** Seconds for one full turn. */
  duration: number;
  /** Spin the opposite way. */
  reverse?: boolean;
  /** Rotate the starting positions, in degrees. */
  offset?: number;
}

export interface ServicesOrbitProps {
  rings?: OrbitRing[];
  centerTitle?: string;
  centerText?: string;
  className?: string;
}

const icon = "size-4";

const defaultRings: OrbitRing[] = [
  {
    size: 64,
    duration: 45,
    reverse: true,
    offset: 30,
    items: [
      {
        title: "AI & Automation",
        description: "Data intelligence built into the product.",
        icon: <Bot className={icon} />,
        tone: "orange",
      },
      {
        title: "Cloud & DevOps",
        description: "CI/CD and monitoring from day one.",
        icon: <Cloud className={icon} />,
        tone: "blue",
      },
      {
        title: "API & Backend",
        description: "Secure, well-documented services.",
        icon: <Server className={icon} />,
        tone: "blue",
      },
    ],
  },
  {
    size: 100,
    duration: 70,
    items: [
      {
        title: "Full-Stack Development",
        description: "Web products built end to end.",
        icon: <Code2 className={icon} />,
        tone: "blue",
      },
      {
        title: "UI/UX Design",
        description: "Interfaces people adopt quickly.",
        icon: <Palette className={icon} />,
        tone: "orange",
      },
      {
        title: "Mobile Apps",
        description: "iOS and Android from one codebase.",
        icon: <Smartphone className={icon} />,
        tone: "blue",
      },
      {
        title: "SaaS Platforms",
        description: "Multi-tenant products that scale.",
        icon: <Layers className={icon} />,
        tone: "orange",
      },
    ],
  },
];

const tones: Record<Tone, { border: string; icon: string }> = {
  blue: {
    border: "border-trust-blue/20",
    icon: "bg-trust-blue/12 text-trust-blue-dark",
  },
  orange: {
    border: "border-trust-orange/20",
    icon: "bg-trust-orange/12 text-trust-orange-dark",
  },
};

/** Position on the ring as percentages, starting from the top. */
function position(index: number, total: number, offset = 0): CSSProperties {
  const angle = ((offset + (360 / total) * index - 90) * Math.PI) / 180;
  return {
    left: `${(50 + 50 * Math.cos(angle)).toFixed(3)}%`,
    top: `${(50 + 50 * Math.sin(angle)).toFixed(3)}%`,
  };
}

function OrbitCard({ item, reverse }: { item: OrbitItem; reverse?: boolean }) {
  const tone = tones[item.tone ?? "blue"];
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      {...(item.href ? { href: item.href } : {})}
      title={item.title}
      className={cn(
        "flex items-center gap-2.5 rounded-full border bg-white/85 p-1.5 shadow-tcard backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-40 sm:rounded-card sm:p-3",
        tone.border,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-pill",
          tone.icon,
        )}
      >
        {item.icon}
      </span>
      {/* Icon-only on phones; full text from sm up */}
      <span className="sr-only min-w-0 sm:not-sr-only">
        <span className="block text-small font-semibold leading-tight text-foreground">
          {item.title}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-content-secondary">
          {item.description}
        </span>
      </span>
    </Tag>
  );
}

export function ServicesOrbit({
  rings = defaultRings,
  centerTitle = "What we build",
  centerText = "Design, engineering and AI, from first prototype to growth.",
  className,
}: ServicesOrbitProps) {
  return (
    <div
      role="group"
      aria-label="Our capabilities"
      className={cn("group/orbit mx-auto w-full p-6 sm:p-20", className)}
    >
      <div className="relative isolate aspect-square w-full">
        {rings.map((ring, r) => {
          const pause =
            "group-hover/orbit:[animation-play-state:paused] group-focus-within/orbit:[animation-play-state:paused]";
          const direction = ring.reverse ? "[animation-direction:reverse]" : "";

          return (
            <div
              key={r}
              role="list"
              style={
                {
                  width: `${ring.size}%`,
                  height: `${ring.size}%`,
                  "--orbit-duration": `${ring.duration}s`,
                } as CSSProperties
              }
              className={cn(
                "absolute inset-0 m-auto animate-orbit rounded-full border border-dashed border-ink-900/15",
                direction,
                pause,
              )}
            >
              {ring.items.map((item, i) => (
                <div
                  key={item.title}
                  role="listitem"
                  style={position(i, ring.items.length, ring.offset)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Counter-rotation keeps the card upright while the ring turns */}
                  <div
                    className={cn("animate-orbit-counter", direction, pause)}
                  >
                    <OrbitCard item={item} reverse={ring.reverse} />
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Center card */}
        <div className="absolute inset-0 z-10 m-auto flex size-[30%] flex-col items-center justify-center rounded-full bg-linear-155 from-ink-900 via-ink-800 to-ink-700 p-2 text-center text-white shadow-lg before:pointer-events-none before:absolute before:-inset-2 before:animate-glow before:rounded-full before:border before:border-trust-blue/30 sm:p-4 sm:before:-inset-3">
          <span className="text-xs font-semibold leading-tight sm:text-h5">
            {centerTitle}
          </span>
          <span className="mt-1 hidden max-w-[16ch] text-xs leading-snug text-white/70 sm:block">
            {centerText}
          </span>
        </div>
      </div>
    </div>
  );
}

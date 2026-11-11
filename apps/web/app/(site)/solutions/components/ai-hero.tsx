// apps/web/components/sections/ai-hero.tsx
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Button, Section } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";

export interface AiSignalCard {
  label: string;
  value: string;
  sub: string;
  /** Position classes inside the visual, for example "bottom-[6%] start-[7%]". */
  position: string;
  /** Float animation class, so the two cards drift out of sync. */
  motion?: string;
}

export interface AiHeroProps {
  badge?: string;
  brandPrefix?: string;
  brandName?: string;
  title?: ReactNode;
  lead?: ReactNode;
  /** Replace the default primary button. */
  primaryCta?: ReactNode;
  secondaryLink?: { label: string; href: string };
  image?: { src: string; alt: string; width: number; height: number };
  signals?: AiSignalCard[];
  capabilities?: string[];
  className?: string;
}

const defaultSignals: AiSignalCard[] = [
  {
    label: "Workflow AI",
    value: "+38%",
    sub: "Cycle time gain",
    position: "top-[8%] end-[4%]",
    motion: "animate-float",
  },
  {
    label: "Model Health",
    value: "Stable",
    sub: "Drift within threshold",
    position: "bottom-[6%] start-[7%]",
    motion: "animate-float-slow [animation-delay:-3s]",
  },
];

const defaultCapabilities = [
  "Process Automation",
  "Predictive Analytics",
  "AI Driven Development",
  "Generative AI Integration",
  "AI-Embedded Products",
  "RPA Workflows",
];

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

function TickerGroup({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((label, i) => (
        <li
          key={`${label}-${i}`}
          className="inline-flex items-center gap-3 whitespace-nowrap px-6 text-small font-medium uppercase tracking-widest text-white/60 before:size-1.5 before:rounded-full before:bg-trust-orange"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export function AiHero({
  badge = "AI Capabilities",
  brandPrefix = "AI",
  brandName = "fullstackdev",
  title = "Your AI operating layer for products, operations, and engineering.",
  lead = "We design and deploy practical AI systems that improve execution speed without sacrificing control, quality, or team clarity.",
  primaryCta = (
    <Button variant="primary" className="text-background">
      Explore capabilities
    </Button>
  ),
  secondaryLink = { label: "Talk to an engineer", href: "/contact" },
  image = {
    src: "/images/ai-fullstackdev.jpg",
    alt: "AI-powered product development illustration",
    width: 640,
    height: 520,
  },
  signals = defaultSignals,
  capabilities = defaultCapabilities,
  className,
}: AiHeroProps) {
  // One group must be wider than the screen, so repeat the list three times.
  const tickerItems = Array.from({ length: 3 }).flatMap(() => capabilities);

  return (
    <Section
      aria-label={`${brandPrefix} at ${brandName}`}
      className={cn(
        "relative isolate overflow-hidden bg-section-workflow py-3xl text-white",
        className,
      )}
    >
      <div className="container">
      <div className="mx-auto px-md">
        <div className="grid items-center gap-xl lg:grid-cols-2">
          {/* Copy */}
          <div>
            <span
              style={stagger(0)}
              className="stagger-item mb-md inline-flex items-center gap-2 rounded-pill border border-white/12 bg-white/8 px-4 py-2"
            >
              <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-white/70">
                {badge}
              </span>
            </span>

            <h1
              style={stagger(1)}
              className="stagger-item mb-4 flex flex-wrap items-baseline gap-x-[0.18em] gap-y-[0.08em] pe-[0.12em] text-brand font-bold leading-[1.05] tracking-tighter text-white"
            >
              <span>{brandPrefix}</span>
              <span
                aria-hidden="true"
                className="inline-flex translate-y-[0.02em] items-center justify-center text-[0.92em] font-extrabold leading-none text-trust-orange"
              >
                @
              </span>
              <span className="me-[-0.1em] inline-block bg-brand-gradient bg-clip-text pe-[0.18em] text-transparent">
                {brandName}
              </span>
            </h1>

            <p
              style={stagger(2)}
              className="stagger-item mb-5  text-h3 font-medium leading-tight tracking-tight text-white"
            >
              {title}
            </p>

            <p
              style={stagger(3)}
              className="stagger-item mb-lg  text-body-lg text-white/70"
            >
              {lead}
            </p>

            <div
              style={stagger(4)}
              className="stagger-item flex flex-wrap items-center gap-md"
            >
              {primaryCta}
              <Link
                href={secondaryLink.href}
                className="group inline-flex items-center gap-2 text-small font-semibold text-white transition-colors hover:text-trust-blue"
              >
                {secondaryLink.label}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
            {/* Core orb with two rotating rings */}
            <div className="absolute inset-0 m-auto size-[34%] rounded-full border border-sky-glow/30 bg-radial-[at_30%_25%] from-trust-blue/55 via-ink-750 to-ink-900 shadow-orb">
              <span className="absolute inset-[-30%] animate-orbit rounded-full border border-sky-glow/25 [--orbit-duration:18s] before:absolute before:left-0 before:top-1/2 before:size-2.2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-trust-blue before:shadow-dot-blue before:h-3 before:w-3" />
              <span className="absolute inset-[-70%] animate-orbit rounded-full border border-dashed border-primary/20 [--orbit-duration:26s] [animation-direction:reverse] before:absolute before:left-0 before:top-1/2 before:size-2.2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-trust-blue before:shadow-dot-blue after:absolute after:right-0 after:top-1/2 after:size-2.2 after:-translate-y-1/2 after:translate-x-1/2 after:rounded-full after:bg-trust-orange after:shadow-dot-orange before:h-3 before:w-3 after:h-3 after:w-3" />
              <span className="relative grid size-full animate-glow place-items-center text-h3 font-bold text-white">
                AI
              </span>
            </div>

            {/* Floating signal cards */}
            {signals.map((signal, i) => (
              <div
                key={signal.label}
                style={{ animationDelay: `${-i * 1.8}s` }}
                className={cn(
                  "absolute flex min-w-30 p-4 animate-float flex-col gap-0.4 rounded-cap border border-sky-glow/22 bg-ink-950/72 px-3.4 py-2.8 shadow-signal backdrop-blur-[10px]",
                  signal.position,
                )}
              >
                <span className="text-kicker font-bold uppercase tracking-kicker text-sky-glow">
                  {signal.label}
                </span>
                <strong className="text-h5 font-bold leading-tight text-white">
                  {signal.value}
                </strong>
                <span className="text-xs text-ice/60">{signal.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Capability ticker */}
        <div
          dir="ltr"
          aria-label="Capability strip"
          className="mt-xl overflow-hidden border-y border-white/10 py-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
        >
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            <TickerGroup items={tickerItems} />
            <TickerGroup items={tickerItems} hidden />
          </div>
        </div>
      </div>
      </div>
    </Section>
  );
}

// apps/web/components/sections/ai-hero.tsx
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Button, Section } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";
import AiOrbitSection from "../../../../components/shared/ai-section/ai-orbit";

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
  brandName = "Fullstackdev",
  title = "Your AI operating layer for products, operations, and engineering.",
  lead = "We design and deploy practical AI systems that improve execution speed without sacrificing control, quality, or team clarity.",
  primaryCta = (
    <Button variant="primary" className="text-background">
      Explore capabilities
    </Button>
  ),
  secondaryLink = { label: "Talk to an engineer", href: "/contact" },
  capabilities = defaultCapabilities,
  className,
}: AiHeroProps) {
  // One group must be wider than the screen, so repeat the list three times.
  const tickerItems = Array.from({ length: 3 }).flatMap(() => capabilities);

  return (
    <Section
      aria-label={`${brandPrefix} at ${brandName}`}
      className={cn(
        "relative isolate overflow-hidden text-white",
        className,
      )}
    >
      <div className="container">
      <div className="mx-auto ">
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
              className="text-display font-extrabold mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 pe-3 text-brand leading-none tracking-tighter text-white"
            >
              <span>{brandPrefix}</span>
              <span
                aria-hidden="true"
                className="inline-flex translate-y-[0.02em] items-center justify-center text-[0.92em] font-extrabold leading-none text-trust-orange"
              >
                @
              </span>
              <span className="bg-linear-to-r from-white via-trust-blue via-55% to-trust-orange bg-clip-text bg-no-repeat text-transparent rtl:bg-linear-to-l">
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
         <AiOrbitSection/>
        </div>

        {/* Capability ticker */}
        <div
          dir="ltr"
          aria-label="Capability strip"
          className="mt-xl overflow-hidden border-y border-white/10 py-4 mask-[linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
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

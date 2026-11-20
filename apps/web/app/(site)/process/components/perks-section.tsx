// apps/web/components/sections/perks-section.tsx
import type { CSSProperties, ReactNode } from "react";
import {
  Clock,
  Coffee,
  HeartPulse,
  Laptop,
  Star,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { cn } from "@repo/ui/lib/cn";
import { Section } from "@repo/ui";

export interface Perk {
  title: string;
  text: string;
  icon: ReactNode;
}

export interface PerksSectionProps {
  badge?: string;
  heading?: ReactNode;
  lead?: ReactNode;
  /** Second half of the lead, shown in a stronger color. */
  leadStrong?: ReactNode;
  perks?: Perk[];
  className?: string;
}

/** Number of columns on medium screens and up. */
const COLUMNS = 3;

const icon = "size-6";

const defaultPerks: Perk[] = [
  {
    title: "Competitive Compensation",
    text: "Paid what you are worth. Reviewed before you have to ask.",
    icon: <Wallet className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Hybrid Flexibility",
    text: "Work from Bengaluru or remotely - we trust you.",
    icon: <Laptop className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Unplug Without the Guilt",
    text: "Take time. Come back sharp. That's all we ask.",
    icon: <Coffee className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Real Ownership",
    text: "Everything we build gets used. Everything you build gets seen.",
    icon: <Star className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Health Coverage",
    text: "Good health coverage isn't a perk. It's the baseline. We start there.",
    icon: <HeartPulse className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Results Over Hours",
    text: "Your calendar is yours. We measure output, not hours.",
    icon: <Clock className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Fun & Team-Driven Culture",
    text: "We work hard and we have fun. Sometimes simultaneously.",
    icon: <Users className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Smart Tools & Smarter Practices",
    text: "Use AI-assisted workflows and modern stacks to work faster and cleaner.",
    icon: <Zap className={icon} strokeWidth={1.6} />,
  },
  {
    title: "Grow Through Ownership",
    text: "Take initiative, lead solutions, and grow alongside high-impact products.",
    icon: <TrendingUp className={icon} strokeWidth={1.6} />,
  },
];

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

export function PerksSection({
  badge = "Life at FullstackDev",
  heading = (
    <>
      Why work with{" "}
      <span className="bg-linear-to-r from-ink-900 via-trust-blue via-55% to-trust-orange bg-clip-text bg-no-repeat text-transparent rtl:bg-linear-to-l">
        FullstackDev
      </span>
    </>
  ),
  lead = "Less about what looks good on a careers page.",
  leadStrong = "More about what makes your work life better.",
  perks = defaultPerks,
  className,
}: PerksSectionProps) {
  // Empty cells keep the divider grid tidy when the last row is not full.
  const fillers = (COLUMNS - (perks.length % COLUMNS)) % COLUMNS;

  return (
    <Section
      aria-label="Why work with us"
      className={cn("relative z-1 py-3xl", className)}
    >
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-xl animate-fade-up text-center">
          <span className="mb-md inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm">
            <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              {badge}
            </span>
          </span>
          <h2 className="mb-md text-h2 font-bold tracking-tight text-primary-dark">
            {heading}
          </h2>
          <p className="text-lg text-content-secondary">
            {lead} <span className="font-medium text-primary-dark">{leadStrong}</span>
          </p>
        </div>

        {/* Grid: the 1px gap over a tinted background draws the dividers */}
        <div className="grid gap-px overflow-hidden rounded-card border border-ink-900/10 bg-ink-900/10 md:grid-cols-3">
          {perks.map((perk, i) => (
            <article
              key={perk.title}
              style={stagger(i)}
              className="group stagger-item flex gap-4 bg-white p-lg transition-colors duration-300 hover:bg-surface-secondary"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-trust-blue/28 text-trust-blue-dark transition-colors duration-300 group-hover:bg-trust-blue/10"
              >
                {perk.icon}
              </span>
              <div>
                <h3 className="mb-1 text-body font-semibold tracking-tight text-primary-dark">
                  {perk.title}
                </h3>
                <p className="text-small text-content-secondary">{perk.text}</p>
              </div>
            </article>
          ))}

          {Array.from({ length: fillers }).map((_, i) => (
            <div key={i} aria-hidden="true" className="hidden bg-white md:block" />
          ))}
        </div>
      </div>
    </Section>
  );
}

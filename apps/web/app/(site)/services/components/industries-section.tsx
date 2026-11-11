// apps/web/components/sections/industries-section.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CreditCard,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Button } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";

type Tone = "navy" | "soft" | "cyan" | "orange";

export interface Industry {
  title: string;
  description: string;
  icon: ReactNode;
  projects: number;
  href?: string;
  tone: Tone;
}

export interface IndustriesSectionProps {
  badge?: string;
  heading?: ReactNode;
  intro?: ReactNode;
  industries?: Industry[];
  ctaTitle?: string;
  ctaText?: string;
  /** Replace the default button in the bottom band. */
  cta?: ReactNode;
  className?: string;
}

const icon = "size-6";

const defaultIndustries: Industry[] = [
  {
    title: "Fintech & Payments",
    description:
      "Payment platforms, banking dashboards, lending tools, crypto wallets, and compliance-ready financial infrastructure built for scale and security.",
    icon: <CreditCard className={icon} />,
    projects: 12,
    tone: "navy",
  },
  {
    title: "Healthcare & MedTech",
    description:
      "Patient portals, remote monitoring apps, clinic management systems, and HIPAA-compliant platforms that bridge care and technology.",
    icon: <HeartPulse className={icon} />,
    projects: 8,
    tone: "soft",
  },
  {
    title: "E-Commerce & Retail",
    description:
      "Headless storefronts, AI-driven recommendation engines, inventory systems, and D2C platforms that convert browsers into buyers.",
    icon: <ShoppingCart className={icon} />,
    projects: 15,
    tone: "cyan",
  },
  {
    title: "EdTech & E-Learning",
    description:
      "LMS platforms, interactive course builders, student progress dashboards, and AI tutoring tools that make learning smarter and more engaging.",
    icon: <GraduationCap className={icon} />,
    projects: 7,
    tone: "orange",
  },
  {
    title: "Logistics & Supply Chain",
    description:
      "Fleet management tools, real-time shipment tracking, warehouse automation dashboards, and route optimisation platforms powered by AI.",
    icon: <Truck className={icon} />,
    projects: 6,
    tone: "soft",
  },
  {
    title: "Real Estate & PropTech",
    description:
      "Property listing platforms, virtual tour builders, tenant management systems, and mortgage calculators that modernise the real estate experience.",
    icon: <Building2 className={icon} />,
    projects: 5,
    tone: "cyan",
  },
];

const tones: Record<
  Tone,
  {
    card: string;
    index: string;
    icon: string;
    desc: string;
    meta: string;
    link: string;
  }
> = {
  navy: {
    card: "border-white/8 bg-linear-160 from-ink-900 via-ink-800 to-ink-700 text-white shadow-lg rtl:bg-linear-200",
    index: "text-white/50",
    icon: "border-white/12 bg-white/10 text-trust-blue",
    desc: "text-white/70",
    meta: "border-white/10",
    link: "text-trust-blue",
  },
  soft: {
    card: "border-border bg-white/80 text-ink-900 shadow-tcard",
    index: "text-ink-900/45",
    icon: "border-trust-blue/16 bg-trust-blue/10 text-trust-blue",
    desc: "text-ink-900/70",
    meta: "border-ink-900/10",
    link: "text-trust-blue-dark",
  },
  cyan: {
    card: "border-trust-blue/16 bg-linear-160 from-trust-blue/14 to-white/90 text-ink-900 shadow-tcard-cyan rtl:bg-linear-200",
    index: "text-ink-900/45",
    icon: "border-trust-blue/22 bg-trust-blue/14 text-trust-blue-dark",
    desc: "text-ink-900/70",
    meta: "border-ink-900/10",
    link: "text-trust-blue-dark",
  },
  orange: {
    card: "border-trust-orange/18 bg-linear-160 from-trust-orange/16 to-white/90 text-ink-900 shadow-tcard-orange rtl:bg-linear-200",
    index: "text-ink-900/45",
    icon: "border-trust-orange/20 bg-trust-orange/12 text-trust-orange-dark",
    desc: "text-ink-900/70",
    meta: "border-ink-900/10",
    link: "text-trust-orange-dark",
  },
};

export function IndustriesSection({
  badge = "Industries We Serve",
  heading = (
    <>
      Deep Domain Knowledge
      <br />
      <span className="text-primary">Across Every Vertical</span>
    </>
  ),
  intro = "We have shipped products across a wide range of industries. That cross-domain experience means we bring pattern recognition - and proven solutions - to every new challenge.",
  industries = defaultIndustries,
  ctaTitle = "Don't see your industry?",
  ctaText = "We've worked across 18+ verticals. Let's talk about yours.",
  cta = (
    <Button variant="primary" className="text-background">
      Get in Touch
      <ArrowRight className="size-icon" aria-hidden="true" />
    </Button>
  ),
  className,
}: IndustriesSectionProps) {
  return (
    <section
      aria-labelledby="industries-heading"
      className={cn("relative z-1 py-3xl", className)}
    >
      <div className="container">
      <div className="mx-auto max-w-default px-md">
        {/* Header */}
        <div className="mb-xl grid items-end gap-md lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-md inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm">
              <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                {badge}
              </span>
            </span>
            <h2
              id="industries-heading"
              className="text-h2 font-bold tracking-tight text-primary-dark"
            >
              {heading}
            </h2>
          </div>

          <p className="text-body text-content-secondary lg:col-span-5 lg:col-start-8">
            {intro}
          </p>
        </div>

        {/* Industry cards */}
        <div className="grid gap-sm md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const tone = tones[industry.tone];

            return (
              <article
                key={industry.title}
                className={cn(
                  "relative flex h-full flex-col gap-sm rounded-card border p-card transition duration-300 ease-smooth hover:-translate-y-1.5",
                  tone.card,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute end-card top-card text-xs font-bold tabular-nums",
                    tone.index,
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-12 place-items-center rounded-md border",
                    tone.icon,
                  )}
                >
                  {industry.icon}
                </span>

                <h3 className="text-h5 font-semibold tracking-tight">
                  {industry.title}
                </h3>
                <p className={cn("text-small leading-relaxed", tone.desc)}>
                  {industry.description}
                </p>

                <div
                  className={cn(
                    "mt-auto flex items-center justify-between gap-sm border-t pt-sm",
                    tone.meta,
                  )}
                >
                  <span className="font-display text-h4 font-bold leading-none">
                    {industry.projects}
                    <span className="ms-1 font-body text-xs font-medium opacity-60">
                      projects
                    </span>
                  </span>

                  <Link
                    href={industry.href ?? "/case-studies"}
                    className={cn(
                      "group inline-flex items-center gap-1.5 text-small font-semibold",
                      tone.link,
                    )}
                  >
                    Explore
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA band */}
        <div className="mt-lg flex flex-wrap items-center justify-between gap-md rounded-card border border-border bg-surface p-card">
          <div>
            <p className="text-h5 font-semibold tracking-tight text-primary-dark">
              {ctaTitle}
            </p>
            <p className="mt-1 text-small text-content-secondary">{ctaText}</p>
          </div>
          <div className="shrink-0">{cta}</div>
        </div>
      </div>
      </div>
    </section>
  );
}

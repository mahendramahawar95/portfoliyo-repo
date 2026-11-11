// apps/web/components/sections/services-grid.tsx
import type { ReactNode } from "react";
import { Badge, Button, SectionHeading } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";

type Tone = "soft" | "cyan" | "orange" | "navy";

export interface ServiceItem {
  title: string;
  description: string;
  tone?: Tone;
  href?: string;
}

export interface ServicesGridProps {
  services?: ServiceItem[];
  badge?: string;
  heading?: ReactNode;
  description?: ReactNode;
  /** Replace the default button in the first cell. */
  actions?: ReactNode;
  tagline?: ReactNode;
  taglineMuted?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

// Only the first description comes from your markup: replace the rest.
const defaultServices: ServiceItem[] = [
  {
    title: "UI/UX Design",
    description:
      "Our design approach balances form and function - creating user journeys that are intuitive, on-brand, and aligned with your business goals.",
    tone: "soft",
  },
  {
    title: "AI-Powered Web Development",
    description:
      "Fast, secure web products with intelligence built in: from smart search and automation to data-driven personalization.",
    tone: "navy",
  },
  {
    title: "Mobile App Development",
    description:
      "Polished iOS and Android apps from a single codebase, designed for performance, offline use and easy updates.",
    tone: "cyan",
  },
  {
    title: "SaaS Product Development",
    description:
      "Multi-tenant platforms with billing, roles and analytics, engineered to scale from first customer to thousands.",
    tone: "orange",
  },
  {
    title: "SEO & Digital Engineering",
    description:
      "Technical SEO, performance budgets and clean architecture so your product is found quickly and loads even faster.",
    tone: "navy",
  },
  {
    title: "Product Strategy",
    description:
      "Roadmaps, discovery and prioritization that turn ideas into a plan your team and investors can get behind.",
    tone: "soft",
  },
];

const tones: Record<Tone, { card: string; desc: string; number: string }> = {
  soft: {
    card: "bg-white/80 text-ink-900",
    desc: "text-ink-900/70",
    number: "text-ink-900/45",
  },
  cyan: {
    card: "bg-linear-160 from-trust-blue/14 to-[rgb(236_246_252/0.92)] text-ink-900 rtl:bg-linear-200",
    desc: "text-ink-900/70",
    number: "text-ink-900/45",
  },
  orange: {
    card: "bg-linear-160 from-trust-orange/16 to-[rgb(255_244_232/0.94)] text-ink-900 rtl:bg-linear-200",
    desc: "text-ink-900/70",
    number: "text-ink-900/45",
  },
  navy: {
    card: "border-white/8 bg-linear-160 from-ink-900 from-0% via-ink-750 via-55% to-[#034b66] text-white rtl:bg-linear-200",
    desc: "text-white/75",
    number: "text-white/50",
  },
};

export function ServicesGrid({
  services = defaultServices,
  badge = "Capabilities",
 heading = (
  <>
    Build <span className="text-trust-blue">Smarter</span>  Scale{" "}
    <span className="text-trust-blue">Faster</span>
  </>
),
  description = "",
  tagline = "fullstackdev helps forward-thinking startups and businesses bring ideas to life",
  taglineMuted = "through intelligent, high-performance digital solutions.",
  ctaLabel = "Start a conversation",
  ctaHref = "/contact",
  className,
}: ServicesGridProps) {
  return (
    <section className={cn("py-3xl", className)}>
      <div className="container">
        <div className="mx-auto max-w-default px-md">
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* First cell: intro */}
            <div className="flex animate-fade-up items-center">
              <div>
                <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <span
                    className="size-2 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium uppercase tracking-widest text-muted">
                    {badge}
                  </span>
                </Badge>

                <SectionHeading
                  align="left"
                  descClass="text-left"
                  heading={heading}
                  description={description}
                  headingClass="m-0 font-bold tracking-tight text-primary-dark"
                  className="mb-4 mt-4"
                />

              
              </div>
            </div>

            {/* Six service cards */}
            {services.map((service, i) => {
              const tone = tones[service.tone ?? "soft"];

              return (
                <article
                  key={service.title}
                  style={{ animationDelay: `${(i + 1) * 80}ms` }}
                  className={cn(
                    "p-md relative flex min-h-62 animate-fade-up flex-col gap-3.4 overflow-hidden rounded-card border border-ink-900/10  transition duration-350 ease-smooth hover:-translate-y-1.5 hover:shadow-lg",
                    tone.card,
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-h5 mb-2 font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-xs font-bold tabular-nums",
                        tone.number,
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className={cn("text-sm leading-relaxed", tone.desc)}>
                    {service.description}
                  </p>

                  {service.href && (
                    <a
                      href={service.href}
                      className="group mt-auto inline-flex items-center gap-2 text-small font-semibold"
                    >
                      Read More
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  )}
                </article>
              );
            })}

            {/* Last cell: tagline */}
            <div
              style={{ animationDelay: `${(services.length + 1) * 80}ms` }}
              className="flex animate-fade-up items-center"
            >
              <div>
                <p className="mb-3 text-body-lg font-medium leading-snug text-primary-dark">
                  {tagline}{" "}
                  <span className="text-content-secondary">{taglineMuted}</span>
                </p>
                <a
                  href={ctaHref}
                  className="group inline-flex items-center gap-1.5 text-small font-semibold text-trust-blue-dark"
                >
                  {ctaLabel}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

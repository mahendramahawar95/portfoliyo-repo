// apps/web/components/sections/about-cap-rail.tsx
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@repo/ui/lib/cn";
import { Section } from "@repo/ui";

type PhaseTone = "blue" | "muted" | "orange";

export interface Capability {
  title: string;
  description: string;
}

export interface CapabilityGroup {
  phase: string;
  tone: PhaseTone;
  items: Capability[];
}

export interface AboutCapRailProps {
  badge?: string;
  title?: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  link?: { label: string; href: string };
  groups?: CapabilityGroup[];
  className?: string;
}

const defaultGroups: CapabilityGroup[] = [
  {
    phase: "Shape",
    tone: "blue",
    items: [
      {
        title: "UI/UX Design",
        description:
          "User-centered design focused on clarity, usability, and lasting experience.",
      },
      {
        title: "Product Strategy",
        description:
          "Defining product direction, features, and roadmaps with clear purpose.",
      },
    ],
  },
  {
    phase: "Build",
    tone: "muted",
    items: [
      {
        title: "Web Development",
        description:
          "Secure, scalable web applications built for performance and growth.",
      },
      {
        title: "Mobile App Development",
        description:
          "High-quality iOS and Android apps with smooth, reliable experiences.",
      },
    ],
  },
  {
    phase: "Evolve",
    tone: "orange",
    items: [
      {
        title: "AI & Automation",
        description:
          "AI-assisted solutions that improve efficiency and decision-making where it counts.",
      },
      {
        title: "Support & Scale",
        description:
          "Continuous optimization, enhancements, and long-term partnership.",
      },
    ],
  },
];

const phaseColors: Record<PhaseTone, string> = {
  blue: "text-trust-blue-dark",
  muted: "text-ink-900/45",
  orange: "text-trust-orange-dark",
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

export function AboutCapRail({
  badge = "Capabilities",
  title = "What we do",
  lede = "We craft digital products that balance usability, performance, and scalability - built to grow with your business.",
  aside = "Every solution is tailored - no templates, no shortcuts.",
  link = { label: "Explore services", href: "/services" },
  groups = defaultGroups,
  className,
}: AboutCapRailProps) {
  // Numbers continue across groups: 01-02, 03-04, 05-06 ...
  const offsets = groups.map((_, i) =>
    groups.slice(0, i).reduce((sum, group) => sum + group.items.length, 0),
  );

  return (
    <Section className={cn("relative z-1 py-3xl", className)}>
      <div className="container">
        <div className="mx-auto grid gap-xl lg:w-11/12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          {/* Lead */}
          <aside className="animate-fade-up relative flex p-sm gap-0.8 overflow-x-auto max-lg:min-w-0 max-lg:flex-1 max-lg:rounded-[0.85rem] max-lg:scrollbar-none lg:sticky lg:top-25 lg:max-h-[calc(100vh-7rem)] lg:flex-col lg:self-start lg:overflow-y-auto lg:overflow-x-visible lg:rounded-s-panel">
            <span className="mb-md inline-flex w-fit items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm">
              <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                {badge}
              </span>
            </span>
            <h2 className="mb-3 text-h2 font-bold tracking-tight text-primary-dark">
              {title}
            </h2>
            <p className="mb-md text-body text-content-secondary">{lede}</p>
            <p className="mb-md text-small font-medium text-primary-dark">{aside}</p>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-small font-semibold text-trust-blue-dark"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </aside>

          {/* Grouped list */}
          <div role="list" className="flex flex-col gap-xl">
            {groups.map((group, g) => (
              <div key={group.phase} role="presentation">
                <span
                  className={cn(
                    "mb-2.6 block ps-0.6 text-small font-bold uppercase tracking-kicker",
                    phaseColors[group.tone],
                  )}
                >
                  {group.phase}
                </span>

                {group.items.map((item, i) => {
                  const number = (offsets[g] ?? 0) + i + 1;

                  return (
                    <article
                      key={item.title}
                      role="listitem"
                      style={stagger(number - 1)}
                      className="group p-lg stagger-item relative -mx-3.4 grid grid-cols-[3.25rem_1fr] items-start gap-4 rounded-card overflow-hidden border-b border-ink-900/16 py-4.6 pe-4 ps-3.4 transition duration-300 before:absolute before:inset-y-0 before:start-0 before:w-0.75 before:rounded-s-lg before:bg-trust-blue before:opacity-0 before:transition-opacity before:duration-300 hover:border-b-transparent hover:bg-linear-105 hover:from-trust-blue/6 hover:to-white/45 hover:before:opacity-100 rtl:hover:bg-linear-255"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-0.6 font-display text-small font-semibold leading-snug tracking-wide text-ink-900/40 transition-colors duration-300 group-hover:text-trust-blue"
                      >
                        {pad(number)}
                      </span>
                      <div>
                        <h3 className="mb-1 text-h5 font-semibold tracking-tight text-primary-dark">
                          {item.title}
                        </h3>
                        <p className="text-small text-content-secondary">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

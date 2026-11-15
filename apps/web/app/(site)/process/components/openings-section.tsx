// apps/web/components/sections/openings-section.tsx
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@repo/ui/lib/cn";
import { Section } from "@repo/ui";

export interface Job {
  title: string;
  href: string;
  location: string;
  experience: string;
  openings: number;
  description: string;
}

export interface OpeningsSectionProps {
  badge?: string;
  heading?: ReactNode;
  lead?: ReactNode;
  jobs?: Job[];
  emptyMessage?: ReactNode;
  className?: string;
}

// Replace the links with your real job pages.
const defaultJobs: Job[] = [
  {
    title: "Frontend Engineer (React / Claude)",
    href: "/careers/frontend-engineer",
    location: "Bengaluru/Hybrid",
    experience: "2-5 Years",
    openings: 1,
    description:
      "Building production-grade, highly responsive user interfaces while leveraging Claude’s advanced frontend design plugins and custom architectural skills to accelerate delivery.",
  },
  {
    title: "Full Stack Developer",
    href: "/careers/full-stack-developer",
    location: "Bengaluru/Hybrid",
    experience: "2-4 Years",
    openings: 2,
    description:
      "We are hiring a Full Stack Developer to build scalable web applications and support innovative product development. Proficiency in Node js, database design, RESTful APIs, and familiarity with React is preferred.",
  },
  {
    title: "Senior UI Developer",
    href: "/careers/senior-ui-developer",
    location: "Bengaluru/Hybrid",
    experience: "4-7 Years",
    openings: 1,
    description:
      "We are looking for a Full Stack Developer to build scalable, high-quality web applications. Proficiency in PHP, RESTful APIs, and database design is essential. Experience with frontend frameworks like Angular or React, modern UI tech, Agile, and SDLC is a plus.",
  },
  {
    title: "SEO & Digital Marketing Specialist",
    href: "/careers/seo-digital-marketing",
    location: "Bengaluru/Hybrid",
    experience: "0-2 Years",
    openings: 1,
    description:
      "We are looking for an SEO & Digital Marketing Specialist (2–4 years) to drive visibility, traffic, and engagement through on-page/off-page SEO, paid ads, and content strategy. Experience with Google tools and campaign optimization is a must.",
  },
];

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

export function OpeningsSection({
  badge = "Join Us",
  heading = "Current Openings",
  lead = "Explore our current opportunities and be part of building what's next at FullstackDev.",
  jobs = defaultJobs,
  emptyMessage = "No open roles right now - check back soon.",
  className,
}: OpeningsSectionProps) {
  return (
    <Section
      id="openings"
      aria-label="Current openings"
      className={cn("relative z-1", className)}
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
          <p className="text-body text-content-secondary">{lead}</p>
        </div>

        {/* Job list */}
        {jobs.length === 0 ? (
          <p className="text-center text-body text-content-secondary">
            {emptyMessage}
          </p>
        ) : (
          <div className="mx-auto flex max-w-5xl flex-col gap-md">
            {jobs.map((job, i) => {
              const meta = [
                { label: "Location", value: job.location },
                { label: "Experience", value: job.experience },
                { label: "Openings", value: String(job.openings) },
              ];

              return (
                <article
                  key={job.title}
                  style={stagger(i)}
                  className="stagger-item flex flex-col gap-lg rounded-card border border-ink-900/14 bg-linear-165 from-white/92 to-white/55 p-lg shadow-job transition duration-400 ease-smooth hover:border-trust-blue/32 hover:shadow-job-hover md:flex-row md:items-center md:justify-between rtl:bg-linear-195"
                >
                  <div>
                    <Link href={job.href}>
                      <h3 className="mb-3 text-h5 font-bold leading-tight tracking-tight text-ink-900 transition-colors hover:text-trust-blue-dark">
                        {job.title}
                      </h3>
                    </Link>

                    <ul aria-label="Role details" className="mb-3 flex flex-wrap gap-2">
                      {meta.map((item) => (
                        <li
                          key={item.label}
                          className="inline-flex items-baseline gap-1 whitespace-nowrap rounded-pill border border-ink-900/20 bg-white px-3 py-2 text-xs font-semibold leading-tight"
                        >
                          <span className="text-ink-900/45">{item.label}</span>
                          <span className="text-ink-900">{item.value}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="max-w-prose text-small leading-relaxed text-content-secondary">
                      {job.description}
                    </p>
                  </div>

                  <Link
                    href={job.href}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-button bg-primary px-6 py-3 text-small font-semibold text-background transition duration-300 ease-smooth hover:-translate-y-1 hover:shadow-md"
                  >
                    Apply
                    <ArrowRight
                      className="size-3 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

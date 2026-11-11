// apps/web/components/sections/pre-footer.tsx
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";

export interface ImpactNumber {
  value: string;
  label: string;
}

export interface PreFooterProps {
  badge?: string;
  heading?: ReactNode;
  description?: ReactNode;
  /** Replace the default button. */
  cta?: ReactNode;
  statsTitle?: string;
  stats?: ImpactNumber[];
  className?: string;
}

const defaultStats: ImpactNumber[] = [
  { value: "60%", label: "Reduction in Manual Work" },
  { value: "16/5", label: "Support Coverage" },
  { value: "110+", label: "Projects Deployments" },
  { value: "2x", label: "Team Velocity Post-Integration" },
];

export function PreFooter({
  badge = "Engineering Without Limits",
  heading = (
    <>
      Build Boldly
      <br />
      Scale Endlessly
    </>
  ),
  description = "Use fullstackdev's product engineering expertise, modern stacks, and AI acceleration to launch secure, high-performance applications and integrations - built to grow as fast as you do.",
  cta = (
    <Button variant="primary" className="text-background">
      Build with fullstackdev
      <ArrowRight className="size-icon" aria-hidden="true" />
    </Button>
  ),
  statsTitle = "Impact by the Numbers",
  stats = defaultStats,
  className,
}: PreFooterProps) {
  return (
    <section className={cn("relative z-1 px-2 py-3xl", className)}>
      <div className="container">
      <div className="mx-auto max-w-default px-md">
        <div className="grid items-stretch gap-md lg:grid-cols-12">
          {/* Left: call to action */}
          <div className="flex h-full flex-col items-start rounded-card bg-trust-blue/10 p-xl lg:col-span-5">
            <span className="mb-md inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm">
              <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                {badge}
              </span>
            </span>

            <h3 className="mb-md text-h3 font-bold tracking-tight text-primary-dark">
              {heading}
            </h3>
            <p className="mb-lg text-body text-content-secondary">{description}</p>

            <div className="mt-auto">{cta}</div>
          </div>

          {/* Right: impact numbers */}
          <div className="relative flex h-full items-center justify-center overflow-hidden rounded-card bg-linear-155 from-ink-900 via-ink-800 to-ink-700 text-white lg:col-span-7">
            {/* Decorative layers */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grid-lines bg-size-[3rem_3rem] [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)] rtl:[mask-image:radial-gradient(ellipse_at_top_left,#000,transparent_70%)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-15 -start-10 size-50 rounded-full bg-white/4"
            />

            <div className="relative w-full p-xl lg:w-10/12">
              <h4 className="mb-lg text-small font-bold uppercase tracking-kicker text-trust-blue/85">
                {statsTitle}
              </h4>

              <ul role="list" className="grid grid-cols-2 gap-lg">
                {stats.map((stat) => (
                  <li
                    key={stat.label}
                    className="border-s-2 border-trust-orange/75 ps-4 transition duration-300 hover:-translate-y-1 hover:border-trust-orange"
                  >
                    <strong className="mb-1.4 block text-h4 font-bold leading-tight tracking-tight">
                      {stat.value}
                    </strong>
                    <span className="block max-w-[14ch] text-small text-white/70">
                      {stat.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

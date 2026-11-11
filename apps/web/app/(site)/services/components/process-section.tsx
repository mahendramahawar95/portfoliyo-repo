// apps/web/components/sections/process-section.tsx
import type { ReactNode } from "react";
import { Code2, Compass, PenTool, Rocket, ChevronRight } from "lucide-react";
import { Badge, SectionHeading } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";

type Tone = "cyan" | "soft" | "navy" | "orange";

export interface ProcessStep {
  title: string;
  description: string;
  icon: ReactNode;
  tone: Tone;
}

export interface ProcessSectionProps {
  badge?: string;
  heading?: ReactNode;
  description?: ReactNode;
  /** Short paragraph on the right of the heading. */
  intro?: ReactNode;
  steps?: ProcessStep[];
  className?: string;
}

const icon = "size-5.5";

const defaultSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We start with deep discovery - understanding your business goals, users, technical constraints, and competitive landscape before writing a single line of code.",
    icon: <Compass className={icon} />,
    tone: "cyan",
  },
  {
    title: "Design",
    description:
      "We create wireframes, user flows, and high-fidelity UI designs - validating concepts early with prototypes so you see the product before it is built.",
    icon: <PenTool className={icon} />,
    tone: "soft",
  },
  {
    title: "Build",
    description:
      "Agile sprints, clean architecture, and regular demos. You are involved throughout - not just at the end. We ship fast without cutting corners.",
    icon: <Code2 className={icon} />,
    tone: "navy",
  },
  {
    title: "Launch",
    description:
      "Rigorous QA, smooth deployment, and post-launch support. We don't disappear after go-live - we stick around to ensure everything runs perfectly.",
    icon: <Rocket className={icon} />,
    tone: "orange",
  },
];

const tones: Record<
  Tone,
  { cell: string; number: string; icon: string; desc: string; decor?: string }
> = {
  cyan: {
    cell: "bg-white bg-linear-160 from-trust-blue/16 to-[rgb(236_246_252/0.95)] rtl:bg-linear-200",
    number: "text-trust-blue-dark",
    icon: "border-trust-blue/22 bg-trust-blue/14 text-trust-blue-dark",
    desc: "text-ink-900/70",
    decor:
      "absolute inset-0 bg-grid-blue bg-size-[22px_22px] opacity-45 [mask-image:radial-gradient(ellipse_70%_70%_at_100%_0%,#000_10%,transparent_70%)] rtl:[mask-image:radial-gradient(ellipse_70%_70%_at_0%_0%,#000_10%,transparent_70%)]",
  },
  soft: {
    cell: "bg-white",
    number: "text-ink-900",
    icon: "border-trust-blue/16 bg-trust-blue/10 text-trust-blue",
    desc: "text-ink-900/70",
  },
  navy: {
    cell: "bg-linear-160 from-ink-900 from-0% via-ink-750 via-55% to-[#034b66] text-white rtl:bg-linear-200",
    number: "text-trust-orange",
    icon: "border-white/12 bg-white/8 text-white",
    desc: "text-white/70",
    decor:
      "absolute -top-8 -end-8 size-30 rounded-full border border-trust-blue/25",
  },
  orange: {
    cell: "bg-white bg-linear-160 from-trust-orange/16 to-[rgb(255_244_232/0.96)] rtl:bg-linear-200",
    number: "text-ink-900",
    icon: "border-trust-orange/20 bg-trust-orange/12 text-trust-orange-dark",
    desc: "text-ink-900/70",
    decor:
      "absolute -bottom-8 -end-5 size-26 rounded-full border border-trust-orange/25",
  },
};

export function ProcessSection({
  badge = "Our Process",
  heading = "A process built for predictable delivery",
  description,
  intro = "Every project follows a proven, transparent process. No surprises - just consistent delivery from the first conversation to the final deployment.",
  steps = defaultSteps,
  className,
}: ProcessSectionProps) {
  return (
    <section className={cn("py-3xl text-ink-900", className)}>
      <div className="container">
      <div className="mx-auto max-w-default px-md">
        <div className="mb-xl grid items-end gap-md lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
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
              className="mb-0 mt-4"
            />
          </div>

          <p className="text-body text-content-secondary lg:col-span-4 lg:col-start-9">
            {intro}
          </p>
        </div>

        {/* Track: the 1px gap shows the divider lines between cells */}
        <ol
          role="list"
          className="grid animate-fade-up grid-cols-1 gap-px overflow-hidden rounded-card border border-ink-900/10 bg-ink-900/10 shadow-process sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => {
            const tone = tones[step.tone];
            const isLast = i === steps.length - 1;

            return (
              <li
                key={step.title}
                className={cn("relative flex flex-col", tone.cell)}
              >
                {/* Decorative layer, clipped to the cell */}
                {tone.decor && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <span className={tone.decor} />
                  </span>
                )}

                {/* Arrow badge between cells (large screens only) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none -translate-y-1/2 absolute p-2 top-1/2 -right-5 z-10 hidden size-8.4  rounded-full border border-white bg-trust-blue shadow-connector lg:grid"
                  >
                    <ChevronRight className="size-4 text-white rtl:-scale-x-100" />
                  </span>
                )}

                <div className="relative  p-md flex h-full flex-col ">
                  <div className="mb-3.4 flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "font-display text-h4 font-bold leading-none tracking-tight",
                        tone.number,
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex p-2 size-9.4 shrink-0 items-center justify-center rounded-[0.65rem] border",
                        tone.icon,
                      )}
                    >
                      {step.icon}
                    </span>
                  </div>

                  <h3 className="mb-2 mt-2 text-h5 font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className={cn("text-small leading-relaxed", tone.desc)}>
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      </div>
    </section>
  );
}

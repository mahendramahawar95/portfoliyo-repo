// apps/web/components/sections/how-we-work.tsx
import type { ReactNode } from "react";
import { Badge, Section, SectionHeading } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";
import Image from "next/image";

export interface WorkStep {
  title: string;
  description: string;
}

export interface HowWeWorkProps {
  badge?: string;
  heading?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  steps?: WorkStep[];
  image?: { src: string; alt: string };
  className?: string;
}

const defaultSteps: WorkStep[] = [
  {
    title: "Clear Problem Understanding",
    description:
      "We start with clarity - business goals, users, and constraints - before execution.",
  },
  {
    title: "Design-Driven Thinking",
    description:
      "Every solution is shaped around usability, flow, and real-world user behavior.",
  },
  {
    title: "Clean, Scalable Engineering",
    description:
      "Maintainable, future-ready codebases built to scale with your business.",
  },
  {
    title: "AI-Powered Workflows",
    description:
      "AI accelerates research, development, and iteration - without compromising quality.",
  },
  {
    title: "Human-Led Decisions",
    description:
      "Architecture, design, and quality are always guided by experienced hands.",
  },
  {
    title: "Collaborative & Transparent",
    description:
      "Clear communication, visibility, regular updates, and full ownership from start to finish.",
  },
];

const defaultImage = {
  src: "/mahee.png",
  alt: "Our team approach",
};

interface StepColumnProps {
  steps: WorkStep[];
  /** Number of steps before this column, so numbering continues. */
  offset: number;
  /** Puts the number next to the center image on large screens. */
  mirrored?: boolean;
  delay?: number;
}

function StepColumn({ steps, offset, mirrored, delay = 0 }: StepColumnProps) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="flex animate-fade-up flex-col gap-xl mb-14"
    >
      {steps.map((step, i) => (
        <article
          key={step.title}
          className={cn("flex gap-4 not-last:border-b not-last:border-white/10 not-last:pb-lg ", mirrored && "lg:flex-row-reverse lg:text-end")}
        >
          <span className="pt-0.6 font-display text-small font-semibold leading-snug tracking-wider text-trust-blue/85">
            {String(offset + i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="mb-2 text-body-lg font-semibold leading-snug tracking-tight text-white">
              {step.title}
            </h3>
            <p className="max-w-[28ch] text-small leading-relaxed text-white/58">
              {step.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function HowWeWork({
  badge = "Our process",
  heading = "How we build at fullstackdev",
  description = "Powered by AI. Refined by human insight and strong engineering..",
  actions,
  steps = defaultSteps,
  image = defaultImage,
  className,
}: HowWeWorkProps) {
  const half = Math.ceil(steps.length / 2);

  return (
    <Section
      className={cn(
        "relative isolate overflow-hidden bg-section-workflow pb-3xl pt-3xl text-white md:pb-0",
        className,
      )}
    >
        <div className="container">
      <div className="mx-auto max-w-default px-md">
        <div className="mb-2xl text-center">
          <Badge className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-widest text-ice/70">
              {badge}
            </span>
          </Badge>

          <SectionHeading
            align="center"
            descClass="text-center text-lg"
            heading={heading}
            description={description}
            headingClass="m-0 font-bold tracking-tight text-white"
            className="mb-4 mt-4"
          />

          {actions && (
            <div className="mt-sm flex flex-wrap items-center gap-sm">{actions}</div>
          )}
        </div>

        <div className="mx-auto grid gap-xl lg:w-11/12 lg:grid-cols-3 lg:items-end">
          <StepColumn steps={steps.slice(0, half)} offset={0} mirrored />

          {/* Center visual: hidden below lg */}
          <div className="relative hidden animate-fade-up place-items-center text-center lg:grid">
            <span
              aria-hidden="true"
              className="absolute size-[85%] -bottom-1 animate-glow rounded-full border border-trust-blue/20 bg-trust-blue/5"
            />
            {/* Plain img: swap for next/image if you configure the image source */}
            <Image
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={1000}
              height={1000}
              className="relative h-auto w-full max-w-full"
            />
          </div>

          <StepColumn steps={steps.slice(half)} offset={half} delay={40} />
        </div>
      </div>
      </div>
    </Section>
  );
}

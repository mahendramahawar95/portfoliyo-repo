// apps/web/components/sections/about-content.tsx
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@repo/ui/lib/cn";
import { Section } from "@repo/ui";
import Image from "next/image";

type Tone = "navy" | "cyan" | "orange";

export interface AboutMetric {
  label: string;
  value: string;
  description: string;
  tone: Tone;
}

export interface AboutContentProps {
  badge?: string;
  heading?: ReactNode;
  lede?: ReactNode;
  image?: { src: string; alt: string };
  overlayText?: ReactNode;
  paragraphs?: string[];
  /** The first metric is the large card, the rest stack beside it. */
  metrics?: AboutMetric[];
  className?: string;
}

const defaultParagraphs = [
  "By blending thoughtful design, clean full-stack development, and AI-enhanced workflows, we deliver with speed and precision - from the first prototype to post-launch growth.",
  "Whether it's a web app, mobile experience, or a smart digital interface, we think alongside you and build for what's next.",
];

const defaultMetrics: AboutMetric[] = [
  {
    label: "Products",
    value: "110+",
    description: "Digital products launched across industries",
    tone: "navy",
  },
  {
    label: "Experience",
    value: "10+",
    description: "Years of design-led development",
    tone: "cyan",
  },
  {
    label: "Partners",
    value: "70+",
    description: "Customers served worldwide",
    tone: "orange",
  },
];

/** Tone styles: card colors plus the decorative shapes drawn inside it. */
const tones: Record<
  Tone,
  { card: string; label: string; text: string; decor: string[] }
> = {
  navy: {
    card: "border-white/8 bg-linear-160 from-ink-900 via-ink-800 to-ink-700 text-white inset-shadow-2xs inset-shadow-white/8 rtl:bg-linear-200",
    label: "text-trust-blue/90",
    text: "text-white/70",
    decor: ["-top-9 -end-9 size-36 rounded-full border border-trust-blue/28"],
  },
  cyan: {
    card: "border-ink-900/10 bg-linear-160 from-trust-blue/14 to-white/90 text-ink-900 rtl:bg-linear-200",
    label: "text-trust-blue-dark",
    text: "text-ink-900/70",
    decor: [
      "inset-y-0 end-[18%] w-px bg-linear-180 from-transparent via-trust-blue/22 to-transparent",
    ],
  },
  orange: {
    card: "border-ink-900/10 bg-linear-160 from-trust-orange/16 to-white/92 text-ink-900 rtl:bg-linear-200",
    label: "text-trust-orange-dark",
    text: "text-ink-900/70",
    decor: [
      "-bottom-10 -end-6 size-30 rounded-full border border-trust-orange/28",
      "-bottom-4 end-1.4 size-16 rounded-full border border-trust-orange/16",
    ],
  },
};

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

function MetricCard({ metric, index }: { metric: AboutMetric; index: number }) {
  const tone = tones[metric.tone];

  return (
    <div
      role="listitem"
      style={stagger(index)}
      className={cn(
        "stagger-item relative flex flex-col justify-end gap-1.8 overflow-hidden rounded-card border p-lg transition duration-350 ease-smooth hover:-translate-y-1 hover:shadow-lg",
        tone.card,
      )}
    >
      {tone.decor.map((shape) => (
        <span
          key={shape}
          aria-hidden="true"
          className={cn("pointer-events-none absolute", shape)}
        />
      ))}

      <span
        className={cn(
          "relative z-1 text-kicker font-bold uppercase tracking-kicker",
          tone.label,
        )}
      >
        {metric.label}
      </span>
      <p className="relative z-1 font-display text-metric font-semibold leading-[0.95] tracking-tighter">
        {metric.value}
      </p>
      <p className={cn("relative z-1 text-small", tone.text)}>
        {metric.description}
      </p>
    </div>
  );
}

export function AboutContent({
  badge = "Who we are",
  heading = (
    <>
      We build digital products that{" "}
      <em className="not-italic text-primary">matter</em>
    </>
  ),
  lede = "From concept to launch, we craft experiences that fuel growth, spark innovation, and create impact.",
  image = {
    src: "/work.png",
    alt: "Our team collaborating",
  },
  overlayText = "At fullstackdev, we help ambitious startups and modern enterprises turn bold ideas into smart, scalable digital products.",
  paragraphs = defaultParagraphs,
  metrics = defaultMetrics,
  className,
}: AboutContentProps) {
  const [featured, ...rest] = metrics;

  return (
    <Section id="about-content" className={cn("relative z-1 py-3xl", className)}>
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-xl  animate-fade-up text-center">
          <span className="mb-md inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm">
            <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              {badge}
            </span>
          </span>
          <h2 className="mb-md text-h2 font-bold tracking-tight text-primary-dark">
            {heading}
          </h2>
          <p className="text-body text-content-secondary">{lede}</p>
        </div>

        <div className="mx-auto grid items-stretch gap-lg lg:w-11/12 lg:grid-cols-12">
          {/* Image with overlay text */}
          <div className="relative min-h-80 animate-fade-up overflow-hidden rounded-card lg:col-span-5 lg:min-h-0">
            {/* Plain img: swap for next/image once the image source is final */}
            <Image
              src={image.src}
              alt={image.alt}
              loading="lazy"
              height={500}
              width={500}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-900/90 via-ink-900/60 to-transparent p-lg pt-2xl">
              <p className="text-body text-white">{overlayText}</p>
            </div>
          </div>

          {/* Intro and metrics */}
          <div className="flex animate-fade-up flex-col justify-between gap-lg [animation-delay:60ms] lg:col-span-7">
            <div className="space-y-md text-body text-content-secondary stagger-item relative flex flex-col bg-white justify-end gap-1.8 overflow-hidden rounded-card border-border p-lg transition duration-350 ease-smooth hover:-translate-y-1 hover:shadow-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {featured && (
              <div role="list" className="grid gap-sm sm:grid-cols-2">
                <MetricCard metric={featured} index={0} />
                <div className="grid gap-sm">
                  {rest.map((metric, i) => (
                    <MetricCard key={metric.label} metric={metric} index={i + 1} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

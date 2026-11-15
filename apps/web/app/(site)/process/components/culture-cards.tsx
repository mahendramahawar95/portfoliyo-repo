// apps/web/components/sections/culture-cards.tsx
import type { CSSProperties, ReactNode } from "react";
import { Clock, Crosshair, Sparkles, Sprout } from "lucide-react";
import { cn } from "@repo/ui/lib/cn";
import { Section } from "@repo/ui";

type Tone = "navy" | "mist" | "cyan" | "orange";

export interface CultureValue {
  title: string;
  text: string;
  icon: ReactNode;
  tone: Tone;
}

export interface CultureCardsProps {
  values?: CultureValue[];
  className?: string;
}

const icon = "size-7";

const defaultValues: CultureValue[] = [
  {
    title: "Move with intent",
    text: "Speed is our strength, precision is our standard. Every move is intentional, every sprint matters.",
    icon: <Clock className={icon} strokeWidth={1.6} />,
    tone: "navy",
  },
  {
    title: "Obsess over craft",
    text: "We sweat the details no one sees - because those are the ones everyone feels.",
    icon: <Sparkles className={icon} strokeWidth={1.6} />,
    tone: "mist",
  },
  {
    title: "Own it fully",
    text: "When something ships, everyone's name is on it. When something breaks, no one points fingers.",
    icon: <Crosshair className={icon} strokeWidth={1.6} />,
    tone: "cyan",
  },
  {
    title: "Grow in the open",
    text: "We call things out, lift each other up, and never waste a good mistake.",
    icon: <Sprout className={icon} strokeWidth={1.6} />,
    tone: "orange",
  },
];

const tones: Record<Tone, { card: string; icon: string; text: string }> = {
  navy: {
    card: "border-white/18 bg-linear-160 from-ink-900 via-ink-800 to-ink-700 text-white rtl:bg-linear-200",
    icon: "bg-trust-blue/18 text-trust-blue",
    text: "text-white/75",
  },
  mist: {
    card: "border-ink-900/14 bg-linear-165 from-ink-900/5 via-white/78 via-55% to-white/55 text-ink-900 rtl:bg-linear-195",
    icon: "bg-ink-900/6 text-ink-900",
    text: "text-ink-900/70",
  },
  cyan: {
    card: "border-trust-blue/22 bg-linear-160 from-trust-blue/14 via-white/85 via-55% to-white/90 text-ink-900 rtl:bg-linear-200",
    icon: "bg-trust-blue/14 text-trust-blue-dark",
    text: "text-ink-900/70",
  },
  orange: {
    card: "border-trust-orange/22 bg-linear-145 from-trust-orange/12 via-trust-orange/5 via-45% to-white/82 text-ink-900 rtl:bg-linear-215",
    icon: "bg-trust-orange/14 text-trust-orange-dark",
    text: "text-ink-900/70",
  },
};

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

export function CultureCards({
  values = defaultValues,
  className,
}: CultureCardsProps) {
  return (
    <Section
      aria-label="Our culture"
      className={cn("relative z-1", className)}
    >
      <div className="container">
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const tone = tones[value.tone];

            return (
              <article
                key={value.title}
                style={stagger(i)}
                className={cn(
                  "stagger-item relative flex flex-col gap-xs overflow-hidden rounded-card border p-lg shadow-culture-card transition-[translate,box-shadow] duration-400 ease-smooth hover:-translate-y-1 hover:shadow-lg",
                  "before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:origin-left before:scale-x-0 before:bg-linear-to-r before:from-trust-blue before:to-trust-orange before:transition-transform before:duration-500 before:ease-smooth hover:before:scale-x-100 rtl:before:origin-right",
                  tone.card,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mb-1 inline-flex size-11 items-center justify-center rounded-sm",
                    tone.icon,
                  )}
                >
                  {value.icon}
                </span>
                <h5 className="text-h5 font-bold leading-tight tracking-tight">
                  {value.title}
                </h5>
                <p className={cn("text-small leading-relaxed", tone.text)}>
                  {value.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

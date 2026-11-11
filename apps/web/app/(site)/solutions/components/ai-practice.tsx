// apps/web/components/sections/ai-practice.tsx
import type { CSSProperties, ReactNode } from "react";
import { Badge, Section, SectionHeading } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";

type Tone = "cyan" | "orange" | "navy";

export interface AiPracticeItem {
  tag: string;
  title: string;
  description: string;
  tone: Tone;
}

export interface AiPracticeProps {
  badge?: string;
  heading?: ReactNode;
  intro?: ReactNode;
  items?: AiPracticeItem[];
  className?: string;
}

const defaultItems: AiPracticeItem[] = [
  {
    tag: "Ops",
    title: "Approvals that move without chasing people",
    description:
      "Automated routing across CRM, finance, and internal tools - with clear escalation when something breaks the pattern.",
    tone: "cyan",
  },
  {
    tag: "Product",
    title: "Features that feel smart, not noisy",
    description:
      "Assistants, recommendations, and content tools grounded in your data - designed into the product, not glued on as a chat widget.",
    tone: "orange",
  },
  {
    tag: "Engineering",
    title: "Delivery that ships faster without debt",
    description:
      "AI-assisted coding, test generation, and review pipelines - with humans owning architecture and release quality.",
    tone: "navy",
  },
];

const tagColors: Record<Tone, string> = {
  cyan: "text-tag-cyan",
  orange: "text-trust-orange",
  navy: "text-tag-navy",
};

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

export function AiPractice({
  badge = "AI in Practice",
  heading = "Where AI shows up in real work",
  intro = "Not a demo reel - the places AI quietly removes friction for operations, product, and engineering teams.",
  items = defaultItems,
  className,
}: AiPracticeProps) {
  return (
    <Section
      aria-label="Where AI shows up"
      className={cn("relative z-1 py-3xl text-ice", className)}
    >
      <div className="container">
      <div className="mx-auto max-w-default px-md">
        <div className="mb-xl grid animate-fade-up items-end gap-md lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Badge className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-ice/70">
                {badge}
              </span>
            </Badge>

            <SectionHeading
              align="left"
              heading={heading}
              headingClass="m-0 font-bold tracking-tight text-white"
              className="mb-0 mt-4"
            />
          </div>

          <p className="text-body text-ice/70 lg:col-span-4 lg:col-start-9">
            {intro}
          </p>
        </div>

        {/* Rail: stacked on phones, three columns from md */}
        <div className="grid overflow-hidden rounded-card border border-trust-blue/20 bg-ink-900/35 md:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={item.title}
              style={stagger(i)}
              className="stagger-item border-sky-glow/16 px-lg py-xl transition-colors duration-300 hover:bg-white/3 max-md:not-last:border-b md:not-last:border-e"
            >
              <span
                className={cn(
                  "mb-3 inline-block text-kicker font-bold uppercase tracking-widest",
                  tagColors[item.tone],
                )}
              >
                {item.tag}
              </span>
              <h3 className="mb-2.2 text-body-lg font-semibold leading-snug tracking-tight text-white">
                {item.title}
              </h3>
              <p className="text-small leading-relaxed text-ice/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
      </div>
    </Section>
  );
}

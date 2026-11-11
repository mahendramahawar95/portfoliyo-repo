// apps/web/components/sections/ai-section.tsx
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Badge, Button, SectionHeading } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";

export interface AiSignal {
  label: string;
  value: string;
  sub: string;
  /** Position inside the stage, for example "top-[8%] start-[4%]". */
  position: string;
}

export interface AiCapability {
  label: string;
  href: string;
}

export interface AiSectionProps {
  badge?: string;
  heading?: ReactNode;
  description?: ReactNode;
  /** Replace the default buttons. */
  actions?: ReactNode;
  signals?: AiSignal[];
  capabilities?: AiCapability[];
  className?: string;
}

const defaultSignals: AiSignal[] = [
  { label: "Automation", value: "+38%", sub: "Cycle time gain", position: "top-[8%] start-[4%]" },
  { label: "Model Health", value: "Stable", sub: "Drift in range", position: "top-[40%] end-0" },
  { label: "Delivery", value: "Live", sub: "Ship → Measure", position: "bottom-[6%] start-[14%]" },
];

const defaultCapabilities: AiCapability[] = [
  { label: "Process Automation", href: "/ai/process-automation" },
  { label: "Predictive Analytics", href: "/ai/predictive-analytics" },
  { label: "AI Driven Development", href: "/ai/ai-driven-development" },
  { label: "Generative AI", href: "/ai/generative-ai" },
  { label: "AI-Embedded Products", href: "/ai/ai-embedded-products" },
  { label: "RPA Workflows", href: "/ai/rpa-workflows" },
];

const defaultActions = (
  <>
    <Button variant="primary" className="text-background">
      Start a Project
      <ArrowRight className="size-icon" aria-hidden="true" />
    </Button>
    <Button variant="primary" className="text-background">
      View our services
      <ArrowRight className="size-icon" aria-hidden="true" />
    </Button>
  </>
);

export function AiSection({
  badge = "Digital Product Studio",
  heading = "Building Digital Products That Scale With Your Business.",
  description = "fullstackdev helps forward-thinking startups and businesses bring ideas to life through intelligent, high-performance digital solutions - combining smart development, automation, and clean design.",
  actions = defaultActions,
  signals = defaultSignals,
  capabilities = defaultCapabilities,
  className,
}: AiSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-linear-155 from-ink-900 from-0% via-ink-850 via-42% to-ink-750 py-ai-section text-ice",
        className,
      )}
    >
        <div className="container">
      <div className="mx-auto max-w-default px-md">
        <div className="grid grid-cols-1 items-center gap-lg lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          {/* Left column */}
          <div>
            <Badge className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-ice/70">
                {badge}
              </span>
            </Badge>

            <SectionHeading
              align="left"
              descClass="text-left text-ice/75"
              heading={heading}
              description={description}
              headingClass="m-0 font-bold tracking-tight text-white"
              className="mb-4 mt-4"
            />

            <div className="mt-sm flex flex-wrap items-center gap-sm">{actions}</div>
          </div>

          {/* Right column: decorative AI stage */}
          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
            {/* Core orb with two rotating rings */}
            <div className="absolute inset-0 m-auto size-[34%] rounded-full border border-sky-glow/30 bg-radial-[at_30%_25%] from-trust-blue/55 via-ink-750 to-ink-900 shadow-orb">
              <span className="absolute inset-[-30%] animate-orbit rounded-full border border-sky-glow/25 [--orbit-duration:18s] before:absolute before:left-0 before:top-1/2 before:size-2.2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-trust-blue before:shadow-dot-blue before:h-3 before:w-3" />
              <span className="absolute inset-[-70%] animate-orbit rounded-full border border-dashed border-primary/20 [--orbit-duration:26s] [animation-direction:reverse] before:absolute before:left-0 before:top-1/2 before:size-2.2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-trust-blue before:shadow-dot-blue after:absolute after:right-0 after:top-1/2 after:size-2.2 after:-translate-y-1/2 after:translate-x-1/2 after:rounded-full after:bg-trust-orange after:shadow-dot-orange before:h-3 before:w-3 after:h-3 after:w-3" />
              <span className="relative grid size-full animate-glow place-items-center text-h3 font-bold text-white">
                AI
              </span>
            </div>

            {/* Floating signal cards */}
            {signals.map((signal, i) => (
              <div
                key={signal.label}
                style={{ animationDelay: `${-i * 1.8}s` }}
                className={cn(
                  "absolute flex min-w-30 p-4 animate-float flex-col gap-0.4 rounded-cap border border-sky-glow/22 bg-ink-950/72 px-3.4 py-2.8 shadow-signal backdrop-blur-[10px]",
                  signal.position,
                )}
              >
                <span className="text-kicker font-bold uppercase tracking-kicker text-sky-glow">
                  {signal.label}
                </span>
                <strong className="text-h5 font-bold leading-tight text-white">
                  {signal.value}
                </strong>
                <span className="text-xs text-ice/60">{signal.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <ul
          role="list"
          className="mt-7 grid  gap-4 grid-cols-2 gap-2.2 border-t border-sky-glow/14 pt-5.4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {capabilities.map((cap, i) => (
            <li key={cap.label} className="mt-8"> 
              <a
                href={cap.href}
                className="flex h-full p-4  flex-col gap-1.5 rounded-cap border border-sky-glow/14 bg-white/3.5 px-3.8 py-3.2 text-ice no-underline transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-sky-glow/35 hover:bg-white/8 hover:shadow-lg"
              >
                <span className="text-xs font-bold tabular-nums text-trust-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-small font-medium">{cap.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}

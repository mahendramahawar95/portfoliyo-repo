// apps/web/components/sections/ai-section.tsx
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Badge, Button, Section, SectionHeading } from "@repo/ui";
import { cn } from "@repo/ui/lib/cn";
import AiOrbitSection from "../../../../components/shared/ai-section/ai-orbit";

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
     Explore AI @ Apoxeo
      <ArrowRight className="size-icon" aria-hidden="true" />
    </Button>
    <Button variant="primary" className="text-background">
      Talk to an engineer 
      <ArrowRight className="size-icon" aria-hidden="true" />
    </Button>
  </>
);

export function AiSection({
  badge = "AI Capabilities",
  heading = (<div className="dot-after">Intelligence that <span className="text-secondary">compounds</span>  with every release</div>),
  description = "fullstackdev helps forward-thinking startups and businesses bring ideas to life through intelligent, high-performance digital solutions - combining smart development, automation, and clean design.",
  actions = defaultActions,
 
  capabilities = defaultCapabilities,
  className,
}: AiSectionProps) {
  return (
    <Section
      className={cn(
        "relative overflow-hidden bg-linear-155 from-ink-900 from-0% via-ink-850 via-42% to-ink-750 py-ai-section text-ice",
        className,
      )}
    >
        <div className="container">
      <div className="mx-auto max-w-default">
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
          {/* Visual */}
          <div >
          <AiOrbitSection className="max-w-100 "/>
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
    </Section>
  );
}

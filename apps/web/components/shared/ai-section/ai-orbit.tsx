import type { ReactNode } from "react";
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


const defaultSignals: AiSignal[] = [
  { label: "Automation", value: "+38%", sub: "Cycle time gain", position: "top-[8%] start-[4%]" },
  { label: "Model Health", value: "Stable", sub: "Drift in range", position: "top-[40%] end-0" },
  { label: "Delivery", value: "Live", sub: "Ship → Measure", position: "bottom-[6%] start-[14%]" },
];

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
export default function AiOrbitSection({ signals = defaultSignals, className }: AiSectionProps){
    return(

        <div aria-hidden="true" className={cn("relative mx-auto aspect-square w-full", className)}>
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
    )
}
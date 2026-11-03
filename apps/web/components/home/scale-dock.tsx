// apps/web/components/scale-dock.tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "../../../../packages/ui/src/components/section-heading/section-heading";
import { Badge } from "../../../../packages/ui/src/components/badge/badge";
import { Section } from "../../../../packages/ui/src/components/section/section";

type Tone = "design" | "growth" | "ai";

interface DockPanel {
  index: string;
  title: string;
  kicker: string;
  heading: string;
  text: string;
  href: string;
  tone: Tone;
}

// Only "Design" comes from your markup. Replace the other two with real content.
const panels: DockPanel[] = [
  {
    index: "01",
    title: "Design",
    kicker: "Human-led",
    heading: "Human-Centered Design",
    text: "Complex requirements translated into intuitive digital experiences people adopt quickly, and keep using.",
    href: "https://Fullstack.com/services/",
    tone: "design",
  },
  {
    index: "02",
    title: "Growth",
    kicker: "Built to scale",
    heading: "Engineering That Scales",
    text: "Clean full-stack architecture, automated delivery and performance budgets so your product grows without rewrites.",
    href: "https://Fullstack.com/services/",
    tone: "growth",
  },
  {
    index: "03",
    title: "AI",
    kicker: "Applied AI",
    heading: "AI Where It Earns Its Keep",
    text: "Data intelligence woven into the product where it measurably helps, not sprinkled on as a buzzword.",
    href: "https://Fullstack.com/services/",
    tone: "ai",
  },
];

const tones: Record<Tone, { panel: string; kicker: string; spine: string }> = {
  design: {
    panel:
      "bg-linear-160 from-ink-900 from-0% via-[#023548] via-55% to-[#034b66] text-white rtl:bg-linear-200",
    kicker: "text-trust-blue/90",
    spine: "text-white/70",
  },
  growth: {
    panel:
      "bg-linear-160 from-trust-blue/14 to-[rgb(236_246_252/0.85)] text-ink-900 rtl:bg-linear-200",
    kicker: "text-trust-blue-dark",
    spine: "text-ink-900/60",
  },
  ai: {
    panel:
      "bg-linear-160 from-trust-orange/16 to-[rgb(255_244_232/0.9)] text-ink-900 rtl:bg-linear-200",
    kicker: "text-trust-orange-dark",
    spine: "text-ink-900/60",
  },
};

export function ScaleDock() {
  const [active, setActive] = useState(0); // set by click
  const [hovered, setHovered] = useState<number | null>(null); // set by hover/focus
  const open = hovered ?? active;

  return (
    <Section className="bg-section-first py-3xl">
      <div className="container">
        <div className="text-center">
          <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ">
            <span
              className="size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              Product Engineering
            </span>
          </Badge>
          <SectionHeading
            align="center"
            descClass=""
            heading="Digital products engineered to scale."
            description="From concept to launch and beyond, Fullstack combines design, engineering, and AI to build fast, reliable, and future-ready software."
            headingClass="mb-4 mt-4 font-bold tracking-tight text-primary-dark max-w-[738px]"
            className="mb-3xl"
          />
        </div>
        <div className="mx-auto max-w-default px-md">
          <div
            role="list"
            onMouseLeave={() => setHovered(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setHovered(null);
            }}
            className="flex flex-col gap-3 md:flex-row md:gap-4"
          >
            {panels.map((panel, i) => {
              const isOpen = open === i;
              const tone = tones[panel.tone];

              return (
                <article
                  key={panel.title}
                  role="listitem"
                  tabIndex={0}
                  data-open={isOpen}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (
                      e.target === e.currentTarget &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  style={{ animationDelay: `${i * 120}ms` }}
                  className={`relative flex min-h-72 animate-fade-up cursor-pointer overflow-hidden rounded-panel border border-ink-900/10 transition-[flex,border-color,box-shadow] duration-550 ease-smooth md:min-h-104 md:min-w-18 md:flex-[0.72] md:data-[open=true]:flex-[3.1] ${
                    active === i ? "md:shadow-lg" : ""
                  } ${tone.panel}`}
                >
                  {/* Spine: always visible on desktop */}
                  <div
                    aria-hidden="true"
                    className="hidden w-18 shrink-0 flex-col items-center justify-between py-6 md:flex"
                  >
                    <span
                      className={`text-xs font-bold tabular-nums ${tone.spine}`}
                    >
                      {panel.index}
                    </span>
                    <span
                      className={`text-small font-semibold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 rtl:rotate-0 ${tone.spine}`}
                    >
                      {panel.title}
                    </span>
                  </div>

                  {/* Body: fades in when open (always visible on mobile) */}
                  <div
                    className={`flex min-w-72 flex-1 flex-col justify-end gap-sm p-panel transition-opacity duration-300 md:min-w-88 md:ps-2 ${
                      isOpen
                        ? "opacity-100 md:delay-200"
                        : "md:pointer-events-none md:opacity-0"
                    }`}
                  >
                    <span
                      className={`text-kicker font-bold uppercase tracking-kicker ${tone.kicker}`}
                    >
                      {panel.kicker}
                    </span>
                    <h3 className="text-h4 font-semibold tracking-tight">
                      {panel.heading}
                    </h3>
                    <p className="max-w-[44ch] text-small opacity-80">
                      {panel.text}
                    </p>
                    <a
                      href={panel.href}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={(e) => e.stopPropagation()}
                      className="group mt-xs inline-flex items-center gap-2 text-small font-semibold"
                    >
                      Learn more
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

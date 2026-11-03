// apps/web/components.tsx
"use client";

import { useId, useState } from "react";
import { SectionHeading } from "../../../../packages/ui/src/components/section-heading/section-heading";
import { Badge } from "../../../../packages/ui/src/components/badge/badge";
import { Section } from "../../../../packages/ui/src/components/section/section";
import { ArrowRight } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

// Only the first item comes from your markup. Replace the rest with real answers.
const defaultFaqs: FaqItem[] = [
  {
    question: "What services does Fullstack offer?",
    answer:
      "We design and engineer digital products end to end: UI/UX, AI-powered web and mobile apps, cloud engineering, SaaS platforms, and product strategy. Engagements can cover a single capability or the full build.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused first release usually takes 8 to 12 weeks. Larger platforms are planned in phases, so you ship something useful early and keep improving it.",
  },
  {
    question: "Can you work with our existing team and codebase?",
    answer:
      "Yes. We can embed with your team, take over a legacy stack in stages, or build alongside you with clear ownership and regular demos.",
  },
  {
    question: "How do you handle security and compliance?",
    answer:
      "Secure workflows, access controls, and automated checks are built in from day one, not added at the end. We can align with your industry's compliance requirements.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer monitoring, maintenance, and growth support, including performance tuning and new features, on a retainer or as needed.",
  },
];

export function Faq({ items = defaultFaqs }: { items?: FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

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
              Faq
            </span>
          </Badge>
          <SectionHeading
            align="center"
            descClass=""
            heading="Questions we hear often."
            description="Straight answers on how we partner, build, and ship - so you know what working with Fullstack looks like."
            headingClass="mb-4 mt-4 font-bold tracking-tight text-primary-dark max-w-[738px]"
            className="mb-3xl"
          />
        </div>
        <div className="">
          <div className=" flex flex-col gap-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              const buttonId = `${baseId}-button-${i}`;
              const panelId = `${baseId}-panel-${i}`;

              return (
                <div
                  key={item.question}
                  data-open={isOpen}
                  style={{ animationDelay: `${i * 100}ms` }}
                  className="group relative animate-fade-up overflow-hidden rounded-[1.15rem] border border-ink-900/10 bg-linear-135 from-white/78 to-[rgb(236_246_252/0.55)] inset-shadow-2xs inset-shadow-white/65 transition-[border-color,box-shadow] duration-300 data-[open=true]:border-trust-blue/35 hover:border-trust-blue/35 data-[open=true]:bg-linear-145 data-[open=true]:from-white/92 data-[open=true]:to-[rgb(227_244_252/0.85)] data-[open=true]:shadow-[0_14px_32px_rgb(3_167_255/0.08)] data-[open=true]:inset-shadow-white/90"
                >
                  {/* Accent bar */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[18%] inset-s-0 w-0.75 rounded-e-[3px] bg-linear-180 from-trust-blue to-trust-blue-dark opacity-0 transition-[top,bottom,opacity] duration-300 group-data-[open=true]:inset-y-[12%] group-data-[open=true]:opacity-100"
                  />

                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-start"
                    >
                      <span
                        aria-hidden="true"
                        className="group-hover:border-trust-blue/35 inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-[0.7rem] border border-ink-900/8 px-1.8 text-sm font-bold tracking-widest font-[Manrope,Arial,Helvetica,sans-serif] transition-colors duration-250 group-data-[open=true]:border-trust-blue/28 group-data-[open=true]:bg-trust-blue/12 group-data-[open=true]:text-trust-blue-dark"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h6 className="flex-1 text-h6 font-semibold text-foreground">
                        {item.question}
                      </h6>

                      {/* Plus turns into minus */}
                      <span
                        aria-hidden="true"
                        className="relative group-hover:border-trust-blue/35 size-sm min-h-8 min-w-8 shrink-0 rounded-full border border-ink-900/14 bg-white/75 text-ink-900 transition-colors duration-300 before:absolute before:inset-0 before:m-auto before:h-0.5 before:w-3.5 before:rounded-full before:bg-current after:absolute after:inset-0 after:m-auto after:h-0.5 after:w-3.5 after:rotate-90 after:rounded-full after:bg-current after:transition-transform after:duration-350 after:ease-smooth group-data-[open=true]:border-ink-900 group-data-[open=true]:bg-ink-900 group-data-[open=true]:text-white group-data-[open=true]:after:rotate-0"
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-350 ease-smooth ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div
                      className={`min-h-0 overflow-hidden transition-[visibility] duration-350 ${
                        isOpen ? "visible" : "invisible"
                      }`}
                    >
                      <p className="  pl-19 pb-5 text-small leading-relaxed text-foreground/75 sm:ps-18.4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-small font-semibold text-trust-blue"
          >
            Still have a question?
            <ArrowRight className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </a>
        </div>
      </div>
    </Section>
  );
}

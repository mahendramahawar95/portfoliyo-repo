import { Badge, Section, SectionHeading } from "@repo/ui";

// trust-section.tsx
const panel =
  "relative flex flex-col overflow-hidden rounded-panel border animate-fade-up";
const kicker = "block text-kicker font-bold uppercase tracking-kicker";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-4 shrink-0 transition-transform rtl:-scale-x-100 ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const methods = [
  "Agile delivery with clear ownership",
  "DevOps & CI/CD from day one",
  "Data security & access controls",
  "Live performance monitoring",
];

export function TrustSection() {
  return (
    <Section
      id="testimonial"
      className="bg-section-first overflow-hidden py-3xl"
    >
      <div className="container">
        <div className="text-center">
          <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ">
            <span
              className="size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              How we deliver
            </span>
          </Badge>
          <SectionHeading
            align="center"
            descClass=""
            heading="Engineering that holds up when the business scales."
            description="We build digital products that are secure, scalable, and maintainable, so your business can grow without limits."
            headingClass="mb-4 mt-4 font-bold tracking-tight text-primary-dark max-w-[738px]"
            className="mb-0"
          />
        </div>
        <div className="mx-auto mt-3xl grid max-w-default gap-lg px-md grid-cols-1 lg:grid-cols-2">
          {/* Column 1: Practice */}
          <div
            className={`${panel} relative flex flex-col justify-between border-trust-blue/16 bg-linear-165 from-trust-blue/10 via-trust-blue/3.5 via-42% to-white/55 p-panel-lg [animation-delay:0ms] rtl:bg-linear-195`}
          >
            <div className="flex flex-col gap-sm">
              <span className={`${kicker} text-trust-blue-dark`}>Practice</span>
              <h3 className="text-h4 font-semibold tracking-tight text-foreground">
                Enterprise-grade delivery, without the ceremony
              </h3>
              <p className="text-small text-content-secondary">
                Secure workflows, performance budgets, governance, and
                automation are built into every engagement, not bolted on at the
                end.
              </p>
              <ol className="mt-xs divide-y divide-trust-blue/15">
                {methods.map((text, i) => (
                  <li key={text} className="flex items-center gap-3 py-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-trust-blue/10 text-xs font-bold tabular-nums text-trust-blue-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-small font-medium text-foreground">
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-small font-semibold text-primary-darkß"
            >
              Explore our process
              <Arrow className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </div>
          <div className="grid gap-lg">
            {/* Column 2: Outcome */}
            <div
              className={`${panel} justify-between gap-md border-trust-orange/18 bg-linear-145 from-trust-orange/14 via-accent/5 via-55% to-white/70 p-panel [animation-delay:120ms] rtl:bg-linear-215`}
            >
              <div className="flex flex-col gap-sm">
                <span className={`${kicker} text-trust-orange-dark`}>
                  Outcome
                </span>
                <h3 className="text-h4 font-semibold tracking-tight text-foreground">
                  Legacy{" "}
                  <span className="inline-block rtl:-scale-x-100">→</span>{" "}
                  modern in months
                </h3>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-pill bg-white/70 px-3 py-1 text-xs font-semibold text-content-secondary">
                    Legacy
                  </span>
                  <div className="relative w-full h-0.5">
                    <span className="pointer-events-none w-full h-0.5 absolute inset-y-0 inset-s-0 rounded-xs bg-linear-to-r from-trust-orange to-trust-blue transition-[width] duration-1100 ease-smooth group-hover:w-full rtl:bg-linear-to-l" />
                  </div>
                  <span className="rounded-pill bg-trust-orange px-3 py-1 text-xs font-semibold text-white">
                    Modern
                  </span>
                </div>
                <p className="text-small text-content-secondary">
                  Modular architectures, staged migration, and continuous
                  delivery so teams ship while the stack evolves.
                </p>
              </div>
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-small font-semibold text-trust-orange-dark"
              >
                Explore our work
                <Arrow className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </a>
            </div>

            {/* Column 3: Capability (dark) */}
            <div
              className={`${panel} justify-between gap-md border-trust-blue/20 bg-linear-155 from-ink-900 via-ink-800 via-48% to-ink-700 p-panel text-white inset-shadow-2xs inset-shadow-white/6 [animation-delay:240ms] rtl:bg-linear-205`}
            >
              <div className="flex flex-col gap-sm">
                <span className={`${kicker} text-trust-blue`}>Capability</span>
                <h3 className="text-h4 font-semibold tracking-tight">
                  AI where it earns its keep
                </h3>
                <p className="text-small text-white/70">
                  Resilient, cloud-native products with data intelligence woven
                  in, not sprinkled on as a buzzword.
                </p>
              </div>
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-small font-semibold text-trust-blue"
              >
                See case studies
                <Arrow className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </a>

              {/* Decorative rings */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-18%] inset-e-[-8%] aspect-square w-[55%] animate-float-slow rounded-full border border-trust-blue/18 before:absolute before:inset-[18%] before:animate-glow before:rounded-full before:border before:border-trust-orange/22"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

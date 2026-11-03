import { Section } from "@repo/ui";
import AnimatedGridBackground from "../animations/AnimatedGridBackground";
import TiltCard from "../animations/TiltCard";

// apps/web/components/pre-footer-billboard.tsx
interface Metric {
  value: string;
  label: string;
}

const defaultMetrics: Metric[] = [
  { value: "60%", label: "Reduction in manual work" },
  { value: "16/5", label: "Support coverage" },
  { value: "110+", label: "Project deployments" },
  { value: "2x", label: "Team velocity post-integration" },
];

export function PreFooterBillboard({
  metrics = defaultMetrics,
  ctaHref = "https://fullstackweb.com/contact-us/",
}: {
  metrics?: Metric[];
  ctaHref?: string;
}) {
  return (
    <Section className="px-2 py-12">
      <div className="container">
        <TiltCard className="tilt-card p-0 w-full rounded-3xl">
          <div className="relative isolate animate-fade-up overflow-hidden rounded-3xl border border-trust-blue/18 bg-ink-900 px-billboard-x py-billboard-y text-white">
            {/* Decorative layers */}

            <AnimatedGridBackground theme="dark" className="bg-transparent" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-0.12em] inset-e-6 -z-10 select-none text-watermark font-extrabold leading-none text-white/4"
            >
              BUILD
            </span>

            <div className="relative flex flex-col gap-lg">
              <div className="flex flex-wrap items-end justify-between gap-lg">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/70 before:size-2 before:rounded-full before:bg-accent">
                    Engineering Without Limits
                  </span>
                  <h2 className="mt-md text-h1 font-bold tracking-tight">
                    Build Boldly.
                    <br />
                    <em className="not-italic text-trust-blue">
                      Scale Endlessly
                    </em>
                  </h2>
                </div>

                {/* Spinning gradient ring CTA */}
                <a
                  href={ctaHref}
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-ink-900 p-0.5 drop-shadow-cta before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:z-0 before:aspect-square before:w-[220%] before:animate-flow-spin before:bg-flow-conic before:will-change-transform"
                >
                  <span className="relative z-10 rounded-full bg-ink-900 px-6 py-3 text-small font-semibold">
                    Build with Fullstack web
                  </span>
                </a>
              </div>

              <p className="max-w-prose text-body text-white/70">
                Product engineering, modern stacks, and AI acceleration for
                secure, high-performance applications, built to grow as fast as
                you do.
              </p>

              <div
                role="list"
                className="flex flex-wrap items-stretch border-t border-white/12 pt-10"
              >
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    role="listitem"
                    className="flex min-w-28 flex-[1_1_8rem] flex-col gap-1 pb-0.6 pe-5 pt-1.4 not-last:me-5 not-last:border-e not-last:border-white/10 not-last:pe-6"
                  >
                    <strong className="text-h3 font-bold leading-none">
                      {m.value}
                    </strong>
                    <span className="text-small text-white/60">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </Section>
  );
}

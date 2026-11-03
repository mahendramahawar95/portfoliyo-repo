import { Badge, Section, SectionHeading } from "@repo/ui";

export interface ImpactStat {
  label: string;
  value: string;
  description: string;
}

interface ImpactDeliveryProps {
  stats?: ImpactStat[];
  className?: string;
}

const defaultStats: ImpactStat[] = [
  {
    label: "Products",
    value: "110+",
    description: "Digital products launched across industries",
  },
  {
    label: "Experience",
    value: "10+",
    description: "Years of design-led development",
  },
  {
    label: "Partners",
    value: "70+",
    description: "Customers served worldwide",
  },
];

export function ImpactDelivery({ stats = defaultStats }: ImpactDeliveryProps) {
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
              Impact & Delivery
            </span>
          </Badge>
          <SectionHeading
            align="center"
            descClass=""
            heading="We build products that matter."
            description="Thoughtful design, clean full-stack engineering, and AI where it actually helps - from the first prototype to post-launch growth. Web, mobile, or smarter digital interfaces: we think with you and build for what’s next."
            headingClass="mb-4 mt-4 font-bold tracking-tight text-primary-dark max-w-[738px]"
            className="mb-3xl"
          />
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-panel border border-trust-blue/18 bg-linear-105 from-ink-900 from-0% via-ink-800 via-55% to-ink-700 text-white inset-shadow-2xs inset-shadow-white/5 sm:grid-cols-3 rtl:bg-linear-255">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ animationDelay: `${i * 120}ms` }}
              className="relative flex animate-fade-up flex-col gap-xs px-lg py-xl transition-colors duration-300 hover:bg-trust-blue/8 max-sm:not-last:border-b max-sm:not-last:border-white/10 after:absolute after:inset-y-[18%] after:end-0 after:hidden after:w-px after:bg-white/12 sm:not-last:after:block"
            >
              <span className="text-kicker font-bold uppercase tracking-kicker text-trust-blue">
                {stat.label}
              </span>
              <span className="text-h2 font-bold leading-none tabular-nums">
                {stat.value}
              </span>
              <p className="max-w-[28ch] text-small text-white/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

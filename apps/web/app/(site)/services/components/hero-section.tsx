import { Badge, Button, Section, SectionHeading } from "@repo/ui";
import { OrbitCards } from "../../../../components/shared/orbit-cards/OrbitCards";
import { ArrowRight } from "lucide-react";
interface Metric {
  value: string;
  label: string;
}

export default function HeroSection() {
  const metrics: Metric[] = [
    { value: "110+", label: "Projects Delivered" },
    { value: "70+", label: "Happy Clients" },
    { value: "6", label: "Core Services" },
  ];
  return (
    <Section className="">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]">
          <div className="section-left">
            <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ">
              <span
                className="size-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                Digital Product Stud
              </span>
            </Badge>
            <SectionHeading
              align="left"
              descClass="text-fade-second"
              heading={(<>Building Digital Products That <span className="text-secondary"> Scale </span> With Your <span>Business.</span></>)}
              description={(<>fullstackdev helps forward-thinking startups and businesses bring ideas to life through intelligent, <span className="text-fade">high-performance digital solutions - combining smart development, automation, and clean design.</span></>)}
              headingClass="m-0 font-extrabold tracking-tight text-primary-dark "
              className="mt-4 mb-4" 
            />
            <div className="mt-sm flex flex-wrap items-center gap-sm">
              <Button variant={"primary"} className="text-background">
                Start a Project
                <ArrowRight className="size-icon" aria-hidden="true" />
              </Button>
              <Button variant={"outline"} className="text-background">
                View our services
                <ArrowRight className="size-icon" aria-hidden="true" />
              </Button>
            </div>
            <div
              role="list"
              className="grid mt-lg grid-cols-1 border-t border-ink-900/10 pt-md sm:grid-cols-3 flex-col gap-2  "
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  role="listitem"
                  className="max-sm:not-first:border-t max-sm:not-first:border-ink-900/10 max-sm:not-first:pt-2 sm:border-s sm:border-ink-900/10 sm:ps-md sm:nth-[3n+1]:border-s-0 sm:nth-[3n+1]:ps-0"
                >
                  <h4 className="text-h4 primary-dark font-bold leading-none">
                    {m.value}
                  </h4>
                  <span className="text-small text-primary-dark">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-0">
            <OrbitCards
              className="p-0!"
              centerTitle="MAHENDRA"
              centerSubtitle="DIGITAL AGENCY"
              duration={30}
              cards={[
                {
                  id: "1",
                  title: "React.js",
                  description: "Frontend development",
                  icon: "⚛️",
                  label: "Frontend",
                },
                {
                  id: "2",
                  title: "Next.js",
                  description: "Modern web apps",
                  icon: "▲",
                  label: "Framework",
                },
                {
                  id: "3",
                  title: "Node.js",
                  description: "Backend systems",
                  icon: "🟢",
                  label: "Backend",
                },
                {
                  id: "4",
                  title: "TypeScript",
                  description: "Type safety",
                  icon: "TS",
                  label: "Language",
                },
                {
                  id: "5",
                  title: "Tailwind",
                  description: "UI styling",
                  icon: "🎨",
                  label: "Styling",
                },
                {
                  id: "6",
                  title: "Database",
                  description: "Data management",
                  icon: "🐘",
                  label: "Database",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

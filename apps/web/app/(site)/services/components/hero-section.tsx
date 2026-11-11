import { Badge, Button, Section, SectionHeading } from "@repo/ui";
import { OrbitCards } from "../../../../components/home/OrbitCards";
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
              descClass="text-left"
              heading="Building Digital Products That Scale With Your Business."
              description="fullstackdev helps forward-thinking startups and businesses bring ideas to life through intelligent, high-performance digital solutions - combining smart development, automation, and clean design."
              headingClass="m-0 font-bold tracking-tight text-primary-dark "
              className="mt-4 mb-4"
            />
            <div className="mt-sm flex flex-wrap items-center gap-sm">
              <Button variant={"primary"} className="text-background">
                Start a Project
                <ArrowRight className="size-icon" aria-hidden="true" />
              </Button>
              <Button variant={"primary"} className="text-background">
                View our services
                <ArrowRight className="size-icon" aria-hidden="true" />
              </Button>
            </div>
            <div
              role="list"
              className="grid grid-cols-1 border-t border-border pt-10 sm:grid-cols-3"
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  role="listitem"
                  className="flex flex-col gap-1 py-sm max-sm:not-first:border-t max-sm:not-first:border-white/10 sm:border-s sm:border-white/10 sm:px-sm sm:nth-[3n+1]:border-s-0 sm:nth-[3n+1]:ps-0"
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

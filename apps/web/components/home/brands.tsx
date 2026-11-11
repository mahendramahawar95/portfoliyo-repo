import { Badge, LogoMarquee, Section, SectionHeading } from "@repo/ui";

export default function Marquee() {
  return (
    <Section className="py-3xl">
      <div className="container">
        <div className="text-center">
          <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ">
            <span
              className="size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              Trusted Partners
            </span>
          </Badge>
          <SectionHeading
            align="center"
            descClass="text-h5"
            heading=""
            description="We partner with visionary brands across diverse industries - from e-commerce and healthcare to fintech and real estate. Leading companies trust Fullstack web to shape their digital future."
            headingClass="mb-4 mt-4 font-bold tracking-tight text-primary-dark max-w-[738px]"
            className="mb-0"
          />
        </div>
        <div className="mx-auto max-w-default px-md">
          <p className="mb-xl text-center text-kicker font-bold uppercase tracking-kicker text-content-secondary">
            Trusted Partners
          </p>
          <LogoMarquee
            logos={[
              { name: "Partner One", src: "/logo-brand.jpg" },
              {
                name: "Partner Two",
                src: "/logo-brand.jpg",
                href: "https://example.com",
              },
              // ...
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

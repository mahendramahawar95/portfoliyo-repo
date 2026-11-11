// apps/web/components/impact-testimonials.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Section,
  SectionHeading,
  Badge,
} from "@repo/ui";

type Tone = "orange" | "cyan" | "neutral";

interface Testimonial {
  kicker: string;
  quote: string;
  name: string;
  role: string;
  tone: Tone;
}

// Placeholder content for 4 of the 5 cards: replace with real client quotes.
const testimonials: Testimonial[] = [
  {
    kicker: "Telecom",
    quote:
      "Nine years in, Fullstack is straight with us when something isn't working and takes ownership without being chased. They have adapted as our business has changed. That combination is rarer than it should be.",
    name: "Anis Shaikh",
    role: "VP · Sakon",
    tone: "orange",
  },
  {
    kicker: "Fintech",
    quote:
      "They shipped our first release in ten weeks and stayed on to harden it. Updates were clear, there were no surprises, and the code was easy for our own team to pick up.",
    name: "Maya Thompson",
    role: "CTO · Fintech platform",
    tone: "cyan",
  },
  {
    kicker: "Healthcare",
    quote:
      "Security and accessibility were part of every conversation from day one, not an afterthought. Our clinicians adopted the new portal faster than we expected.",
    name: "Daniel Reyes",
    role: "Head of Digital · Health network",
    tone: "neutral",
  },
  {
    kicker: "Retail",
    quote:
      "The migration from our legacy stack happened in stages while sales kept running. We never had a freeze, and the new storefront is noticeably faster.",
    name: "Sara Lindqvist",
    role: "Director · Retail group",
    tone: "orange",
  },
  {
    kicker: "Logistics",
    quote:
      "Their AI-assisted routing work paid for itself within a quarter. They explain trade-offs plainly and build what we actually need, not what sounds impressive.",
    name: "Rahul Mehta",
    role: "COO · Logistics company",
    tone: "cyan",
  },
];

const tones: Record<Tone, { card: string; accent: string }> = {
  orange: {
    card: "border-trust-orange/16 bg-linear-165 from-trust-orange/13 via-white/84 via-48% to-white/72 shadow-tcard-orange",
    accent: "text-trust-orange-dark",
  },
  cyan: {
    card: "border-trust-blue/16 bg-linear-165 from-trust-blue/14 via-white/82 via-48% to-white/72 shadow-tcard-cyan",
    accent: "text-trust-blue-dark",
  },
  neutral: {
    card: "border-ink-900/7 bg-white/78 shadow-tcard",
    accent: "text-content-secondary",
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function TestimonialCard({ item }: { item: Testimonial }) {
  const tone = tones[item.tone];

  return (
    <blockquote
      className={`flex h-full min-h-66 flex-col overflow-hidden rounded-card border md:min-h-70 ${tone.card}`}
    >
      <div className="flex flex-row-reverse items-start justify-between gap-7 px-[1.45rem] pt-6">
        <span
          className={`text-kicker font-bold uppercase tracking-kicker ${tone.accent}`}
        >
          {item.kicker}
        </span>
        <span
          aria-hidden="true"
          className={`select-none text-5xl leading-none opacity-40 ${tone.accent}`}
        >
          “
        </span>
      </div>

      <p className="px-[1.45rem] pb-6 pt-4 text-small leading-relaxed text-foreground/80">
        {item.quote}
      </p>

      <footer className="mt-auto flex items-center gap-3.5 bg-ink-900 px-5 py-3.5 text-white">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-pill bg-white/10 text-xs font-bold"
        >
          {initials(item.name)}
        </span>
        <div className="flex flex-col">
          <cite className="text-small font-semibold not-italic">
            {item.name}
          </cite>
          <span className="text-xs text-white/60">{item.role}</span>
        </div>
      </footer>
    </blockquote>
  );
}

export function ImpactTestimonials() {
  return (
    <Section className="py-3xl">
      <div className="container">
        <div className="mx-auto max-w-default px-md">
          <Carousel
            delay={4500}
            loop={testimonials.length > 1}
            opts={{ align: "start" }}
            className="grid items-center gap-xl lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
          >
            {/* Left column */}
            <div className="text-left">
              <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ">
                <span
                  className="size-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium uppercase tracking-widest text-muted">
                  Client Voices
                </span>
              </Badge>
              <SectionHeading
                align="left"
                heading="Trusted by teams who ship"
                description="Partners across industries on design, engineering, and AI - measured by outcomes, not slide decks."
                headingClass="mb-4 mt-4 max-w-[738px] font-bold tracking-tight text-primary-dark"
                className="mb-0"
              />
              <div className="flex items-center gap-3">
                <CarouselPrevious className="static size-11 translate-y-0 inset-auto" />
                <CarouselNext className="static size-11 translate-y-0 inset-auto" />
              </div>
            </div>

            {/* Right column: one full card + half of the next */}
            <div className="overflow-hidden mask-[linear-gradient(90deg,transparent_0%,#000_4%,#000_80%,transparent_100%)]">
              <CarouselContent className="py-8">
                {testimonials.map((item) => (
                  <CarouselItem
                    key={item.name}
                    className="basis-[85%] sm:basis-2/3"
                  >
                    <TestimonialCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </Carousel>
        </div>
      </div>
    </Section>
  );
}

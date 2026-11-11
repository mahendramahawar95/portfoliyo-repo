"use client";
import {
  Badge,
  Carousel,
  CarouselAutoplayToggle,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  Section,
  SectionHeading,
  useCarousel,
} from "@repo/ui";

import Image from "next/image";
import TiltCard from "../animations/TiltCard";

type Testimonial = {
  description: string;
  name: string;
  readmore: string;
  image: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Product Strategy 1",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
  {
    name: "Product Strategy 2",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
  {
    name: "Product Strategy 3",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
  {
    name: "Product Strategy 4",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
  {
    name: "Product Strategy 5",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
  {
    name: "Product Strategy 6",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
  {
    name: "Product Strategy 7",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
  {
    name: "Product Strategy 8",
    description:
      "From idea to execution, we help shape AI-powered products that win.",
    readmore: "Read more",
    image: "/ai.jpg",
  },
];

/* Minimum slides needed for the 3D loop to look right (center + 3 each side) */
const MIN_SLIDES = 7;

/* Repeats items until we reach MIN_SLIDES, so any count (1, 3, 5, 50...) works */
function fillSlides<T>(items: T[], min = MIN_SLIDES): T[] {
  if (items.length === 0) return [];
  if (items.length >= min) return items;
  const repeats = Math.ceil(min / items.length);
  return Array.from({ length: repeats }, () => items).flat();
}

function getCoverflowStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);

  if (abs === 0) {
    return {
      transform:
        "perspective(1200px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.2)",
      zIndex: 30,
      opacity: 1,
    };
  }

  if (abs === 1) {
    return {
      transform: `perspective(1200px) translate3d(${dir * 12}%, 0px, -150px) rotateX(0deg) rotateY(${-dir * 18}deg) rotateZ(0deg) scale(0.9)`,
      zIndex: 20,
      opacity: 0.9,
    };
  }

  if (abs === 2) {
    return {
      transform: `perspective(500px) translate3d(${-dir * 12}%, 0px, -150px) rotateX(0deg) rotateY(${-dir * 18}deg) rotateZ(0deg) scale(0.9)`,
      zIndex: 10,
      opacity: 0.6,
    };
  }

  return {
    transform: `perspective(500px) translate3d(${-dir * 12}%, 0px, -150px) rotateX(0deg) rotateY(${-dir * 18}deg) rotateZ(0deg) scale(0.9)`,
    opacity: 0,
  };
}

function CoverflowSlide({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const { selectedIndex } = useCarousel();

  let offset = index - selectedIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return (
    <div
      className="h-full transition-all duration-500 ease-out will-change-transform"
      style={getCoverflowStyle(offset)}
    >
      {children}
    </div>
  );
}

export default function Testimomials({
  items = TESTIMONIALS,
}: {
  items?: Testimonial[];
}) {
  const slides = fillSlides(items);

  if (slides.length === 0) return null;

  return (
    <Section
      id="testimonial"
      className="py-3xl bg-transparent overflow-hidden"
    >
      <div className="text-center">
        <Badge className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-widest text-muted">
            Our Services
          </span>
        </Badge>
        <SectionHeading
          align="center"
          descClass=""
          heading="Solutions Rooted in Design, Powered by AI"
          description="We blend design, engineering, and AI to build digital products that scale."
          headingClass="mb-4 mt-4 font-bold tracking-tight text-primary-dark max-w-[738px]"
          className="mb-0"
        />
      </div>

      <Carousel
        opts={{ align: "center", loop: slides.length > 1 }}
        className="w-full mx-auto"
      >
        <CarouselContent className="py-24">
          {slides.map((t, index) => (
            <CarouselItem
              key={`${t.name}-${index}`}
              className="basis-[50.380%] sm:basis-[28.380%] lg:basis-[22.380%] pl-0 "
            >
              <CoverflowSlide index={index} total={slides.length}>
                <TiltCard className="tilt-card p-0 w-full rounded-3xl">
                  <div className="h-full justify-between gap-md rounded-xl overflow-hidden bg-white shadow-xl">
                    <div className="w-full">
                      <div className="overflow-hidden">
                        <Image
                          src={t.image}
                          alt={t.name}
                          className="aspect-square object-cover h-56 w-full"
                          width={400}
                          height={100}
                          priority={index < 3}
                        />
                      </div>
                    </div>

                    <div className=" p-md bg-dark-bg">
                      <div className=" gap-sm min-h-28">
                        <div>
                          <h5 className="text-h5 mb-2 mt-0 font-bold text-white">
                            {t.name}
                          </h5>
                          <p className="text-xs text-white mb-4">
                            {t.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-primary gap-1 text-xs  font-bold">
                        {t.readmore}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </CoverflowSlide>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-4 flex items-center justify-center gap-3">
          <CarouselDots className="mt-0" />
          <CarouselAutoplayToggle />
        </div>
      </Carousel>
    </Section>
  );
}

// packages/ui/src/components/carousel-context.tsx
"use client";

import { createContext, useContext } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi | undefined;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
  orientation: "horizontal" | "vertical";
  dir: "ltr" | "rtl";
  hasAutoplay: boolean;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
}

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return ctx;
}

export type {
  CarouselApi,
  CarouselOptions,
  CarouselPlugin,
  CarouselContextValue,
};

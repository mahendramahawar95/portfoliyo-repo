// packages/ui/src/components/carousel.tsx
"use client";

import {
  ReactNode,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "../lib/cn";
import {
  CarouselContext,
  useCarousel,
  type CarouselOptions,
  type CarouselPlugin,
  type CarouselApi,
} from "./carousel-context";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  children: ReactNode;
  autoplay?: boolean;
  delay?: number;
  loop?: boolean;
  dir?: "ltr" | "rtl";
}

export function Carousel({
  autoplay = true,
  delay = 3500,
  loop = true,
  dir = "ltr",
  opts,
  plugins,
  orientation = "horizontal",
  setApi,
  className,
  children,
  ...props
}: CarouselProps) {
  const allPlugins = useMemo(
    () => [
      ...(autoplay
        ? [
            Autoplay({
              delay,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]
        : []),
      ...(plugins ?? []),
    ],
    [autoplay, delay, plugins],
  );

  const [carouselRef, api] = useEmblaCarousel(
    {
      loop,
      direction: dir,
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    allPlugins,
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const onSelect = useCallback((emblaApi: NonNullable<typeof api>) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);
  const play = useCallback(() => api?.plugins().autoplay?.play(), [api]);
  const pause = useCallback(() => api?.plugins().autoplay?.stop(), [api]);

  useEffect(() => {
    if (!api) return;

    const onPlay = () => setIsPlaying(true);
    const onStop = () => setIsPlaying(false);
    const initialize = () => {
      onSelect(api);
      setApi?.(api);
    };

    const frame = requestAnimationFrame(initialize);

    api.on("select", onSelect);
    api.on("reInit", onSelect);
    api.on("autoplay:play", onPlay);
    api.on("autoplay:stop", onStop);

    return () => {
      cancelAnimationFrame(frame);
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      api.off("autoplay:play", onPlay);
      api.off("autoplay:stop", onStop);
    };
  }, [api, onSelect, setApi]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        selectedIndex,
        scrollSnaps,
        scrollTo,
        orientation,
        dir,
        hasAutoplay: autoplay,
        isPlaying,
        play,
        pause,
      }}
    >
      <div dir={dir} className={cn("relative", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useCarousel();

  return (
    <div
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "ps-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

export function CarouselPrevious({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();

  return (
    <button
      type="button"
      aria-label="Previous slide"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        "absolute flex size-8 items-center justify-center rounded-full border border-border bg-surface shadow-sm disabled:cursor-not-allowed disabled:opacity-40",
        orientation === "horizontal"
          ? "-start-4 top-1/2 -translate-y-1/2"
          : "-top-4 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ChevronLeft size={16} className="rtl:-scale-x-100" />
    </button>
  );
}

export function CarouselNext({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const { scrollNext, canScrollNext, orientation } = useCarousel();

  return (
    <button
      type="button"
      aria-label="Next slide"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        "absolute flex size-8 items-center justify-center rounded-full border border-border bg-surface shadow-sm disabled:cursor-not-allowed disabled:opacity-40",
        orientation === "horizontal"
          ? "-end-4 top-1/2 -translate-y-1/2"
          : "-bottom-4 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ChevronRight size={16} className="rtl:-scale-x-100" />
    </button>
  );
}

export function CarouselDots({ className }: { className?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  return (
    <div className={cn("mt-4 flex justify-center gap-2", className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === selectedIndex}
          className={cn(
            "h-2 rounded-full transition-all",
            index === selectedIndex ? "w-4 bg-primary" : "w-2 bg-border-strong",
          )}
        />
      ))}
    </div>
  );
}

export function CarouselAutoplayToggle({ className }: { className?: string }) {
  const { hasAutoplay, isPlaying, play, pause } = useCarousel();
  if (!hasAutoplay) return null;

  return (
    <button
      type="button"
      onClick={isPlaying ? pause : play}
      aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
      className={cn(
        "flex size-8 items-center justify-center rounded-full border border-border bg-surface shadow-sm",
        className,
      )}
    >
      {isPlaying ? (
        <Pause size={14} />
      ) : (
        <Play size={14} className="rtl:-scale-x-100" />
      )}
    </button>
  );
}

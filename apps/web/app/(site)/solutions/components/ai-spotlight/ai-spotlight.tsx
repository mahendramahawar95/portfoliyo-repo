"use client";

// apps/web/components/sections/ai-spotlight.tsx
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@repo/ui/lib/cn";
import {
  aiCapabilities,
  type AiCapability,
  type AiTone,
} from "./ai-capabilities";
import Image from "next/image";
import { Section } from "@repo/ui";

export interface AiSpotlightProps {
  capabilities?: AiCapability[];
  className?: string;
}

/** Tone-specific tints: the panel wash and the image glow. */
const tones: Record<AiTone, { wash: string; glow: string }> = {
  cyan: {
    wash: "bg-radial-[at_90%_0%] from-trust-blue/18 to-transparent to-45%",
    glow: "from-trust-blue/30",
  },
  orange: {
    wash: "bg-radial-[at_90%_0%] from-trust-orange/14 to-transparent to-45%",
    glow: "from-trust-orange/30",
  },
  electric: {
    wash: "bg-radial-[at_90%_0%] from-electric/16 to-transparent to-45%",
    glow: "from-electric/30",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

const arrowButton =
  "grid size-10 shrink-0 place-items-center  rounded-pill border border-sky-glow/20 text-ice transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 lg:hidden";

export function AiSpotlight({
  capabilities = aiCapabilities,
  className,
}: AiSpotlightProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const last = Math.max(capabilities.length - 1, 0);
  const current = capabilities[active] ?? capabilities[0];
  const tone = current ? tones[current.tone] : tones.cyan;

  const select = (index: number, focus = false) => {
    const next = Math.min(Math.max(index, 0), last);
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const targets: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, true);
  };

  // On small screens the tab row scrolls sideways: keep the active tab centered.
  useEffect(() => {
    if (!capabilities.length || !current) return;

    const nav = navRef.current;
    const tab = tabRefs.current[active];
    if (!nav || !tab || window.matchMedia("(min-width: 1024px)").matches) return;
    nav.scrollTo({
      left: tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active, capabilities.length, current]);

  if (!current) return null;

  return (
    <Section className="py-3xl">
      <div className="container">
    <div
      className={cn(
        "grid min-h-144 rounded-panel border border-trust-blue/28 bg-linear-160 from-ink-900/88 to-ink-800/82 shadow-spotlight backdrop-blur-[14px] lg:grid-cols-[minmax(12rem,0.85fr)_minmax(0,1.55fr)]",
        className,
      )}
    >
      {/* Tabs: a scrolling row with arrows on phones, a sticky column on desktop */}
      <div className="flex items-center gap-2 max-lg:p-2 lg:contents">
        <button
          type="button"
          aria-label="Previous capability"
          disabled={active === 0}
          onClick={() => select(active - 1)}
          className={arrowButton}
        >
          <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </button>

        <div
          ref={navRef}
          role="tablist"
          aria-label="AI capabilities"
          onKeyDown={onKeyDown}
          className="relative flex p-sm gap-0.8 overflow-x-auto bg-ink-900/60 p-2.6 max-lg:min-w-0 max-lg:flex-1 max-lg:rounded-[0.85rem] max-lg:scrollbar-none lg:sticky lg:top-25 lg:max-h-[calc(100vh-7rem)] lg:flex-col lg:self-start lg:overflow-y-auto lg:overflow-x-visible lg:rounded-s-panel"
        >
          {capabilities.map((capability, i) => (
            <button
              key={capability.id}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${baseId}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              className="group grid p-sm w-full grid-cols-[2.4rem_1fr_auto] items-center gap-2.6 rounded-[0.85rem] px-4 py-3.8 text-start text-ice/72 transition-colors duration-200 hover:bg-white/5 aria-selected:bg-linear-135 aria-selected:from-trust-blue/28 aria-selected:to-ink-900/90 aria-selected:text-white aria-selected:inset-ring aria-selected:inset-ring-trust-blue/35 max-lg:w-auto max-lg:min-w-56 max-lg:shrink-0"
            >
              <span className="text-xs font-bold tracking-wider group-aria-selected:text-trust-orange-soft">
                {pad(i + 1)}
              </span>
              <span className="text-small font-semibold leading-snug tracking-tight">
                {capability.label}
              </span>
              <span
                aria-hidden="true"
                className="size-1.6 h-2 w-2 rounded-full transition-colors group-aria-selected:bg-trust-blue group-aria-selected:shadow-[0_0_10px_rgb(3_167_255/0.7)]"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next capability"
          disabled={active === last}
          onClick={() => select(active + 1)}
          className={arrowButton}
        >
          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </button>
      </div>

      {/* Body: image on top, details below */}
      <div className="grid min-w-0 grid-rows-[auto_1fr] overflow-hidden border-sky-glow/14 max-lg:rounded-b-panel lg:rounded-e-panel lg:border-s">
        <figure className="relative m-0 w-full aspect-960/560 max-h-80 min-h-54 overflow-hidden border-b border-sky-glow/12 bg-ink-900">
          <Image
            key={current.id}
            src="/ai-ispotlight.jpg"
            alt={current.image.alt}
            width={500}
            height={560}
            loading="eager"
            decoding="async"
            className="absolute inset-0 size-full w-full animate-fade-in object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink-900/85 via-ink-900/10 to-transparent"
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-radial-[at_80%_15%] to-transparent to-55%",
              tone.glow,
            )}
          />
          <figcaption
            key={`${current.id}-caption`}
            className="absolute bottom-0 inset-s-0 animate-fade-up p-4 text-xs font-semibold uppercase tracking-widest text-white/80"
          >
            {current.caption}
          </figcaption>
        </figure>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative flex min-h-104 flex-col justify-between gap-lg overflow-hidden p-xl"
        >
          <span
            aria-hidden="true"
            className={cn("pointer-events-none absolute inset-0", tone.wash)}
          />
          <span
            key={`${current.id}-mark`}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 inset-e-4 animate-fade-in select-none font-display text-watermark font-extrabold leading-none text-white/4"
          >
            {pad(active + 1)}
          </span>

          <div key={`${current.id}-content`} className="relative animate-fade-up">
            <p className="mb-sm text-xs font-bold uppercase tracking-widest text-trust-orange">
              {pad(active + 1)} — Capability
            </p>
            <h3 className="mb-3 text-h3 font-bold tracking-tight text-white">
              {current.title}
            </h3>
            <p className="mb-3 max-w-prose text-body-lg text-white/85">
              {current.text}
            </p>
            <p className="max-w-prose text-small leading-relaxed text-white/70">
              {current.detail}
            </p>

            <ul aria-label="What we build" className="my-md flex flex-wrap gap-2">
              {current.chips.map((chip, i) => (
                <li
                  key={chip}
                  style={stagger(i)}
                  className="stagger-item p-xs leading-[inherit] px-sm rounded-pill border border-sky-glow/28 bg-ink-900/72  text-xs font-semibold text-ice"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <div className="grid gap-sm sm:grid-cols-2">
              <MetaBlock title="What we implement" items={current.implement} />
              <MetaBlock title="Ideal for" items={current.ideal} />
            </div>
          </div>

          <div
            key={`${current.id}-outcome`}
            className="relative grid animate-fade-up items-baseline gap-x-md gap-y-1 border-t border-sky-glow/14 pt-md sm:grid-cols-[auto_1fr]"
          >
            <span className="text-kicker font-bold uppercase tracking-kicker text-trust-blue">
              Outcome
            </span>
            <p className="text-small font-medium text-white">{current.outcome}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Section>
  );
}

function MetaBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[0.8rem] border border-sky-glow/16 bg-ink-900/55 p-md">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-ice/70">
        {title}
      </h4>
      <ul className="list-disc ml-xs space-y-1 text-small text-white/75 marker:text-trust-blue">
        {items.map((item) => (
          <li  key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

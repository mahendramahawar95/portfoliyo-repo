"use client";

// apps/web/components/sections/markets-holo.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@repo/ui/lib/cn";
import { markets as defaultMarkets, marketFlag, type Market } from "./markets";
import { HoloGlobe } from "./holo-globe";

export interface MarketsHoloProps {
  badge?: string;
  heading?: ReactNode;
  lede?: ReactNode;
  markets?: Market[];
  className?: string;
}

/** Corner brackets of the viewport frame. */
const corners = [
  "start-3 top-3 border-s border-t rounded-ss-md",
  "end-3 top-3 border-e border-t rounded-se-md",
  "bottom-3 start-3 border-b border-s rounded-es-md",
  "bottom-3 end-3 border-b border-e rounded-ee-md",
];

export function MarketsHolo({
  badge = "Digital intelligence",
  heading = "Markets We Serve",
  lede = "From South Asia to the Middle East, Europe, and the US - we partner with teams building ambitious products across borders.",
  markets = defaultMarkets,
  className,
}: MarketsHoloProps) {
  const [active, setActive] = useState(0);
  const market = markets[active];

  if (!market) return null;

  return (
    <section
      id="markets-we-serve"
      aria-labelledby="markets-heading"
      className={cn("relative isolate overflow-hidden py-3xl", className)}
    >
      <div className="container">
      {/* Atmosphere: two glows and a slow scan line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1">
        <span className="absolute -top-24 inset-e-[10%] size-96 rounded-full bg-trust-blue/10 blur-3xl" />
        <span className="absolute -bottom-24 inset-s-[5%] size-80 rounded-full bg-trust-orange/10 blur-3xl" />
        <span className="absolute inset-x-0 h-px animate-scan bg-linear-to-r from-transparent via-trust-blue/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-default px-md">
        {/* Header */}
        <div className="mx-auto mb-xl animate-fade-up text-center">
          <span className="mb-md inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm">
            <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              {badge}
            </span>
          </span>
          <h2
            id="markets-heading"
            className="mb-md text-h2 font-bold tracking-tight text-primary-dark"
          >
            {heading}
          </h2>
          <p className="text-body text-content-secondary">{lede}</p>
        </div>

        <div className="grid items-stretch gap-xl lg:grid-cols-12">
          {/* Panel: active market and selector */}
          <div className="order-2 flex h-full flex-col gap-5 lg:order-1 lg:col-span-5">
            <div className="relative p-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 overflow-hidden rounded-card border border-trust-blue/32 bg-white px-5.6 py-5.4 shadow-lg backdrop-blur-[12px]">
              <img
                src={marketFlag(market.code, 80)}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full border border-ink-900/10 object-cover"
              />

              <div key={market.code} className="animate-fade-up">
                <p className="text-xs font-semibold uppercase tracking-widest text-trust-orange-dark">
                  {market.region}
                </p>
                <h3 className="mb-2 text-h5 font-medium text-ink-900">
                  {market.name}
                </h3>
                <p className="text-small text-content-secondary">
                  {market.description}
                </p>
              </div>

              {/* Radar pings */}
              <span
                aria-hidden="true"
                className="absolute inset-e-4 top-4 size-3"
              >
                {[0, 0.55, 1.1].map((delay) => (
                  <span
                    key={delay}
                    style={{ animationDelay: `${delay}s` }}
                    className="absolute inset-0 animate-ping rounded-full border-[1.5px] border-trust-blue [animation-duration:2.4s]"
                  />
                ))}
              </span>
            </div>

            <ul role="list" className="grid grid-cols-2 gap-2">
              {markets.map((item, i) => (
                <li key={item.code}>
                  <button
                    type="button"
                    aria-pressed={active === i}
                    onClick={() => setActive(i)}
                    className="group relative p-sm flex w-full items-center gap-2 rounded-[0.85rem] border border-ink-900/18 bg-white text-start text-small font-medium text-ink-900 transition duration-250 ease-smooth hover:-translate-y-0.5 hover:border-trust-blue/45 aria-pressed:border-trust-blue/45 aria-pressed:bg-linear-135 aria-pressed:from-ink-900 aria-pressed:to-ink-700 aria-pressed:text-white aria-pressed:shadow-lg"
                  >
                    <img
                      src={marketFlag(item.code, 40)}
                      alt=""
                      width={22}
                      height={22}
                      className="size-5.5 rounded-full object-cover"
                    />
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-e-4 top-1/2 size-1.75 -translate-y-1/2 rounded-full bg-trust-orange opacity-0 transition-opacity after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-trust-orange group-aria-pressed:opacity-100"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Viewport: the globe */}
          <div className="relative order-1 min-h-96 overflow-hidden rounded-card border border-trust-blue/30 bg-linear-160 from-ink-900 via-ink-800 to-ink-700 shadow-lg lg:order-2 lg:col-span-7">
            <HoloGlobe
              markets={markets}
              activeIndex={active}
              onSelect={setActive}
              className="absolute inset-0"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {corners.map((corner) => (
                <span
                  key={corner}
                  className={cn("absolute size-5 border-trust-blue/60", corner)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

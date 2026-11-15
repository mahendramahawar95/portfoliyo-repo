"use client";

import { useEffect, useState } from "react";
import { Site } from "../../app/types/site";
const devices = {
  desktop: "max-w-full",
  tablet: "max-w-[820px]",
  mobile: "max-w-[390px]",
} as const;
type Device = keyof typeof devices;

type Props = { site: Site; onClose: () => void };

export default function SitePreviewModal({ site, onClose }: Props) {
  const [device, setDevice] = useState<Device>("desktop");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={site.title}
         className="fixed inset-0 z-100 flex flex-col bg-ink-900/95 animate-fade-in">
      {/* Top bar */}
      <header className="flex items-center gap-4 border-b border-white/10 bg-dark-bg px-4 py-3 text-ice">
        <h2 className="truncate font-display text-h5">{site.title}</h2>

        <div className="mx-auto hidden gap-1 rounded-pill bg-white/10 p-1 md:flex">
          {(Object.keys(devices) as Device[]).map((d) => (
            <button key={d} onClick={() => setDevice(d)}
              className={`rounded-pill px-4 py-1.5 text-xs font-semibold capitalize transition ${
                device === d ? "bg-primary text-white" : "text-ice/70 hover:text-ice"
              }`}>
              {d}
            </button>
          ))}
        </div>

        <a href={site.url} target="_blank" rel="noopener noreferrer"
           className="ml-auto rounded-button border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white/10">
          Open in new tab
        </a>
        <button onClick={onClose} aria-label="Close preview"
                className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
          ✕
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Iframe stage */}
        <div className="relative flex min-w-0 flex-1 justify-center overflow-auto p-4">
          <div className={`relative h-full w-full overflow-hidden rounded-lg bg-white shadow-portrait transition-[max-width] duration-500 ease-smooth ${devices[device]}`}>
            {loading && (
              <div className="absolute inset-0 grid place-items-center bg-surface">
                <span className="size-8 animate-spin rounded-full border-2 border-border-strong border-t-primary" />
              </div>
            )}
            <iframe
              src={site.url}
              title={site.title}
              loading="lazy"
              onLoad={() => setLoading(false)}
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="size-full border-0"
            />
          </div>
        </div>

        {/* Info panel */}
        <aside className="hidden w-80 shrink-0 flex-col gap-5 overflow-y-auto border-l border-white/10 bg-card p-6 xl:flex">
          <p className="text-kicker font-semibold uppercase tracking-kicker text-trust-blue">
            {site.category}
          </p>
          <p className="text-small text-para">{site.description}</p>

          {site.metrics && (
            <dl className="grid grid-cols-2 gap-3">
              {site.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-surface p-3">
                  <dd className="font-display text-h5 text-primary-dark">{m.value}</dd>
                  <dt className="text-xs text-para">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <ul className="flex flex-wrap gap-2">
            {site.tags.map((t) => (
              <li key={t} className="rounded-pill bg-badge-tag px-3 py-1 text-xs font-medium text-badge-text">{t}</li>
            ))}
          </ul>

          {(site.client || site.year) && (
            <p className="text-xs text-para">
              {site.client} {site.year && `· ${site.year}`}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
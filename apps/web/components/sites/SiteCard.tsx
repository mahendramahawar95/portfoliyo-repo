import Image from "next/image";
import { Site } from "../../types/site";

type Props = { site: Site; onPreview: (site: Site) => void };

export default function SiteCard({ site, onPreview }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-border bg-card shadow-job transition duration-300 hover:-translate-y-1 hover:shadow-job-hover">
      {/* Browser frame */}
      <div className="m-3 overflow-hidden rounded-lg border border-border bg-surface">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-secondary px-3 py-2">
          <span className="size-2 rounded-full bg-danger/70" />
          <span className="size-2 rounded-full bg-warning/80" />
          <span className="size-2 rounded-full bg-success/70" />
          <span className="ml-2 flex-1 truncate rounded-pill bg-card px-3 py-0.5 text-[11px] text-para">
            {site.url.replace(/^https?:\/\//, "")}
          </span>
        </div>

        {/* Screenshot scrolls on hover */}
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={site.thumbnail}
            alt={`${site.title} preview`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover object-top transition-[object-position] duration-[4s] ease-linear group-hover:object-bottom"
          />
          <button
            type="button"
            onClick={() => onPreview(site)}
            className="absolute inset-0 flex items-center justify-center bg-ink-900/0 opacity-0 transition group-hover:bg-ink-900/40 group-hover:opacity-100 focus-visible:opacity-100"
            aria-label={`Live preview of ${site.title}`}
          >
            <span className="rounded-pill bg-card px-5 py-2 text-small font-semibold text-primary-dark shadow-chip">
              Live Preview
            </span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-2">
        <p className="text-kicker font-semibold uppercase tracking-kicker text-trust-blue">
          {site.category}
        </p>
        <h3 className="font-display text-h5 text-primary-dark">{site.title}</h3>
        <p className="line-clamp-2 text-small text-para">{site.description}</p>

        <ul className="flex flex-wrap gap-2">
          {site.tags.map((t) => (
            <li key={t} className="rounded-pill bg-badge-tag px-3 py-1 text-xs font-medium text-badge-text">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-3 pt-3">
          <button
            type="button"
            onClick={() => onPreview(site)}
            className="flex-1 rounded-button bg-primary px-4 py-2.5 text-small font-semibold text-white transition hover:bg-secondary"
          >
            Live Preview
          </button>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-button border border-border-strong px-4 py-2.5 text-small font-semibold text-primary-dark transition hover:bg-surface"
          >
            Visit
          </a>
        </div>
      </div>
    </article>
  );
}
"use client";

import { useState } from "react";

import SiteCard from "./SiteCard";
import SitePreviewModal from "./SitePreviewModal";
import { Site } from "../../app/types/site";
import { Section } from "@repo/ui";

export default function SiteGallery({ sites }: { sites: Site[] }) {
  const [active, setActive] = useState<Site | null>(null);

  return (
    <Section className="container">
      <div className="mx-auto grid max-w-default gap-lg sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((s) => (
          <SiteCard key={s.slug} site={s} onPreview={setActive} />
        ))}
      </div>
      {active && <SitePreviewModal site={active} onClose={() => setActive(null)} />}
    </Section>
  );
}
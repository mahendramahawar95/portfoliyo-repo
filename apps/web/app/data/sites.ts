import type { Site } from "../types/site";

export const sites: Site[] = [
  {
    slug: "acme-corp",
    title: "Acme Corp Website",
    category: "Corporate",
    description: "Marketing site with careers, services and case studies.",
    url: "https://portfoliyo-repo.vercel.app",
    thumbnail: "/thumb-sell.png",
    tags: ["Next.js", "Tailwind v4", "TypeScript"],
    client: "Acme Corp",
    year: 2026,
    metrics: [
      { label: "Lighthouse", value: "98" },
      { label: "Load time", value: "1.1s" },
    ],
  },
];
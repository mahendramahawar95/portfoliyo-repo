// apps/web/data/markets.ts

export interface Market {
  /** Lowercase ISO country code, also used for the flag image. */
  code: string;
  region: string;
  name: string;
  /** Short name for the selector chip. */
  label: string;
  description: string;
  lat: number;
  lng: number;
}

export const marketFlag = (code: string, width: 40 | 80) =>
  `https://flagcdn.com/w${width}/${code}.png`;

export const markets: Market[] = [
  {
    code: "in",
    region: "South Asia",
    name: "India",
    label: "India",
    description:
      "Product engineering hub — architecture, AI, and full-stack delivery at scale.",
    lat: 20.59,
    lng: 78.96,
  },
  {
    code: "ae",
    region: "Middle East",
    name: "UAE",
    label: "UAE",
    description:
      "Enterprise partners across finance, hospitality, and smart-city platforms.",
    lat: 23.42,
    lng: 53.85,
  },
  {
    code: "qa",
    region: "Middle East",
    name: "Qatar",
    label: "Qatar",
    description:
      "Digital transformation programs for high-growth Gulf enterprises.",
    lat: 25.35,
    lng: 51.18,
  },
  {
    code: "bh",
    region: "Middle East",
    name: "Bahrain",
    label: "Bahrain",
    description:
      "Fintech and regulated industries — secure, compliant product builds.",
    lat: 26.07,
    lng: 50.56,
  },
  {
    code: "gb",
    region: "Europe",
    name: "United Kingdom",
    label: "UK",
    description:
      "Design systems and scalable SaaS for UK startups and scale-ups.",
    lat: 54.7,
    lng: -3.28,
  },
  {
    code: "us",
    region: "Americas",
    name: "United States",
    label: "USA",
    description: "Product squads embedded with US teams across time zones.",
    lat: 39.83,
    lng: -98.58,
  },
  {
    code: "vn",
    region: "Southeast Asia",
    name: "Vietnam",
    label: "Vietnam",
    description:
      "Nearshore collaboration for rapid iteration and mobile-first builds.",
    lat: 14.06,
    lng: 108.28,
  },
  {
    code: "my",
    region: "Southeast Asia",
    name: "Malaysia",
    label: "Malaysia",
    description:
      "Regional delivery for commerce, logistics, and platform products.",
    lat: 4.21,
    lng: 101.98,
  },
];

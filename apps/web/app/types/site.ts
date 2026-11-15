export type Site = {
  slug: string;
  title: string;
  category: string;
  description: string;
  url: string;          // deployed URL (iframe src)
  thumbnail: string;    // tall full-page screenshot, e.g. /sites/acme.jpg
  tags: string[];
  client?: string;
  year?: number;
  metrics?: { label: string; value: string }[];
};
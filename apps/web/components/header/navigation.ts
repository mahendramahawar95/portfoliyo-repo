// packages/ui/src/data/navigation.ts
export type NavSubItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavSubItem[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Full-Stack Development",
        href: "/services/full-stack-development",
      },
      { label: "Web App Development", href: "/services/web-app-development" },
      {
        label: "Mobile App Development",
        href: "/services/mobile-app-development",
      },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "SaaS Product Development", href: "/services/saas-development" },
      { label: "API & Backend Engineering", href: "/services/api-backend" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "AI & Automation", href: "/services/ai-automation" },
      { label: "Legacy Modernization", href: "/services/legacy-modernization" },
      { label: "QA & Testing", href: "/services/qa-testing" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "E-commerce Platforms", href: "/solutions/e-commerce" },
      { label: "Healthcare Software", href: "/solutions/healthcare" },
      { label: "Fintech Applications", href: "/solutions/fintech" },
      { label: "EdTech Platforms", href: "/solutions/edtech" },
      { label: "Logistics & Supply Chain", href: "/solutions/logistics" },
      {
        label: "Enterprise Dashboards",
        href: "/solutions/enterprise-dashboards",
      },
    ],
  },
  {
    label: "Technologies",
    href: "/technologies",
    children: [
      { label: "React & Next.js", href: "/technologies/react-nextjs" },
      { label: "Node.js & NestJS", href: "/technologies/nodejs-nestjs" },
      { label: "TypeScript", href: "/technologies/typescript" },
      { label: "PostgreSQL & Prisma", href: "/technologies/postgresql-prisma" },
      { label: "AWS & Docker", href: "/technologies/aws-docker" },
      { label: "React Native", href: "/technologies/react-native" },
    ],
  },
  {
    label: "Work",
    href: "/work",
    children: [
      { label: "Case Studies", href: "/work/case-studies" },
      { label: "Portfolio", href: "/work/portfolio" },
      { label: "Client Stories", href: "/work/client-stories" },
      { label: "Trusted Partners", href: "/work/partners" },
    ],
  },
  {
    label: "Process",
    href: "/process",
    children: [
      { label: "How We Work", href: "/process/how-we-work" },
      { label: "Engagement Models", href: "/process/engagement-models" },
      { label: "Security & Compliance", href: "/process/security-compliance" },
      { label: "Support & Maintenance", href: "/process/support" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Us", href: "/about/company" },
      { label: "Our Story", href: "/about/our-story" },
      { label: "Team", href: "/about/team" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      {
        label: "Engineering Insights",
        href: "/resources/engineering-insights",
      },
      { label: "Guides & Whitepapers", href: "/resources/guides" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
];

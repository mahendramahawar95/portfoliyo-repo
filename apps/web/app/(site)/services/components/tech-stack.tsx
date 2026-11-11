"use client";

// apps/web/components/sections/tech-stack.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@repo/ui/lib/cn";
import Image from "next/image";

export interface TechItem {
  name: string;
  /** URL of the logo (SVG works best). */
  icon: string;
  /** Shown in the footer line when the chip is selected. */
  note?: string;
}

export interface TechLane {
  title: string;
  description: string;
  items: TechItem[];
}

export interface TechStackProps {
  badge?: string;
  heading?: ReactNode;
  lede?: ReactNode;
  lanes?: TechLane[];
  /** Name of the chip selected on first render. */
  defaultActive?: string | null;
  className?: string;
}

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;

const defaultLanes: TechLane[] = [
  {
    title: "Cloud & Infra",
    description: "Where products run and scale",
    items: [
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/amazon-web-services.svg",
      },
      { name: "Google Cloud", icon: devicon("googlecloud/googlecloud-original") },
      {
        name: "Azure",
        icon: devicon("azure/azure-original"),
        note: "enterprise identity and hybrid deployments.",
      },
      { name: "Docker", icon: devicon("docker/docker-original") },
      { name: "Kubernetes", icon: devicon("kubernetes/kubernetes-plain") },
      { name: "Terraform", icon: devicon("terraform/terraform-original") },
      { name: "Nginx", icon: devicon("nginx/nginx-original") },
      { name: "Linux", icon: devicon("linux/linux-original") },
    ],
  },
  {
    title: "Product Surfaces",
    description: "Interfaces and application runtimes",
    items: [
      { name: "React", icon: devicon("react/react-original") },
      { name: "Next.js", icon: devicon("nextjs/nextjs-original") },
      { name: "TypeScript", icon: devicon("typescript/typescript-original") },
      { name: "Node.js", icon: devicon("nodejs/nodejs-original") },
      { name: "Python", icon: devicon("python/python-original") },
      { name: "Flutter", icon: devicon("flutter/flutter-original") },
      { name: "Vue.js", icon: devicon("vuejs/vuejs-original") },
      { name: "GraphQL", icon: devicon("graphql/graphql-plain") },
      { name: "GitHub", icon: devicon("github/github-original") },
    ],
  },
  {
    title: "Intelligence & Data",
    description: "Models, storage, and decision layers",
    items: [
      { name: "TensorFlow", icon: devicon("tensorflow/tensorflow-original") },
      { name: "PyTorch", icon: devicon("pytorch/pytorch-original") },
      { name: "PostgreSQL", icon: devicon("postgresql/postgresql-original") },
      { name: "MongoDB", icon: devicon("mongodb/mongodb-original") },
      { name: "Redis", icon: devicon("redis/redis-original") },
      { name: "MySQL", icon: devicon("mysql/mysql-original") },
      { name: "Elasticsearch", icon: devicon("elasticsearch/elasticsearch-original") },
      { name: "Firebase", icon: devicon("firebase/firebase-plain") },
    ],
  },
];

export function TechStack({
  badge = "Engineering Stack",
  heading = "Built on tools that hold up in production",
  lede = "Not a logo wall - the layers we actually ship with: cloud, product surfaces, intelligence, and the data systems underneath.",
  lanes = defaultLanes,
  defaultActive = "Azure",
  className,
}: TechStackProps) {
  const [active, setActive] = useState<string | null>(defaultActive);

  const activeLane = lanes.find((lane) =>
    lane.items.some((item) => item.name === active),
  );
  const activeItem = activeLane?.items.find((item) => item.name === active);

  return (
    <section
      aria-labelledby="tech-stack-title"
      className={cn("relative z-1 py-3xl", className)}
    >
      <div className="container">
      <div className="mx-auto max-w-default p-md">
        {/* Header */}
        <div className="mb-xl grid items-end gap-md lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="mb-md inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 shadow-sm">
              <span className="size-2 rounded-pill bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                {badge}
              </span>
            </span>
            <h2
              id="tech-stack-title"
              className="text-h2 font-bold tracking-tight text-primary-dark"
            >
              {heading}
            </h2>
          </div>

          <p className="text-body text-content-secondary lg:col-span-5 lg:col-start-8">
            {lede}
          </p>
        </div>

        {/* Atlas */}
        <div className="flex flex-col p-md gap-md rounded-xl border border-ink-900/8 bg-tech-atlas p-4.6 backdrop-blur-sm">
          {lanes.map((lane, i) => {
            const isActiveLane = lane === activeLane;

            return (
              <div
                key={lane.title}
                data-active={isActiveLane}
                className="grid p-md items-center gap-x-6 gap-y-4 rounded-[1.1rem] border border-ink-900/6 bg-white/55 px-5.4 py-5 transition duration-300 hover:border-trust-blue/28 hover:bg-white/92 hover:shadow-process data-[active=true]:border-trust-blue/28 data-[active=true]:bg-white/92 data-[active=true]:shadow-process lg:grid-cols-[minmax(11rem,15rem)_1fr]"
              >
                <div className="flex gap-3">
                  <span className="shrink-0 pt-0.8 font-display text-xs font-semibold tracking-widest text-trust-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-body-lg font-semibold tracking-tight text-primary-dark">
                      {lane.title}
                    </h3>
                    <p className="mt-1 text-small text-content-secondary">
                      {lane.description}
                    </p>
                  </div>
                </div>

                <ul role="list" className="flex flex-wrap gap-2.5">
                  {lane.items.map((item) => (
                    <li key={item.name} className="">
                      <button
                        type="button"
                        aria-pressed={active === item.name}
                        onClick={() =>
                          setActive(active === item.name ? null : item.name)
                        }
                        className="group px-sm py-xs inline-flex items-center gap-2 rounded-pill border border-ink-900/10 bg-white/88 py-2.2 pe-3.6 ps-2.6 text-xs font-semibold tracking-tight text-ink-900/72 transition duration-250 ease-smooth hover:-translate-y-0.5 hover:border-trust-blue/40 hover:bg-white hover:text-ink-900 hover:shadow-md aria-pressed:border-trust-blue aria-pressed:bg-trust-blue/10 aria-pressed:text-ink-900 aria-pressed:shadow-md"
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={18}
                          height={18}
                          loading="lazy"
                          className="size-7 opacity-70 grayscale transition duration-250 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0 group-aria-pressed:opacity-100 group-aria-pressed:grayscale-0"
                        />
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <p
            aria-live="polite"
            className="px-2 pt-1 text-small text-content-secondary"
          >
            {activeItem && activeLane ? (
              <>
                <strong className="font-semibold text-primary-dark">
                  {activeItem.name}
                </strong>{" "}
                · <em className="not-italic text-trust-blue-dark">{activeLane.title}</em>{" "}
                - {activeItem.note ?? activeLane.description}
              </>
            ) : (
              "Select a tool to see where it fits in our stack."
            )}
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}

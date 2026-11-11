
import React from "react";
import "./orbit-cards.css";

export interface OrbitCardItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  label?: string;
}

interface OrbitCardsProps {
  cards?: OrbitCardItem[];
  centerTitle?: string;
  centerSubtitle?: string;
  duration?: number;
  className?: string;
}

const defaultCards: OrbitCardItem[] = [
  {
    id: "01",
    title: "React.js",
    description: "Modern UI development",
    icon: "⚛️",
    label: "Frontend",
  },
  {
    id: "02",
    title: "Next.js",
    description: "Full-stack framework",
    icon: "▲",
    label: "Framework",
  },
  {
    id: "03",
    title: "Node.js",
    description: "Backend development",
    icon: "🟢",
    label: "Backend",
  },
  {
    id: "04",
    title: "TypeScript",
    description: "Type-safe development",
    icon: "TS",
    label: "Language",
  },
  {
    id: "05",
    title: "Tailwind CSS",
    description: "Beautiful interfaces",
    icon: "🎨",
    label: "Styling",
  },
  {
    id: "06",
    title: "PostgreSQL",
    description: "Reliable databases",
    icon: "🐘",
    label: "Database",
  },
];

export function OrbitCards({
  cards = defaultCards,
  centerTitle = "DIGITAL",
  centerSubtitle = "ECOSYSTEM",
  duration = 24,
  className = "",
}: OrbitCardsProps) {
  return (
    <div className={`orbit-section ${className}`}>
      <div
        className="orbit-scene"
        style={
          {
            "--orbit-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {/* Orbit rings */}
        <div className="orbit-ring orbit-ring--outer" />
        <div className="orbit-ring orbit-ring--inner" />

        {/* Central circle */}
          <div
      className="absolute left-1/2 top-[53%] z-5 grid size-orbit-center -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/95 bg-orbit-center shadow-orbit-center ring-10 ring-white/25 backdrop-blur-[7px]">
      {/* Soft glow behind the circle */}
      <div
        aria-hidden="true"
        className="absolute -inset-7.5 -z-1 rounded-full bg-radial-[circle] from-trust-blue/18 to-transparent to-69%"
      />

      <div className="relative text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-3 block size-2.5 rounded-full bg-white shadow-orbit-dot"
        />
        <h2 className="text-body-lg font-extrabold leading-none tracking-wide text-primary-dark">
          {centerTitle}
        </h2>
        <p className="mt-1.5 text-kicker font-bold tracking-kicker text-trust-blue-dark">
          {centerSubtitle}
        </p>
      </div>
    </div>
        {/* <div className="orbit-center">
          <div className="orbit-center__glow" />

          <div className="orbit-center__content">
            <span className="orbit-center__dot" />

            <h2>{centerTitle}</h2>
            <p>{centerSubtitle}</p>
          </div>
        </div> */}

        {/* Orbiting cards */}
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="orbit-card-position  left-full top-[50%]"
            style={
              {
                "--card-index": index,
                "--card-count": cards.length,
                "--orbit-delay": `${-(index * duration) / cards.length}s`,
              } as React.CSSProperties
            }
          >
            <article className="orbit-card ">
              {card.label && (
                <span className="orbit-card__label">
                  {card.label}
                </span>
              )}

              <div className="orbit-card__icon">
                {card.icon}
              </div>

              <div className="orbit-card__info">
                <h3>{card.title}</h3>
                {card.description && (
                  <p>{card.description}</p>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrbitCards;

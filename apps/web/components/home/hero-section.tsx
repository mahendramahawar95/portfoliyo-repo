// apps/web/components/hero-section.tsx
// Adjust the import paths below to where these components live in your repo.
import type { ReactNode } from "react";
import LightGradientMesh from "../../components/animations/LightGradientMesh";
import MagneticButton from "../../components/animations/MagneticButton";
import ParticleNetwork from "../../components/animations/ParticleNetwork";
// import TextReveal from "../../components/TextReveal";
import RotatingText from "../../components/animations/RotatingText";
import { cn } from "@repo/ui/lib/cn";
import { Badge } from "@repo/ui";
export interface HeroSectionProps {
  badge?: string;
  heading?: ReactNode;
  texts?: string[];
  description?: ReactNode;
  /** Replace the default button (for example with a link-based CTA). */
  cta?: ReactNode;
  /** Replace the default gradient mesh + particle network. Pass `null` for none. */
  background?: ReactNode;
  className?: string;
}

const defaultTexts = [
  "Powered by AI.",
  "Human-Led insight.",
  "AI Driven precision.",
];

function DefaultHeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden"
    >
      <LightGradientMesh
        orangeX={0.0} // left circle position (0-1)
        blueX={0.78} // right circle position (0-1)
        drift={0.05} // how far they move; 0 = no horizontal movement
        size={0.5} // smaller = wider gap
      />
      <ParticleNetwork
        density={9} // particles per 100,000px²
        maxParticles={50}
        speed={0.4}
        connectionDistance={150}
        mouseRadius={190}
        interaction="attract" // or "repel"
      />
    </div>
  );
}

export function HeroSection({
  badge = "Building Digital Solutions · AI-Ready Engineering",
  heading = "Engineering the Future of Digital",
  texts = defaultTexts,
  description = "We are an AI-driven Digital solutions company that combines thoughtful design with modern engineering to build secure, scalable digital solutions that help businesses innovate and grow.",
  cta = <MagneticButton>Get started</MagneticButton>,
  background = <DefaultHeroBackground />,
  className,
}: HeroSectionProps) {
  return (
    <>
      {background}

      <section
        className={cn(
          "relative isolate w-full overflow-hidden bg-transparent",
          className,
        )}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-md py-3xl text-center">
          <Badge className="mb-md inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <span
              className="size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              {badge}
            </span>
          </Badge>

          <h1 className="text-h1 font-bold tracking-tight text-primary-dark">
            {heading}
          </h1>

          <RotatingText
            texts={texts}
            className="justify-self-start bg-linear-to-r from-primary via-secondary to-primary-light bg-clip-text text-h2 font-bold text-transparent box-decoration-clone transition-all duration-700 ease-out"
          />

          <p className="mx-auto mb-lg mt-md max-w-4xl text-body-lg leading-8 text-content-secondary">
            {description}
          </p>

          {cta}
        </div>
      </section>
    </>
  );
}

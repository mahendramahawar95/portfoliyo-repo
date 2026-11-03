import type { CSSProperties } from "react";

type AnimatedGridBackgroundProps = {
  /** "light" matches your white gradient mesh, "dark" suits dark sections */
  theme?: "light" | "dark";
  /** Grid cell size in px */
  cellSize?: number;
  /** Seconds for the grid to slide one cell. Higher = slower. */
  panDuration?: number;
  /** Turn the sliding grid off but keep the glows */
  pan?: boolean;
  className?: string;
};

// No hooks or browser APIs, so this works as a Server Component
export default function AnimatedGridBackground({
  theme = "light",
  cellSize = 56,
  panDuration = 6,
  pan = true,
  className = "",
}: AnimatedGridBackgroundProps) {
  const vars = { "--grid-cell": `${cellSize}px` } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`grid-bg ${theme === "dark" ? "grid-bg--dark" : ""} ${className}`}
      style={vars}
    >
      <div className="grid-bg__glow grid-bg__glow--mix" />
      <div className="grid-bg__glow grid-bg__glow--blue" />
      <div className="grid-bg__glow grid-bg__glow--orange" />

      <div className="grid-bg__mask">
        <div
          className="grid-bg__grid"
          style={
            pan
              ? { animationDuration: `${panDuration}s` }
              : { animation: "none" }
          }
        />
      </div>
    </div>
  );
}

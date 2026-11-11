"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType } from "react";
import "./TextReveal.css";

type TextRevealProps = {
  /** The text to reveal. In "lines" mode, use "\n" to separate lines. */
  text: string;
  /** Element to render, e.g. "h1", "h2", "p" */
  as?: ElementType;
  /** Reveal word by word, or line by line */
  mode?: "words" | "lines";
  /** Delay between each word/line in ms */
  stagger?: number;
  /** Duration of each word/line animation in ms */
  duration?: number;
  /** Delay before the whole animation starts in ms */
  delay?: number;
  /** Only animate the first time it enters the viewport */
  once?: boolean;
  className?: string;
};

export default function TextReveal({
  text,
  as: Tag = "h1",
  mode = "words",
  stagger = mode === "words" ? 70 : 140,
  duration = 700,
  delay = 0,
  once = true,
  className = "",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const items =
    mode === "words"
      ? text.split(/\s+/).filter(Boolean)
      : text.split("\n").filter((line) => line.trim().length > 0);

  const vars = {
    "--tr-stagger": `${stagger}ms`,
    "--tr-duration": `${duration}ms`,
    "--tr-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      // Screen readers get the full sentence, not split fragments
      aria-label={text.replace(/\n/g, " ")}
      className={`text-reveal text-reveal--${mode} ${
        visible ? "is-visible" : ""
      } ${className}`}
      style={vars}
    >
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="text-reveal__mask" aria-hidden="true">
            <span
              className="text-reveal__inner"
              style={{ "--i": i } as CSSProperties}
            >
              {item}
            </span>
          </span>
          {/* Normal space between words so text wraps naturally */}
          {mode === "words" && i < items.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

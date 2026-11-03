"use client";

import { useEffect, useState } from "react";

type RotatingTextProps = {
  texts: string[];
  className?: string;
};

export default function RotatingText({ texts, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, 2500);
    return () => clearInterval(id);
  }, [texts]);

  return (
    <div className="grid justify-center">
      {texts.map((text, i) => (
        <h2
          key={text}
          aria-hidden={i !== index}
          className={`col-start-1 row-start-1 w-fit ${className} ${
            i === index
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          {text}
        </h2>
      ))}
    </div>
  );
}

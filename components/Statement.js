"use client";

import { useEffect, useRef, useState } from "react";

// Large serif statement whose words darken one by one as it scrolls through the viewport.
// `parts` is an array of { text, italic } runs.
export default function Statement({ parts }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  const words = parts.flatMap((p) =>
    p.text.split(" ").filter(Boolean).map((w) => ({ w, italic: p.italic }))
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top reaches 85% of the viewport, 1 when the bottom reaches 55%
      const start = vh * 0.85;
      const end = vh * 0.55;
      const p = (start - r.top) / (start - end + r.height);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lit = progress * words.length;

  return (
    <p
      ref={ref}
      className="max-w-[16ch] font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-light leading-[1.02] tracking-tight"
    >
      {words.map(({ w, italic }, i) => {
        const on = Math.min(1, Math.max(0, lit - i));
        return (
          <span
            key={i}
            className={italic ? "italic" : undefined}
            style={{
              color: `color-mix(in srgb, var(--color-ink) ${Math.round(on * 100)}%, var(--color-faint))`,
              transition: "color 0.25s linear",
            }}
          >
            {w}{" "}
          </span>
        );
      })}
    </p>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

// Large serif statement on a raised card. Words darken one by one as it scrolls past.
export default function Statement({ text }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ").filter(Boolean);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      const start = vh * 0.85;
      const end = vh * 0.5;
      setProgress(Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height))));
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
    <section className="px-0 py-10 md:py-14">
      <div className="rounded-t-[28px] bg-sand-2/60 px-5 pb-28 pt-20 shadow-[0_-18px_40px_-28px_rgb(42_26_20/0.45),inset_0_1px_0_rgb(255_255_255/0.5)] md:px-6 md:pb-40 md:pt-28">
        <p ref={ref} className="max-w-[19ch] font-serif text-[clamp(2.5rem,5.6vw,5.4rem)] leading-[1.06] tracking-[-0.015em]">
          {words.map((w, i) => {
            const on = Math.min(1, Math.max(0, lit - i));
            return (
              <span
                key={i}
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
      </div>
    </section>
  );
}

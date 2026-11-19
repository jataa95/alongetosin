"use client";

import { useRef, useState } from "react";
import Link from "next/link";

// Dark "From the studio" section: one process reel at a time, with a picker.
export default function StudioReel({ reels }) {
  const [active, setActive] = useState(0);
  const videoRef = useRef(null);
  const reel = reels[active];

  const pick = (i) => {
    setActive(i);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <section id="studio" className="grain-dark scroll-mt-16 text-cream">
      <div className="grid gap-12 px-5 py-24 md:grid-cols-[1fr_auto] md:gap-20 md:px-6 md:py-28">
        <div className="flex flex-col justify-center">
          <p className="label mb-6 text-cream/50">From the studio</p>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[1] tracking-tight">
            A sneak peek
            <br />
            into <span className="text-tan">Tosin’s</span>
            <br />
            process.
          </h2>
          <p className="mt-6 max-w-sm text-[13.5px] leading-relaxed text-cream/70">
            Every piece begins as a faint line on bare paper or canvas, then is built up layer by layer —
            graphite, charcoal, brush and eraser — until the eyes look back.
          </p>

          <ol className="mt-10 max-w-xl border-t border-cream/15">
            {reels.map((r, i) => (
              <li key={r.slug} className="border-b border-cream/10">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={i === active}
                  className={`flex w-full items-baseline gap-4 py-2.5 text-left transition-colors ${
                    i === active ? "text-cream" : "text-cream/40 hover:text-cream/80"
                  }`}
                >
                  <span className="label w-6 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-xl md:text-2xl">
                    {r.title} {r.subtitle && <span className={i === active ? "text-tan" : ""}>{r.subtitle}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <Link href={`/works/${reel.slug}`} className="label link-line mt-8 self-start text-cream/80">
            See the finished work →
          </Link>
        </div>

        <figure className="w-full md:w-[360px]">
          <video
            ref={videoRef}
            key={reel.src}
            src={reel.src}
            poster={reel.poster}
            controls
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full rounded-sm bg-black object-cover"
          />
          <figcaption className="mt-2 text-[11px] text-cream/50">Studio reel — sound on</figcaption>
        </figure>
      </div>
    </section>
  );
}

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
    // Let React swap the source, then start playback (user gesture, so sound is allowed).
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <section id="studio" className="scroll-mt-16 bg-night text-paper">
      <div className="grid gap-12 px-5 py-24 md:grid-cols-2 md:px-6 md:py-32">
        <div className="flex flex-col justify-end">
          <p className="label mb-6 text-paper/50">From the studio</p>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-light leading-[0.98] tracking-tight">
            Watch a piece
            <br />
            come <em>alive.</em>
          </h2>
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-paper/70">
            Every work starts as a faint line on bare paper or canvas. Layer by layer — graphite, charcoal,
            brush and eraser — the face is found slowly, by hand.
          </p>

          <ol className="mt-12 space-y-1 border-t border-paper/15 pt-6">
            {reels.map((r, i) => (
              <li key={r.slug}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={i === active}
                  className={`group flex w-full items-baseline gap-4 py-1.5 text-left transition-colors ${
                    i === active ? "text-paper" : "text-paper/40 hover:text-paper/80"
                  }`}
                >
                  <span className="label w-6 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl md:text-3xl">{r.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <Link href={`/works/${reel.slug}`} className="link-arrow mt-8 self-start text-[13px]">
            See the finished work →
          </Link>
        </div>

        <div className="md:flex md:justify-end">
          <figure className="w-full md:max-w-[440px]">
            <video
              ref={videoRef}
              key={reel.src}
              src={reel.src}
              poster={reel.poster}
              controls
              playsInline
              preload="metadata"
              className="aspect-[9/16] w-full bg-black object-cover"
            />
            <figcaption className="mt-3 text-[12px] text-paper/50">Studio reel — sound on</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

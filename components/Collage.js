import Image from "next/image";
import Link from "next/link";
import { artist, getWork } from "@/data/site";

const T = (src, alt, w = 720, h = 1280) => ({ src, alt, width: w, height: h });

// A loose wall of finished works and studio moments, the name set large behind it.
const fromWork = (slug, caption) => {
  const w = getWork(slug);
  return { ...w.image, href: `/works/${slug}`, caption: caption ?? w.title };
};

const columns = [
  {
    size: "narrow",
    offset: "md:mt-[9vw]",
    tiles: [
      T("/works/process-brushes.jpg", "Brushes used to blend charcoal", 720, 960),
      T("/works/process-palette.jpg", "Mixing paint on the palette"),
      T("/works/process-charcoal.jpg", "Blending charcoal with a fine brush"),
    ],
  },
  {
    size: "wide",
    offset: "md:mt-[17vw]",
    tiles: [
      fromWork("the-warmth-that-outlived-the-dark"),
      fromWork("adigun-ati-akanni", "Adigun ati Akanni, detail"),
      T("/works/process-sketch.jpg", "First line drawing on canvas", 720, 960),
    ],
  },
  {
    size: "wide",
    offset: "md:mt-[13vw]",
    tiles: [fromWork("my-serenity"), T("/works/process-serenity-wing.jpg", "Drawing the wing of My Serenity")],
  },
  {
    size: "wide",
    offset: "md:mt-[19vw]",
    tiles: [fromWork("golden-hour", "Black Wings, Gold Sun"), fromWork("muhammad-ali")],
  },
  {
    size: "narrow",
    offset: "md:mt-[10vw]",
    tiles: [
      T("/works/process-ali-detail.jpg", "Painting the boxer’s glove"),
      T("/works/studio.jpg", "Tosin at the easel"),
      T("/works/process-serenity-pencil.jpg", "Pencil work on My Serenity"),
    ],
  },
];

function Tile({ tile, delay, eager }) {
  const img = (
    <Image
      src={tile.src}
      alt={tile.alt}
      width={tile.width}
      height={tile.height}
      sizes="(min-width: 768px) 26vw, 50vw"
      preload={eager}
      className="h-auto w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
    />
  );
  return (
    <figure className="tile" style={{ animationDelay: `${delay}ms` }}>
      {tile.href ? (
        <Link href={tile.href} className="group block overflow-hidden">
          {img}
        </Link>
      ) : (
        <div className="overflow-hidden">{img}</div>
      )}
      {tile.caption && <figcaption className="mt-1.5 text-[11px] text-mute">{tile.caption}</figcaption>}
    </figure>
  );
}

export default function Collage() {
  return (
    <section className="relative pt-16" aria-label="Selected works and studio moments">
      <div className="relative px-5 md:px-0">
        <h1 className="relative z-0 flex items-start justify-between gap-6 md:absolute md:left-[18vw] md:right-[13vw] md:top-[1vw]">
          <span className="block overflow-hidden font-serif text-[clamp(6rem,24vw,22rem)] font-light leading-[0.85] tracking-[-0.03em]">
            {"Tosin".split("").map((c, i) => (
              <span key={i} className="rise" style={{ animationDelay: `${120 + i * 70}ms` }}>
                {c}
              </span>
            ))}
            <span className="sr-only"> — {artist.name}, hyperrealist artist</span>
          </span>
          <span className="hidden pt-[1.2vw] text-[15px] leading-snug md:block">
            {artist.tagline[0]}
            <br />
            {artist.tagline[1]}
          </span>
        </h1>
        <p className="mb-6 text-[15px] leading-snug md:hidden">
          {artist.tagline[0]} {artist.tagline[1]}
        </p>
      </div>

      {/* Desktop: five staggered columns */}
      <div className="relative z-10 hidden grid-cols-[11fr_26fr_26fr_26fr_11fr] gap-1 md:grid">
        {columns.map((col, c) => (
          <div key={c} className={`flex flex-col gap-1 ${col.offset}`}>
            {col.tiles.map((t, i) => (
              <Tile key={t.src + i} tile={t} delay={300 + (c * 2 + i) * 110} eager={c === 2 && i === 0} />
            ))}
          </div>
        ))}
      </div>

      {/* Phones: two columns */}
      <div className="relative z-10 grid grid-cols-2 gap-1 md:hidden">
        {[0, 1].map((side) => (
          <div key={side} className={`flex flex-col gap-1 ${side ? "mt-16" : ""}`}>
            {columns
              .flatMap((c) => c.tiles)
              .slice(0, 8)
              .filter((_, i) => i % 2 === side)
              .map((t, i) => (
                <Tile key={t.src + i} tile={t} delay={200 + i * 100} eager={i === 0} />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}

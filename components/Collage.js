import Image from "next/image";
import Link from "next/link";
import { artist, getWork, fullTitle } from "@/data/site";

const T = (src, alt, caption, w = 720, h = 1280) => ({ src, alt, caption, width: w, height: h });

const fromWork = (slug, caption) => {
  const w = getWork(slug);
  return { ...w.image, href: `/works/${slug}`, caption: caption ?? fullTitle(w) };
};

// Five staggered columns of finished works and studio moments, in black and white.
const columns = [
  {
    offset: "md:mt-[11vw]",
    tiles: [
      { ...T("/works/process-brushes.jpg", "Brushes used to blend charcoal", "Brushes", 720, 960), aspect: "aspect-[3/4]" },
      { ...T("/works/process-palette.jpg", "Mixing paint on the palette", "The palette"), aspect: "aspect-[3/4]" },
      { ...T("/works/process-charcoal.jpg", "Blending charcoal with a fine brush", null), aspect: "aspect-[3/4]" },
    ],
  },
  {
    offset: "md:mt-[12.5vw]",
    tiles: [
      { ...fromWork("the-warmth-that-outlived-the-dark"), aspect: "aspect-[4/5]" },
      { ...fromWork("adigun-ati-akanni", "On the wall — Adigun ati Akanni"), aspect: "aspect-[5/4]" },
      { ...T("/works/process-sketch.jpg", "First line drawing on canvas", "The drawing", 720, 960), aspect: "aspect-[1/1]" },
    ],
  },
  {
    offset: "md:mt-[9.5vw]",
    tiles: [
      { ...fromWork("my-serenity"), aspect: "aspect-[4/5]" },
      { ...T("/works/studio.jpg", "Tosin painting at the easel", "In the studio"), href: "/about", aspect: "aspect-[1/1]" },
      { ...fromWork("muhammad-ali"), aspect: "aspect-[5/4]" },
    ],
  },
  {
    offset: "md:mt-[14vw]",
    tiles: [
      { ...fromWork("golden-hour"), aspect: "aspect-[4/5]" },
      { ...T("/works/process-serenity-wing.jpg", "Drawing the wing of My Serenity", "On the easel"), aspect: "aspect-[1/1]" },
      { ...T("/works/adigun-ati-akanni-detail.jpg", "Detail of one twin beside a drum", "Detail", 1440, 1416), aspect: "aspect-[5/4]" },
    ],
  },
  {
    offset: "md:mt-[11vw]",
    tiles: [
      { ...T("/works/process-ali-detail.jpg", "Painting the boxer’s glove", null), aspect: "aspect-[3/4]" },
      { ...T("/works/process-underpainting.jpg", "Ochre underpainting", "Underpainting"), aspect: "aspect-[3/4]" },
      { ...T("/works/process-serenity-pencil.jpg", "Pencil work on My Serenity", null), aspect: "aspect-[3/4]" },
    ],
  },
];

function Tile({ tile, delay, eager }) {
  const body = (
    <>
      <div className={`overflow-hidden ${tile.aspect ?? ""}`}>
        <Image
          src={tile.src}
          alt={tile.alt}
          width={tile.width}
          height={tile.height}
          sizes="(min-width: 768px) 26vw, 50vw"
          preload={eager}
          className={`mono w-full group-hover:scale-[1.03] ${tile.aspect ? "h-full object-cover object-top" : "h-auto"}`}
        />
      </div>
      {tile.caption && <figcaption className="mt-1 pb-1 text-[10.5px] text-mute">{tile.caption}</figcaption>}
    </>
  );
  return (
    <figure className="tile" style={{ animationDelay: `${delay}ms` }}>
      {tile.href ? (
        <Link href={tile.href} className="group block">
          {body}
        </Link>
      ) : (
        <div className="group">{body}</div>
      )}
    </figure>
  );
}

export default function Collage() {
  // Phones: finished works first, then a couple of studio moments.
  const all = columns.flatMap((c) => c.tiles);
  const order = ["my-serenity", "golden-hour", "warmth-that", "muhammad-ali", "adigun-ati-akanni.jpg", "studio", "process-sketch", "process-brushes"];
  const phone = order.map((key) => all.find((t) => t.src.includes(key))).filter(Boolean);
  return (
    <section className="relative pt-24 md:pt-28" aria-label="Works and studio moments">
      <p className="relative z-10 px-5 text-center text-[13px] md:text-[14px]">{artist.tagline}</p>

      <h1 className="relative z-0 mt-2 overflow-hidden text-center font-serif text-[18.6vw] leading-[0.9] tracking-[-0.035em] md:absolute md:inset-x-0 md:top-[8.5rem] md:mt-0">
        {artist.wordmark.split("").map((c, i) => (
          <span key={i} className="rise" style={{ animationDelay: `${100 + i * 55}ms` }}>
            {c}
          </span>
        ))}
        <span className="sr-only"> — {artist.name}</span>
      </h1>

      <div className="relative z-10 mt-6 hidden grid-cols-[11fr_26fr_26fr_26fr_11fr] gap-1 md:mt-0 md:grid">
        {columns.map((col, c) => (
          <div key={c} className={`flex flex-col gap-1 ${col.offset}`}>
            {col.tiles.map((t, i) => (
              <Tile key={t.src + i} tile={t} delay={350 + (c * 2 + i) * 100} eager={c === 2 && i === 0} />
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-2 gap-1 md:hidden">
        {[0, 1].map((side) => (
          <div key={side} className={`flex flex-col gap-1 ${side ? "mt-14" : ""}`}>
            {phone
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

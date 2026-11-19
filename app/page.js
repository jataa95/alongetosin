import Image from "next/image";
import Link from "next/link";
import Collage from "@/components/Collage";
import Statement from "@/components/Statement";
import StudioReel from "@/components/StudioReel";
import Reveal from "@/components/Reveal";
import WorkFacts from "@/components/WorkFacts";
import { getWork, reels, works } from "@/data/site";

export default function Home() {
  const featured = getWork("my-serenity");

  const process = [
    {
      label: "First line",
      title: "Black wings, gold sun — from a blank canvas",
      image: { src: "/works/process-sketch.jpg", width: 720, height: 960, alt: "Line drawing on a blank canvas" },
      href: "/works/golden-hour",
    },
    {
      label: "In the studio",
      title: "Painting the fight: Muhammad Ali on canvas",
      image: { src: "/works/process-ali-detail.jpg", width: 720, height: 1280, alt: "Painting a boxing glove" },
      href: "/works/muhammad-ali",
    },
    {
      label: "Commission",
      title: "Adigun ati Akanni pe Odun Kan",
      image: getWork("adigun-ati-akanni").image,
      href: "/works/adigun-ati-akanni",
    },
  ];

  return (
    <>
      <Collage />

      <section className="px-5 py-40 md:px-[2.5vw] md:py-56">
        <Statement
          parts={[
            { text: "Tosin", italic: true },
            { text: "draws and paints people the way memory holds them —" },
            { text: "faith, family, tenderness", italic: true },
            { text: "and" },
            { text: "quiet strength.", italic: true },
          ]}
        />
      </section>

      {/* Selected work */}
      <section className="px-5 pb-32 md:px-6">
        <div className="flex items-baseline justify-between border-b border-line pb-3 text-[11px]">
          <p className="label">Selected work</p>
          <Link href="/works" className="link-arrow">All works</Link>
        </div>

        <div className="mt-3 grid gap-10 md:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] md:gap-0">
          <Reveal>
            <Link href={`/works/${featured.slug}`} className="group block overflow-hidden">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                sizes="(min-width: 768px) 56vw, 100vw"
                className="h-auto w-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
              />
            </Link>
          </Reveal>

          <div className="md:pl-[10vw]">
            <div className="md:sticky md:top-20">
              <Reveal>
                <h2 className="font-serif text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.98]">
                  My <em>Serenity</em>
                </h2>
              </Reveal>
              <Reveal delay={120} className="mt-6 max-w-sm space-y-3 font-serif text-lg italic leading-snug text-ink/80">
                <p>{featured.lede}</p>
                <p>{featured.text[0]}</p>
                <p>You gave me the blueprints to build something out of nothing.</p>
              </Reveal>
              <Reveal delay={200} className="mt-8 w-40">
                <Image
                  src={featured.gallery[1].src}
                  alt={featured.gallery[1].alt}
                  width={featured.gallery[1].width}
                  height={featured.gallery[1].height}
                  sizes="160px"
                  className="h-auto w-full"
                />
              </Reveal>
              <Reveal delay={260} className="mt-8">
                <WorkFacts work={featured} />
                <Link
                  href={`/works/${featured.slug}`}
                  className="mt-8 inline-block border border-ink px-4 py-2 text-[12px] transition-colors hover:bg-ink hover:text-paper"
                >
                  View the work →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <StudioReel reels={reels} />

      {/* Process notes */}
      <section className="px-1 pt-32 md:pt-40">
        <Reveal>
          <h2 className="px-4 font-serif text-[clamp(3rem,6vw,5.5rem)] font-light leading-none">Process</h2>
        </Reveal>
        <div className="mt-6 grid gap-1 md:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.href} delay={i * 120} className={i === 1 ? "md:mt-24" : ""}>
              <Link href={p.href} className="group block">
                <div className="aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="label mt-2 text-mute">{p.label}</p>
                <p className="label mt-0.5">{p.title}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/works" className="inline-block bg-line/70 px-4 py-2 text-[12px] transition-colors hover:bg-ink hover:text-paper">
            All {works.length} works
          </Link>
        </div>
      </section>
    </>
  );
}

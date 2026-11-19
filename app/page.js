import Image from "next/image";
import Link from "next/link";
import Collage from "@/components/Collage";
import Statement from "@/components/Statement";
import StudioReel from "@/components/StudioReel";
import Reveal from "@/components/Reveal";
import WorkFacts from "@/components/WorkFacts";
import Pill from "@/components/Pill";
import Title from "@/components/Title";
import { getWork, reels } from "@/data/site";

export default function Home() {
  const featured = getWork("my-serenity");
  const thumb = featured.gallery[0];

  const process = [
    {
      label: "Process",
      title: "Black wings, gold sun — from a blank canvas",
      image: { src: "/works/process-sketch.jpg", width: 720, height: 960, alt: "Line drawing on a blank canvas" },
      href: "/works/golden-hour",
    },
    {
      label: "Studio",
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

      <Statement text="Tosin is an artist who draws and paints African faces in graphite, charcoal and oil as quiet meditations on faith, family, tenderness and strength." />

      {/* Selected work */}
      <section className="px-5 pb-28 md:px-6">
        <div className="flex items-baseline justify-between border-b border-line pb-2.5">
          <p className="label">Selected work</p>
          <Link href="/works" className="label link-line">All works</Link>
        </div>

        <div className="mt-3 grid gap-10 md:grid-cols-[minmax(0,49fr)_minmax(0,51fr)] md:gap-0">
          <Reveal>
            <Link href={`/works/${featured.slug}`} className="group block aspect-[4/5] overflow-hidden">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                sizes="(min-width: 768px) 49vw, 100vw"
                className="mono h-full w-full object-cover object-top group-hover:scale-[1.02]"
              />
            </Link>
          </Reveal>

          <div className="md:pl-[6vw]">
            <div className="md:sticky md:top-20">
              <Reveal>
                <Title
                  as="h2"
                  stacked
                  work={featured}
                  className="font-serif text-[clamp(2.75rem,4.8vw,4.5rem)] leading-[0.98] tracking-tight"
                />
              </Reveal>
              <Reveal delay={120} className="mt-6 max-w-md space-y-3 font-serif text-[15.5px] leading-snug">
                <p className="text-[18px]">{featured.lede}</p>
                <p>{featured.text[1]}</p>
                <p>{featured.text[0]}</p>
              </Reveal>
              <Reveal delay={200} className="mt-6">
                <Link href={`/works/${featured.slug}`} className="group block w-28 overflow-hidden">
                  <Image src={thumb.src} alt={thumb.alt} width={thumb.width} height={thumb.height} sizes="112px" className="mono h-auto w-full" />
                </Link>
              </Reveal>
              <Reveal delay={260} className="mt-8 max-w-md">
                <WorkFacts work={featured} />
                <Pill href={`/works/${featured.slug}`} className="mt-7">View the work</Pill>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <StudioReel reels={reels} />

      {/* Process notes */}
      <section className="px-1 pt-28 md:pt-36">
        <Reveal>
          <h2 className="px-4 font-serif text-[clamp(3rem,6vw,5.25rem)] leading-none tracking-tight">Process</h2>
        </Reveal>
        <div className="mt-5 grid gap-1 md:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.href} delay={i * 120} className={i === 1 ? "md:mt-20" : ""}>
              <Link href={p.href} className="group block">
                <div className="aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="mono h-full w-full object-cover group-hover:scale-[1.03]"
                  />
                </div>
                <p className="label mt-2 text-mute">{p.label}</p>
                <p className="label mt-0.5">{p.title}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Pill href="/works" light>All works</Pill>
        </div>
      </section>
    </>
  );
}

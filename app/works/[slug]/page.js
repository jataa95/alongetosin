import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import WorkFacts from "@/components/WorkFacts";
import Pill from "@/components/Pill";
import Title from "@/components/Title";
import { artist, fullTitle, getWork, works } from "@/data/site";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: fullTitle(work),
    description: `${fullTitle(work)} — ${work.medium}. ${work.lede}`,
    openGraph: { images: [work.image.src] },
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const index = works.indexOf(work);
  const next = works[(index + 1) % works.length];
  const enquiry = encodeURIComponent(`Hello Tosin, I saw "${fullTitle(work)}" on your website and would like to ask about it.`);

  return (
    <article className="px-5 pt-24 md:px-6 md:pt-28">
      <div className="grid gap-10 md:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] md:gap-[3vw]">
        <div>
          <div className="md:sticky md:top-24">
            <nav className="label mb-5 text-mute">
              <Link href="/works" className="link-line">Works</Link> / {String(index + 1).padStart(2, "0")}
            </nav>
            <Title as="h1" stacked work={work} className="font-serif text-[clamp(2.75rem,5vw,4.75rem)] leading-[0.98] tracking-tight" />
            <p className="mt-6 max-w-md font-serif text-[20px] leading-snug">{work.lede}</p>
            <div className="mt-4 max-w-md space-y-3 text-[13.5px] leading-relaxed text-ink/75">
              {work.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="mt-8 max-w-md">
              <WorkFacts work={work} />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Pill href={`${artist.whatsappLink}?text=${enquiry}`} external>
                Enquire about this work
              </Pill>
              <Link href="/contact" className="label link-line">Commission similar</Link>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="group">
            <Image
              src={work.image.src}
              alt={work.image.alt}
              width={work.image.width}
              height={work.image.height}
              sizes="(min-width: 768px) 58vw, 100vw"
              preload
              className="mono is-colour h-auto w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-1">
            {work.video && (
              <figure className="col-span-2 sm:col-span-1">
                <video
                  src={work.video.src}
                  poster={work.video.poster}
                  controls
                  playsInline
                  preload="none"
                  className="aspect-[9/16] w-full bg-black object-cover"
                />
                <figcaption className="mt-1 text-[10.5px] text-mute">Studio, the reel — sound on</figcaption>
              </figure>
            )}
            {work.gallery.map((g) => (
              <Reveal key={g.src} className="group">
                <figure>
                  <div className="overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={g.width}
                      height={g.height}
                      sizes="(min-width: 768px) 29vw, 50vw"
                      className="mono aspect-[9/16] h-auto w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-1 text-[10.5px] text-mute">{g.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Link href={`/works/${next.slug}`} className="group mt-32 grid grid-cols-[auto_1fr_auto] items-end gap-6 border-t border-line pt-6 md:gap-16">
        <p className="label pb-2 text-mute">Next work</p>
        <Title
          work={next}
          className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-none transition-transform duration-500 group-hover:translate-x-2"
        />
        <div className="hidden w-32 overflow-hidden sm:block">
          <Image src={next.image.src} alt="" width={next.image.width} height={next.image.height} sizes="128px" className="mono aspect-[4/5] h-auto w-full object-cover" />
        </div>
      </Link>
    </article>
  );
}

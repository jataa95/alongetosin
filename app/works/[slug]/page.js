import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import WorkFacts from "@/components/WorkFacts";
import { artist, getWork, works } from "@/data/site";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.title,
    description: `${work.title} — ${work.medium}. ${work.lede}`,
    openGraph: { images: [work.image.src] },
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const index = works.indexOf(work);
  const next = works[(index + 1) % works.length];
  const enquiry = encodeURIComponent(`Hello Tosin, I saw "${work.title}" on your website and would like to ask about it.`);

  return (
    <article className="px-5 pt-28 md:px-6 md:pt-32">
      <nav className="label mb-8 text-mute">
        <Link href="/works" className="link-arrow">Works</Link> / {String(index + 1).padStart(2, "0")}
      </nav>

      <div className="grid gap-10 md:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] md:gap-0">
        <div className="space-y-1">
          <Image
            src={work.image.src}
            alt={work.image.alt}
            width={work.image.width}
            height={work.image.height}
            sizes="(min-width: 768px) 56vw, 100vw"
            preload
            className="h-auto w-full"
          />
          {work.gallery.map((g) => (
            <Reveal key={g.src}>
              <figure>
                <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 768px) 56vw, 100vw" className="h-auto w-full" />
                <figcaption className="mt-1.5 pb-4 text-[11px] text-mute">{g.alt}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="md:pl-[8vw]">
          <div className="md:sticky md:top-24">
            <p className="label text-mute">{work.kind}</p>
            <h1 className="mt-3 font-serif text-[clamp(2.75rem,5vw,4.75rem)] leading-[0.98]">{work.title}</h1>
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-snug">{work.lede}</p>
            <div className="mt-4 max-w-sm space-y-3 text-[14px] leading-relaxed text-ink/80">
              {work.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>

            <div className="mt-8">
              <WorkFacts work={work} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-[12px]">
              <a
                href={`${artist.whatsappLink}?text=${enquiry}`}
                target="_blank"
                rel="noreferrer"
                className="border border-ink bg-ink px-4 py-2 text-paper transition-opacity hover:opacity-80"
              >
                Enquire on WhatsApp →
              </a>
              <Link href="/contact" className="border border-ink px-4 py-2 transition-colors hover:bg-ink hover:text-paper">
                Commission something similar
              </Link>
            </div>

            {work.video && (
              <figure className="mt-12 w-56">
                <video
                  src={work.video.src}
                  poster={work.video.poster}
                  controls
                  playsInline
                  preload="none"
                  className="aspect-[9/16] w-full bg-black object-cover"
                />
                <figcaption className="mt-2 text-[11px] text-mute">Process reel — sound on</figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>

      <Link href={`/works/${next.slug}`} className="group mt-32 flex items-end justify-between gap-6 border-t border-line pt-6">
        <div>
          <p className="label text-mute">Next work</p>
          <p className="mt-2 font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-none transition-transform duration-500 group-hover:translate-x-2">
            {next.title} →
          </p>
        </div>
        <div className="hidden w-28 shrink-0 overflow-hidden sm:block">
          <Image src={next.image.src} alt="" width={next.image.width} height={next.image.height} sizes="112px" className="aspect-[4/5] h-auto w-full object-cover" />
        </div>
      </Link>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { artist } from "@/data/site";

export const metadata = {
  title: "About",
  description: "Alonge Tosin is a Nigerian visual artist working in graphite, charcoal and paint.",
};

export default function AboutPage() {
  return (
    <div className="px-5 pt-32 md:px-6 md:pt-40">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="label text-mute">About</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.95] tracking-tight">
            Alonge <em>Tosin.</em>
          </h1>
          <div className="mt-10 max-w-lg space-y-5 text-[15px] leading-relaxed text-ink/85">
            <p className="font-serif text-2xl italic leading-snug text-ink">
              Explore and create.
            </p>
            <p>
              Tosin is a visual artist based in {artist.base}, known online as <strong>@{artist.handle}</strong>.
              The work moves between hyperrealist drawing in graphite and charcoal and painting on canvas —
              large, patient pieces built over many days at the easel.
            </p>
            <p>
              The subjects are people: mothers and sons, lovers, children on their first birthday, a boxer
              mid-roar. Many carry wings, halos and the patterns of Yoruba cloth — faith and heritage woven into
              the likeness.
            </p>
            <p>
              Alongside original work, Tosin takes commissions — portraits drawn from a family’s own photographs —
              for collectors at home and abroad.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 text-[12px]">
            <Link href="/contact" className="border border-ink bg-ink px-4 py-2 text-paper transition-opacity hover:opacity-80">
              Commission a portrait →
            </Link>
            <a href={artist.instagram} target="_blank" rel="noreferrer" className="border border-ink px-4 py-2 transition-colors hover:bg-ink hover:text-paper">
              Follow on Instagram
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 self-start">
          <Reveal className="col-span-2">
            <Image src="/works/studio.jpg" alt="Tosin painting at the easel" width={720} height={1280} sizes="(min-width: 768px) 50vw, 100vw" preload className="aspect-[4/5] h-auto w-full object-cover" />
          </Reveal>
          <Reveal delay={100}>
            <Image src="/works/process-palette.jpg" alt="Paint palette" width={720} height={1280} sizes="25vw" className="aspect-[4/5] h-auto w-full object-cover" />
          </Reveal>
          <Reveal delay={180}>
            <Image src="/works/process-brushes.jpg" alt="Brushes for blending charcoal" width={720} height={960} sizes="25vw" className="aspect-[4/5] h-auto w-full object-cover" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

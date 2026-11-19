import Image from "next/image";
import Reveal from "@/components/Reveal";
import Pill from "@/components/Pill";
import { artist } from "@/data/site";

export const metadata = {
  title: "About",
  description: "Alonge Tosin is a Nigerian visual artist working in graphite, charcoal and paint.",
};

export default function AboutPage() {
  return (
    <div className="px-5 pt-28 md:px-6 md:pt-32">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="label text-mute">About</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
            Alonge
            <br />
            <span className="text-mute">Tosin.</span>
          </h1>
          <div className="mt-10 max-w-lg space-y-5 text-[14.5px] leading-relaxed text-ink/80">
            <p className="font-serif text-[24px] leading-snug text-ink">Explore and create.</p>
            <p>
              Tosin is a visual artist based in {artist.base}, known online as @{artist.handle}. The work moves
              between hyperrealist drawing in graphite and charcoal and painting on canvas: large, patient pieces
              built over many days at the easel.
            </p>
            <p>
              The subjects are people: mothers and sons, lovers, children on their first birthday, a boxer
              mid-roar. Many carry wings, halos and the patterns of Yoruba cloth, with faith and heritage woven into
              the likeness.
            </p>
            <p>
              Alongside original work, Tosin takes commissions: portraits drawn from a family’s own photographs, for
              collectors at home and abroad.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Pill href="/contact">Commission a portrait</Pill>
            <a href={artist.instagram} target="_blank" rel="noreferrer" className="label link-line">Instagram</a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 self-start">
          <Reveal className="group col-span-2 overflow-hidden">
            <Image src="/works/studio.jpg" alt="Tosin painting at the easel" width={720} height={1280} sizes="(min-width: 768px) 50vw, 100vw" preload className="mono aspect-[4/5] h-auto w-full object-cover" />
          </Reveal>
          <Reveal delay={100} className="group overflow-hidden">
            <Image src="/works/process-palette.jpg" alt="Paint palette" width={720} height={1280} sizes="25vw" className="mono aspect-[4/5] h-auto w-full object-cover" />
          </Reveal>
          <Reveal delay={180} className="group overflow-hidden">
            <Image src="/works/process-brushes.jpg" alt="Brushes for blending charcoal" width={720} height={960} sizes="25vw" className="mono aspect-[4/5] h-auto w-full object-cover" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

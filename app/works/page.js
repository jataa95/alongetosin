import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Title from "@/components/Title";
import { works } from "@/data/site";

export const metadata = {
  title: "Works",
  description: "Original drawings, paintings and commissioned portraits by Alonge Tosin.",
};

export default function WorksPage() {
  return (
    <div className="px-5 pt-28 md:px-6 md:pt-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h1 className="font-serif text-[clamp(4.5rem,13vw,12rem)] leading-[0.85] tracking-[-0.03em]">
          Wor<span className="text-mute">ks</span>
        </h1>
        <p className="max-w-xs pb-3 text-[13.5px] leading-relaxed text-mute">
          Graphite, charcoal and paint. Originals and commissioned portraits, each made entirely by hand.
        </p>
      </div>

      <ul className="mt-12 grid gap-x-[6vw] gap-y-20 md:grid-cols-2">
        {works.map((w, i) => (
          <Reveal as="li" key={w.slug} delay={(i % 2) * 120} className={i % 2 === 1 ? "md:mt-28" : ""}>
            <Link href={`/works/${w.slug}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={w.image.src}
                  alt={w.image.alt}
                  width={w.image.width}
                  height={w.image.height}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  preload={i === 0}
                  className="mono h-full w-full object-cover group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <Title as="h2" work={w} className="font-serif text-2xl leading-tight md:text-[28px]" />
                <span className="label shrink-0 text-mute">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-[12.5px] text-mute">{w.medium}</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

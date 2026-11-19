import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { works } from "@/data/site";

export const metadata = {
  title: "Works",
  description: "Original drawings, paintings and commissioned portraits by Alonge Tosin.",
};

export default function WorksPage() {
  return (
    <div className="px-5 pt-32 md:px-6 md:pt-40">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h1 className="font-serif text-[clamp(4rem,12vw,11rem)] font-light leading-[0.85] tracking-tight">Works</h1>
        <p className="max-w-xs text-[14px] leading-relaxed text-mute">
          Graphite, charcoal and paint. Originals, studies and commissioned portraits — each made entirely by hand.
        </p>
      </div>

      <ul className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w, i) => (
          <Reveal as="li" key={w.slug} delay={(i % 3) * 100} className={i % 3 === 1 ? "lg:mt-24" : ""}>
            <Link href={`/works/${w.slug}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-line">
                <Image
                  src={w.image.src}
                  alt={w.image.alt}
                  width={w.image.width}
                  height={w.image.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-2xl leading-tight md:text-3xl">{w.title}</h2>
                <span className="label shrink-0 text-mute">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-1 text-[13px] text-mute">{w.medium}</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

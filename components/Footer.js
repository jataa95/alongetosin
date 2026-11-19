import Link from "next/link";
import { artist, works } from "@/data/site";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="px-5 pb-6 pt-32 md:px-6 md:pt-44">
      <Reveal>
        <p className="max-w-[14ch] font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[1] tracking-tight">
          Faces of faith, family <span className="text-mute">and quiet strength.</span>
        </p>
      </Reveal>

      <div className="mt-24 grid grid-cols-2 gap-10 border-t border-line pt-8 text-[13px] md:grid-cols-4">
        <div>
          <p className="label mb-4 text-mute">Works</p>
          <ul className="space-y-1.5">
            {works.slice(0, 4).map((w) => (
              <li key={w.slug}>
                <Link href={`/works/${w.slug}`} className="link-line">{w.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4 text-mute">Explore</p>
          <ul className="space-y-1.5">
            <li><Link href="/works" className="link-line">All works</Link></li>
            <li><Link href="/#studio" className="link-line">Studio</Link></li>
            <li><Link href="/about" className="link-line">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="label mb-4 text-mute">Connect</p>
          <ul className="space-y-1.5">
            <li><Link href="/contact" className="link-line">Commission</Link></li>
            <li><a href={artist.instagram} target="_blank" rel="noreferrer" className="link-line">Instagram</a></li>
            <li><a href={artist.whatsappLink} target="_blank" rel="noreferrer" className="link-line">WhatsApp</a></li>
            <li><a href={`mailto:${artist.email}`} className="link-line">Email</a></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 md:text-right">
          <p className="font-serif text-5xl leading-none">Tosin</p>
          <p className="mt-2 text-mute">@{artist.handle}</p>
        </div>
      </div>

      <p className="label mt-20 text-mute">
        © {new Date().getFullYear()} {artist.name} · {artist.base}
      </p>
    </footer>
  );
}

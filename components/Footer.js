import Link from "next/link";
import { artist, works } from "@/data/site";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="px-5 pb-8 pt-32 md:px-6 md:pt-48">
      <Reveal>
        <p className="font-serif text-[clamp(3rem,9vw,9rem)] font-light leading-[0.95] tracking-tight">
          Tosin draws.
          <br />
          Tosin <em>paints.</em>
        </p>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-6 max-w-md font-serif text-2xl italic text-mute md:text-3xl">
          Faces, faith and family,
          <br />
          rendered by hand.
        </p>
      </Reveal>

      <div className="mt-24 grid grid-cols-2 gap-10 border-t border-line pt-8 text-[13px] md:grid-cols-4">
        <div>
          <p className="label mb-4 text-mute">Works</p>
          <ul className="space-y-1.5">
            {works.slice(0, 4).map((w) => (
              <li key={w.slug}>
                <Link href={`/works/${w.slug}`} className="link-arrow">{w.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4 text-mute">Explore</p>
          <ul className="space-y-1.5">
            <li><Link href="/works" className="link-arrow">All works</Link></li>
            <li><Link href="/#studio" className="link-arrow">From the studio</Link></li>
            <li><Link href="/about" className="link-arrow">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="label mb-4 text-mute">Connect</p>
          <ul className="space-y-1.5">
            <li><Link href="/contact" className="link-arrow">Commission a piece</Link></li>
            <li><a href={artist.instagram} target="_blank" rel="noreferrer" className="link-arrow">Instagram</a></li>
            <li><a href={artist.whatsappLink} target="_blank" rel="noreferrer" className="link-arrow">WhatsApp</a></li>
            <li><a href={`mailto:${artist.email}`} className="link-arrow">Email</a></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 md:text-right">
          <p className="font-serif text-5xl leading-none">Tosin</p>
          <p className="mt-2 text-mute">@{artist.handle}</p>
        </div>
      </div>

      <p className="mt-16 text-[12px] text-mute">
        © {new Date().getFullYear()} {artist.name}. All works and images are the artist’s own. All rights reserved.
      </p>
    </footer>
  );
}

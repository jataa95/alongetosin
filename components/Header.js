"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { artist, getWork, fullTitle } from "@/data/site";

const preview = (slug) => {
  const w = getWork(slug);
  return { ...w.image, caption: fullTitle(w) };
};

const items = [
  { href: "/", label: "Home", note: "Faces drawn by hand", image: preview("my-serenity") },
  { href: "/works", label: "Works", note: "Graphite, charcoal & paint", image: preview("golden-hour") },
  { href: "/#studio", label: "Studio", note: "Process reels", image: preview("muhammad-ali") },
  { href: "/about", label: "About", note: artist.name, image: { src: "/works/studio.jpg", width: 720, height: 1280, alt: "Tosin at the easel", caption: "In the studio" } },
  { href: "/contact", label: "Commission", note: "Portraits & enquiries", image: preview("adigun-ati-akanni") },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    const current = Math.max(0, items.findIndex((i) => i.href === pathname));
    setHover(current);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, pathname]);

  const shown = items[hover].image;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3.5 transition-[background,color] duration-500 md:px-6 ${
          open ? "text-cream" : scrolled ? "bg-sand/80 backdrop-blur-md" : ""
        }`}
      >
        <Link href="/" className="font-serif text-[22px] leading-none tracking-tight" aria-label={`${artist.wordmark} — home`}>
          {artist.wordmark}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`group flex items-center gap-3 rounded-full py-1 pl-4 pr-1 text-[12.5px] shadow-[0_6px_18px_-8px_rgb(42_26_20/0.6)] transition-colors ${
            open ? "bg-cream text-ink" : "bg-ink text-cream"
          }`}
        >
          <span className="roll" aria-hidden>
            <span>{open ? "Close" : "Menu"}</span>
            <span>{open ? "Close" : "Menu"}</span>
          </span>
          <span
            aria-hidden
            className={`relative grid h-8 w-8 place-items-center rounded-full ${open ? "bg-ink" : "bg-cream"}`}
          >
            <i
              className={`absolute h-px w-3 transition-transform duration-500 ${open ? "rotate-45 bg-cream" : "-translate-y-[3px] bg-ink"}`}
            />
            <i
              className={`absolute h-px w-3 transition-transform duration-500 ${open ? "-rotate-45 bg-cream" : "translate-y-[3px] bg-ink"}`}
            />
          </span>
        </button>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`grain-dark fixed inset-0 z-40 flex flex-col px-5 pb-6 pt-24 text-cream transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:px-6 ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="grid flex-1 items-center gap-10 md:grid-cols-[1fr_420px] md:gap-20">
          <nav>
            <ol>
              {items.map((item, i) => {
                const current = item.href === pathname;
                return (
                  <li key={item.href} className="border-b border-cream/15">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      tabIndex={open ? 0 : -1}
                      className="group flex items-end gap-6 py-1 md:gap-16"
                    >
                      <span className="label w-6 pb-3 text-cream/45 tabular-nums">{String(i).padStart(2, "0")}</span>
                      <span
                        className={`font-serif text-[clamp(3rem,7.5vw,6.25rem)] leading-[1.05] transition-[color,transform] duration-500 group-hover:translate-x-3 ${
                          current || hover === i ? "text-tan" : ""
                        }`}
                        style={{
                          transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                          opacity: open ? 1 : 0,
                          transform: open ? undefined : "translateY(40%)",
                        }}
                      >
                        {item.label}
                      </span>
                      <span className="ml-auto hidden pb-4 text-[12px] text-cream/45 lg:block">{item.note}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <figure className="hidden md:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              {items.map((it, i) => (
                <Image
                  key={it.href}
                  src={it.image.src}
                  alt={i === hover ? it.image.alt : ""}
                  fill
                  sizes="420px"
                  className={`object-cover transition-opacity duration-500 ${i === hover ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <figcaption className="mt-2 text-[12px] text-cream/50">{shown.caption}</figcaption>
          </figure>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 text-[13px] text-cream/80">
          <a href={`mailto:${artist.email}`} tabIndex={open ? 0 : -1} className="link-line">{artist.email}</a>
          <div className="flex gap-6">
            <a href={artist.instagram} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="link-line">Instagram</a>
            <a href={artist.whatsappLink} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="link-line">WhatsApp</a>
            <a href={artist.facebook} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="link-line">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}

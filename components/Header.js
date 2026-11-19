"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const cls = (href) =>
    `link-arrow ${pathname === href || (href !== "/" && pathname.startsWith(href)) ? "text-ink" : ""}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open ? "bg-paper/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-5 py-4 text-[12px] md:px-6">
        <Link href="/works" className="flex items-center gap-2">
          <span aria-hidden className="text-base leading-none">+</span>
          <span className={cls("/works")}>Works</span>
        </Link>

        <div className="hidden gap-1 md:flex">
          <Link href="/" className={cls("/")}>Tosin</Link>
          <span>/</span>
          <Link href="/#studio" className="link-arrow">Studio</Link>
          <span>/</span>
          <Link href="/about" className={cls("/about")}>About</Link>
          <span>/</span>
          <Link href="/works" className={cls("/works")}>All</Link>
        </div>

        <Link href="/contact" className="hidden items-center gap-2 md:flex">
          <span className={cls("/contact")}>Commission</span>
          <span aria-hidden className="text-base leading-none">+</span>
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
          <span aria-hidden className={`text-base leading-none transition-transform ${open ? "rotate-45" : ""}`}>+</span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-5 pb-8 pt-4 md:hidden">
          <ul className="space-y-2 font-serif text-4xl">
            <li><Link href="/">Tosin</Link></li>
            <li><Link href="/works">Works</Link></li>
            <li><Link href="/#studio">Studio</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact"><em>Commission</em></Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}

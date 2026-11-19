import Link from "next/link";

// Rounded button with a circular arrow badge. Dark by default; `light` for dark backgrounds.
export default function Pill({ href, children, light = false, external = false, as, className = "", ...rest }) {
  const tone = light ? "bg-cream text-ink" : "bg-ink text-cream";
  const badge = light ? "bg-ink text-cream" : "bg-cream text-ink";
  const inner = (
    <>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
      <span
        aria-hidden
        className={`grid h-8 w-8 place-items-center rounded-full text-[14px] transition-transform duration-500 group-hover:-rotate-45 ${badge}`}
      >
        →
      </span>
    </>
  );
  const cls = `group inline-flex items-center gap-4 rounded-full py-1 pl-5 pr-1 text-[12.5px] shadow-[0_6px_18px_-8px_rgb(42_26_20/0.5)] ${tone} ${className}`;

  if (as === "button") {
    return (
      <button className={cls} {...rest}>
        {inner}
      </button>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

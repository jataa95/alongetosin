import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-start justify-end px-5 pt-40 md:px-6">
      <p className="label text-mute">404</p>
      <h1 className="mt-4 font-serif text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight">
        Still on the <span className="text-mute">easel.</span>
      </h1>
      <Link href="/works" className="link-line mt-8 text-[13px]">See the finished works →</Link>
    </div>
  );
}

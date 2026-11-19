import CommissionForm from "@/components/CommissionForm";
import { artist } from "@/data/site";

export const metadata = {
  title: "Commission",
  description: "Commission a hand-drawn or painted portrait from Alonge Tosin, or ask about an original work.",
};

const steps = [
  ["Share", "Send the photograph(s) you love and tell Tosin who is in them."],
  ["Agree", "Settle size, medium (pencil, charcoal or paint), framing, price and timing."],
  ["Create", "The piece is drawn or painted by hand, with progress shared along the way."],
  ["Deliver", "Finished, signed and, if you like, framed, then shipped to you."],
];

export default function ContactPage() {
  return (
    <div className="px-5 pt-28 md:px-6 md:pt-32">
      <p className="label text-mute">Commissions & enquiries</p>
      <h1 className="mt-4 max-w-5xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] tracking-tight">
        A portrait of the people you love, <span className="text-mute">drawn by hand.</span>
      </h1>

      <div className="mt-20 grid gap-16 md:grid-cols-2">
        <div>
          <ol className="border-t border-line">
            {steps.map(([k, v], i) => (
              <li key={k} className="grid grid-cols-[48px_1fr] gap-2 border-b border-line py-5">
                <span className="label pt-2 text-mute">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-serif text-[26px] leading-tight">{k}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink/75">{v}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="mt-12 space-y-4 text-[14px]">
            <div>
              <dt className="label text-mute">WhatsApp</dt>
              <dd><a href={artist.whatsappLink} target="_blank" rel="noreferrer" className="link-line">{artist.whatsapp}</a></dd>
            </div>
            <div>
              <dt className="label text-mute">Email</dt>
              <dd><a href={`mailto:${artist.email}`} className="link-line">{artist.email}</a></dd>
            </div>
            <div>
              <dt className="label text-mute">Instagram</dt>
              <dd><a href={artist.instagram} target="_blank" rel="noreferrer" className="link-line">@{artist.handle}</a></dd>
            </div>
          </dl>
        </div>

        <CommissionForm />
      </div>
    </div>
  );
}

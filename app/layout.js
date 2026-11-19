import { Hedvig_Letters_Sans, Hedvig_Letters_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { artist } from "@/data/site";
import "./globals.css";

const serif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig-serif",
});

const sans = Hedvig_Letters_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hedvig-sans",
});

export const metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: {
    default: `${artist.name} — Hyperrealist drawing & painting`,
    template: `%s — ${artist.name}`,
  },
  description:
    "Alonge Tosin (tosin_xp) is a Nigerian visual artist making hyperrealist portraits in graphite, charcoal and paint. Original works and commissions.",
  openGraph: {
    title: `${artist.name} — Hyperrealist drawing & painting`,
    description: "Faces, faith and family, rendered by hand in graphite, charcoal and paint.",
    images: ["/works/my-serenity.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-sand"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

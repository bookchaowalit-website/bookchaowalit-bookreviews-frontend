import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const reviewDisplay = Cormorant_Garamond({ variable: "--font-review-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const reviewSans = Roboto_Condensed({ variable: "--font-review-sans", subsets: ["latin"], weight: ["400", "500", "700"] });
const reviewMono = DM_Mono({ variable: "--font-review-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Book Reviews | Bookchaowalit",
  description: "A text-first reading ledger across habits, craft, and focused work.",
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: { type: "website", title: "Book Reviews | Bookchaowalit", description: "A text-first reading ledger." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${reviewDisplay.variable} ${reviewSans.variable} ${reviewMono.variable}`}>
      <body className="antialiased">
        <span hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: "<!-- THESIS: film-cutting bench reading ledger. OWN-WORLD: black, grain orange, punched white, serif reading copy. STORY: scan the latest cut, then open a dated note without losing the index. FIRST VIEWPORT: selected workprint above adjacent review frames. FORM: candidate 4, film cutting bench; seed key a4037202. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance -->" }} />
        {/* THESIS: Book reviews become a film-cutting bench: a selected reading cut with a reachable strip of adjacent frames, refusing a generic card grid.
OWN-WORLD: true black, grain orange, punched white windows, condensed labels, serif reading copy, and frame marks that carry state.
STORY: A visitor scans the latest cut, sees what was actually read, then opens one review without losing the index.
FIRST VIEWPORT: the current review occupies the upper workprint while the review strip runs below it; the primary action is the title link in the selected frame.
FORM: candidate 4 of the grounded list, a film cutting bench flattened into a sheet; seed key a4037202.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}

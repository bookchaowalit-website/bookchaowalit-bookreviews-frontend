import Link from "next/link";
import { getAllBookReviews } from "@/lib/mdx";

export default async function Home() {
  const reviews = await getAllBookReviews();
  const latest = reviews[0];
  return (
    <div className="review-room">
      <main className="review-shell">
        <nav className="review-nav" aria-label="Book reviews navigation"><span className="review-mark">BOOK / REVIEWS</span><Link href="/book-reviews">Open the full index</Link></nav>
        <header className="review-hero">
          <div><h1>Notes from the books that stayed.</h1><p>A small reading ledger across habits, craft, and focused work. Every entry is a dated cut, not a shelf of recommendations.</p></div>
          <p className="review-hero-note"><strong>{reviews.length}</strong> recorded reviews<br />text-first archive · updated by hand</p>
        </header>
        {latest ? <section className="workprint" aria-labelledby="latest-cut">
          <p className="rail-label" id="latest-cut">Current workprint / latest cut</p>
          <div className="selected-cut">
            <div className="cut-window"><span className="frame-label">TEXT ONLY</span><span className="cover-title">{latest.title}</span><span className="frame-label">{latest.category}</span></div>
            <div className="cut-copy"><h2><Link href={`/book-reviews/${latest.slug}`}>{latest.title}</Link></h2><p>{latest.author} · {latest.date}</p><div className="rating-track" role="img" aria-label={`${latest.rating} out of 5`}>{[0, 1, 2, 3, 4].map((i) => <span key={i} className={i < latest.rating ? "is-on" : ""} aria-hidden="true" />)}</div></div>
            <div className="cut-meta"><strong>Read as</strong>{latest.category}<br /><strong>ISBN</strong>{latest.isbn}</div>
          </div>
          <div className="review-strip">{reviews.slice(1, 4).map((review, index) => <Link className="strip-item" href={`/book-reviews/${review.slug}`} key={review.slug}><span className="frame-label"><span className="strip-index">0{index + 2}</span> / saved frame</span><span className="strip-title">{review.title}</span><span className="strip-author">{review.author} · {review.date}</span></Link>)}</div>
        </section> : <p>No reviews have been cut yet.</p>}
        <footer className="review-footer">Covers are not attached in this archive. The reading notes are the source material.</footer>
      </main>
    </div>
  );
}

import Link from "next/link";
import { getAllBookReviews } from "@/lib/mdx";

export default async function BookReviewsPage() {
  const reviews = await getAllBookReviews();
  return <div className="review-room"><main className="review-shell"><nav className="review-nav" aria-label="Book reviews navigation"><Link href="/" className="review-mark">BOOK / REVIEWS</Link><span className="review-mark">FULL INDEX / {reviews.length}</span></nav><section className="review-detail" aria-labelledby="all-reviews-heading"><Link className="back-link" href="/">Return to latest cut</Link><h1 id="all-reviews-heading">The full contact sheet.</h1><p className="review-hero-note">Every frame is dated and linked to its original note. No cover art is attached to this archive.</p><div className="review-strip" style={{ gridTemplateColumns: "1fr" }}>{reviews.map((review, index) => <Link className="strip-item" href={`/book-reviews/${review.slug}`} key={review.slug}><span className="frame-label"><span className="strip-index">{String(index + 1).padStart(2, "0")}</span> / frame / {review.category}</span><span className="strip-title">{review.title}</span><span className="strip-author">{review.author} · {review.date} · {review.rating}/5</span></Link>)}</div></section></main></div>;
}

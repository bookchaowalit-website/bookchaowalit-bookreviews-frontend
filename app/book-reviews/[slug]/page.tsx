import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookReviewBySlug, getAllBookReviews } from "@/lib/mdx";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const reviews = await getAllBookReviews();
  return reviews.map((review) => ({
    slug: review.slug,
  }));
}

export default async function BookReviewPage({ params }: PageProps) {
  const review = await getBookReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xl ${
            i < rating
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/book-reviews"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back to Reviews
          </Link>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500 dark:text-gray-400">Book Cover</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Category:
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    {review.category}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Date Read:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {review.date}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    ISBN:
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {review.isbn}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {review.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  by {review.author}
                </p>
                <div className="flex items-center space-x-4">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {review.rating}/5
                  </span>
                </div>
              </header>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: review.content }} />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";

const policyContent = {
  "/privacy-policy": {
    title: "Privacy Policy",
    text:
      "We protect user information and use it only for account, order, support and bookstore experience improvements.",
    points: ["Secure account data", "Order and support updates", "No unnecessary data sharing"],
  },
  "/terms": {
    title: "Terms",
    text:
      "Use BookStore for genuine book browsing, buying, exchange and learning features with fair and safe usage.",
    points: ["Use valid account details", "Keep payments secure", "Follow exchange rules"],
  },
  "/refund-policy": {
    title: "Refund Policy",
    text:
      "Refund or replacement support is available for eligible orders with payment issue, wrong item or damaged delivery.",
    points: ["Share order details", "Report issue quickly", "Support team reviews request"],
  },
};

function PolicyPage({ type }) {
  const content = policyContent[type] || policyContent["/privacy-policy"];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-24 text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink-500">
          BookStore
        </p>
        <h1 className="mt-3 text-3xl font-black md:text-5xl">{content.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          {content.text}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {content.points.map((point) => (
            <div
              key={point}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              {point}
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-pink-500 dark:hover:bg-pink-600"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default PolicyPage;

import React from "react";

function AIReviewSummary() {
  const star = String.fromCodePoint(11088);
  const check = String.fromCodePoint(10004);
  const highlights = [
    "Easy Language",
    "Best for Beginners",
    "Practical Examples",
    "Worth Buying",
  ];

  return (
    <div className="mb-4 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-pink-50 p-4 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">
            AI Review Summary
          </p>
          <h4 className="mt-1 text-base font-bold text-slate-800 dark:text-white">
            100 reviews ka quick AI summary
          </h4>
        </div>
        <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
          {star} 4.8/5
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white/80 p-3 dark:bg-slate-950/70">
        <p className="text-sm font-semibold text-pink-600 dark:text-pink-300">
          AI Summary
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {highlights.map((point) => (
            <p
              key={point}
              className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              {check} {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AIReviewSummary;

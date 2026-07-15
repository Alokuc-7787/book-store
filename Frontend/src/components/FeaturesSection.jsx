import React from "react";

const features = [
  {
    icon: "📚",
    title: "Huge Book Collection",
    description: "1000+ Engineering, Programming, Competitive & Academic Books.",
    points: ["✓ Categories", "✓ Search Books"],
    action: "→ Explore",
  },
  {
    icon: "🤖",
    title: "AI Recommendation",
    description: "Get personalized book suggestions using AI.",
    points: ["Smart Suggestions", "Personalized Results"],
  },
  {
    icon: "🔄",
    title: "Book Exchange",
    description: "Buy, Sell and Exchange old books with other students.",
    points: ["Sell Old Books", "Buy Used Books"],
  },
  {
    icon: "💳",
    title: "Secure Payment",
    description: "Pay securely using Razorpay with UPI, Cards and Net Banking.",
    points: ["Razorpay", "UPI, Card, Net Banking"],
  },
  {
    icon: "📦",
    title: "Order Tracking",
    description: "Track every order from purchase to delivery.",
    points: ["Live Status", "Delivery Updates"],
  },
  {
    icon: "🎤",
    title: "Voice Search",
    description: "Search books using voice commands in English or Hindi.",
    points: ["Hindi & English", "Fast Search"],
  },
];

function FeaturesSection() {
  return (
    <section className="max-w-screen-2xl container mx-auto px-4 py-10 md:px-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">
            Smart Bookstore Features
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white md:text-3xl">
            Everything readers need in one place
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          A clean, secure and student-friendly bookstore experience with AI,
          exchange, payment and tracking tools.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className="group relative min-h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.13)] dark:border-slate-700 dark:bg-slate-900"
            style={{ transitionDelay: `${index * 35}ms` }}
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-100/70 blur-2xl transition group-hover:bg-pink-200/80 dark:bg-pink-500/10" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-white shadow-lg shadow-slate-900/15 dark:bg-white dark:text-slate-950">
                  {feature.icon}
                </div>
                <span className="rounded-xl bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-500/10 dark:text-pink-300">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {feature.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    {point}
                  </span>
                ))}
              </div>
              {feature.action && (
                <p className="mt-4 text-sm font-bold text-pink-600 dark:text-pink-300">
                  {feature.action}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;

import React from "react";

const features = [
  {
    icon: "📖",
    title: "Huge Collection",
    text: "Find useful books across engineering, government exams, motivation, finance, and more.",
  },
  {
    icon: "🤖",
    title: "AI Book Recommendation",
    text: "Get smart book suggestions based on your goals, subject, and reading preference.",
  },
  {
    icon: "🔄",
    title: "Book Exchange",
    text: "Sell or exchange old books and help other readers get affordable study material.",
  },
  {
    icon: "💳",
    title: "Secure Razorpay Payment",
    text: "Buy books safely with UPI, card, and secure Razorpay checkout support.",
  },
];

function FeaturesSection() {
  return (
    <section className="max-w-screen-2xl container mx-auto px-4 md:px-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-pink-100 bg-white p-5 shadow-[0_8px_30px_rgba(244,114,182,0.12)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(244,114,182,0.18)] dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-2xl dark:bg-pink-500/10">
              {feature.icon}
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {feature.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;

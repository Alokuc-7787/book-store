import React from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  const highlights = ["Find Books", "Learn Skills", "Track Orders", "Exchange Books"];

  return (
    <>
      <div className="scroll-reveal max-w-screen-2xl container mx-auto my-10 flex flex-col px-4 md:flex-row md:px-20">
        <div className="order-2 mt-12 w-full md:order-1 md:mt-32 md:w-1/2">
          <div className="space-y-8">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-pink-600 dark:border-pink-500/30 dark:bg-pink-500/10 dark:text-pink-300">
                All in One Platform
              </p>
              <h1 className="text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-6xl">
                AI Powered BookStore
              </h1>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-xl">
              Find books, learn skills, track every order and exchange old books
              in one premium student-friendly platform.
            </p>

            <div className="grid max-w-xl grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/course#books")}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-slate-800 dark:bg-pink-500 dark:hover:bg-pink-600"
              >
                Explore Books
              </button>
              <button
                type="button"
                onClick={() => navigate("/course#book-trailers")}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-pink-400"
              >
                Watch Demo
              </button>
            </div>

            <div className="grid max-w-xl gap-3 sm:grid-cols-3">
              {["★★★★★ Trusted by Students", "500+ Books", "Secure Payment"].map(
                (stat) => (
                  <div
                    key={stat}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    {stat}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="order-1 mt-20 w-full md:w-1/2">
          <div className="scroll-reveal zoom-in group overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(15,23,42,0.16)] dark:from-slate-900 dark:to-slate-950">
            <img
              src="/Banner.png"
              className="mx-auto h-auto max-h-[460px] w-full object-contain transition duration-500 group-hover:scale-105"
              alt="Books and learning illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;

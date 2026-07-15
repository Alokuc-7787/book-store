import React from "react";

function BookOpeningLoader() {
  return (
    <div className="book-loader fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(236,72,153,0.26),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.18),transparent_30%)]" />
      <div className="relative flex flex-col items-center gap-7">
        <div className="book-open-animation">
          <div className="book-page book-page-left" />
          <div className="book-page book-page-right" />
          <div className="book-spine" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-300">
            AI Powered BookStore
          </p>
          <h2 className="mt-3 text-2xl font-black md:text-4xl">
            Opening Your Reading World
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BookOpeningLoader;

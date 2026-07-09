import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthProvider";

function ReadingDashboard() {
  const [authUser] = useAuth();
  const [spinPrize, setSpinPrize] = useState("10% OFF");
  const [isSpinning, setIsSpinning] = useState(false);
  const startedEmail = localStorage.getItem("startedEmail") || authUser?.email || "";

  const formatName = (value) => {
    if (!value) return "";
    const name = value
      .split("@")[0]
      .split(/[._\-\s]+/)
      .filter(Boolean)[0];

    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  };

  const userName =
    authUser?.fullname?.split(" ")[0] ||
    authUser?.name?.split(" ")[0] ||
    formatName(startedEmail) ||
    "Alok";

  const readingStats = [
    {
      label: "Books Purchased",
      value: "15",
      icon: String.fromCodePoint(128218),
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Wishlist",
      value: "8",
      icon: String.fromCodePoint(10084, 65039),
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      label: "Currently Reading",
      value: "2",
      icon: String.fromCodePoint(128214),
      color: "from-sky-500 to-cyan-500",
    },
    {
      label: "Reading Streak",
      value: "12 Days",
      icon: String.fromCodePoint(127942),
      color: "from-amber-400 to-orange-500",
    },
  ];

  const purchasedBooks = [
    {
      name: "Atomic Habits",
      author: "James Clear",
      progress: 70,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Data Structures and Algorithms in Java",
      author: "CSE Core Book",
      progress: 45,
      color: "from-sky-500 to-cyan-500",
    },
    {
      name: "Indian Polity",
      author: "Government Exam Prep",
      progress: 82,
      color: "from-amber-400 to-orange-500",
    },
    {
      name: "Operating System Concepts",
      author: "B.Tech CSE",
      progress: 30,
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  const luckyPrizes = ["10% OFF", "Free Shipping", "Buy 2 Get 1"];
  const compareBooks = [
    {
      name: "Atomic Habits",
      price: "Rs. 499",
      pages: "320",
      rating: "4.8/5",
      difficulty: "Easy",
      language: "English",
      publisher: "Penguin Random House",
    },
    {
      name: "Deep Work",
      price: "Rs. 449",
      pages: "304",
      rating: "4.7/5",
      difficulty: "Medium",
      language: "English",
      publisher: "Grand Central",
    },
  ];
  const compareRows = ["price", "pages", "rating", "difficulty", "language", "publisher"];
  const activityPosts = [
    {
      name: "Priya",
      avatar: "P",
      rating: "★★★★★",
      book: "Finished Rich Dad Poor Dad",
      likes: "150 Likes",
      comments: "Comments",
    },
    {
      name: "Alok",
      avatar: "A",
      rating: "★★★★★",
      book: "Started Atomic Habits",
      likes: "96 Likes",
      comments: "Comments",
    },
  ];

  const handleLuckySpin = () => {
    setIsSpinning(true);
    window.setTimeout(() => {
      const nextPrize = luckyPrizes[Math.floor(Math.random() * luckyPrizes.length)];
      setSpinPrize(nextPrize);
      setIsSpinning(false);
    }, 900);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-slate-950 pt-24 text-white">
        <section className="relative mx-auto max-w-screen-2xl px-4 pb-16 md:px-20">
          <div className="dashboard-video-bg absolute inset-x-0 top-8 h-[520px] rounded-[2rem] opacity-80" />
          <div className="absolute left-8 top-32 h-40 w-40 rounded-full bg-pink-500/30 blur-3xl" />
          <div className="absolute right-12 top-20 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="dashboard-reveal">
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-pink-100 backdrop-blur">
                Reading dashboard unlocked
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                <span className="block">{String.fromCodePoint(128075)} Welcome {userName}</span>
                <span className="mt-2 block bg-gradient-to-r from-pink-300 via-white to-cyan-200 bg-clip-text text-transparent">
                  Your book journey starts here
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                Track your purchases, wishlist, active reading and daily streak in one cinematic dashboard.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/course"
                  className="rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:bg-pink-600"
                >
                  Explore Books
                </Link>
                <Link
                  to="/"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Back Home
                </Link>
              </div>
            </div>

            <div className="dashboard-screen relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
              <div className="trailer-scanline absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="overflow-hidden rounded-[1.5rem] bg-slate-950">
                <div className="dashboard-film h-48 p-5 md:h-64">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                      Live
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                      00:12 Intro
                    </span>
                  </div>
                  <div className="dashboard-book-stack mx-auto mt-10 h-24 w-40 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-500 to-sky-400 shadow-2xl shadow-pink-500/30" />
                </div>
                <div className="p-5">
                  <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="dashboard-progress h-full rounded-full bg-pink-500" />
                  </div>
                  <p className="text-sm leading-7 text-slate-200">
                    Your library is ready. Keep reading daily and turn every subject into progress.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {readingStats.map((stat, index) => (
              <article
                key={stat.label}
                className="dashboard-stat rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-2xl shadow-lg`}>
                  {stat.icon}
                </div>
                <p className="text-sm font-semibold text-slate-300">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              </article>
            ))}
          </div>

          <section className="relative mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur md:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-200">
                  Reading Progress
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                  Continue your purchased books
                </h2>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
                {purchasedBooks.length} Active Books
              </span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {purchasedBooks.map((book, index) => (
                <article
                  key={book.name}
                  className="dashboard-stat rounded-3xl border border-white/10 bg-slate-950/55 p-5 transition hover:-translate-y-1 hover:border-pink-300/40"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{book.name}</h3>
                      <p className="mt-1 text-sm text-slate-400">{book.author}</p>
                    </div>
                    <span className="rounded-full bg-pink-500/15 px-3 py-1 text-sm font-bold text-pink-200">
                      {book.progress}%
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      <span>Progress</span>
                      <span>{book.progress}% complete</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${book.color}`}
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-full bg-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:bg-pink-600"
                  >
                    Continue Reading
                  </button>
                </article>
              ))}
            </div>
          </section>

          <div className="relative mt-10 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.24)] backdrop-blur md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                Daily Lucky Spin
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">Spin & Win</h2>
              <div className="mt-6 flex flex-col items-center rounded-3xl bg-slate-950/55 p-6">
                <div
                  className={`lucky-wheel flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-pink-400 bg-gradient-to-br from-amber-300 via-pink-500 to-sky-500 text-center text-lg font-black text-white shadow-2xl shadow-pink-500/25 ${
                    isSpinning ? "lucky-wheel-spin" : ""
                  }`}
                >
                  {String.fromCodePoint(127922)}
                  <br />
                  {spinPrize}
                </div>
                <button
                  type="button"
                  onClick={handleLuckySpin}
                  className="mt-6 rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-600"
                >
                  Spin & Win
                </button>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {luckyPrizes.map((prize) => (
                    <span key={prize} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                      {prize}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.24)] backdrop-blur md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-200">
                Compare Books
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Atomic Habits vs Deep Work
              </h2>
              <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55">
                <div className="grid grid-cols-3 bg-white/10 text-sm font-bold text-white">
                  <div className="p-4">Details</div>
                  {compareBooks.map((book) => (
                    <div key={book.name} className="p-4">{book.name}</div>
                  ))}
                </div>
                {compareRows.map((row) => (
                  <div key={row} className="grid grid-cols-3 border-t border-white/10 text-sm text-slate-200">
                    <div className="p-4 font-semibold capitalize text-pink-200">{row}</div>
                    {compareBooks.map((book) => (
                      <div key={`${book.name}-${row}`} className="p-4">
                        {book[row]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="relative mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.24)] backdrop-blur md:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-200">
                  Reading Social Feed
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Instagram style book updates
                </h2>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
                Community
              </span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {activityPosts.map((post) => (
                <article key={`${post.name}-${post.book}`} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-lg font-bold text-white">
                      {post.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{post.name}</h3>
                      <p className="text-sm text-amber-300">{post.rating}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white/10 p-4">
                    <p className="text-lg font-semibold text-white">{post.book}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
                    <button type="button" className="rounded-full bg-pink-500/20 px-4 py-2 text-pink-200">
                      {String.fromCodePoint(10084, 65039)} {post.likes}
                    </button>
                    <button type="button" className="rounded-full bg-white/10 px-4 py-2">
                      {String.fromCodePoint(128172)} {post.comments}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="relative mt-10 grid gap-5 lg:grid-cols-3">
            <section className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.24)] backdrop-blur md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-200">
                Wallet System
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">Wallet</h2>
              <div className="mt-5 rounded-3xl bg-slate-950/55 p-5">
                <p className="text-4xl font-black text-pink-300">Rs. 450</p>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-sm font-semibold text-slate-100">
                    Referral Bonus
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 text-sm font-semibold text-slate-100">
                    Cashback
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.24)] backdrop-blur md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                Achievement Page
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">Level 8 Reader</h2>
              <div className="mt-5 grid gap-3 rounded-3xl bg-slate-950/55 p-5">
                <div className="flex justify-between text-sm font-semibold text-slate-100">
                  <span>Books Read</span>
                  <span>35</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-slate-100">
                  <span>Hours</span>
                  <span>120</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-slate-100">
                  <span>XP</span>
                  <span>6400</span>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.24)] backdrop-blur md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                Scan Book QR
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">QR scan karo</h2>
              <div className="mt-5 rounded-3xl bg-slate-950/55 p-5 text-center">
                <div className="mx-auto grid h-32 w-32 grid-cols-4 gap-1 rounded-2xl bg-white p-3">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span
                      key={index}
                      className={`rounded-sm ${
                        [0, 1, 4, 5, 10, 11, 14, 15, 3, 12].includes(index)
                          ? "bg-slate-950"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-200">
                  Book open ho jaye.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export default ReadingDashboard;

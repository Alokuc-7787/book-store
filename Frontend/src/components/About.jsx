import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const stats = [
  { value: "10,000+", label: "Books" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "2,000+", label: "Orders Delivered" },
  { value: "500+", label: "Book Exchanges" },
];

const chooseUs = [
  { icon: "📚", title: "Wide Collection", text: "Academic, government exam, self-help and popular books in one place." },
  { icon: "🚚", title: "Fast Delivery", text: "Quick order flow with clear order status for every reader." },
  { icon: "🔄", title: "Book Exchange", text: "Users can sell or exchange old books and save more." },
  { icon: "💳", title: "Secure Payment", text: "Clean checkout experience with trusted payment-ready UI." },
  { icon: "⭐", title: "Verified Reviews", text: "Helpful ratings and AI review summary before buying." },
  { icon: "🤖", title: "AI Recommendations", text: "Smart suggestions based on user need, subject and language." },
];

function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-sky-50 pt-24 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-white">
        <style>
          {`
            @keyframes aboutFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-14px); }
            }
            @keyframes aboutGlow {
              0%, 100% { opacity: .45; transform: scale(.96); }
              50% { opacity: .8; transform: scale(1.04); }
            }
            @keyframes aboutSlide {
              0% { transform: translateX(-20%); }
              100% { transform: translateX(20%); }
            }
            .about-float { animation: aboutFloat 4s ease-in-out infinite; }
            .about-glow { animation: aboutGlow 3.5s ease-in-out infinite; }
            .about-slide { animation: aboutSlide 6s ease-in-out infinite alternate; }
          `}
        </style>

        <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-10">
          <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl about-glow" />
          <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl about-glow" />

          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-600 dark:bg-pink-500/15 dark:text-pink-200">
              About BookStore
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight md:text-6xl">
              Reading ko easy, smart aur affordable banane wala bookstore.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Welcome to BookStore! Our mission is to make quality books easily accessible to every reader. Whether you're a student, professional, or book lover, we provide a wide range of books at affordable prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/bookstore" className="rounded-full bg-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-500/25 hover:bg-pink-600">
                Explore Books
              </a>
              <a href="#contact" className="rounded-full border border-pink-200 bg-white px-6 py-3 font-bold text-slate-900 hover:border-pink-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                Contact Us
              </a>
            </div>
          </div>

          <div className="relative z-10 about-float">
            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
              <div className="overflow-hidden rounded-[1.5rem] bg-slate-950 p-4 text-white">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="ml-auto rounded-full bg-pink-500 px-3 py-1 text-xs font-bold">LIVE PREVIEW</span>
                </div>
                <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-pink-950 p-5">
                  <div className="absolute inset-x-0 top-10 h-24 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent about-slide" />
                  <div className="relative grid grid-cols-3 gap-4">
                    {["AI Picks", "Exchange", "Reviews", "Wallet", "Orders", "Samples"].map((item, index) => (
                      <div key={item} className={`rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur ${index % 2 === 0 ? "mt-8" : ""}`}>
                        <div className="mb-4 h-20 rounded-xl bg-gradient-to-br from-pink-300 to-sky-300" />
                        <p className="text-sm font-bold">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-6 rounded-2xl bg-white p-4 text-slate-900">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500">BookStore Mission</p>
                    <p className="mt-2 text-xl font-black">Quality books for every reader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 md:grid-cols-3 md:px-10">
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <p className="text-3xl">📖</p>
            <h2 className="mt-4 text-2xl font-black">Our Story</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              BookStore ko students, professionals aur book lovers ke liye banaya gaya hai, jahan useful books, samples, reviews, exchange aur smart recommendation ek hi jagah mil sake.
            </p>
          </div>
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <p className="text-3xl">🎯</p>
            <h2 className="mt-4 text-2xl font-black">Our Mission</h2>
            <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
              <li>Affordable books</li>
              <li>Easy online shopping</li>
              <li>Book exchange</li>
              <li>Better reading experience</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <p className="text-3xl">👁</p>
            <h2 className="mt-4 text-2xl font-black">Our Vision</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              To become the most trusted online bookstore that connects readers and promotes the habit of reading.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-bold text-pink-500">Why Choose Us?</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {chooseUs.map((feature) => (
              <div key={feature.title} className="group rounded-3xl border border-pink-100 bg-white p-6 shadow-lg shadow-pink-100/50 transition hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-2xl transition group-hover:scale-110 dark:bg-pink-500/15">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
          <div className="grid gap-5 rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur transition hover:bg-white/15">
                <p className="text-4xl font-black text-pink-300">{stat.value}</p>
                <p className="mt-2 font-semibold text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-[1fr_1.2fr] md:px-10" id="contact">
          <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <p className="font-bold text-pink-500">Meet the Team</p>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-sky-500 text-3xl font-black text-white">
                A
              </div>
              <div>
                <h3 className="text-2xl font-black">Alok Kumar</h3>
                <p className="text-slate-600 dark:text-slate-300">Full Stack Developer</p>
              </div>
            </div>
            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
              This project is built to give readers a modern bookstore experience with AI, exchange, samples, reviews and dashboard features.
            </p>
          </div>

          <div className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <p className="font-bold text-pink-500">Contact Information</p>
            <h2 className="mt-2 text-3xl font-black">Get in touch</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a className="rounded-2xl bg-slate-50 p-4 font-semibold dark:bg-slate-950" href="mailto:alokuc123@gmail.com">
                Email: alokuc123@gmail.com
              </a>
              <a className="rounded-2xl bg-slate-50 p-4 font-semibold dark:bg-slate-950" href="tel:9304154904">
                Phone: 9304154904
              </a>
              <p className="rounded-2xl bg-slate-50 p-4 font-semibold dark:bg-slate-950">
                Address: Gopalganj
              </p>
              <a className="rounded-2xl bg-pink-500 p-4 font-bold text-white hover:bg-pink-600" href="https://www.linkedin.com/in/alok-kumar-1882362a4/" target="_blank" rel="noreferrer">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;

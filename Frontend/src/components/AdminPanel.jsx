import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:4000/contact");
      setMessages(res.data.messages || []);
    } catch (err) {
      setError("Contact messages load nahi ho paye. Backend server check karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleResolveMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/contact/${id}`);
      setMessages((current) => current.filter((message) => message._id !== id));
    } catch (err) {
      setError("Message remove nahi ho paya. Backend server check karein.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total Messages", value: messages.length },
      { label: "Today", value: messages.filter((item) => new Date(item.createdAt).toDateString() === new Date().toDateString()).length },
      { label: "Emails", value: new Set(messages.map((item) => item.email)).size },
    ],
    [messages]
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 px-4 pt-28 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-white md:px-10">
        <section className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl">
            <p className="font-bold uppercase tracking-[0.22em] text-pink-300">Admin Panel</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black md:text-5xl">Contact Messages</h1>
                <p className="mt-3 max-w-2xl text-slate-300">
                  Contact form se jo user message bhejega, admin yahin se dekh sakta hai.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchMessages}
                className="rounded-full bg-pink-500 px-6 py-3 font-bold text-white hover:bg-pink-600"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">{stat.label}</p>
                <p className="mt-2 text-4xl font-black text-pink-500">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-pink-100 bg-white p-5 shadow-xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            {loading ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-semibold dark:bg-slate-950">Loading messages...</p>
            ) : error ? (
              <p className="rounded-2xl bg-red-50 p-5 font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-200">{error}</p>
            ) : messages.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-semibold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                Abhi koi contact message nahi aaya hai.
              </p>
            ) : (
              <div className="grid gap-4">
                {messages.map((message) => (
                  <article key={message._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-black">{message.subject}</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-pink-100 px-4 py-2 text-xs font-bold text-pink-600 dark:bg-pink-500/15 dark:text-pink-200">
                          New Contact
                        </span>
                        <button
                          type="button"
                          onClick={() => handleResolveMessage(message._id)}
                          className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600"
                        >
                          Problem Solved - Remove
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 leading-7 text-slate-700 dark:text-slate-200">{message.message}</p>
                    <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">
                      <a className="rounded-2xl bg-white p-3 font-semibold dark:bg-slate-900" href={`mailto:${message.email}`}>
                        Name: {message.fullName}
                      </a>
                      <a className="rounded-2xl bg-white p-3 font-semibold dark:bg-slate-900" href={`mailto:${message.email}`}>
                        Email: {message.email}
                      </a>
                      <a className="rounded-2xl bg-white p-3 font-semibold dark:bg-slate-900" href={`tel:${message.mobile}`}>
                        Mobile: {message.mobile}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AdminPanel;

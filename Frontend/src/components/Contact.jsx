import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const contactInfo = [
  { icon: "📍", title: "Address", text: "Bhopal, Madhya Pradesh, India" },
  { icon: "📧", title: "Email", text: "support@bookstore.com", href: "mailto:support@bookstore.com" },
  { icon: "📞", title: "Phone", text: "+91 9304154904", href: "tel:+919304154904" },
  { icon: "🕒", title: "Working Hours", text: "Mon - Sat, 9:00 AM - 7:00 PM" },
];

const socials = [
  { icon: "🌐", label: "Website", href: "/" },
  { icon: "📘", label: "Facebook", href: "https://facebook.com" },
  { icon: "📷", label: "Instagram", href: "https://instagram.com" },
  { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/alok-kumar-1882362a4/" },
  { icon: "🐦", label: "X", href: "https://x.com" },
  { icon: "▶️", label: "YouTube", href: "https://youtube.com" },
];

const faqs = [
  {
    question: "How can I return a book?",
    answer: "Order delivered hone ke baad return option My Orders section me milega. Book unused condition me honi chahiye.",
  },
  {
    question: "How does Book Exchange work?",
    answer: "Book Exchange form me old book details, condition, price/exchange wish aur contact add karke list kar sakte hain.",
  },
  {
    question: "How many days does delivery take?",
    answer: "Usually delivery 3-7 working days me ho jati hai. Location aur availability ke hisaab se time change ho sakta hai.",
  },
  {
    question: "How can I track my order?",
    answer: "Login ke baad My Orders par click karke placed, processed, shipped, out for delivery aur delivered status track kar sakte hain.",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
};

const contactQuickPrompts = [
  "Book exchange kaise kare?",
  "Order track kaise hoga?",
  "Delivery kitne din me hogi?",
];

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [contactChat, setContactChat] = useState([
    {
      from: "ai",
      text: "Hi! Main BookStore AI support hu. Book order, exchange, delivery, return ya recommendation ke baare me pooch sakte ho.",
    },
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
      setSuccess(true);
      setFormData(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Message send nahi ho paya. Backend server check karein.");
    } finally {
      setLoading(false);
    }
  };

  const getContactReply = (value) => {
    const query = value.toLowerCase();

    if (query.includes("exchange") || query.includes("old book") || query.includes("sell")) {
      return "Book Exchange ke liye Book Exchange System section me old book name, subject, condition, sell/exchange option, price aur contact add karke List My Book click karein.";
    }

    if (query.includes("track") || query.includes("order") || query.includes("delivery status")) {
      return "Order track karne ke liye login ke baad My Orders par click karein. Waha Placed, Processed, Shipped, Out for Delivery aur Delivered status dikhega.";
    }

    if (query.includes("delivery") || query.includes("days") || query.includes("din")) {
      return "Delivery usually 3-7 working days me hoti hai. Bhopal/local area me fast delivery mil sakti hai.";
    }

    if (query.includes("return")) {
      return "Return ke liye delivered book My Orders me open karein. Book unused condition me ho to return/help request contact form se bhej sakte hain.";
    }

    if (query.includes("recommend") || query.includes("book") || query.includes("cse") || query.includes("motivation")) {
      return "Aap mujhe need batao, jaise 'CSE ke liye book chahiye' ya 'motivational Hindi book chahiye'. Main best books suggest kar dunga.";
    }

    if (query.includes("contact") || query.includes("help") || query.includes("support")) {
      return "Support ke liye contact form fill karein. Message MongoDB me save hoga aur team 24 hours ke andar contact karegi.";
    }

    return "Main help ke liye ready hu. Aap order tracking, delivery, return, book exchange, recommendation ya contact support ke baare me pooch sakte ho.";
  };

  const sendContactChat = (value) => {
    const cleanValue = value.trim();
    if (!cleanValue) return;

    setContactChat((current) => [
      ...current,
      { from: "user", text: cleanValue },
      { from: "ai", text: getContactReply(cleanValue) },
    ]);
    setChatInput("");
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    sendContactChat(chatInput);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-pink-50 pt-24 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-white">
        <style>
          {`
            @keyframes contactFloat {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-16px) rotate(1deg); }
            }
            @keyframes contactBeam {
              0% { transform: translateX(-35%); opacity: .25; }
              100% { transform: translateX(35%); opacity: .75; }
            }
            @keyframes contactPulse {
              0%, 100% { transform: scale(.94); opacity: .55; }
              50% { transform: scale(1.05); opacity: .9; }
            }
            .contact-float { animation: contactFloat 4.5s ease-in-out infinite; }
            .contact-beam { animation: contactBeam 5s ease-in-out infinite alternate; }
            .contact-pulse { animation: contactPulse 3s ease-in-out infinite; }
          `}
        </style>

        <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-10">
          <div className="absolute left-8 top-16 h-56 w-56 rounded-full bg-pink-400/20 blur-3xl contact-pulse" />
          <div className="absolute bottom-8 right-8 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl contact-pulse" />

          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-600 dark:bg-pink-500/15 dark:text-pink-200">
              Contact BookStore
            </p>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">Contact Us</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              We'd love to hear from you. Have a question, suggestion, or need help? Get in touch with us.
            </p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {["Fast Reply", "24h Support", "Student Friendly"].map((item) => (
                <div key={item} className="rounded-2xl border border-pink-100 bg-white/80 p-4 text-center font-bold shadow-lg shadow-pink-100/50 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-none">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 contact-float">
            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
              <div className="relative min-h-[390px] overflow-hidden rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="absolute inset-x-0 top-20 h-28 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent contact-beam" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">Live Contact Desk</p>
                    <h2 className="mt-2 text-3xl font-black">Need Help?</h2>
                  </div>
                  <span className="rounded-full bg-green-400 px-3 py-1 text-xs font-black text-slate-950">ONLINE</span>
                </div>
                <div className="relative mt-6 max-h-56 space-y-3 overflow-y-auto pr-1">
                  {contactChat.map((item, index) => (
                    <div
                      key={`${item.from}-${index}`}
                      className={`flex ${item.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <p
                        className={`max-w-[84%] whitespace-pre-line rounded-3xl px-4 py-3 text-sm leading-6 ${
                          item.from === "user"
                            ? "rounded-tr-none bg-pink-500 font-semibold text-white"
                            : "rounded-tl-none bg-white/10 text-white backdrop-blur"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="relative mt-4 flex gap-2 overflow-x-auto">
                  {contactQuickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendContactChat(prompt)}
                      className="shrink-0 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-pink-100 transition hover:bg-white/20"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="relative mt-4 flex gap-2 rounded-2xl bg-white/10 p-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder="Type your question..."
                    className="min-w-0 flex-1 rounded-full bg-white px-4 py-2 text-sm text-slate-900 outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-pink-500 px-4 py-2 text-sm font-bold text-white hover:bg-pink-600"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[1.15fr_.85fr] md:px-10">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-pink-100 bg-white p-6 shadow-2xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <p className="font-bold text-pink-500">Contact Form</p>
            <h2 className="mt-2 text-3xl font-black">Send Message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="👤 Full Name" required />
              <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="📧 Email Address" required />
              <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="📱 Mobile Number" required />
              <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950" name="subject" value={formData.subject} onChange={handleChange} placeholder="📝 Subject" required />
              <textarea className="min-h-36 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 sm:col-span-2" name="message" value={formData.message} onChange={handleChange} placeholder="💬 Message" required />
            </div>
            <button type="submit" disabled={loading} className="mt-6 w-full rounded-full bg-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-500/25 hover:bg-pink-600 disabled:opacity-70">
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && (
              <div className="mt-5 rounded-3xl bg-emerald-50 p-5 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                <p className="text-xl font-black">✅ Thank you!</p>
                <p className="mt-2">Your message has been sent successfully. We'll contact you within 24 hours.</p>
              </div>
            )}
            {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-200">{error}</p>}
          </form>

          <div className="space-y-5">
            {contactInfo.map((item) => (
              <a key={item.title} href={item.href || undefined} className="block rounded-3xl border border-pink-100 bg-white p-5 shadow-lg shadow-pink-100/50 transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-lg font-black">{item.title}</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{item.text}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
          <div className="rounded-[2rem] border border-pink-100 bg-white p-5 shadow-2xl shadow-pink-100/60 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <h2 className="mb-4 text-3xl font-black">📍 Our Location</h2>
            <iframe
              title="BookStore Location"
              src="https://www.google.com/maps?q=Bhopal,%20Madhya%20Pradesh,%20India&output=embed"
              className="h-[360px] w-full rounded-3xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
          <h2 className="text-3xl font-black">Social Media</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="rounded-3xl border border-pink-100 bg-white p-5 text-center font-bold shadow-lg shadow-pink-100/50 transition hover:-translate-y-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                <span className="block text-3xl">{social.icon}</span>
                <span className="mt-2 block">{social.label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-10 md:px-10">
          <h2 className="mb-5 text-3xl font-black">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="collapse collapse-arrow rounded-3xl border border-pink-100 bg-white shadow-lg shadow-pink-100/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                <input type="radio" name="contact-faq" defaultChecked={index === 0} />
                <div className="collapse-title text-lg font-black">{faq.question}</div>
                <div className="collapse-content text-slate-600 dark:text-slate-300">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="fixed bottom-24 right-5 z-[80] hidden rounded-3xl bg-slate-950 p-4 text-white shadow-2xl md:block">
          <p className="text-lg font-black">💬 Need Help?</p>
          <p className="text-sm text-slate-300">Chat with Us</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contact;

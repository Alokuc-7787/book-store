import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function AIChatAssistant() {
  const [authUser] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      from: "ai",
      text: "Hi, main aapka AI Book Assistant hu. Aap book recommendation, compare, discount, cart, order, reading progress ya subject books ke baare me pooch sakte ho.",
    },
  ]);

  const bookCatalog = [
    {
      name: "Atomic Habits",
      category: "Self Help",
      price: 499,
      level: "Beginner",
      bestFor: "habit building, motivation, daily routine",
    },
    {
      name: "Deep Work",
      category: "Productivity",
      price: 449,
      level: "Medium",
      bestFor: "focus, distraction control, study routine",
    },
    {
      name: "Data Structures and Algorithms in Java",
      category: "Data Structures",
      price: 599,
      level: "Medium",
      bestFor: "coding, placement, interview preparation",
    },
    {
      name: "Operating System Concepts",
      category: "Operating System",
      price: 549,
      level: "Medium",
      bestFor: "B.Tech CSE, semester exam, system concepts",
    },
    {
      name: "Indian Polity",
      category: "Government Exam",
      price: 449,
      level: "Beginner",
      bestFor: "UPSC, SSC, constitution, polity",
    },
    {
      name: "Lucent General Knowledge",
      category: "General Studies",
      price: 299,
      level: "Beginner",
      bestFor: "SSC, railway, general studies, quick revision",
    },
  ];

  const quickPrompts = [
    "Motivational Hindi book chahiye",
    "Atomic Habits vs Deep Work",
    "CSE ke liye best book",
    "Discount kaise milega?",
  ];

  const findBooks = (query) =>
    bookCatalog.filter((book) => {
      const text = `${book.name} ${book.category} ${book.level} ${book.bestFor}`.toLowerCase();
      return query
        .split(/\s+/)
        .filter((word) => word.length > 2)
        .some((word) => text.includes(word));
    });

  const getReply = (value) => {
    const query = value.toLowerCase();
    const matchedBooks = findBooks(query);

    if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("hlw")) {
      return "Hello dost. Batao aapko kis type ki book chahiye: motivation, CSE, government exam, English, reasoning ya productivity?";
    }

    if (query.includes("compare") || query.includes(" vs ") || query.includes("versus")) {
      return [
        "Atomic Habits vs Deep Work:",
        "Atomic Habits: easy language, habit building, beginners ke liye best, price Rs. 499.",
        "Deep Work: focus aur distraction control ke liye best, difficulty medium, price Rs. 449.",
        "Agar daily routine improve karna hai to Atomic Habits. Agar study/work focus strong karna hai to Deep Work.",
      ].join("\n");
    }

    if (query.includes("motivation") || query.includes("hindi")) {
      return [
        "Aapke liye best motivational options:",
        "1. Atomic Habits - habits aur daily discipline ke liye.",
        "2. Jeet Aapki - simple Hindi motivation ke liye.",
        "3. Wings of Fire - student inspiration aur life story ke liye.",
        "Beginner ho to Atomic Habits se start karo.",
      ].join("\n");
    }

    if (query.includes("data") || query.includes("dsa") || query.includes("java")) {
      return [
        "Data Structures ke liye best book: Data Structures and Algorithms in Java.",
        "Kyu: arrays, linked list, tree, graph, sorting aur interview practice cover hota hai.",
        "Best for: B.Tech CSE, coding round, placement preparation.",
        "Tip: View Details me preview pages aur AI Review Summary bhi check karo.",
      ].join("\n");
    }

    if (query.includes("cse") || query.includes("computer") || query.includes("dbms") || query.includes("os")) {
      return [
        "CSE ke liye ye books useful rahengi:",
        "1. Data Structures and Algorithms in Java - coding/placement.",
        "2. Operating System Concepts - semester exam.",
        "3. Database System Concepts - SQL, normalization, transactions.",
        "4. Computer Networking - TCP/IP aur routing.",
      ].join("\n");
    }

    if (query.includes("government") || query.includes("ssc") || query.includes("upsc") || query.includes("general")) {
      return [
        "Government exam ke liye:",
        "1. Lucent General Knowledge - GS quick revision.",
        "2. Indian Polity - constitution aur governance.",
        "3. Quantitative Aptitude - SSC/Bank practice.",
        "4. Reasoning - verbal/non-verbal logic.",
      ].join("\n");
    }

    if (query.includes("cart") || query.includes("buy") || query.includes("purchase")) {
      return [
        "Buy karne ka simple flow:",
        "1. Book card par Buy Now click karo.",
        "2. Checkout form fill karo.",
        "3. Add Cart se multiple books cart me rakh sakte ho.",
        "4. Cart icon se checkout open hoga.",
      ].join("\n");
    }

    if (query.includes("discount") || query.includes("offer") || query.includes("spin")) {
      return [
        "Discount ke liye Reading Dashboard me Daily Lucky Spin use karo.",
        "Possible rewards: 10% OFF, Free Shipping, Buy 2 Get 1.",
        "Combo Offers me 3 subject combos choose karke total saving bhi dekh sakte ho.",
      ].join("\n");
    }

    if (query.includes("progress") || query.includes("reading") || query.includes("continue")) {
      return [
        "Reading Dashboard me purchased books ke progress bars milenge.",
        "Example: Atomic Habits 70%.",
        "Continue Reading button se user apni current book resume kar sakta hai.",
      ].join("\n");
    }

    if (query.includes("review") || query.includes("rating")) {
      return [
        "View Details me AI Review Summary added hai:",
        "Rating: 4.8/5.",
        "Highlights: Easy Language, Best for Beginners, Practical Examples, Worth Buying.",
      ].join("\n");
    }

    if (matchedBooks.length) {
      return [
        "Aapki query se ye books match ho rahi hain:",
        ...matchedBooks.slice(0, 3).map(
          (book, index) =>
            `${index + 1}. ${book.name} - ${book.category}, Rs. ${book.price}, level: ${book.level}. Best for ${book.bestFor}.`
        ),
        "Inme se kisi book ka naam type karo, main detail bata dunga.",
      ].join("\n");
    }

    return [
      "Main samajh gaya, aap book help chahte ho.",
      "Aap aise pooch sakte ho:",
      "- motivational Hindi book chahiye",
      "- Atomic Habits vs Deep Work",
      "- CSE ke liye best book",
      "- discount kaise milega",
      "- reading progress kaha dikhega",
    ].join("\n");
  };

  const sendMessage = (value) => {
    const cleanMessage = value.trim();

    if (!cleanMessage) return;

    setChat((current) => [
      ...current,
      { from: "user", text: cleanMessage },
      { from: "ai", text: getReply(cleanMessage) },
    ]);
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {isOpen && (
        <div className="mb-4 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-[0_25px_80px_rgba(236,72,153,0.25)] dark:border-slate-700 dark:bg-slate-900">
          <div className="bg-gradient-to-r from-pink-500 to-slate-900 p-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-100">
                  AI Chat Assistant
                </p>
                <h3 className="mt-1 text-lg font-bold">Book help desk</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold transition hover:bg-white/25"
              >
                X
              </button>
            </div>
          </div>

          {!authUser ? (
            <div className="p-4">
              <div className="rounded-2xl bg-pink-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                AI Chat Assistant use karne ke liye pehle register aur login karo.
              </div>
              <Link
                to="/signup"
                className="mt-4 block rounded-full bg-pink-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-pink-600"
                onClick={() => setIsOpen(false)}
              >
                Register / Login
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-80 space-y-3 overflow-y-auto p-4">
                {chat.map((item, index) => (
                  <div
                    key={`${item.from}-${index}`}
                    className={`flex ${item.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                        item.from === "user"
                          ? "bg-pink-500 text-white"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      } whitespace-pre-line`}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-3 py-2 dark:border-slate-700">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="shrink-0 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-600 transition hover:bg-pink-100 dark:bg-pink-500/10 dark:text-pink-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2 border-t border-slate-100 p-3 dark:border-slate-700">
                <input
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Ask: motivational Hindi book..."
                  className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-2xl font-bold text-white shadow-[0_18px_45px_rgba(236,72,153,0.45)] transition hover:scale-105 hover:bg-pink-600"
        aria-label="Open AI Chat Assistant"
      >
        AI
      </button>
    </div>
  );
}

export default AIChatAssistant;

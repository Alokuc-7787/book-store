import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Banner() {
  const [authUser] = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = (event) => {
    event.preventDefault();

    if (!emailInput.trim()) {
      setEmailError("Please enter your Gmail or email first.");
      return;
    }

    localStorage.setItem("startedEmail", emailInput.trim());
    setEmailError("");

    if (!authUser) {
      toast.error("Please register and login first");
      navigate("/signup", { state: { from: { pathname: "/reading-dashboard" } } });
      return;
    }

    navigate("/reading-dashboard");
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-slate-950 dark:text-white">
              Discover Books, Learn Faster & Grow Every Day
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-xl">
              Explore useful books, smart recommendations, reading tools, and
              secure ordering in one simple bookstore experience.
            </p>
            <form onSubmit={handleGetStarted}>
              <label className="input input-bordered flex items-center gap-2 rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="Enter Gmail or Email"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                />
              </label>
              {emailError && (
                <p className="mt-2 text-sm font-semibold text-red-500">
                  {emailError}
                </p>
              )}
              <button type="submit" className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 dark:bg-pink-500 dark:hover:bg-pink-600">
                Get Started
              </button>
            </form>
          </div>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2">
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:from-slate-900 dark:to-slate-950">
            <img
              src="/Banner.png"
              className="mx-auto h-auto max-h-[460px] w-full object-contain"
              alt="Books and learning illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;

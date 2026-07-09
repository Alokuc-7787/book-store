import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "./Login";

function Signup() {
  const location = useLocation();
  const [registeredEmail, setRegisteredEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const requestedPath = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    await axios
      .post(`${import.meta.env.VITE_API_URL}/user/signup`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRegisteredEmail(data.email);
          toast.success("Registered successfully. Please login now.");
          document.getElementById("my_modal_3")?.showModal();
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        } else {
          toast.error("Signup request failed");
        }
      });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
      <div className="dashboard-video-bg absolute inset-x-8 top-10 h-[620px] rounded-[2rem] opacity-70" />
      <div className="absolute left-10 top-24 h-44 w-44 rounded-full bg-pink-500/30 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur lg:grid-cols-[0.9fr_1.1fr]">
        <div className="signup-visual hidden min-h-[560px] p-8 lg:block">
          <Link
            to="/"
            className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
          >
            Back Home
          </Link>
          <div className="mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-100">
              Register First
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Create account, then login to unlock every section.
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-200">
              Course, bookstore, dashboard, cart, orders and AI assistant work only after user login.
            </p>
            <div className="mt-8 grid gap-3">
              {["1. Register your account", "2. Login with same email", "3. Open all sections"].map((step) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 text-slate-900 dark:bg-slate-900 dark:text-white md:p-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">
                Secure Signup
              </p>
              <h3 className="mt-2 text-3xl font-bold">Create Account</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Requested section: {requestedPath}
              </p>
            </div>
            <Link to="/" className="btn btn-sm btn-circle btn-ghost">
              X
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="mt-1 block text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="mt-1 block text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="mt-1 block text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-600"
            >
              Register Now
            </button>
          </form>

          {registeredEmail && (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              Registered: {registeredEmail}. Ab login karo, phir requested section unlock hoga.
            </div>
          )}

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Already registered?{" "}
            <button
              type="button"
              className="font-semibold text-pink-500 underline"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Login here
            </button>
          </p>
        </div>
      </div>

      <Login />
    </div>
  );
}

export default Signup;

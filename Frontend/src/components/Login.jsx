import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const [showReset, setShowReset] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, userInfo);

      if (res.data?.user) {
        setAuthUser(res.data.user);
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        toast.success("Logged in successfully");
        document.getElementById("my_modal_3")?.close();
        navigate(from, { replace: true });
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Login request failed");
      }
    }
  };

  const handleResetPassword = async () => {
    if (!resetData.email || !resetData.newPassword || !resetData.confirmPassword) {
      toast.error("Please fill email and new password");
      return;
    }

    if (resetData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error("Confirm password does not match");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/reset-password`, {
        email: resetData.email,
        newPassword: resetData.newPassword,
      });

      toast.success(res.data?.message || "Password reset successfully");
      setShowReset(false);
      setResetData({ email: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Password reset request failed");
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              X
            </Link>

            <h3 className="font-bold text-lg">{showReset ? "Reset Password" : "Login"}</h3>

            {!showReset ? (
              <>
                <div className="mt-4 space-y-2">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="mt-3 text-sm font-semibold text-pink-500 hover:underline"
                  onClick={() => setShowReset(true)}
                >
                  Forgot password?
                </button>

                <div className="flex justify-around mt-6">
                  <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                    Login
                  </button>
                  <p>
                    Not registered?{" "}
                    <Link
                      to="/signup"
                      className="underline text-blue-500 cursor-pointer"
                    >
                      Signup
                    </Link>{" "}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mt-5 rounded-2xl border border-pink-100 bg-pink-50 p-4 dark:border-pink-500/20 dark:bg-pink-500/10">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Registered email enter karo aur new password set karo.
                  </p>
                  <div className="mt-4 space-y-3">
                    <input
                      type="email"
                      value={resetData.email}
                      onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
                      placeholder="Registered email"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                    <input
                      type="password"
                      value={resetData.newPassword}
                      onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                      placeholder="New password"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                    <input
                      type="password"
                      value={resetData.confirmPassword}
                      onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-pink-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-600"
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
                    onClick={() => setShowReset(false)}
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;

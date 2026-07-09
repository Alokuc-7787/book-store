import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    try {
      setAuthUser(undefined);
      localStorage.removeItem("Users");
      toast.success("Logout successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const fullName = authUser?.fullname || "User";
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-pink-200 bg-white/90 px-2 py-2 shadow-sm transition duration-300 hover:scale-105 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-sm font-bold text-white">
          {initial}
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">
            {fullName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Active user</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800">
          <div className="rounded-xl bg-pink-50 p-3 dark:bg-slate-700">
            <p className="text-xs uppercase tracking-[0.25em] text-pink-500">Signed in as</p>
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
              {fullName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {authUser?.email || ""}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-3 py-2 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02]"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Logout;

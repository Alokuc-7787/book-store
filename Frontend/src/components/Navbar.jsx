import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import toast from "react-hot-toast";
import OrdersModal from "./OrdersModal";
import CheckoutModal from "./CheckoutModal";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider.jsx";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { cart, removeFromCart, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const requireLogin = () => {
    if (authUser) return true;

    toast.error("Please register and login first");
    navigate("/signup");
    return false;
  };
  const navItems = (
    <>
      <li>
        <a href="/" className="font-medium text-slate-700 hover:text-pink-500 dark:text-slate-100 dark:hover:text-pink-300">Home</a>
      </li>
      <li>
        <a href="/course" className="font-medium text-slate-700 hover:text-pink-500 dark:text-slate-100 dark:hover:text-pink-300">Course</a>
      </li>
      <li>
        <a href="/contact" className="font-medium text-slate-700 hover:text-pink-500 dark:text-slate-100 dark:hover:text-pink-300">Contact</a>
      </li>
      <li>
        <a href="/about" className="font-medium text-slate-700 hover:text-pink-500 dark:text-slate-100 dark:hover:text-pink-300">About</a>
      </li>
      <li>
        <a href="/admin" className="font-medium text-slate-700 hover:text-pink-500 dark:text-slate-100 dark:hover:text-pink-300">Admin</a>
      </li>
    </>
  );
  const cartModal =
    cartOpen &&
    createPortal(
      <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-slate-950/60 px-4 pt-24">
        <div className="w-full max-w-lg rounded-3xl bg-white p-6 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-white">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold">Cart ({cart.length})</h3>
            <button
              type="button"
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              onClick={() => setCartOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto py-4">
            {cart.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                Your cart is empty.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {cart.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <div>
                      <div className="font-semibold">{it.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-300">
                        Qty: {it.qty} - Rs. {it.price}
                      </div>
                    </div>
                    <button
                      className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                      onClick={() => removeFromCart(it.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
            <button
              type="button"
              className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              onClick={() => {
                clearCart();
                setCartOpen(false);
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-600"
              onClick={() => {
                setCheckoutItems(cart);
                setCheckoutOpen(true);
                setCartOpen(false);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  return (
    <>
      <div
        className={` max-w-screen-2xl container mx-auto md:px-20 px-4 border-b border-transparent bg-white/95 text-slate-900 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 dark:text-white fixed top-0 left-0 right-0 z-50 ${
          sticky
            ? "sticky-navbar shadow-md bg-base-200 text-slate-900 dark:bg-slate-950 dark:text-white duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a className=" text-2xl font-bold cursor-pointer text-slate-900 dark:text-white">bookStore</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="hidden md:block">
              <label className=" px-3 py-2 border border-slate-300 rounded-md flex items-center gap-2 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 bg-white text-slate-900 placeholder:text-slate-500 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-300"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-80 text-slate-700 dark:text-slate-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              {/* sun icon */}
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            <div className="flex items-center gap-3">
              <button
                className="hidden sm:inline-block mr-2 btn btn-ghost text-slate-800 hover:text-pink-600 dark:text-slate-100 dark:hover:text-pink-300"
                onClick={() => {
                  if (requireLogin()) setOrdersOpen(true);
                }}
                aria-label="My Orders"
              >
                My Orders
              </button>
              <button
                className="relative text-slate-800 dark:text-slate-100"
                onClick={() => {
                  if (requireLogin()) setCartOpen((s) => !s);
                }}
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                </svg>
                <span className="absolute -top-2 -right-2 rounded-full bg-pink-500 text-white text-xs px-1">{cart.length}</span>
              </button>
              {authUser ? (
                <Logout />
              ) : (
                <div className="">
                  <a
                    className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                    onClick={() => document.getElementById("my_modal_3").showModal()}
                  >
                    Login
                  </a>
                  <Login />
                </div>
              )}
            </div>
            {false && cartOpen && (
              <dialog className="modal" open>
                <form method="dialog" className="modal-box max-w-lg">
                  <h3 className="font-bold text-lg">Cart ({cart.length})</h3>
                  <div className="py-4">
                    {cart.length === 0 ? (
                      <p>Your cart is empty.</p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {cart.map((it) => (
                          <div key={it.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">{it.name}</div>
                              <div className="text-sm text-slate-500">Qty: {it.qty} • ₹{it.price}</div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm"
                                onClick={() => removeFromCart(it.id)}
                                type="button"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="modal-action">
                    <button type="button" className="btn" onClick={() => { clearCart(); setCartOpen(false); }}>
                      Clear
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => { setCheckoutItems(cart); setCheckoutOpen(true); setCartOpen(false); }}>
                      Checkout
                    </button>
                    <button className="btn" onClick={() => setCartOpen(false)} type="button">Close</button>
                  </div>
                </form>
              </dialog>
            )}
            {cartModal}
            {checkoutOpen && (
              <CheckoutModal
                items={checkoutItems}
                onClose={() => setCheckoutOpen(false)}
                clearCart={() => {
                  clearCart();
                }}
              />
            )}
          </div>
        </div>
      </div>
      {ordersOpen && <OrdersModal onClose={() => setOrdersOpen(false)} />}
    </>
  );
}

export default Navbar;

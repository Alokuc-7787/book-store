import React, { useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "https://book-store-3-7jsp.onrender.com";

const readJsonResponse = async (response) => {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    return { message: text || `Request failed with status ${response.status}` };
  }
};

export default function CheckoutModal({ item, items, onClose, clearCart }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [payment, setPayment] = useState("cod");

  const itemsList = items && items.length ? items : item ? [item] : [];
  const total = itemsList.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  const saveOrder = (paymentInfo) => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      items: itemsList,
      total,
      address,
      payment: paymentInfo,
      createdAt: new Date().toISOString(),
      status: "placed",
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Order placed successfully");
    if (typeof clearCart === "function") clearCart();
    onClose();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (method) => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const orderRes = await fetch(`${API_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const orderData = await readJsonResponse(orderRes);

      if (!orderRes.ok) {
        throw new Error(orderData.message || `Payment API error ${orderRes.status}`);
      }

      if (!orderData.success) {
        toast.error(orderData.message || "Payment order creation failed");
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "BookStore",
        description: "Book purchase payment",
        order_id: orderData.order.id,
        prefill: {
          name: address.name,
        },
        method: {
          upi: method === "upi",
          card: method === "card",
          netbanking: false,
          wallet: false,
          paylater: false,
        },
        handler: async function (response) {
          const verifyRes = await fetch(`${API_URL}/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verifyData = await readJsonResponse(verifyRes);

          if (!verifyRes.ok) {
            toast.error(verifyData.message || `Payment verify error ${verifyRes.status}`);
            return;
          }

          if (verifyData.success) {
            saveOrder({
              method: method === "card" ? "razorpay-card" : "razorpay-upi",
              paymentId: verifyData.paymentId,
            });
          } else {
            toast.error("Payment verification failed");
          }
        },
        theme: {
          color: "#ec4899",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error.message || "Payment failed");
      console.error(error);
    }
  };

  const placeOrder = () => {
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill shipping address");
      return;
    }

    if (!itemsList.length || total <= 0) {
      toast.error("Cart is empty");
      return;
    }

    if (payment === "cod") {
      saveOrder({ method: "Cash on Delivery" });
      return;
    }

    handleRazorpayPayment(payment);
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <form className="modal-box max-w-2xl bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
        <h3 className="text-lg font-bold">
          Checkout {itemsList.length > 1 ? `(${itemsList.length} items)` : ""}
        </h3>

        <div className="py-2 text-sm text-slate-600">
          {itemsList.map((it, idx) => (
            <div key={idx} className="flex justify-between">
              <div className="text-sm">
                {it.name} {it.qty ? `×${it.qty}` : ""}
              </div>
              <div className="text-sm">₹{(it.price || 0) * (it.qty || 1)}</div>
            </div>
          ))}

          {itemsList.length > 0 && (
            <div className="mt-2 font-semibold">Total: ₹{total}</div>
          )}
        </div>

        {step === 1 && (
          <div>
            <div className="mb-4 rounded-2xl bg-pink-50 p-4 dark:bg-pink-500/10">
              <h4 className="font-bold text-slate-900 dark:text-white">Shipping Address</h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                Delivery ke liye correct address aur mobile number fill karein.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                placeholder="Full name"
                className="input input-bordered w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
              />

              <input
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                placeholder="Mobile number"
                className="input input-bordered w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
              />

              <input
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                placeholder="House no, area, street"
                className="input input-bordered w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-white sm:col-span-2"
              />

              <input
                value={address.landmark}
                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                placeholder="Landmark (optional)"
                className="input input-bordered w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-white sm:col-span-2"
              />

              <input
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="input input-bordered w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
              />

              <input
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                placeholder="State"
                className="input input-bordered w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
              />

              <input
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                placeholder="Pincode"
                className="input input-bordered w-full bg-white text-slate-900 dark:bg-slate-950 dark:text-white sm:col-span-2"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                Continue
              </button>
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="font-semibold">Payment</h4>

            <div className="mt-2 space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                  className="radio"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    Book receive karne ke baad payment karein
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50 p-3 dark:border-pink-500/30 dark:bg-pink-500/10">
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "upi"}
                  onChange={() => setPayment("upi")}
                  className="radio"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    UPI
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    Pay with PhonePe, Google Pay, Paytm or any UPI app via Razorpay
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                  className="radio"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    Add Card
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    Add debit/credit card and pay securely with Razorpay
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-primary" onClick={placeOrder}>
                {payment === "cod" ? "Place Order" : "Pay Now with Razorpay"}
              </button>

              <button type="button" className="btn" onClick={() => setStep(1)}>
                Back
              </button>
            </div>
          </div>
        )}
      </form>
    </dialog>
  );
}

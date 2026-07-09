import React, { useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "https://book-store-3-7jsp.onrender.com";

export default function CheckoutModal({ item, items, onClose, clearCart }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: "", line1: "", city: "", pincode: "" });
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

  const handleRazorpayPayment = async () => {
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

      const orderData = await orderRes.json();

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
        handler: async function (response) {
          const verifyRes = await fetch(`${API_URL}/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            saveOrder({
              method: "razorpay",
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
      toast.error("Payment failed");
      console.error(error);
    }
  };

  const placeOrder = () => {
    if (!address.name || !address.line1 || !address.city || !address.pincode) {
      toast.error("Please fill shipping address");
      return;
    }

    if (!itemsList.length || total <= 0) {
      toast.error("Cart is empty");
      return;
    }

    if (payment === "cod") {
      saveOrder({ method: "cod" });
      return;
    }

    handleRazorpayPayment();
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <form className="modal-box">
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
            <h4 className="font-semibold">Shipping Address</h4>

            <div className="mt-2 grid gap-2">
              <input
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                placeholder="Full name"
                className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900"
              />

              <input
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                placeholder="Address line 1"
                className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900"
              />

              <input
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900"
              />

              <input
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                placeholder="Pincode"
                className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900"
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
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                  className="radio"
                />
                <span className="text-sm text-slate-700 dark:text-white">
                  Cash on Delivery
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "razorpay"}
                  onChange={() => setPayment("razorpay")}
                  className="radio"
                />
                <span className="text-sm text-slate-700 dark:text-white">
                  Pay Online with Razorpay
                </span>
              </label>
            </div>

            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-primary" onClick={placeOrder}>
                {payment === "cod" ? "Place Order" : "Pay Now"}
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
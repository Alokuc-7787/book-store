import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutModal({ item, items, onClose, clearCart }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: "", line1: "", city: "", pincode: "" });
  const [payment, setPayment] = useState("cod");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");

  const itemsList = items && items.length ? items : item ? [item] : [];
  const total = itemsList.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  const placeOrder = () => {
    if (!address.name || !address.line1 || !address.city || !address.pincode) {
      toast.error("Please fill shipping address");
      return;
    }

    if (payment === "card") {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        toast.error("Please enter card details");
        return;
      }
    }
    if (payment === "upi" && !upi) {
      toast.error("Enter UPI id");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      items: itemsList,
      total,
      address,
      payment: payment === "card" ? { method: "card", card: { last4: String(card.number).slice(-4) } } : payment === "upi" ? { method: "upi", id: upi } : { method: "cod" },
      createdAt: new Date().toISOString(),
      status: "placed",
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Order placed successfully");
    if (typeof clearCart === "function") clearCart();
    onClose();
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <form className="modal-box">
        <h3 className="text-lg font-bold">Checkout {itemsList.length > 1 ? `(${itemsList.length} items)` : ""}</h3>
        <p className="py-2 text-sm text-slate-600">
          {itemsList.map((it, idx) => (
            <div key={idx} className="flex justify-between">
              <div className="text-sm">{it.name} {it.qty? `×${it.qty}`: ''}</div>
              <div className="text-sm">₹{(it.price || 0) * (it.qty || 1)}</div>
            </div>
          ))}
          {itemsList.length > 0 && <div className="mt-2 font-semibold">Total: ₹{total}</div>}
        </p>

        {step === 1 && (
          <div>
            <h4 className="font-semibold">Shipping Address</h4>
            <div className="mt-2 grid gap-2">
              <input value={address.name} onChange={(e)=>setAddress({...address,name:e.target.value})} placeholder="Full name" className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900" />
              <input value={address.line1} onChange={(e)=>setAddress({...address,line1:e.target.value})} placeholder="Address line 1" className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900" />
              <input value={address.city} onChange={(e)=>setAddress({...address,city:e.target.value})} placeholder="City" className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900" />
              <input value={address.pincode} onChange={(e)=>setAddress({...address,pincode:e.target.value})} placeholder="Pincode" className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900" />
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-primary" onClick={()=>setStep(2)}>Continue</button>
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="font-semibold">Payment</h4>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="pay" checked={payment==="cod"} onChange={()=>setPayment("cod")} className="radio" />
                <span className="text-sm text-slate-700 dark:text-white">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="pay" checked={payment==="card"} onChange={()=>setPayment("card")} className="radio" />
                <span className="text-sm text-slate-700 dark:text-white">Card</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="pay" checked={payment==="upi"} onChange={()=>setPayment("upi")} className="radio" />
                <span className="text-sm text-slate-700 dark:text-white">UPI</span>
              </label>

              {payment === "card" && (
                <div className="mt-2 grid gap-2">
                  <input value={card.number} onChange={(e)=>setCard({...card,number:e.target.value})} placeholder="Card number" className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900" />
                  <input value={card.name} onChange={(e)=>setCard({...card,name:e.target.value})} placeholder="Name on card" className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900" />
                  <div className="flex gap-2">
                    <input value={card.expiry} onChange={(e)=>setCard({...card,expiry:e.target.value})} placeholder="MM/YY" className="input input-bordered w-1/2 text-slate-900 dark:text-white dark:bg-slate-900" />
                    <input value={card.cvv} onChange={(e)=>setCard({...card,cvv:e.target.value})} placeholder="CVV" className="input input-bordered w-1/2 text-slate-900 dark:text-white dark:bg-slate-900" />
                  </div>
                </div>
              )}

              {payment === "upi" && (
                <input value={upi} onChange={(e)=>setUpi(e.target.value)} placeholder="UPI id (example@bank)" className="input input-bordered w-full text-slate-900 dark:text-white dark:bg-slate-900" />
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button type="button" className="btn btn-primary" onClick={placeOrder}>Place Order</button>
              <button type="button" className="btn" onClick={()=>setStep(1)}>Back</button>
            </div>
          </div>
        )}
      </form>
    </dialog>
  );
}

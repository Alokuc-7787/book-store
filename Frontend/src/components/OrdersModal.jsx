import React, { useEffect, useState } from "react";

export default function OrdersModal({ onClose }) {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const stages = ["Placed", "Processed", "Shipped", "Out for Delivery", "Delivered"];

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem("orders") || "[]"));
    } catch (e) {
      setOrders([]);
    }
  }, []);

  const getStageIndex = (createdAt) => {
    const placed = new Date(createdAt);
    const now = new Date();
    const days = Math.floor((now - placed) / (1000 * 60 * 60 * 24));
    return Math.min(4, Math.max(0, days));
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  const estimateDeliveryDate = (createdAt) => {
    const placed = new Date(createdAt);
    const eta = new Date(placed.getTime() + 4 * 24 * 60 * 60 * 1000);
    return eta.toLocaleDateString();
  };

  const removeOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    if (selected?.id === orderId) {
      setSelected(null);
    }
  };

  const getOrderTitle = (order) => {
    const isMulti = Array.isArray(order.items) && order.items.length > 0;

    if (isMulti) {
      return `${order.items[0].name}${order.items.length > 1 ? ` +${order.items.length - 1} more` : ""}`;
    }

    return order.item?.name || "Order";
  };

  const getOrderPrice = (order) => {
    const isMulti = Array.isArray(order.items) && order.items.length > 0;

    if (isMulti) {
      return order.total || order.items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
    }

    return order.item?.price || order.total || 0;
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle z-[120]" open>
      <form className="modal-box max-h-[86vh] max-w-4xl overflow-y-auto bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
        <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-4 border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-500">
                Order Tracking
              </p>
              <h3 className="text-xl font-bold">My Orders ({orders.length})</h3>
            </div>
            <button
              type="button"
              className="btn btn-sm bg-slate-100 text-slate-900 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600 dark:border-slate-700 dark:text-slate-300">
            No orders placed yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const stageIndex = getStageIndex(order.createdAt);
              const isDelivered = stageIndex === stages.length - 1;
              const isMulti = Array.isArray(order.items) && order.items.length > 0;

              return (
                <article
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {getOrderTitle(order)}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                        Rs. {getOrderPrice(order)} • {stages[stageIndex]}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Ordered: {formatDate(order.createdAt)}
                      </p>
                      <p className="text-xs text-slate-400">
                        Est. delivery: {estimateDeliveryDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isDelivered
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                            : "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300"
                        }`}
                      >
                        {stages[stageIndex]}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm bg-slate-100 text-slate-900 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                        onClick={() => setSelected(selected?.id === order.id ? null : order)}
                      >
                        {selected?.id === order.id ? "Hide" : "View"}
                      </button>
                      {isDelivered && (
                        <button
                          type="button"
                          className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600"
                          onClick={() => removeOrder(order.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {isDelivered ? (
                    <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                      <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                        Delivered successfully
                      </p>
                      <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-200">
                        Order complete ho chuka hai. Remove button se delivered order list se hata sakte ho.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <div className="grid grid-cols-5 gap-2">
                        {stages.map((stage, index) => (
                          <div key={stage} className="min-w-0 text-center">
                            <div
                              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                                index <= stageIndex
                                  ? "bg-pink-500 text-white"
                                  : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <p
                              className={`mt-2 text-[11px] font-semibold leading-4 ${
                                index <= stageIndex
                                  ? "text-pink-600 dark:text-pink-300"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {stage}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-pink-500"
                          style={{ width: `${(stageIndex / (stages.length - 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {selected?.id === order.id && (
                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Shipping</p>
                          <p className="text-sm text-slate-600 dark:text-slate-200">
                            {order.address.name}, {order.address.line1}, {order.address.city} - {order.address.pincode}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Payment</p>
                          <p className="text-sm text-slate-600 dark:text-slate-200">
                            {order.payment?.method}
                            {order.payment?.card
                              ? ` • **** ${order.payment.card.last4}`
                              : order.payment?.id
                              ? ` • ${order.payment.id}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      {isMulti && (
                        <div className="mt-3">
                          <p className="font-medium text-slate-900 dark:text-white">Items</p>
                          <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-200">
                            {order.items.map((item, index) => (
                              <li key={`${item.name}-${index}`}>
                                {item.name} {item.qty ? `x${item.qty}` : ""} - Rs. {(item.price || 0) * (item.qty || 1)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </form>
    </dialog>
  );
}

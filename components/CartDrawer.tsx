"use client";

import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function CartDrawer() {
  const { isOpen, close, items, remove, subtotal } = useCart();
  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-card z-50 border-l border-line shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-display text-xl">Your cart</h2>
          <button
            onClick={close}
            className="text-muted hover:text-foreground text-sm"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 && (
            <div className="p-8 text-center text-muted text-sm">
              Cart is empty. Browse and add some services.
            </div>
          )}
          <ul>
            {items.map((i) => (
              <li
                key={i.product.slug}
                className="flex gap-3 px-5 py-4 border-b border-line"
              >
                <div
                  className="w-16 h-16 rounded shrink-0 flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: i.product.imageBg }}
                >
                  <span
                    style={{ fontFamily: "ui-serif, Georgia, serif" }}
                    className="mix-blend-difference"
                  >
                    {i.product.imageEmoji}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${i.product.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {i.product.title}
                  </Link>
                  <div className="text-xs text-muted">
                    Qty {i.qty}
                    {i.product.priceType !== "inquiry" &&
                      ` · $${(i.product.price * i.qty).toLocaleString()}`}
                    {i.product.priceType === "inquiry" && " · Custom quote"}
                  </div>
                  <button
                    onClick={() => remove(i.product.slug)}
                    className="text-xs text-muted hover:text-foreground mt-1 underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {items.length > 0 && (
          <div className="border-t border-line p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted">
              Inquiry items quoted separately. Taxes calculated at checkout.
            </div>
            <button
              onClick={() => alert("Checkout coming soon — Stripe wires up next.")}
              className="w-full bg-foreground text-background py-3 rounded text-sm font-medium hover:bg-accent transition"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

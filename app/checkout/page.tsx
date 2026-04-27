"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { getVendor } from "@/lib/data";
import PaymentMethodPicker, {
  type PaymentMethod,
} from "@/components/PaymentMethodPicker";

const methodCopy: Record<
  PaymentMethod,
  { title: string; body: string }
> = {
  stripe: {
    title: "Stripe checkout",
    body: "Cards, Apple Pay, Google Pay. Receipt hits your email. Vendor reaches out same day.",
  },
  crypto: {
    title: "Crypto — 10% off",
    body: "BTC, ETH, USDC on Base or Ethereum. We DM the wallet after you place the order. Vendor unlocks once funds clear.",
  },
  cashapp: {
    title: "Cash App",
    body: "We DM you the $cashtag after you place the order. Pay within 30 min to lock it.",
  },
  zelle: {
    title: "Zelle",
    body: "We DM you the Zelle phone or email after you place the order. Pay within 30 min to lock it.",
  },
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, remove } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [submitting, setSubmitting] = useState(false);

  // Aggregate vendor capabilities — only enable a method if EVERY vendor in
  // the cart accepts it. Crypto/CashApp/Zelle default true at the vendor
  // level, so this stays generous.
  const caps = useMemo(() => {
    if (items.length === 0) {
      return { acceptsCrypto: true, acceptsCashApp: true, acceptsZelle: true };
    }
    return items.reduce(
      (acc, i) => {
        const v = getVendor(i.product.vendorSlug);
        return {
          acceptsCrypto: acc.acceptsCrypto && v?.acceptsCrypto !== false,
          acceptsCashApp: acc.acceptsCashApp && v?.acceptsCashApp !== false,
          acceptsZelle: acc.acceptsZelle && v?.acceptsZelle !== false,
        };
      },
      { acceptsCrypto: true, acceptsCashApp: true, acceptsZelle: true }
    );
  }, [items]);

  const cryptoDiscount = method === "crypto" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - cryptoDiscount;
  const hasInquiry = items.some((i) => i.product.priceType === "inquiry");

  const placeOrder = () => {
    if (items.length === 0 || submitting) return;
    setSubmitting(true);
    router.push(`/checkout/success?method=${method}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-8 sm:mb-12"
      >
        <div className="text-xs uppercase tracking-wider text-muted mb-2">
          Step 2 of 2
        </div>
        <h1 className="font-display text-5xl sm:text-6xl leading-none">
          Checkout
        </h1>
        <p className="text-sm text-muted mt-3 max-w-xl">
          Pick how you pay. We unlock the vendor contact the moment the order
          goes through.
        </p>
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="border border-line rounded-md bg-card p-10 text-center"
        >
          <div className="font-display text-2xl mb-2">Cart's empty.</div>
          <p className="text-sm text-muted mb-6">
            Add a service first. We can't lock you in on nothing.
          </p>
          <Link
            href="/"
            className="inline-block bg-foreground text-background rounded-full px-5 py-2.5 text-sm hover:bg-accent transition"
          >
            Browse vendors
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10">
          {/* LEFT: order + payment */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Order summary */}
            <section className="border border-line rounded-md bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-line flex items-center justify-between">
                <h2 className="font-display text-lg">Order</h2>
                <span className="text-xs text-muted">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <ul>
                {items.map((i) => {
                  const vendor = getVendor(i.product.vendorSlug);
                  const lineTotal =
                    i.product.priceType === "inquiry"
                      ? null
                      : i.product.price * i.qty;
                  return (
                    <li
                      key={i.product.slug}
                      className="flex gap-4 px-5 py-4 border-b border-line last:border-b-0"
                    >
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-md shrink-0 flex items-center justify-center text-2xl text-white/90"
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
                          href={`/vendor/${i.product.vendorSlug}`}
                          className="text-[11px] uppercase tracking-wide text-muted hover:text-foreground transition"
                        >
                          {vendor?.name}
                        </Link>
                        <Link
                          href={`/product/${i.product.slug}`}
                          className="block text-sm font-medium leading-snug hover:underline underline-offset-2"
                        >
                          {i.product.title}
                        </Link>
                        <div className="text-xs text-muted mt-1">
                          Qty {i.qty}
                        </div>
                        <button
                          onClick={() => remove(i.product.slug)}
                          className="text-[11px] text-muted hover:text-foreground mt-1 underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-medium">
                          {lineTotal !== null
                            ? `$${lineTotal.toLocaleString()}`
                            : "Quoted"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Payment selector */}
            <section>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="font-display text-lg">How you paying?</h2>
                <span className="text-xs text-muted">Pick one</span>
              </div>
              <PaymentMethodPicker
                selected={method}
                onChange={setMethod}
                acceptsCrypto={caps.acceptsCrypto}
                acceptsCashApp={caps.acceptsCashApp}
                acceptsZelle={caps.acceptsZelle}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={method}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 border border-line bg-background rounded-md px-4 py-3"
                >
                  <div className="text-sm font-medium">
                    {methodCopy[method].title}
                  </div>
                  <div className="text-xs text-muted mt-1 leading-relaxed">
                    {methodCopy[method].body}
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>
          </motion.div>

          {/* RIGHT: totals */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:sticky lg:top-24 self-start"
          >
            <div className="border border-line rounded-md bg-card p-5 space-y-4">
              <h2 className="font-display text-lg">Totals</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <AnimatePresence>
                  {method === "crypto" && cryptoDiscount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-emerald-700"
                    >
                      <span>Crypto discount −10%</span>
                      <span>−${cryptoDiscount.toLocaleString()}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="border-t border-line pt-3 flex justify-between text-base font-medium">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                {hasInquiry && (
                  <div className="text-[11px] text-muted pt-1">
                    Inquiry items quoted separately after vendor reaches out.
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={placeOrder}
                disabled={submitting}
                className="w-full bg-foreground text-background rounded-full py-3.5 text-sm font-medium hover:bg-accent transition disabled:opacity-50"
              >
                {submitting ? "Locking it in…" : "Place order"}
              </motion.button>
              <div className="text-[11px] text-muted text-center leading-relaxed">
                By placing the order you agree to coordinate directly with the
                vendor. We've got receipts.
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  );
}

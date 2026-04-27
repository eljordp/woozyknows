"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { getVendor, type Vendor } from "@/lib/data";

type Method = "stripe" | "crypto" | "cashapp" | "zelle";

const methodSubhead: Record<Method, string> = {
  stripe: "Receipt sent. Vendors will reach out to coordinate.",
  crypto: "Pay in crypto on the next page. Vendor unlocks once funds clear.",
  cashapp: "We DM'd you each vendor's $cashtag. Pay within 30 min.",
  zelle: "We DM'd you each vendor's Zelle info. Pay within 30 min.",
};

function isMethod(v: string | null): v is Method {
  return v === "stripe" || v === "crypto" || v === "cashapp" || v === "zelle";
}

function SuccessInner() {
  const params = useSearchParams();
  const raw = params.get("method");
  const method: Method = isMethod(raw) ? raw : "stripe";
  const { items } = useCart();

  // Unique vendors from cart
  const vendors = useMemo<Vendor[]>(() => {
    const seen = new Set<string>();
    const out: Vendor[] = [];
    for (const i of items) {
      if (seen.has(i.product.vendorSlug)) continue;
      const v = getVendor(i.product.vendorSlug);
      if (v) {
        out.push(v);
        seen.add(i.product.vendorSlug);
      }
    }
    return out;
  }, [items]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10 sm:mb-14"
      >
        <div className="text-xs uppercase tracking-wider text-muted mb-3">
          Order placed
        </div>
        <h1 className="font-display italic text-6xl sm:text-7xl md:text-8xl leading-[0.95]">
          You're locked in.
        </h1>
        <p className="text-base sm:text-lg text-muted mt-5 max-w-2xl">
          {methodSubhead[method]}
        </p>
      </motion.div>

      {vendors.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl">Your plug list</h2>
            <span className="text-xs text-muted">
              {vendors.length}{" "}
              {vendors.length === 1 ? "vendor" : "vendors"} unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vendors.map((v, idx) => (
              <motion.div
                key={v.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.35,
                  delay: 0.15 + idx * 0.07,
                  ease: "easeOut",
                }}
                className="border border-line rounded-md bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <Link
                      href={`/vendor/${v.slug}`}
                      className="font-display text-xl leading-tight hover:underline underline-offset-2"
                    >
                      {v.name}
                    </Link>
                    <div className="text-xs text-muted mt-1">{v.tagline}</div>
                  </div>
                  <span className="shrink-0 text-[10px] tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="mr-1">✓</span>Contact unlocked
                  </span>
                </div>

                <ul className="space-y-2 text-sm">
                  {v.contact?.phone && (
                    <li className="flex items-center justify-between gap-3 border-t border-line pt-2">
                      <span className="text-[11px] uppercase tracking-wide text-muted">
                        Phone
                      </span>
                      <a
                        href={`tel:${v.contact.phone.replace(/\s+/g, "")}`}
                        className="font-medium hover:underline underline-offset-2"
                      >
                        {v.contact.phone}
                      </a>
                    </li>
                  )}
                  {v.contact?.instagram && (
                    <li className="flex items-center justify-between gap-3 border-t border-line pt-2">
                      <span className="text-[11px] uppercase tracking-wide text-muted">
                        Instagram
                      </span>
                      <a
                        href={`https://instagram.com/${v.contact.instagram.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium hover:underline underline-offset-2"
                      >
                        {v.contact.instagram}
                      </a>
                    </li>
                  )}
                  {v.contact?.cashapp && (
                    <li className="flex items-center justify-between gap-3 border-t border-line pt-2">
                      <span className="text-[11px] uppercase tracking-wide text-muted">
                        Cash App
                      </span>
                      <span className="font-medium">{v.contact.cashapp}</span>
                    </li>
                  )}
                  {!v.contact && (
                    <li className="text-xs text-muted">
                      Vendor will DM you within the hour.
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="border border-line rounded-md bg-card p-8 text-center"
        >
          <div className="font-display text-2xl mb-2">All set.</div>
          <p className="text-sm text-muted">
            Vendor contact details were sent to your messages.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="/messages"
          className="bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium text-center hover:bg-accent transition"
        >
          Open messages
        </Link>
        <Link
          href="/"
          className="border border-line rounded-full px-6 py-3 text-sm font-medium text-center hover:border-foreground transition"
        >
          Back to browse
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="font-display text-5xl">Locking you in…</div>
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}

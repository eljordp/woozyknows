"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { categories, products, type Product } from "@/lib/data";

const budgetOptions = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100–500", min: 100, max: 500 },
  { label: "$500–2K", min: 500, max: 2000 },
  { label: "$2K+", min: 2000, max: Infinity },
  { label: "Open", min: 0, max: Infinity },
] as const;

const timingOptions = ["Today", "This week", "This month", "Whenever"] as const;

const selectableCategories = categories.filter((c) => c !== "All");

type Match = {
  category: string;
  query: string;
  budget: (typeof budgetOptions)[number]["label"];
  timing: (typeof timingOptions)[number];
};

function matchProducts(state: Match): Product[] {
  const budget = budgetOptions.find((b) => b.label === state.budget)!;
  const isOpen = state.budget === "Open";
  const q = state.query.trim().toLowerCase();

  const scored = products
    .filter((p) => p.category === state.category)
    .filter((p) => {
      if (p.priceType === "inquiry") return isOpen || true;
      if (isOpen) return true;
      return p.price >= budget.min && p.price <= budget.max;
    })
    .map((p) => {
      let score = 0;
      if (q) {
        const hay = `${p.title} ${p.blurb} ${p.tags.join(" ")}`.toLowerCase();
        if (hay.includes(q)) score += 5;
        for (const word of q.split(/\s+/)) {
          if (word && hay.includes(word)) score += 1;
        }
      }
      if (p.priceType !== "inquiry") score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 6).map((s) => s.p);
}

function PlugMeInContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [category, setCategory] = useState<string>(selectableCategories[0]);
  const [query, setQuery] = useState<string>(initialQ);
  const [budget, setBudget] =
    useState<(typeof budgetOptions)[number]["label"]>("Open");
  const [timing, setTiming] =
    useState<(typeof timingOptions)[number]>("This week");
  const [submitted, setSubmitted] = useState<Match | null>(null);

  // Auto-submit if a query was passed in the URL
  useEffect(() => {
    if (initialQ) {
      setSubmitted({
        category: selectableCategories[0],
        query: initialQ,
        budget: "Open",
        timing: "This week",
      });
    }
  }, [initialQ]);

  const matches = useMemo(
    () => (submitted ? matchProducts(submitted) : []),
    [submitted]
  );

  return (
    <div className="overflow-hidden">
      <section className="border-b border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.2em] text-muted mb-5"
          >
            Plug me in
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02]"
          >
            Tell us what you need.{" "}
            <span className="italic">We make the call.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-muted text-lg max-w-xl mx-auto"
          >
            One form. We line up the right plug. Pull up.
          </motion.p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted({ category, query, budget, timing });
            }}
            className="space-y-5"
          >
            <Field label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground transition"
              >
                {selectableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="What you need in one line">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Detail my SUV, build a landing page, cut for the wedding…"
                className="w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground transition"
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Budget">
                <select
                  value={budget}
                  onChange={(e) =>
                    setBudget(
                      e.target.value as (typeof budgetOptions)[number]["label"]
                    )
                  }
                  className="w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground transition"
                >
                  {budgetOptions.map((b) => (
                    <option key={b.label} value={b.label}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="When?">
                <select
                  value={timing}
                  onChange={(e) =>
                    setTiming(
                      e.target.value as (typeof timingOptions)[number]
                    )
                  }
                  className="w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground transition"
                >
                  {timingOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              className="w-full bg-foreground text-background py-4 rounded-full text-sm font-medium hover:bg-accent transition mt-2"
            >
              Find my plug →
            </motion.button>
          </form>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {submitted && (
          <motion.section
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-b border-line"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[11px] uppercase tracking-wide bg-foreground text-background px-3 py-1.5 rounded-full">
                  Matched on: {submitted.category} · {submitted.budget} ·{" "}
                  {submitted.timing}
                </span>
                <span className="text-xs text-muted">
                  {matches.length} {matches.length === 1 ? "plug" : "plugs"}{" "}
                  lined up
                </span>
              </div>

              {matches.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {matches.map((p, i) => (
                    <ProductCard key={p.slug} p={p} index={i} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-line rounded-md p-8 bg-card text-center max-w-xl mx-auto"
                >
                  <div className="font-display text-2xl">
                    Nothing direct — try sending wzyotb a custom inquiry.
                  </div>
                  <p className="mt-2 text-muted text-sm">
                    The founder takes asks the catalog can&apos;t answer.
                  </p>
                  <Link
                    href="/vendor/wzyotb"
                    className="mt-6 inline-block bg-foreground text-background px-6 py-3 rounded-full text-sm hover:bg-accent transition"
                  >
                    Hit wzyotb →
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-muted">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default function PlugMeInPage() {
  return (
    <Suspense fallback={null}>
      <PlugMeInContent />
    </Suspense>
  );
}

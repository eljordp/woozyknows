"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, vendors, categories } from "@/lib/data";
import { bundles } from "@/lib/bundles";
import ProductCard from "@/components/ProductCard";
import CategoryRail from "@/components/CategoryRail";
import Ticker from "@/components/Ticker";
import PlugMeInPrompt from "@/components/PlugMeInPrompt";

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <>
      <Ticker />

      <section className="border-b border-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs uppercase tracking-[0.2em] text-muted mb-4"
            >
              The marketplace · 14 vendors · live
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1] max-w-3xl"
            >
              Woozy knows{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="italic"
              >
                a guy for everything.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-5 text-muted max-w-xl text-lg"
            >
              Flips. Whips. Plates. Cuts. Beats. Books. Whatever you need —
              somebody on here got you.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-start md:items-end gap-3"
          >
            <div className="text-sm text-muted">
              {vendors.length} vendors · {products.length} services
            </div>
            <Link
              href="#browse"
              className="inline-block bg-foreground text-background px-6 py-3 rounded-full text-sm hover:bg-accent transition group"
            >
              Browse the catalog{" "}
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              href="/become-a-vendor"
              className="text-sm text-muted hover:text-foreground transition underline underline-offset-4"
            >
              Become a vendor →
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-line bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <PlugMeInPrompt />
        </div>
      </section>

      <CategoryRail
        categories={categories}
        active={category}
        onSelect={setCategory}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services, vendors, tags…"
          className="w-full sm:max-w-md px-4 py-2 rounded-full border border-line bg-card text-sm focus:outline-none focus:border-foreground transition"
        />
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted">Sort</span>
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "featured" | "low" | "high")
            }
            className="border border-line rounded-full px-3 py-1.5 bg-card focus:outline-none focus:border-foreground transition"
          >
            <option value="featured">Featured</option>
            <option value="low">Price ↑</option>
            <option value="high">Price ↓</option>
          </select>
        </div>
      </div>

      <section id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted">
            Nothing matches that. Try a different filter.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line mt-12 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted mb-1">
                Bundles
              </div>
              <h2 className="font-display text-2xl">Two plugs. One price.</h2>
            </div>
            <Link
              href="/bundles"
              className="text-sm text-muted hover:text-foreground transition"
            >
              See all bundles →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bundles.map((b, i) => (
              <motion.div
                key={b.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href="/bundles"
                  className="group block border border-line rounded-md overflow-hidden bg-card hover:border-foreground transition"
                >
                  <div
                    className="aspect-[4/3] flex items-center justify-center text-6xl text-white relative"
                    style={{ backgroundColor: b.imageBg }}
                  >
                    <span
                      style={{ fontFamily: "ui-serif, Georgia, serif" }}
                      className="mix-blend-difference"
                    >
                      {b.imageEmoji}
                    </span>
                    <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wide bg-foreground text-background px-1.5 py-0.5 rounded">
                      Save ${b.originalPrice - b.bundlePrice}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="font-display text-lg group-hover:underline underline-offset-2">
                      {b.title}
                    </div>
                    <div className="text-xs text-muted mt-1 line-clamp-2">
                      {b.blurb}
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-base font-medium">
                        ${b.bundlePrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted line-through">
                        ${b.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl">Featured vendors</h2>
            <Link
              href="#"
              className="text-sm text-muted hover:text-foreground transition"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {vendors.slice(0, 5).map((v, i) => (
              <motion.div
                key={v.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href={`/vendor/${v.slug}`}
                  className="group relative flex flex-col items-start p-4 border border-line rounded-md hover:border-foreground transition bg-card h-full"
                >
                  {v.founder && (
                    <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wide bg-foreground text-background px-1.5 py-0.5 rounded">
                      Founder
                    </span>
                  )}
                  <div
                    className="w-10 h-10 rounded-full mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: v.accent }}
                  />
                  <div className="text-sm font-medium group-hover:underline underline-offset-2">
                    {v.name}
                  </div>
                  <div className="text-xs text-muted mt-0.5">{v.tagline}</div>
                  <div className="text-xs text-muted mt-2">
                    ★ {v.rating} · {v.reviewCount}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
              For vendors
            </div>
            <h2 className="font-display text-3xl sm:text-5xl leading-tight">
              You got product.{" "}
              <span className="italic">We got the eyeballs.</span>
            </h2>
            <p className="mt-4 text-muted max-w-md">
              List your hustle on the right shelf. Get pushed to the right
              buyers. Pay for the visibility you want.
            </p>
            <Link
              href="/become-a-vendor"
              className="mt-6 inline-block bg-foreground text-background px-6 py-3 rounded-full text-sm hover:bg-accent transition"
            >
              See vendor packages →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Listed", v: "$0" },
              { k: "Boost", v: "$49/mo" },
              { k: "Featured", v: "$199/mo" },
              { k: "Partner", v: "Inquire" },
            ].map((tier, i) => (
              <motion.div
                key={tier.k}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border border-line rounded-md p-5 bg-card"
              >
                <div className="text-xs uppercase tracking-wide text-muted">
                  Tier
                </div>
                <div className="font-display text-2xl mt-1">{tier.k}</div>
                <div className="text-sm mt-3">{tier.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

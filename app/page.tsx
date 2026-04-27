"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products, vendors, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import CategoryRail from "@/components/CategoryRail";

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
    if (sort === "low")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <>
      <section className="border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
              Woozy knows{" "}
              <span className="italic">a guy for everything.</span>
            </h1>
            <p className="mt-4 text-muted max-w-xl">
              A marketplace of vetted vendors. Browse fixed-price packages or
              send a custom inquiry. We&apos;ll plug you in.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="text-sm text-muted">
              {vendors.length} vendors · {products.length} services
            </div>
            <Link
              href="#browse"
              className="inline-block bg-foreground text-background px-5 py-2.5 rounded-full text-sm hover:bg-accent transition"
            >
              Browse the catalog →
            </Link>
          </div>
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
          className="w-full sm:max-w-md px-4 py-2 rounded-full border border-line bg-card text-sm focus:outline-none focus:border-foreground"
        />
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted">Sort</span>
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "featured" | "low" | "high")
            }
            className="border border-line rounded-full px-3 py-1.5 bg-card focus:outline-none focus:border-foreground"
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
            {filtered.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl">Featured vendors</h2>
            <Link href="#" className="text-sm text-muted hover:text-foreground">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {vendors.slice(0, 5).map((v) => (
              <Link
                key={v.slug}
                href={`/vendor/${v.slug}`}
                className="group flex flex-col items-start p-4 border border-line rounded-md hover:border-foreground transition bg-card"
              >
                <div
                  className="w-10 h-10 rounded-full mb-3"
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

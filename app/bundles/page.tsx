"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { bundles } from "@/lib/bundles";
import { getProduct } from "@/lib/data";

export default function BundlesPage() {
  return (
    <div className="overflow-hidden">
      <section className="border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.2em] text-muted mb-5"
          >
            Bundles
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] max-w-4xl"
          >
            Two plugs. <span className="italic">One price.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-6 text-muted text-lg max-w-2xl"
          >
            We pair vendors who work clean together. You save.
          </motion.p>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {bundles.map((b, i) => {
              const items = b.productSlugs
                .map((slug) => getProduct(slug))
                .filter(
                  (p): p is NonNullable<ReturnType<typeof getProduct>> =>
                    Boolean(p)
                );
              const savings = b.originalPrice - b.bundlePrice;

              return (
                <motion.article
                  key={b.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col rounded-md border border-line bg-card overflow-hidden"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden"
                    style={{ backgroundColor: b.imageBg }}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center text-white/90 mix-blend-difference"
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 180, damping: 14 }}
                    >
                      <span
                        style={{ fontFamily: "ui-serif, Georgia, serif" }}
                        className="text-[8rem] sm:text-[10rem] leading-none"
                      >
                        {b.imageEmoji}
                      </span>
                    </motion.div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] tracking-wide uppercase bg-white/90 text-foreground px-2 py-1 rounded">
                        Bundle
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div>
                      <h2 className="font-display text-2xl leading-snug">
                        {b.title}
                      </h2>
                      <p className="mt-2 text-muted text-sm leading-relaxed">
                        {b.blurb}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {items.map((p, idx) => (
                        <span key={p.slug} className="flex items-center gap-2">
                          <span className="border border-line rounded-full px-3 py-1">
                            {p.title}
                          </span>
                          {idx < items.length - 1 && (
                            <span className="text-muted">+</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-line flex items-end justify-between gap-4">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-display text-3xl">
                          ${b.bundlePrice.toLocaleString()}
                        </span>
                        <span className="text-muted line-through text-sm">
                          ${b.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide bg-foreground text-background px-2 py-1 rounded-full">
                          Save ${savings}
                        </span>
                      </div>
                    </div>

                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Link
                        href={`/bundle/${b.slug}`}
                        className="block w-full text-center border border-line rounded-full py-3 text-sm hover:border-foreground hover:bg-foreground hover:text-background transition"
                      >
                        Cop bundle →
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

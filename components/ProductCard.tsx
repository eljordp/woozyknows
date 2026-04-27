"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product, getVendor } from "@/lib/data";

export default function ProductCard({
  p,
  index = 0,
}: {
  p: Product;
  index?: number;
}) {
  const { add } = useCart();
  const vendor = getVendor(p.vendorSlug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.4), ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col"
    >
      <Link
        href={`/product/${p.slug}`}
        className="block aspect-square rounded-md overflow-hidden border border-line relative"
        style={{ backgroundColor: p.imageBg }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-5xl text-white/90 mix-blend-difference"
          whileHover={{ scale: 1.1, rotate: 4 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <span style={{ fontFamily: "ui-serif, Georgia, serif" }}>
            {p.imageEmoji}
          </span>
        </motion.div>
        <div className="absolute top-2 left-2">
          <span className="text-[10px] tracking-wide uppercase bg-white/90 text-foreground px-1.5 py-0.5 rounded">
            {p.category}
          </span>
        </div>
        {p.priceType === "inquiry" && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] tracking-wide uppercase bg-foreground text-background px-1.5 py-0.5 rounded">
              Custom
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      <div className="pt-3 flex flex-col gap-1">
        <Link
          href={`/vendor/${p.vendorSlug}`}
          className="text-[11px] uppercase tracking-wide text-muted hover:text-foreground transition"
        >
          {vendor?.name}
        </Link>
        <Link
          href={`/product/${p.slug}`}
          className="text-sm leading-snug font-medium hover:underline underline-offset-2"
        >
          {p.title}
        </Link>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm">{formatPrice(p)}</span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => add(p)}
            className="text-xs border border-line px-2 py-1 rounded-full hover:border-foreground hover:bg-foreground hover:text-background transition"
          >
            {p.priceType === "inquiry" ? "Inquire" : "Add"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

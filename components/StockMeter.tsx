"use client";

import { motion } from "framer-motion";
import type { Product } from "@/lib/data";

export default function StockMeter({ p }: { p: Product }) {
  if (p.productType !== "drop") return null;
  const total = p.stockTotal ?? 0;
  const left = p.stockLeft ?? 0;
  if (total === 0) return null;
  const pct = Math.max(0, Math.min(100, (left / total) * 100));
  const soldOut = left <= 0;
  const lowStock = !soldOut && pct < 30;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span
          className={`uppercase tracking-wide ${
            soldOut ? "text-muted" : lowStock ? "text-foreground font-medium" : "text-muted"
          }`}
        >
          {soldOut ? "Sold out" : `${left} of ${total} left`}
        </span>
        {lowStock && !soldOut && (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="text-[10px] uppercase tracking-wide bg-foreground text-background px-1.5 py-0.5 rounded"
          >
            Going fast
          </motion.span>
        )}
      </div>
      <div className="h-1 bg-line rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${soldOut ? "bg-muted" : "bg-foreground"}`}
        />
      </div>
    </div>
  );
}

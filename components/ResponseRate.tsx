"use client";

import { motion } from "framer-motion";
import type { Vendor } from "@/lib/data";

export default function ResponseRate({ vendor }: { vendor: Vendor }) {
  const time = vendor.responseTime;
  const rate = vendor.responseRate;

  if (!time && rate == null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-flex items-center gap-2 text-xs text-muted"
    >
      {time && <span>Replies in {time}</span>}
      {time && rate != null && (
        <span aria-hidden className="text-muted/50">
          ·
        </span>
      )}
      {rate != null && <span>{rate}% response rate</span>}
    </motion.div>
  );
}

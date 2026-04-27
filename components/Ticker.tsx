"use client";

import { motion } from "framer-motion";

const items = [
  "Just booked: House call cut — Miami",
  "Just booked: Charger weekend rental — Houston",
  "Just dropped: Mixed electronics pallet",
  "Live now: 14 vendors taking inquiries",
  "Just booked: Custom beat — ATL",
  "Just dropped: 1:1 sneaker search",
  "Just booked: LLC + EIN setup",
  "Live now: Music video shoot — Memphis",
  "Just booked: Mobile detail — Atlanta",
  "Now hiring vendors → become a plug",
];

export default function Ticker() {
  return (
    <div className="bg-foreground text-background overflow-hidden border-b border-foreground">
      <motion.div
        className="flex gap-10 py-2 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="text-xs tracking-wide uppercase">
            <span className="text-background/50 mr-3">●</span>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

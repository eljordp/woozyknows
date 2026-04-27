"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Vendor } from "@/lib/data";

const SYMBOLS = ["▤", "✦", "◆", "◯", "♪", "♛", "★"];

export default function VendorStories({ vendor }: { vendor: Vendor }) {
  const count = vendor.storiesCount ?? 3;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tiles = Array.from({ length: count }, (_, i) => ({
    index: i,
    symbol: SYMBOLS[i % SYMBOLS.length],
  }));

  const open = openIndex != null ? tiles[openIndex] : null;
  const handle =
    vendor.contact?.instagram ?? `@${vendor.slug.replace(/-/g, "")}`;

  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-wide text-muted">
        Stories
      </div>
      <div className="flex flex-wrap gap-3">
        {tiles.map((t) => (
          <motion.button
            key={t.index}
            type="button"
            onClick={() => setOpenIndex(t.index)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-16 w-16 rounded-full p-[2px] cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${vendor.accent}, #e0e0e0)`,
            }}
            aria-label={`Open story ${t.index + 1} from ${vendor.name}`}
          >
            <span className="block h-full w-full rounded-full bg-background p-[2px]">
              <span
                className="flex h-full w-full items-center justify-center rounded-full text-lg font-serif text-white"
                style={{ backgroundColor: vendor.accent }}
              >
                {t.symbol}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="story-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-50 flex flex-col bg-black text-white cursor-pointer"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-5 pt-6 pb-3">
              <div className="flex items-center gap-3">
                <span
                  className="h-9 w-9 rounded-full p-[2px]"
                  style={{
                    background: `linear-gradient(135deg, ${vendor.accent}, #e0e0e0)`,
                  }}
                >
                  <span
                    className="flex h-full w-full items-center justify-center rounded-full text-xs font-serif text-white"
                    style={{ backgroundColor: vendor.accent }}
                  >
                    {open.symbol}
                  </span>
                </span>
                <div className="leading-tight">
                  <div className="font-display text-base">{vendor.name}</div>
                  <div className="text-[11px] text-white/60">{handle}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex(null);
                }}
                className="text-white/70 hover:text-white text-xs uppercase tracking-wide"
              >
                Close
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="font-serif text-[18rem] leading-none"
                style={{ color: vendor.accent }}
              >
                {open.symbol}
              </motion.div>
            </div>

            <div className="pb-8 text-center text-[11px] uppercase tracking-wide text-white/50">
              Tap to advance
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

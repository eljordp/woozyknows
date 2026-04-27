"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { threads } from "@/lib/messages";
import { getVendor } from "@/lib/data";

function preview(thread: (typeof threads)[number]): string {
  const last = thread.messages[thread.messages.length - 1];
  if (!last) return "";
  if (last.voice) {
    const m = Math.floor(last.voice.durationSec / 60);
    const s = String(last.voice.durationSec % 60).padStart(2, "0");
    return `Voice note · ${m}:${s}`;
  }
  return last.text ?? "";
}

export default function MessagesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="border-b border-line pb-6 mb-2">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-4xl sm:text-5xl"
        >
          Messages
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-sm text-muted mt-2"
        >
          {threads.length} threads · {threads.reduce((s, t) => s + t.unread, 0)}{" "}
          unread
        </motion.div>
      </header>

      <ul className="divide-y divide-line">
        {threads.map((thread, i) => {
          const vendor = getVendor(thread.vendorSlug);
          if (!vendor) return null;
          const isUnread = thread.unread > 0;

          return (
            <motion.li
              key={thread.vendorSlug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
            >
              <Link
                href={`/messages/${thread.vendorSlug}`}
                className="group flex items-center gap-4 py-4 px-3 -mx-3 rounded-md hover:bg-foreground/[0.03] transition"
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: vendor.accent }}
                  />
                  {isUnread && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`truncate ${
                        isUnread ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {vendor.name}
                    </span>
                    {vendor.verified && (
                      <span className="text-[10px] text-muted">✓</span>
                    )}
                    <span className="text-xs text-muted whitespace-nowrap">
                      · Replies in {vendor.responseTime}
                    </span>
                  </div>
                  <div
                    className={`text-sm truncate mt-0.5 ${
                      isUnread ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {preview(thread)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className={`text-xs whitespace-nowrap ${
                      isUnread ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {thread.lastAt}
                  </span>
                  {isUnread && (
                    <span className="bg-foreground text-background text-[10px] rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                      {thread.unread}
                    </span>
                  )}
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      {threads.length === 0 && (
        <div className="py-20 text-center text-muted">
          No threads yet. Pull up on a vendor.
        </div>
      )}
    </div>
  );
}

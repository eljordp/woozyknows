"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { totalUnread } from "@/lib/messages";

export default function Header() {
  const { count, open } = useCart();
  const unread = totalUnread();
  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight hover:opacity-80 transition"
        >
          WoozyKnows
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-foreground transition">
            Browse
          </Link>
          <Link href="/bundles" className="hover:text-foreground transition">
            Bundles
          </Link>
          <Link
            href="/plug-me-in"
            className="hover:text-foreground transition"
          >
            Plug me in
          </Link>
          <Link
            href="/become-a-vendor"
            className="hover:text-foreground transition"
          >
            Become a vendor
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/messages"
            className="relative text-sm border border-line px-3 py-1.5 rounded-full hover:border-foreground transition"
          >
            DMs
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                {unread}
              </span>
            )}
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={open}
            className="relative text-sm border border-line px-3 py-1.5 rounded-full hover:border-foreground transition"
          >
            Cart{" "}
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-medium ml-1"
              >
                ({count})
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}

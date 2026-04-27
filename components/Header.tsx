"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { count, open } = useCart();
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
          <Link href="/" className="hover:text-foreground transition">
            Vendors
          </Link>
          <Link
            href="/become-a-vendor"
            className="hover:text-foreground transition"
          >
            Become a vendor
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-block text-sm text-muted hover:text-foreground transition">
            Sign in
          </button>
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

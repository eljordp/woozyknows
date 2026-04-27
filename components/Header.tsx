"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { count, open } = useCart();
  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="font-display text-2xl tracking-tight">
          WoozyKnows
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">
            Browse
          </Link>
          <Link href="/" className="hover:text-foreground">
            Vendors
          </Link>
          <Link href="/" className="hover:text-foreground">
            Custom requests
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-block text-sm text-muted hover:text-foreground">
            Sign in
          </button>
          <button
            onClick={open}
            className="relative text-sm border border-line px-3 py-1.5 rounded-full hover:border-foreground transition"
          >
            Cart {count > 0 && <span className="font-medium">({count})</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product, getVendor } from "@/lib/data";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const vendor = getVendor(p.vendorSlug);

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/product/${p.slug}`}
        className="block aspect-square rounded-md overflow-hidden border border-line relative"
        style={{ backgroundColor: p.imageBg }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/90 mix-blend-difference">
          <span style={{ fontFamily: "ui-serif, Georgia, serif" }}>
            {p.imageEmoji}
          </span>
        </div>
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
      </Link>
      <div className="pt-3 flex flex-col gap-1">
        <Link
          href={`/vendor/${p.vendorSlug}`}
          className="text-[11px] uppercase tracking-wide text-muted hover:text-foreground"
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
          <button
            onClick={() => add(p)}
            className="text-xs border border-line px-2 py-1 rounded-full hover:border-foreground hover:bg-foreground hover:text-background transition"
          >
            {p.priceType === "inquiry" ? "Inquire" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/data";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const label = product.priceType === "inquiry" ? "Send inquiry" : "Add to cart";
  return (
    <button
      onClick={() => {
        if (product.priceType === "inquiry") {
          alert(
            `Inquiry sent to vendor for "${product.title}". They'll respond within 1 business day.`
          );
        } else {
          add(product);
        }
      }}
      className="w-full sm:w-auto bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition"
    >
      {label}
    </button>
  );
}

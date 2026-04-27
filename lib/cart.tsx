"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "./data";

type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (p: Product) => void;
  remove: (slug: string) => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const add = useCallback((p: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === p.slug);
      if (existing) {
        return prev.map((i) =>
          i.product.slug === p.slug ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product: p, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.product.slug !== slug));
  }, []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce(
    (sum, i) =>
      sum + (i.product.priceType === "inquiry" ? 0 : i.product.price * i.qty),
    0
  );

  return (
    <Ctx.Provider
      value={{ items, isOpen, open, close, add, remove, count, subtotal }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}

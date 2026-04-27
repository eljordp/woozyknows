"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Vendor } from "@/lib/data";

type Method = "cashapp" | "zelle" | "crypto";

const PRESETS = [5, 10, 20, 50] as const;

export default function TipJar({ vendor }: { vendor: Vendor }) {
  const [amount, setAmount] = useState<number | "custom" | null>(null);
  const [customValue, setCustomValue] = useState<string>("");
  const [method, setMethod] = useState<Method | null>(null);

  const methods = (
    [
      { id: "cashapp", label: "Cash App", enabled: !!vendor.acceptsCashApp },
      { id: "zelle", label: "Zelle", enabled: !!vendor.acceptsZelle },
      { id: "crypto", label: "Crypto", enabled: !!vendor.acceptsCrypto },
    ] as { id: Method; label: string; enabled: boolean }[]
  ).filter((m) => m.enabled);

  const handleAmount = (a: number | "custom") => {
    setAmount(a);
    setMethod(null);
  };

  const renderMethodInfo = () => {
    if (!method) return null;
    if (method === "cashapp") {
      const tag = vendor.contact?.cashapp ?? `$${vendor.slug.replace(/-/g, "")}`;
      return (
        <div className="rounded-md border border-line bg-background px-4 py-3">
          <div className="text-[10px] uppercase tracking-wide text-muted">
            Send to
          </div>
          <div className="font-display text-lg">{tag}</div>
        </div>
      );
    }
    if (method === "zelle") {
      return (
        <div className="rounded-md border border-line bg-background px-4 py-3 text-sm text-muted">
          We&apos;ll DM you the Zelle info.
        </div>
      );
    }
    return (
      <div className="rounded-md border border-line bg-background px-4 py-3 text-sm text-muted">
        We&apos;ll DM you the wallet address. BTC · ETH · USDC.
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-md border border-line bg-card p-5"
    >
      <div className="font-display text-xl">Tip the plug</div>
      <p className="mt-1 text-xs text-muted">
        Show love. Goes straight to the vendor.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const active = amount === p;
          return (
            <motion.button
              key={p}
              type="button"
              onClick={() => handleAmount(p)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -1 }}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-line bg-card text-foreground hover:border-foreground"
              }`}
            >
              ${p}
            </motion.button>
          );
        })}
        <motion.button
          type="button"
          onClick={() => handleAmount("custom")}
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -1 }}
          className={`rounded-full border px-4 py-1.5 text-sm transition ${
            amount === "custom"
              ? "border-foreground bg-foreground text-background"
              : "border-line bg-card text-foreground hover:border-foreground"
          }`}
        >
          Custom
        </motion.button>
      </div>

      <AnimatePresence>
        {amount === "custom" && (
          <motion.div
            key="custom-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-center gap-2 rounded-md border border-line bg-background px-3 py-2">
              <span className="text-muted">$</span>
              <input
                type="number"
                inputMode="decimal"
                min={1}
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="Amount"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {amount != null && methods.length > 0 && (
          <motion.div
            key="methods"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="mt-4"
          >
            <div className="text-[10px] uppercase tracking-wide text-muted">
              Pay with
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {methods.map((m) => {
                const active = method === m.id;
                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ y: -1 }}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-line bg-card text-foreground hover:border-foreground"
                    }`}
                  >
                    {m.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {method && (
          <motion.div
            key="method-info"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="mt-3"
          >
            {renderMethodInfo()}
          </motion.div>
        )}
      </AnimatePresence>

      {amount != null && methods.length === 0 && (
        <div className="mt-4 rounded-md border border-line bg-background px-4 py-3 text-xs text-muted">
          This vendor doesn&apos;t accept tips outside of checkout.
        </div>
      )}
    </motion.div>
  );
}

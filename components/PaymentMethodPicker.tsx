"use client";

import { motion } from "framer-motion";

export type PaymentMethod = "stripe" | "crypto" | "cashapp" | "zelle";

type Option = {
  id: PaymentMethod;
  name: string;
  tagline: string;
  enabled: boolean;
  badge?: string;
};

export default function PaymentMethodPicker({
  selected,
  onChange,
  acceptsCrypto = true,
  acceptsCashApp = true,
  acceptsZelle = true,
}: {
  selected: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
  acceptsCrypto?: boolean;
  acceptsCashApp?: boolean;
  acceptsZelle?: boolean;
}) {
  const options: Option[] = [
    {
      id: "stripe",
      name: "Stripe",
      tagline: "Cards · Apple Pay · Google Pay",
      enabled: true,
    },
    {
      id: "crypto",
      name: "Crypto",
      tagline: "BTC · ETH · USDC",
      enabled: acceptsCrypto,
      badge: "10% off",
    },
    {
      id: "cashapp",
      name: "Cash App",
      tagline: "Pay the $cashtag",
      enabled: acceptsCashApp,
    },
    {
      id: "zelle",
      name: "Zelle",
      tagline: "Phone or email",
      enabled: acceptsZelle,
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Payment method"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        const disabled = !opt.enabled;
        return (
          <motion.button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => !disabled && onChange(opt.id)}
            whileHover={disabled ? undefined : { y: -2 }}
            whileTap={disabled ? undefined : { scale: 0.98 }}
            className={`relative text-left rounded-md border px-4 py-3 transition ${
              isSelected
                ? "border-foreground bg-foreground text-background"
                : "border-line bg-card text-foreground hover:border-foreground"
            } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-display text-base leading-tight">
                  {opt.name}
                </div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    isSelected ? "text-background/70" : "text-muted"
                  }`}
                >
                  {opt.tagline}
                </div>
              </div>
              {opt.badge && (
                <span
                  className={`shrink-0 text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-full font-medium ${
                    isSelected
                      ? "bg-background text-foreground"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </div>
            <span
              className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                isSelected ? "bg-background" : "bg-transparent"
              } ${opt.badge ? "hidden" : ""}`}
              aria-hidden
            />
          </motion.button>
        );
      })}
    </div>
  );
}

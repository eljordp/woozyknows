import type { Vendor } from "@/lib/data";

type Chip = {
  key: string;
  label: string;
  discount?: boolean;
};

export default function AcceptedPayments({ vendor }: { vendor: Vendor }) {
  const chips: Chip[] = [{ key: "cards", label: "Cards" }];

  if (vendor.acceptsCashApp) chips.push({ key: "cashapp", label: "Cash App" });
  if (vendor.acceptsZelle) chips.push({ key: "zelle", label: "Zelle" });
  if (vendor.acceptsCrypto)
    chips.push({ key: "crypto", label: "Crypto", discount: true });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <span
          key={c.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2 py-1 text-xs text-foreground"
        >
          <span>{c.label}</span>
          {c.discount && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
              10% off
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

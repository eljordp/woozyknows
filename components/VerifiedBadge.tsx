import type { Vendor } from "@/lib/data";

export default function VerifiedBadge({ vendor }: { vendor: Vendor }) {
  if (!vendor.verified) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2 py-0.5 text-[11px] text-muted"
      aria-label="Verified vendor"
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
        aria-hidden
      />
      <svg
        viewBox="0 0 12 12"
        className="h-2.5 w-2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M2.5 6.5L5 9l4.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="tracking-wide">Verified</span>
    </span>
  );
}

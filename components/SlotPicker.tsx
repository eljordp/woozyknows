"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import type { Product, Vendor } from "@/lib/data";

const DAYS_AHEAD = 7;
const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

function nextDays(n: number): Date[] {
  const out: Date[] = [];
  const start = new Date();
  start.setDate(start.getDate() + 1);
  for (let i = 0; i < n; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push(d);
  }
  return out;
}

function shortDay(d: Date): string {
  return d.toLocaleDateString(undefined, { weekday: "short" });
}
function shortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function googleCalendarUrl(opts: {
  title: string;
  start: Date;
  durationMin: number;
  details?: string;
  location?: string;
}): string {
  const { title, start, durationMin, details = "", location = "" } = opts;
  const end = new Date(start.getTime() + durationMin * 60_000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function SlotPicker({
  product,
  vendor,
}: {
  product: Product;
  vendor: Vendor;
}) {
  const { add } = useCart();
  const days = nextDays(DAYS_AHEAD);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);

  const selectedDay = days[dayIdx];
  const isCall = product.productType === "call";
  const dur = product.durationMin ?? (isCall ? 60 : 90);

  const start = (() => {
    if (!time) return null;
    const [h, m] = time.split(":").map(Number);
    const d = new Date(selectedDay);
    d.setHours(h, m, 0, 0);
    return d;
  })();

  const calUrl = start
    ? googleCalendarUrl({
        title: `${product.title} — ${vendor.name}`,
        start,
        durationMin: dur,
        details: `${product.blurb}\n\nBooked through WoozyKnows.`,
        location: vendor.location,
      })
    : null;

  return (
    <div className="border border-line rounded-md p-5 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">
            {isCall ? "Pick a call slot" : "Pick a time"}
          </div>
          <div className="text-sm mt-0.5">
            {dur} min · {vendor.location}
          </div>
        </div>
        <div className="text-xs text-muted">All times your local</div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {days.map((d, i) => {
          const active = i === dayIdx;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDayIdx(i);
                setTime(null);
              }}
              className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-md border transition ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-line text-foreground hover:border-foreground"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wide opacity-70">
                {shortDay(d)}
              </span>
              <span className="text-sm font-medium">{shortDate(d)}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
        {TIME_SLOTS.map((t) => {
          const active = t === time;
          return (
            <motion.button
              key={t}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -1 }}
              onClick={() => setTime(t)}
              className={`text-sm py-2 rounded border transition ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-line hover:border-foreground"
              }`}
            >
              {t}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {time && start && calUrl && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-5 pt-5 border-t border-line space-y-3"
          >
            <div className="text-sm">
              Locked:{" "}
              <span className="font-medium">
                {shortDay(selectedDay)} {shortDate(selectedDay)} · {time}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => add(product)}
                className="flex-1 bg-foreground text-background py-3 rounded-full text-sm font-medium hover:bg-accent transition"
              >
                Add to cart
              </motion.button>
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border border-line py-3 rounded-full text-sm hover:border-foreground transition inline-flex items-center justify-center gap-2"
              >
                <span className="text-xs uppercase tracking-wide">
                  + Google Calendar
                </span>
              </a>
            </div>
            <div className="text-xs text-muted">
              We auto-create the event when you check out. Hit the button above
              to add it now.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

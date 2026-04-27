"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Message } from "@/lib/messages";
import type { Vendor } from "@/lib/data";

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function VoiceBubble({
  durationSec,
  mine,
}: {
  durationSec: number;
  mine: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const bars = Array.from({ length: 22 }, (_, i) =>
    Math.round(40 + Math.sin(i * 1.3) * 28 + (i % 3) * 12)
  );
  return (
    <div className="flex items-center gap-3 min-w-[180px]">
      <button
        onClick={() => setPlaying((p) => !p)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
          mine
            ? "bg-background/20 text-background"
            : "bg-foreground text-background"
        }`}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "❚❚" : "▶"}
      </button>
      <div className="flex items-center gap-[2px] h-7 flex-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full ${
              mine ? "bg-background/60" : "bg-foreground/50"
            }`}
            style={{ height: `${Math.min(h, 100)}%` }}
          />
        ))}
      </div>
      <span
        className={`text-xs flex-shrink-0 ${
          mine ? "text-background/70" : "text-muted"
        }`}
      >
        {formatDuration(durationSec)}
      </span>
    </div>
  );
}

const QUICK_REPLIES = ["Send my Cash App", "Book a call", "Share contact"];

export default function ThreadView({
  vendor,
  messages,
}: {
  vendor: Vendor;
  messages: Message[];
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] max-w-3xl mx-auto w-full">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-line">
        <div className="px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            href="/messages"
            className="text-foreground hover:opacity-60 transition text-xl leading-none w-8 h-8 flex items-center justify-center -ml-2"
            aria-label="Back to messages"
          >
            ←
          </Link>
          <Link
            href={`/vendor/${vendor.slug}`}
            className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition"
          >
            <div
              className="w-9 h-9 rounded-full flex-shrink-0"
              style={{ backgroundColor: vendor.accent }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium truncate">{vendor.name}</span>
                {vendor.verified && (
                  <span
                    className="text-[10px] text-background bg-foreground rounded-full w-3.5 h-3.5 flex items-center justify-center flex-shrink-0"
                    aria-label="Verified"
                  >
                    ✓
                  </span>
                )}
              </div>
              <div className="text-xs text-muted truncate">
                Replies in {vendor.responseTime}
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Messages stream */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        {messages.map((m, i) => {
          const mine = m.from === "me";
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: Math.min(i * 0.04, 0.4),
                duration: 0.3,
                ease: "easeOut",
              }}
              className={`flex flex-col ${mine ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[78%] px-4 py-2.5 ${
                  m.voice ? "min-w-[220px]" : ""
                } ${
                  mine
                    ? "bg-foreground text-background rounded-2xl rounded-br-md"
                    : "bg-card border border-line text-foreground rounded-2xl rounded-bl-md"
                }`}
              >
                {m.voice ? (
                  <VoiceBubble durationSec={m.voice.durationSec} mine={mine} />
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {m.text}
                  </p>
                )}
              </div>
              <span className="text-[10px] text-muted mt-1 px-1">{m.at}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Quick replies + composer */}
      <div className="border-t border-line bg-background">
        <div className="px-4 sm:px-6 pt-3 pb-2 flex gap-2 overflow-x-auto">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              onClick={() => alert(`Quick reply: ${q}`)}
              className="text-xs whitespace-nowrap border border-line bg-card hover:border-foreground hover:bg-foreground hover:text-background transition rounded-full px-3 py-1.5"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            alert(`Send: ${draft}`);
            setDraft("");
          }}
          className="px-4 sm:px-6 pb-4 pt-1 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => alert("Attach (mock)")}
            className="w-9 h-9 rounded-full border border-line hover:border-foreground transition flex items-center justify-center text-lg leading-none flex-shrink-0"
            aria-label="Attach"
          >
            +
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message ${vendor.name}…`}
            className="flex-1 px-4 py-2.5 rounded-full border border-line bg-card text-sm focus:outline-none focus:border-foreground transition"
          />
          <button
            type="button"
            onClick={() => alert("Voice note (mock)")}
            className="w-9 h-9 rounded-full border border-line hover:border-foreground transition flex items-center justify-center text-sm flex-shrink-0"
            aria-label="Voice note"
          >
            🎙
          </button>
          <button
            type="submit"
            className="bg-foreground text-background rounded-full px-5 py-2.5 text-sm hover:opacity-90 transition flex-shrink-0"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

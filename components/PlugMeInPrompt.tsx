"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PlugMeInPrompt() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(`/plug-me-in${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border border-line rounded-md p-6 bg-card"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
        Plug me in
      </div>
      <h3 className="font-display text-2xl leading-snug">
        What you need? <span className="italic">We got it.</span>
      </h3>

      <form
        onSubmit={submit}
        className="mt-5 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tell us in one line…"
          className="flex-1 border border-line rounded-full px-4 py-3 bg-background focus:outline-none focus:border-foreground transition text-sm"
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className="bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition"
        >
          Search →
        </motion.button>
      </form>
    </motion.div>
  );
}

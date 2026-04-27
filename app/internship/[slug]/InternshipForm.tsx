"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function InternshipForm({
  vendorName,
  title,
}: {
  vendorName: string;
  title: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-foreground rounded-md p-8 bg-card text-center"
      >
        <div className="font-display text-3xl">You&apos;re in line.</div>
        <p className="mt-2 text-muted">
          {vendorName} reviews every applicant by hand. Hear back in 48h.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/messages"
            className="border border-line px-5 py-2.5 rounded-full text-sm hover:border-foreground transition"
          >
            Open messages
          </Link>
          <Link
            href="/"
            className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm hover:bg-accent transition"
          >
            Back to browse
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your name" name="name" required />
        <Field label="Phone or email" name="contact" required />
      </div>
      <Field label="Where you at?" name="location" placeholder="City, state" />
      <div>
        <label className="text-xs uppercase tracking-wide text-muted">
          Why this internship?
        </label>
        <textarea
          name="why"
          required
          rows={4}
          placeholder="Keep it real. What do you want to learn, build, ship?"
          className="mt-1 w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground transition resize-none"
        />
      </div>
      <Field
        label="Show your work (link)"
        name="link"
        placeholder="IG, portfolio, GitHub, anything"
      />
      <div>
        <label className="text-xs uppercase tracking-wide text-muted">
          Stipend or equity?
        </label>
        <select
          name="comp"
          defaultValue="Either"
          className="mt-1 w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground"
        >
          <option>Either</option>
          <option>Stipend</option>
          <option>Equity</option>
        </select>
      </div>
      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        className="w-full bg-foreground text-background py-4 rounded-full text-sm font-medium hover:bg-accent transition"
      >
        Apply for {title} →
      </motion.button>
      <p className="text-xs text-muted text-center">
        Free to apply. {vendorName} replies in DMs.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-muted">
        {label}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground transition"
      />
    </div>
  );
}

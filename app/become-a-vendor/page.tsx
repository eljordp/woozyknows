"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const tiers = [
  {
    name: "Listed",
    price: "$0",
    sub: "Free to list",
    blurb: "Get on the platform. Show up in browse and search.",
    perks: [
      "Up to 5 service listings",
      "Vendor profile page",
      "DMs from buyers",
      "Standard placement in browse",
    ],
    cta: "Start listing",
    accent: "border-line",
    push: "Standard placement",
  },
  {
    name: "Boost",
    price: "$49",
    sub: "/month",
    blurb: "Skip past free vendors. Show up first when buyers search your category.",
    perks: [
      "Everything in Listed",
      "Up to 15 service listings",
      "2× search placement",
      "Boost badge on cards",
      "Weekly performance email",
    ],
    cta: "Boost my listings",
    accent: "border-foreground",
    push: "2× placement",
  },
  {
    name: "Featured",
    price: "$199",
    sub: "/month",
    blurb: "Top of the catalog. Homepage rotation. Vendor spotlight content.",
    perks: [
      "Everything in Boost",
      "Unlimited listings",
      "Top of category page",
      "Homepage rotation",
      "Vendor spotlight (1×/qtr)",
      "Priority support",
    ],
    cta: "Get featured",
    accent: "border-foreground bg-foreground/[0.03]",
    push: "Top of category + homepage",
    highlight: true,
  },
  {
    name: "Partner",
    price: "Inquire",
    sub: "Custom",
    blurb: "Brand campaigns, exclusive drops, co-marketing. Built around what you sell.",
    perks: [
      "Custom collab",
      "Co-branded content",
      "Email + IG features",
      "Direct ops support",
      "Equity / rev-share options",
    ],
    cta: "Talk to us",
    accent: "border-line",
    push: "Custom",
  },
];

export default function BecomeVendor() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="overflow-hidden">
      <section className="border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.2em] text-muted mb-5"
          >
            Become a vendor
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.02] max-w-4xl"
          >
            How much do you{" "}
            <span className="italic">value your investment?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-muted text-lg max-w-2xl"
          >
            You already got the product. The hustle. The skill. What you don&apos;t
            got is the eyeballs. We do. List with us — pick a tier — and we
            push you to the buyers who&apos;ll actually pay.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#tiers"
              className="bg-foreground text-background px-6 py-3 rounded-full text-sm hover:bg-accent transition"
            >
              See packages →
            </a>
            <a
              href="#apply"
              className="border border-line px-6 py-3 rounded-full text-sm hover:border-foreground transition"
            >
              Apply now
            </a>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-line bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-3 gap-8">
          {[
            {
              n: "01",
              h: "Real eyeballs",
              p: "Buyers come to WoozyKnows looking. Not scrolling — shopping. They find you and they pay.",
            },
            {
              n: "02",
              h: "You set the price",
              p: "Fixed packages. From-prices. Inquiry only. Run it how you run it. We don't take a percent off your bag.",
            },
            {
              n: "03",
              h: "We push the tier you pay for",
              p: "Free gets seen. Boost gets seen first. Featured gets the homepage. Partner gets the campaign. Simple.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-background/40 font-display text-3xl">
                {b.n}
              </div>
              <h3 className="font-display text-2xl mt-3">{b.h}</h3>
              <p className="mt-2 text-background/70 leading-relaxed">{b.p}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="tiers" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
            Vendor packages
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight max-w-3xl">
            Pay for the push you actually want.
          </h2>
          <p className="mt-3 text-muted max-w-2xl">
            All tiers month-to-month. Cancel whenever. Upgrade or downgrade
            anytime. The more you invest, the harder we push.
          </p>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-md border p-6 bg-card flex flex-col ${t.accent}`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-6 bg-foreground text-background text-[10px] uppercase tracking-wide px-2 py-1 rounded">
                    Most picked
                  </div>
                )}
                <div className="text-xs uppercase tracking-wide text-muted">
                  {t.name}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-4xl">{t.price}</span>
                  <span className="text-xs text-muted">{t.sub}</span>
                </div>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed min-h-[3rem]">
                  {t.blurb}
                </p>
                <ul className="mt-4 space-y-2 text-sm flex-1">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <span className="text-muted mt-1">▪</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t border-line">
                  <div className="text-[11px] uppercase tracking-wide text-muted mb-2">
                    Push level
                  </div>
                  <div className="text-sm font-medium">{t.push}</div>
                </div>
                <a
                  href="#apply"
                  className={`mt-5 text-center text-sm py-2.5 rounded-full transition ${
                    t.highlight
                      ? "bg-foreground text-background hover:bg-accent"
                      : "border border-line hover:border-foreground"
                  }`}
                >
                  {t.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
            What vendors say
          </div>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            People are eating.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Boost paid for itself in two days. I had three new clients before the end of the week.",
                n: "Quan, Cuts by Quan",
              },
              {
                q: "I went Featured month one. Pulled in $12K from one homepage rotation.",
                n: "Rico, Rico Rentals",
              },
              {
                q: "Free tier is a real free tier. Got my first booking in 48 hours.",
                n: "Naomi, First Class Meals",
              },
              {
                q: "Partner package = 6 brand campaigns this quarter. They handle everything.",
                n: "Jay, Studio 24",
              },
            ].map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border border-line rounded-md p-6 bg-card"
              >
                <p className="font-display text-lg leading-snug">
                  &ldquo;{t.q}&rdquo;
                </p>
                <footer className="mt-4 text-sm text-muted">— {t.n}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="border-b border-line">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
            Apply
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            Tell us what you sell.
          </h2>
          <p className="mt-3 text-muted">
            We review every vendor by hand. You hear back in 48h.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 border border-foreground rounded-md p-8 bg-card text-center"
            >
              <div className="font-display text-2xl">You&apos;re in line.</div>
              <p className="mt-2 text-muted">
                We&apos;ll hit you back within 48 hours.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block text-sm underline underline-offset-4"
              >
                ← Back to browse
              </Link>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-10 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your name" name="name" required />
                <Field label="Phone or email" name="contact" required />
              </div>
              <Field label="Business name" name="business" required />
              <Field
                label="What do you sell? (one line)"
                name="product"
                required
              />
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">
                  Tier you want
                </label>
                <select
                  name="tier"
                  defaultValue="Boost"
                  className="mt-1 w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground"
                >
                  {tiers.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name} — {t.price}
                      {t.sub === "/month" ? "/mo" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">
                  IG / website (optional)
                </label>
                <input
                  name="link"
                  className="mt-1 w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground"
                />
              </div>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                className="w-full bg-foreground text-background py-4 rounded-full text-sm font-medium hover:bg-accent transition"
              >
                Apply to vend →
              </motion.button>
              <p className="text-xs text-muted text-center">
                Free to apply. No tier locks you in. Cancel anytime.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-muted">
        {label}
      </label>
      <input
        name={name}
        required={required}
        className="mt-1 w-full border border-line rounded-md px-4 py-3 bg-card focus:outline-none focus:border-foreground transition"
      />
    </div>
  );
}

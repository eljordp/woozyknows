import Link from "next/link";
import { notFound } from "next/navigation";
import { getVendor, productsByVendor } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import VerifiedBadge from "@/components/VerifiedBadge";
import ResponseRate from "@/components/ResponseRate";
import VendorStories from "@/components/VendorStories";
import TipJar from "@/components/TipJar";
import AcceptedPayments from "@/components/AcceptedPayments";

export default async function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendor(slug);
  if (!vendor) return notFound();
  const items = productsByVendor(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link href="/" className="text-sm text-muted hover:text-foreground transition">
        ← Back to browse
      </Link>

      <header className="mt-6 grid md:grid-cols-[auto_1fr_auto] gap-6 items-start border-b border-line pb-10">
        <div
          className="w-24 h-24 rounded-full"
          style={{ backgroundColor: vendor.accent }}
        />
        <div>
          <div className="text-xs uppercase tracking-wide text-muted mb-1 flex items-center gap-2 flex-wrap">
            {vendor.founder && (
              <span className="bg-foreground text-background px-1.5 py-0.5 rounded text-[10px]">
                Founder
              </span>
            )}
            <VerifiedBadge vendor={vendor} />
            <span>
              Vendor since {vendor.joined} · {vendor.location}
            </span>
          </div>
          <h1 className="font-display text-4xl">{vendor.name}</h1>
          <div className="text-muted mt-1">{vendor.tagline}</div>
          <p className="mt-4 max-w-2xl text-foreground/85 leading-relaxed">
            {vendor.bio}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted flex-wrap">
            <span>★ {vendor.rating}</span>
            <span>·</span>
            <span>{vendor.reviewCount} reviews</span>
            <span>·</span>
            <span>{items.length} services</span>
          </div>
          <div className="mt-3">
            <ResponseRate vendor={vendor} />
          </div>
          <div className="mt-4">
            <AcceptedPayments vendor={vendor} />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <Link
            href={`/messages/${vendor.slug}`}
            className="text-center bg-foreground text-background px-5 py-2.5 rounded-full text-sm hover:bg-accent transition"
          >
            Message vendor
          </Link>
          <button className="border border-line text-foreground px-5 py-2.5 rounded-full text-sm hover:border-foreground transition">
            Save vendor
          </button>
        </div>
      </header>

      {(vendor.storiesCount ?? 0) > 0 && (
        <section className="mt-8">
          <VendorStories vendor={vendor} />
        </section>
      )}

      <section className="mt-10 grid lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <h2 className="font-display text-2xl mb-6">Services</h2>
          {items.length === 0 ? (
            <div className="text-muted">No services listed yet.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8">
              {items.map((p, i) => (
                <ProductCard key={p.slug} p={p} index={i} />
              ))}
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <TipJar vendor={vendor} />
          <div className="border border-line rounded-md p-5 bg-card">
            <div className="text-xs uppercase tracking-wide text-muted">
              About this vendor
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Joined</dt>
                <dd>{vendor.joined}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Location</dt>
                <dd>{vendor.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Replies</dt>
                <dd>{vendor.responseTime ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Response rate</dt>
                <dd>{vendor.responseRate ?? "—"}%</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getVendor, productsByVendor } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

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
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        ← Back to browse
      </Link>

      <header className="mt-6 grid md:grid-cols-[auto_1fr_auto] gap-6 items-start border-b border-line pb-10">
        <div
          className="w-24 h-24 rounded-full"
          style={{ backgroundColor: vendor.accent }}
        />
        <div>
          <div className="text-xs uppercase tracking-wide text-muted mb-1">
            Vendor since {vendor.joined} · {vendor.location}
          </div>
          <h1 className="font-display text-4xl">{vendor.name}</h1>
          <div className="text-muted mt-1">{vendor.tagline}</div>
          <p className="mt-4 max-w-2xl text-foreground/85 leading-relaxed">
            {vendor.bio}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted">
            <span>★ {vendor.rating}</span>
            <span>·</span>
            <span>{vendor.reviewCount} reviews</span>
            <span>·</span>
            <span>{items.length} services</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm hover:bg-accent transition">
            Message vendor
          </button>
          <button className="border border-line text-foreground px-5 py-2.5 rounded-full text-sm hover:border-foreground transition">
            Save vendor
          </button>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-2xl mb-6">Services</h2>
        {items.length === 0 ? (
          <div className="text-muted">No services listed yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {items.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

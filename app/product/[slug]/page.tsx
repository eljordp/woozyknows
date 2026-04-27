import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getVendor,
  productsByVendor,
  formatPrice,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();
  const vendor = getVendor(product.vendorSlug);
  const more = productsByVendor(product.vendorSlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        ← Back to browse
      </Link>

      <div className="mt-6 grid md:grid-cols-2 gap-8 lg:gap-12">
        <div
          className="aspect-square rounded-md border border-line flex items-center justify-center text-9xl text-white relative"
          style={{ backgroundColor: product.imageBg }}
        >
          <span
            style={{ fontFamily: "ui-serif, Georgia, serif" }}
            className="mix-blend-difference"
          >
            {product.imageEmoji}
          </span>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-muted mb-2">
            {product.category}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight">
            {product.title}
          </h1>
          {vendor && (
            <Link
              href={`/vendor/${vendor.slug}`}
              className="mt-3 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
            >
              <span
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: vendor.accent }}
              />
              by {vendor.name} · ★ {vendor.rating} ({vendor.reviewCount})
            </Link>
          )}

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-3xl font-medium">{formatPrice(product)}</div>
            {product.priceType === "from" && (
              <span className="text-xs text-muted">final quote depends on scope</span>
            )}
          </div>

          <p className="mt-6 text-foreground/85 leading-relaxed">
            {product.blurb}
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            {product.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-muted mt-1">▪</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3 text-sm">
            <span className="text-muted">Delivery</span>
            <span className="border border-line rounded-full px-3 py-1">
              {product.delivery}
            </span>
          </div>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-6 text-xs text-muted">
            {product.priceType === "inquiry"
              ? "Custom service. Send a message and the vendor will respond with a quote."
              : "Add to cart to bundle with other services. Pay once at checkout."}
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="font-display text-2xl mb-6">
            More from {vendor?.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
            {more.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

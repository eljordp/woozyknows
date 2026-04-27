import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  getProduct,
  getVendor,
  productsByVendor,
  formatPrice,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import SlotPicker from "@/components/SlotPicker";
import StockMeter from "@/components/StockMeter";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();
  if (product.productType === "internship") {
    redirect(`/internship/${product.slug}`);
  }
  const vendor = getVendor(product.vendorSlug);
  if (!vendor) return notFound();
  const more = productsByVendor(product.vendorSlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const isBookable =
    product.productType === "call" || product.productType === "appointment";
  const isDrop = product.productType === "drop";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link href="/" className="text-sm text-muted hover:text-foreground transition">
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
          {isDrop && (
            <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] uppercase tracking-wide px-2 py-1 rounded">
              Drop
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-muted mb-2">
            {product.category}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight">
            {product.title}
          </h1>
          <Link
            href={`/vendor/${vendor.slug}`}
            className="mt-3 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition"
          >
            <span
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: vendor.accent }}
            />
            by {vendor.name} · ★ {vendor.rating} ({vendor.reviewCount})
            {vendor.responseTime && (
              <span className="text-xs"> · replies {vendor.responseTime}</span>
            )}
          </Link>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-3xl font-medium">{formatPrice(product)}</div>
            {product.priceType === "from" && (
              <span className="text-xs text-muted">
                final quote depends on scope
              </span>
            )}
            {product.productType === "subscription" && (
              <span className="text-xs text-muted">
                cancel anytime
              </span>
            )}
          </div>

          {isDrop && (
            <div className="mt-4 max-w-xs">
              <StockMeter p={product} />
            </div>
          )}

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

          {isBookable ? (
            <div id="book" className="mt-8">
              <SlotPicker product={product} vendor={vendor} />
            </div>
          ) : (
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
          )}

          <div className="mt-6 text-xs text-muted">
            {product.priceType === "inquiry"
              ? "Custom service. Send a message and the vendor will respond with a quote."
              : isBookable
              ? "Pick a slot above. We'll add it to your Google Calendar and to your cart."
              : isDrop
              ? "Limited drop. Add to cart to lock your unit."
              : "Add to cart to bundle with other services. Pay once at checkout."}
          </div>

          <div className="mt-4">
            <Link
              href={`/messages/${vendor.slug}`}
              className="text-sm text-muted hover:text-foreground transition underline underline-offset-4"
            >
              DM {vendor.name} first →
            </Link>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="font-display text-2xl mb-6">
            More from {vendor.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
            {more.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

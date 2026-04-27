import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getVendor } from "@/lib/data";
import InternshipForm from "./InternshipForm";

export default async function InternshipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.productType !== "internship") return notFound();
  const vendor = getVendor(product.vendorSlug);
  if (!vendor) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <Link
        href={`/product/${product.slug}`}
        className="text-sm text-muted hover:text-foreground transition"
      >
        ← Back to listing
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full"
          style={{ backgroundColor: vendor.accent }}
        />
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">
            Internship
          </div>
          <div className="text-sm">
            with{" "}
            <Link
              href={`/vendor/${vendor.slug}`}
              className="font-medium hover:underline underline-offset-2"
            >
              {vendor.name}
            </Link>
          </div>
        </div>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
        Apply: <span className="italic">{product.title}</span>
      </h1>
      <p className="text-muted mt-2 max-w-xl">{product.blurb}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {product.bullets.map((b) => (
          <li
            key={b}
            className="text-xs border border-line px-2.5 py-1 rounded-full"
          >
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <InternshipForm vendorName={vendor.name} title={product.title} />
      </div>
    </div>
  );
}

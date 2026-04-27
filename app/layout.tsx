import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "WoozyKnows — a guy for everything.",
  description:
    "The marketplace for people who do the work. Browse vendors, book services, send custom inquiries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <footer className="border-t border-line mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted">
              <div>
                <span className="font-display text-base text-foreground">
                  WoozyKnows
                </span>{" "}
                — a guy for everything
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition">
                  About
                </a>
                <a
                  href="/become-a-vendor"
                  className="hover:text-foreground transition"
                >
                  Become a vendor
                </a>
                <a href="#" className="hover:text-foreground transition">
                  Support
                </a>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

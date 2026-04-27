export type Bundle = {
  slug: string;
  title: string;
  blurb: string;
  productSlugs: string[];
  bundlePrice: number;
  originalPrice: number;
  imageBg: string;
  imageEmoji: string;
};

export const bundles: Bundle[] = [
  {
    slug: "wedding-day",
    title: "Wedding Day Combo",
    blurb: "Cuts on-site + private chef. We handle the day.",
    productSlugs: ["wedding-event", "private-chef-night"],
    bundlePrice: 250,
    originalPrice: 300,
    imageBg: "#7a1c1c",
    imageEmoji: "♛",
  },
  {
    slug: "new-whip-day",
    title: "New Whip Day",
    blurb: "Detailed ride + fresh cut before you stunt.",
    productSlugs: ["detail-suv-truck", "house-call-cut"],
    bundlePrice: 180,
    originalPrice: 200,
    imageBg: "#0e3b2e",
    imageEmoji: "✦",
  },
  {
    slug: "founder-stack",
    title: "Founder Stack",
    blurb: "Strategy call + landing page + LLC. From idea to launch.",
    productSlugs: ["wzyotb-strategy-call", "landing-page-plug", "llc-formation-ein"],
    bundlePrice: 950,
    originalPrice: 1050,
    imageBg: "#1a4d3a",
    imageEmoji: "▣",
  },
  {
    slug: "artist-day",
    title: "Artist Day",
    blurb: "Beat + music video shoot. Drop the single ready.",
    productSlugs: ["custom-beat", "music-video-single"],
    bundlePrice: 770,
    originalPrice: 850,
    imageBg: "#3a2e6e",
    imageEmoji: "♪",
  },
];

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

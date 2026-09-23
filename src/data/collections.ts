export type Collection = {
  slug: string;
  title: string;
  bn: string;
  blurb: string;
  categories: string[]; // category slugs — see data/categories.ts
};

// Curated groupings on top of the live category set. Any category slug not listed here (e.g. visiting
// /collections/ring directly from the category row) still works — see collections/[slug]/page.tsx,
// which falls back to a single-category browse when the slug isn't one of these curated collections.
export const collections: Collection[] = [
  { slug: "bridal", title: "Bridal Collection", bn: "বিয়ের সাজে সোনা", blurb: "Sets, chokers, bangles and mangalsutra for the big day.", categories: ["necklace", "bangle", "churi", "mangalsutra", "earrings"] },
  { slug: "everyday", title: "Everyday Jewellery", bn: "রোজকার হালকা গয়না", blurb: "Light pieces for office, college and family time.", categories: ["chain", "ring", "nose-pin", "bracelet"] },
  { slug: "necklaces", title: "Necklaces", bn: "গলার হার", blurb: "Chokers, long haars and pendants.", categories: ["necklace", "pendant", "chain"] },
  { slug: "earrings", title: "Earrings", bn: "কানের দুল", blurb: "Jhumkas, studs and drops.", categories: ["earrings"] },
  { slug: "bangles", title: "Bangles", bn: "চুড়ি ও বালা", blurb: "Bangles, churi and bracelets.", categories: ["bangle", "churi", "bracelet"] },
  { slug: "rings", title: "Rings", bn: "আংটি", blurb: "Everyday and occasion rings.", categories: ["ring"] },
];

// Categories mirror the admin's Master Catalog exactly (same names, same slugs) so a product added
// there under a given category always lands under the matching category here. See src/lib/slug.ts.
export type Category = { slug: string; name: string; image: string; alt: string };

export const categories: Category[] = [
  { slug: "ring", name: "Ring", image: "/images/products/category-rings.jpg", alt: "Gold ring with red stone" },
  { slug: "necklace", name: "Necklace", image: "/images/products/category-necklace.jpg", alt: "Gold necklace on white floral background" },
  { slug: "bangle", name: "Bangle", image: "/images/products/category-bangles.jpg", alt: "Gold bangles" },
  // TODO(client): swap in real category photos for churi, pendant, bracelet, mangalsutra and nose pin —
  // these five reuse the closest existing stock photo as a placeholder for now.
  { slug: "churi", name: "Churi", image: "/images/products/category-bangles.jpg", alt: "Gold churi bangles" },
  { slug: "pendant", name: "Pendant", image: "/images/products/category-necklace.jpg", alt: "Gold pendant" },
  { slug: "earrings", name: "Earrings", image: "/images/products/category-earrings.jpg", alt: "Gold chandbali earrings" },
  { slug: "chain", name: "Chain", image: "/images/products/category-chain.jpg", alt: "Gold curb chain" },
  { slug: "bracelet", name: "Bracelet", image: "/images/products/category-bangles.jpg", alt: "Gold bracelet" },
  { slug: "mangalsutra", name: "Mangalsutra", image: "/images/products/category-necklace.jpg", alt: "Gold mangalsutra" },
  { slug: "nose-pin", name: "Nose Pin", image: "/images/products/category-tikli.jpg", alt: "Gold nose pin" },
];

import { sbSelect } from "@/lib/supabase";
import { slugify } from "@/lib/slug";

export type Product = {
  id: number;
  code: string; // SKU
  name: string;
  category: string; // category slug — matches Category.slug in data/categories.ts
  subcategory: string | null;
  weight: string; // formatted for display, e.g. "approx. 8.2 g"
  netWeight: number; // grams
  purity: string;
  makingCharge: number; // ₹ per gram (this demo's making-charge rule — see the admin's Settings)
  image: string;
  images: string[];
  alt: string;
  description: string | null;
  inStock: boolean;
};

type Row = {
  id: number; name: string; sku: string; category: string; subcategory: string | null;
  purity: string; net_gold_weight: number; making_charge: number; description: string | null;
  images: string[]; in_stock: boolean;
};

const img = (n: string) => `/images/products/product-${n}.jpg`;

function fromRow(r: Row): Product {
  return {
    id: r.id, code: r.sku, name: r.name, category: slugify(r.category), subcategory: r.subcategory,
    weight: `approx. ${r.net_gold_weight.toFixed(2)} g`, netWeight: r.net_gold_weight, purity: r.purity,
    makingCharge: r.making_charge, image: r.images?.[0] ?? img("01"),
    images: r.images?.length ? r.images : [img("01")],
    alt: `${r.purity} gold ${r.name}`, description: r.description ?? null, inStock: r.in_stock,
  };
}

// Shown until NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are configured, or if the admin
// catalogue happens to be empty — so the site never looks broken. IDs are out of range of real products.
const FALLBACK: Product[] = [
  { id: 9001, code: "RA-N01", name: "Medallion Choker Set", category: "necklace", subcategory: null, weight: "approx. 24.6 g", netWeight: 24.6, purity: "22K", makingCharge: 850, image: img("01"), images: [img("01")], alt: "22K gold choker necklace with matching drop earrings", description: "A statement choker set with a medallion motif, finished in 22K gold.", inStock: true },
  { id: 9002, code: "RA-E01", name: "Peacock Jhumka Earrings", category: "earrings", subcategory: null, weight: "approx. 12.2 g", netWeight: 12.2, purity: "22K", makingCharge: 1150, image: img("02"), images: [img("02")], alt: "Gold peacock jhumka earrings with enamel and tassels", description: "Traditional jhumka earrings with a peacock motif and enamel work.", inStock: true },
  { id: 9003, code: "RA-B01", name: "Filigree Kada", category: "bangle", subcategory: null, weight: "approx. 28.4 g", netWeight: 28.4, purity: "22K", makingCharge: 800, image: img("03"), images: [img("03")], alt: "Wide gold filigree kada bangle with enamel flowers", description: "A wide kada with intricate filigree cutwork and enamel flowers.", inStock: true },
  { id: 9004, code: "RA-R01", name: "Floral Enamel Ring", category: "ring", subcategory: null, weight: "approx. 4.1 g", netWeight: 4.1, purity: "22K", makingCharge: 1200, image: img("04"), images: [img("04")], alt: "Gold spiral ring with red and green enamel flowers", description: "A dainty ring with a spiral band and enamelled floral detail.", inStock: true },
  { id: 9005, code: "RA-E02", name: "Chandbali Earrings", category: "earrings", subcategory: null, weight: "approx. 14.8 g", netWeight: 14.8, purity: "22K", makingCharge: 1150, image: img("05"), images: [img("05")], alt: "Gold chandbali earrings with pearl-style drops", description: "Classic chandbali earrings with pearl-style drops.", inStock: true },
  { id: 9006, code: "RA-C01", name: "Curb Link Chain", category: "chain", subcategory: null, weight: "approx. 10.8 g", netWeight: 10.8, purity: "22K", makingCharge: 850, image: img("06"), images: [img("06")], alt: "Heavy gold curb link chain", description: "A heavy curb link chain, worn daily or layered for festive wear.", inStock: true },
  { id: 9007, code: "RA-P01", name: "Om Pendant", category: "pendant", subcategory: null, weight: "approx. 3.6 g", netWeight: 3.6, purity: "22K", makingCharge: 1100, image: img("07"), images: [img("07")], alt: "Gold Om pendant", description: "A simple Om pendant in 22K gold.", inStock: true },
  { id: 9008, code: "RA-B02", name: "Baby Bracelet", category: "bracelet", subcategory: null, weight: "approx. 6.5 g", netWeight: 6.5, purity: "22K", makingCharge: 1000, image: img("08"), images: [img("08")], alt: "Slim gold baby bracelet", description: "A slim, lightweight bracelet sized for a child.", inStock: true },
];

/** Live catalogue from the admin app's Master Catalog (via the Supabase mirror — see that repo's
 *  README). Falls back to demo items if Supabase isn't configured yet or returns nothing. */
export async function getProducts(): Promise<Product[]> {
  const rows = await sbSelect<Row>("products_public", "?is_active=eq.true&order=updated_at.desc&limit=200");
  return rows.length ? rows.map(fromRow) : FALLBACK;
}

export async function getProduct(id: number): Promise<Product | null> {
  const rows = await sbSelect<Row>("products_public", `?id=eq.${id}&limit=1`);
  if (rows.length) return fromRow(rows[0]);
  return FALLBACK.find((p) => p.id === id) ?? null;
}

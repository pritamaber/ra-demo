export type Product = {
  code: string;
  name: string;
  category: string; // category slug
  weight: string;
  purity: string;
  image: string;
  alt: string;
  tags: ("bridal" | "everyday")[];
};

const img = (n: string) => `/images/products/product-${n}.jpg`;

// TODO(client): codes, names and weights are placeholders — photos are the shop's own
export const products: Product[] = [
  { code: "RA-N01", name: "Medallion Choker Set", category: "necklace", weight: "approx. 24.6 g", purity: "22K", image: img("01"), alt: "22K gold choker necklace with matching drop earrings", tags: ["bridal"] },
  { code: "RA-E01", name: "Peacock Jhumka Earrings", category: "earrings", weight: "approx. 12.2 g", purity: "22K", image: img("02"), alt: "Gold peacock jhumka earrings with enamel and tassels", tags: ["bridal"] },
  { code: "RA-B01", name: "Filigree Kada", category: "bangles", weight: "approx. 28.4 g", purity: "22K", image: img("03"), alt: "Wide gold filigree kada bangle with enamel flowers", tags: ["bridal"] },
  { code: "RA-R01", name: "Floral Enamel Ring", category: "rings", weight: "approx. 4.1 g", purity: "22K", image: img("04"), alt: "Gold spiral ring with red and green enamel flowers", tags: ["everyday"] },
  { code: "RA-E02", name: "Chandbali Earrings", category: "earrings", weight: "approx. 14.8 g", purity: "22K", image: img("05"), alt: "Gold chandbali earrings with pearl-style drops", tags: ["bridal"] },
  { code: "RA-C01", name: "Curb Link Chain", category: "chain", weight: "approx. 10.8 g", purity: "22K", image: img("06"), alt: "Heavy gold curb link chain", tags: ["everyday"] },
  { code: "RA-P01", name: "Red Pola Bangle Pair", category: "pola-badhano", weight: "approx. 12.0 g", purity: "22K", image: img("07"), alt: "Red pola bangle pair with gold work", tags: ["bridal"] },
  { code: "RA-B02", name: "Slim Peacock Bracelet", category: "bangles", weight: "approx. 6.5 g", purity: "22K", image: img("08"), alt: "Slim gold bracelet with peacock motif", tags: ["everyday"] },
  { code: "RA-N02", name: "Layered Long Haar", category: "necklace", weight: "approx. 38.0 g", purity: "22K", image: img("09"), alt: "Layered gold long haar with side brooch", tags: ["bridal"] },
  { code: "RA-N03", name: "Round Pendant Haar", category: "necklace", weight: "approx. 32.5 g", purity: "22K", image: img("10"), alt: "Gold long haar with large round pendant", tags: ["bridal"] },
  { code: "RA-R02", name: "Ruby-tone Stone Ring", category: "rings", weight: "approx. 4.6 g", purity: "22K", image: img("11"), alt: "Gold ring with red stone and white stones", tags: ["everyday"] },
  { code: "RA-R03", name: "Crossover Stone Ring", category: "rings", weight: "approx. 2.9 g", purity: "22K", image: img("12"), alt: "Slim gold crossover ring with white stones", tags: ["everyday"] },
  { code: "RA-E03", name: "Peacock Studs", category: "earrings", weight: "approx. 5.2 g", purity: "22K", image: img("13"), alt: "Gold peacock feather stud earrings", tags: ["everyday"] },
  { code: "RA-E04", name: "Flower Studs", category: "earrings", weight: "approx. 3.8 g", purity: "22K", image: img("14"), alt: "Gold flower stud earrings", tags: ["everyday"] },
  { code: "RA-C02", name: "Coin Bead Chain", category: "chain", weight: "approx. 6.4 g", purity: "22K", image: img("15"), alt: "Lightweight gold chain with coin beads", tags: ["everyday"] },
  { code: "RA-C03", name: "Textured Rope Chain", category: "chain", weight: "approx. 9.2 g", purity: "22K", image: img("16"), alt: "Gold textured chain necklace", tags: ["everyday"] },
  { code: "RA-P02", name: "White Shakha Bangle Pair", category: "pola-badhano", weight: "approx. 11.0 g", purity: "22K", image: img("17"), alt: "White shakha bangles with gold and peacock work", tags: ["bridal"] },
  { code: "RA-B03", name: "Beaded Round Kada", category: "bangles", weight: "approx. 22.0 g", purity: "22K", image: img("18"), alt: "Round gold kada with beaded detail", tags: ["bridal"] },
];

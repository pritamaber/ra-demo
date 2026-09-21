// Generates on-brand placeholder images. Replace with real shoot photos using the same filenames.
import sharp from "sharp";
import fs from "node:fs";

const themes = {
  wine: ["#7a1a42", "#3f0a20"],
  blush: ["#fbeaed", "#eccbd3"],
  satin: ["#ffffff", "#e9e3de"],
  alta: ["#b52456", "#6e0f33"],
  wood: ["#4a2f22", "#22120c"],
};
const dark = new Set(["wine", "alta", "wood"]);
const ext = "jpg";
const items = [
  // [path, w, h, theme, label]
  ["hero/hero-bridal-01", 1600, 900, "alta", "Bridal Collection"],
  ["hero/hero-necklace-01", 1600, 900, "wine", "Necklace Sets"],
  ["hero/hero-festive-01", 1600, 900, "wood", "Festive Collection"],
  ["bridal/bridal-model-01", 900, 1200, "blush", "Bridal Model"],
  ["bridal/bridal-model-02", 900, 1200, "wine", "Bridal Model"],
  ["bridal/bridal-model-03", 900, 1200, "wine", "Bridal Model"],
  ["bridal/bridal-necklace-01", 800, 800, "satin", "Bridal Necklace"],
  ["bridal/bridal-earrings-01", 800, 800, "satin", "Jhumka Earrings"],
  ["bridal/bridal-bangles-01", 800, 800, "satin", "Bridal Bangles"],
  ["bridal/bridal-tikli-01", 800, 800, "satin", "Mang Tikka"],
  ["bridal/bridal-product-05", 900, 1200, "wine", "Bridal Set"],
  ["bridal/bridal-product-06", 900, 1200, "wine", "Choker Set"],
  ["store/store-front-01", 1200, 900, "wine", "Our Store"],
  ["store/og-image", 1200, 630, "wine", "New R. A. Jewellery House"],
  ...["necklace", "earrings", "bangles", "rings", "tikli", "chain", "pola-badhano", "kids"].map((c) => [
    `products/category-${c}`, 600, 600, "blush", c.replace("-", " "),
  ]),
  ...["01","02","03","04","05","06","07","08"].map((n, i) => [
    `products/product-${n}`, 800, 800, i % 2 ? "wood" : "wine", `Gold Piece ${n}`,
  ]),
  ...["chain-01", "studs-01", "ring-01"].map((n) => [`everyday/everyday-${n}`, 800, 800, "blush", n.replace("-01", "")]),
];

for (const [p, w, h, t, label] of items) {
  const [a, b] = themes[t];
  const fg = dark.has(t) ? "#e9c46a" : "#5a0f2e";
  const s = Math.round(Math.min(w, h) / 14);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="${w/2}" cy="${h/2 - s*1.6}" r="${s*1.6}" fill="none" stroke="#c8962e" stroke-width="${s/9}"/><text x="50%" y="${h/2 + s*1.4}" text-anchor="middle" font-family="Georgia, serif" font-size="${s}" fill="${fg}">${label}</text></svg>`;
  fs.mkdirSync(`public/images/${p.split("/")[0]}`, { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`public/images/${p}.${ext}`);
}
console.log(items.length, "images");

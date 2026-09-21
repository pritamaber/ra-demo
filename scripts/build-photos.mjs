// Turns the shop's own photos in source-photos/ into the optimised, semantically named
// files the site uses. Re-run after replacing anything in source-photos/.
import sharp from "sharp";
import fs from "node:fs";

const SRC = "source-photos";
const OUT = "public/images";
const s = (p) => `${SRC}/${p}`;

const write = (out, pipeline) => {
  fs.mkdirSync(`${OUT}/${out.split("/")[0]}`, { recursive: true });
  return pipeline.jpeg({ quality: 84, mozjpeg: true }).toFile(`${OUT}/${out}.jpg`);
};

// square tile; "contain" keeps a black studio background seamless, "cover" for light backgrounds
const square = (out, src, size = 800, mode = "contain") =>
  write(out, sharp(s(src)).resize(size, size, { fit: mode, background: "#000", position: "centre" }));

const portrait = (out, src, w = 900, h = 1200) =>
  write(out, sharp(s(src)).resize(w, h, { fit: "cover", position: "attention" }));

// wide hero: subject placed on the right over a solid background, faded into it on the left
async function hero(out, src, bg, subjectH = 900, cx = 0.7) {
  const W = 1600, H = 900;
  const sub = await sharp(s(src)).resize({ height: subjectH }).toBuffer({ resolveWithObject: true });
  const left = Math.round(W * cx - sub.info.width / 2);
  const top = Math.round((H - sub.info.height) / 2);
  const fade = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="${Math.max(0, left / W)}" stop-color="${bg}" stop-opacity="1"/><stop offset="${Math.max(0.05, left / W + 0.16)}" stop-color="${bg}" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`,
  );
  await write(out, sharp({ create: { width: W, height: H, channels: 3, background: bg } })
    .composite([{ input: sub.data, left: Math.max(0, left), top: Math.max(0, top) }, { input: fade }]));
}

// ---- files (relative to source-photos/) ----
const B = "bangles", C = "chain", E = "earring", N = "necklace", R = "rings", BR = "bridal";
const f = {
  necklaceSatinA: `${N}/necklace.jpeg`, necklaceLong: `${N}/necklace.jpg`, necklaceSatinB: `${N}/necklace2.jpeg`,
  necklaceHaar: `${N}/necklace2.jpg`, necklacePendant: `${N}/necklace3.jpeg`, necklaceSet: `${N}/necklace4.jpeg`, necklaceMedallion: `${N}/necklace5.jpg`,
  peacockEar: `${E}/AV0A1215-copy-768x576.jpg`, peacockStud: `${E}/Parashmani_website_3000x1140px_gold-copy-768x576.jpg`,
  dropEar: `${E}/samg_2263-copy-768x576.jpg`, flowerStud: `${E}/samg_2309-copy-768x576.jpg`, chandbali: `${E}/SGP_2873-copy-768x576.jpg`,
};

const jobs = [];

// bridal models (portrait 3:4) and product row
jobs.push(portrait("bridal/bridal-model-01", `${BR}/image.png`));
jobs.push(portrait("bridal/bridal-model-02", `${BR}/pasha-motif-small-taira-tikli-mangtika-607208_130x.avif`));
jobs.push(portrait("bridal/bridal-model-03", `${BR}/patrobithi-long-topa-chain-30-inch-3114985_130x.avif`));
jobs.push(portrait("bridal/bridal-model-04", `${BR}/side-mina-flower-five-drops-nose-ring-nath-6637860_130x.avif`));
jobs.push(portrait("bridal/bridal-model-05", `${BR}/subhashree-mina-small-taira-tikli-mangtika-432651_130x.webp`));
jobs.push(portrait("bridal/bridal-product-05", f.necklaceMedallion.replace(/^/, ""), 900, 1200));
jobs.push(portrait("bridal/bridal-product-06", f.necklacePendant, 900, 1200));
// bridal mosaic tiles (satin/white-ish)
jobs.push(square("bridal/bridal-necklace-01", f.necklaceSatinA, 800, "cover"));
jobs.push(square("bridal/bridal-earrings-01", f.chandbali));
jobs.push(square("bridal/bridal-bangles-01", `${B}/AV0A3004-copy-768x576.jpg`));
jobs.push(square("bridal/bridal-choker-01", f.necklaceSatinB, 800, "cover"));

// categories (circular crops)
const cat = { necklace: f.necklaceSatinA, earrings: f.chandbali, bangles: `${B}/AV0A1483-copy-768x576.jpg`, rings: `${R}/AV0A2892-copy-768x576.jpg`,
  tikli: `${BR}/pasha-motif-small-taira-tikli-mangtika-607208_130x.avif`, chain: `${C}/AV0A2857-copy-768x576.jpg`,
  "pola-badhano": `${B}/AV0A3004-copy-768x576.jpg`, kids: `${B}/SGP_2781-copy-768x576.jpg` };
for (const [k, v] of Object.entries(cat)) {
  const light = ["necklace", "tikli"].includes(k);
  jobs.push(square(`products/category-${k}`, v, 600, light ? "cover" : "contain"));
}

// products
const products = [
  ["01", f.necklaceMedallion], ["02", f.peacockEar], ["03", `${B}/SGP_2633-copy-768x576.jpg`], ["04", `${R}/SGP_2954-copy-768x576.jpg`],
  ["05", f.chandbali], ["06", `${C}/AV0A2857-copy-768x576.jpg`], ["07", `${B}/AV0A3004-copy-768x576.jpg`], ["08", `${B}/SGP_2686-copy-768x576.jpg`],
  ["09", f.necklaceLong], ["10", f.necklaceHaar], ["11", `${R}/AV0A2892-copy-768x576.jpg`], ["12", `${R}/AV0A2905-copy-768x576.jpg`],
  ["13", f.peacockStud], ["14", f.flowerStud], ["15", `${C}/AV0A1664-copy-768x576.jpg`], ["16", `${C}/SGP_3028-copy-768x576.jpg`],
  ["17", `${B}/SGP_2586-copy-768x576.jpg`], ["18", `${B}/AV0A1483-copy-768x576.jpg`],
];
for (const [n, p] of products) jobs.push(square(`products/product-${n}`, p));

// everyday
jobs.push(square("everyday/everyday-chain-01", `${C}/AV0A1669-copy-768x576.jpg`));
jobs.push(square("everyday/everyday-studs-01", f.flowerStud));
jobs.push(square("everyday/everyday-ring-01", `${R}/AV0A2905-copy-768x576.jpg`));

// hero + og
jobs.push(hero("hero/hero-bridal-01", `${BR}/image.png`, "#2a0716", 900, 0.72));
jobs.push(hero("hero/hero-necklace-01", f.necklaceMedallion, "#000000", 820, 0.7));
jobs.push(hero("hero/hero-festive-01", f.peacockEar, "#000000", 820, 0.7));

await Promise.all(jobs);

// WhatsApp / Open Graph preview (1200x630)
const og = await sharp(s(f.necklaceMedallion)).resize({ height: 560 }).toBuffer({ resolveWithObject: true });
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><text x="70" y="270" font-family="Georgia, serif" font-size="58" fill="#fcfaf8">New R. A.</text><text x="70" y="340" font-family="Georgia, serif" font-size="58" fill="#fcfaf8">Jewellery House</text><rect x="70" y="370" width="120" height="3" fill="#c8962e"/><text x="70" y="425" font-family="Georgia, serif" font-size="30" fill="#e9c46a">Gold jewellery · Rajarhat Chowmatha</text></svg>`);
await write("store/og-image", sharp({ create: { width: 1200, height: 630, channels: 3, background: "#000" } })
  .composite([{ input: og.data, left: 1200 - og.info.width - 20, top: 35 }, { input: text }]));

console.log("done");

export type Collection = {
  slug: string;
  title: string;
  bn: string;
  blurb: string;
  filter: { tag?: "bridal" | "everyday"; categories?: string[] };
};

export const collections: Collection[] = [
  { slug: "bridal", title: "Bridal Collection", bn: "বিয়ের সাজে সোনা", blurb: "Sets, chokers, bangles and tikka for the big day.", filter: { tag: "bridal" } },
  { slug: "everyday", title: "Everyday Jewellery", bn: "রোজকার হালকা গয়না", blurb: "Light pieces for office, college and family time.", filter: { tag: "everyday" } },
  { slug: "necklaces", title: "Necklaces", bn: "গলার হার", blurb: "Chokers, long haars and lightweight sets.", filter: { categories: ["necklace", "chain"] } },
  { slug: "earrings", title: "Earrings", bn: "কানের দুল", blurb: "Jhumkas, studs and drops.", filter: { categories: ["earrings"] } },
  { slug: "bangles", title: "Bangles", bn: "চুড়ি ও বালা", blurb: "Bangles, chur, pola and badhano.", filter: { categories: ["bangles", "pola-badhano"] } },
  { slug: "rings", title: "Rings", bn: "আংটি", blurb: "Everyday and occasion rings.", filter: { categories: ["rings"] } },
];

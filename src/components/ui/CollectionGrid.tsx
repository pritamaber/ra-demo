"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { categories } from "@/data/categories";
import type { Product } from "@/data/products";

export default function CollectionGrid({ products }: { products: Product[] }) {
  const [cat, setCat] = useState("all");
  const present = categories.filter((c) => products.some((p) => p.category === c.slug));
  const shown = cat === "all" ? products : products.filter((p) => p.category === cat);
  const chip = (active: boolean) =>
    `min-h-11 rounded-sm border px-4 text-sm font-medium ${active ? "border-alta bg-alta text-white" : "border-wine/40 text-wine hover:bg-blush"}`;
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
        <button type="button" className={chip(cat === "all")} aria-pressed={cat === "all"} onClick={() => setCat("all")}>All</button>
        {present.map((c) => (
          <button key={c.slug} type="button" className={chip(cat === c.slug)} aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>
            {c.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {shown.map((p) => <ProductCard key={p.code} product={p} />)}
      </div>
      {shown.length === 0 && <p className="text-center">More pieces coming soon — ask us on WhatsApp.</p>}
    </div>
  );
}

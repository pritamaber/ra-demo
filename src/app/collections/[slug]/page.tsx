import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import CollectionGrid from "@/components/ui/CollectionGrid";
import { collections } from "@/data/collections";
import { categories } from "@/data/categories";
import { getProducts } from "@/data/products";

type Params = { params: Promise<{ slug: string }> };

// A slug is either one of the curated collections above, or a bare category slug from the category
// row / footer (e.g. /collections/pendant) — resolved the same way either page got here.
function resolve(slug: string) {
  const collection = collections.find((c) => c.slug === slug);
  if (collection) return { title: collection.title, bn: collection.bn, blurb: collection.blurb, categories: collection.categories };
  const category = categories.find((c) => c.slug === slug);
  if (category) return { title: category.name, bn: "", blurb: `Every ${category.name.toLowerCase()} piece we have in stock.`, categories: [category.slug] };
  return null;
}

export function generateStaticParams() {
  return [...collections.map((c) => ({ slug: c.slug })), ...categories.map((c) => ({ slug: c.slug }))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = resolve(slug);
  return { title: c?.title ?? "Collection", description: c?.blurb };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const c = resolve(slug);
  if (!c) notFound();
  const products = await getProducts();
  const items = products.filter((p) => c.categories.includes(p.category));
  return (
    <main className="py-12 md:py-16">
      <h1 className="sr-only">{c.title}</h1>
      <SectionTitle title={c.title} bn={c.bn} />
      <p className="mx-auto mb-8 max-w-[65ch] px-4 text-center">{c.blurb}</p>
      <CollectionGrid products={items} />
    </main>
  );
}

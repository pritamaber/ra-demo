import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import CollectionGrid from "@/components/ui/CollectionGrid";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  return { title: c?.title ?? "Collection", description: c?.blurb };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  const items = products.filter((p) =>
    c.filter.tag ? p.tags.includes(c.filter.tag) : c.filter.categories?.includes(p.category),
  );
  return (
    <main className="py-12 md:py-16">
      <h1 className="sr-only">{c.title}</h1>
      <SectionTitle title={c.title} bn={c.bn} />
      <p className="mx-auto mb-8 max-w-[65ch] px-4 text-center">{c.blurb}</p>
      <CollectionGrid products={items} />
    </main>
  );
}

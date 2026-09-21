import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { products } from "@/data/products";
import { showcase } from "@/data/home";

export default function ProductShowcase() {
  const items = showcase.codes.map((c) => products.find((p) => p.code === c)).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <section className="bg-wine py-14 md:py-20">
      <SectionTitle title={showcase.title} bn={showcase.bn} tone="dark" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:gap-6">
        {items.map((p) => <ProductCard key={p.code} product={p} dark />)}
      </div>
      <div className="mt-10 text-center">
        <Button href="/collections/bridal" variant="light">View all collections</Button>
      </div>
    </section>
  );
}

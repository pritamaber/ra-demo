import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CategoryRow() {
  return (
    <section className="py-14 md:py-20">
      <SectionTitle title="Shop by Category" bn="আপনার পছন্দের গয়না" />
      <ul className="mx-auto flex max-w-7xl snap-x gap-5 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-4 md:gap-8 lg:grid-cols-8 lg:gap-4">
        {categories.map((c) => (
          <li key={c.slug} className="w-28 shrink-0 snap-start md:w-auto">
            <Link href={`/collections/${c.slug}`} className="flex flex-col items-center gap-3 text-center">
              <span className="relative aspect-square w-full overflow-hidden rounded-full bg-blush">
                <Image src={c.image} alt={c.alt} fill sizes="(min-width:1024px) 12vw, 112px" className="object-cover" />
              </span>
              <span className="text-sm font-medium">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

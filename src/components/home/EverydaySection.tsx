import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { everyday } from "@/data/home";

export default function EverydaySection() {
  return (
    <section className="py-14 md:py-20">
      <SectionTitle title={everyday.title} bn={everyday.bn} />
      <p className="mx-auto mb-10 max-w-[65ch] px-4 text-center">{everyday.text}</p>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-3">
        {everyday.tiles.map((t) => (
          <figure key={t.name}>
            <div className="relative aspect-square overflow-hidden bg-blush">
              <Image src={t.image} alt={t.alt} fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="font-heading mt-3 text-center text-lg text-wine">{t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

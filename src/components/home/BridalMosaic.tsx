import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { bridal } from "@/data/home";

type Tile = { image: string; alt: string; name: string };

function MosaicTile({ t, ratio, sizes, className = "" }: { t: Tile; ratio: string; sizes: string; className?: string }) {
  return (
    <figure className={`group relative overflow-hidden bg-blush ${ratio} ${className}`}>
      <Image src={t.image} alt={t.alt} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine/85 to-transparent px-3 pb-3 pt-10 font-heading text-silk opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        {t.name}
      </figcaption>
    </figure>
  );
}

export default function BridalMosaic() {
  return (
    <section className="py-14 md:py-20">
      <SectionTitle title={bridal.title} bn={bridal.bn} />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3">
          <MosaicTile t={bridal.portrait} ratio="col-span-2 aspect-[3/4] md:col-span-2 md:row-span-2 md:aspect-auto" sizes="(min-width:768px) 50vw, 100vw" />
          {bridal.tiles.map((t) => (
            <MosaicTile key={t.name} t={t} ratio="aspect-square" sizes="(min-width:768px) 25vw, 50vw" />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 bg-wine p-2 md:mt-3 md:grid-cols-4 md:gap-3 md:p-3">
          {bridal.row.map((t) => (
            <MosaicTile key={t.name} t={t} ratio="aspect-[3/4]" sizes="(min-width:768px) 25vw, 50vw" />
          ))}
        </div>
      </div>
    </section>
  );
}

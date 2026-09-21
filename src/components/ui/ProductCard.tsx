import Image from "next/image";
import type { Product } from "@/data/products";
import { whatsappLink } from "@/config/site";

export default function ProductCard({ product, dark = false }: { product: Product; dark?: boolean }) {
  const msg = `Hi, I'd like to know the price of ${product.name} (code ${product.code}).`;
  return (
    <article className={dark ? "text-silk" : "text-ink"}>
      <div className="relative aspect-square overflow-hidden bg-wine">
        <Image src={product.image} alt={product.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
        <span className="absolute left-2 top-2 rounded-sm bg-gold px-2 py-0.5 text-xs font-medium text-ink">{product.purity}</span>
      </div>
      <h3 className="font-heading mt-3 text-lg">{product.name}</h3>
      <p className={`text-sm ${dark ? "text-blush" : "text-ink/70"}`}>{product.weight} · {product.code}</p>
      <a
        href={whatsappLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-1 inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4 ${dark ? "text-gold" : "text-alta"}`}
      >
        Ask price on WhatsApp
      </a>
    </article>
  );
}

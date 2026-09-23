import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import ProductGallery from "@/components/product/ProductGallery";
import Button from "@/components/ui/Button";
import { getProduct } from "@/data/products";
import { categories } from "@/data/categories";
import { getRatePerGram } from "@/config/goldRate";
import { priceBreakup } from "@/lib/pricing";
import { site, whatsappLink } from "@/config/site";

type Params = { params: Promise<{ id: string }> };

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

async function load(id: string) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;
  const product = await getProduct(numericId);
  if (!product) return null;
  const rate = await getRatePerGram(product.purity);
  const price = priceBreakup(product.netWeight, product.makingCharge, rate);
  return { product, rate, price };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const data = await load(id);
  if (!data) return { title: "Product" };
  return { title: data.product.name, description: data.product.description ?? undefined };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const data = await load(id);
  if (!data) notFound();
  const { product, rate, price } = data;
  const category = categories.find((c) => c.slug === product.category);

  // wa.me can only pre-fill text, not attach a file — an absolute photo URL is the closest equivalent,
  // since WhatsApp shows a link preview for it. Relative demo-data paths are resolved against the site URL.
  const photoUrl = product.image.startsWith("http") ? product.image : `${site.url}${product.image}`;
  const message = [
    `Hi, I'd like to know more about this piece:`,
    ``,
    `${product.name} (${product.code})`,
    `${product.purity} gold · net weight ${product.netWeight.toFixed(2)} g`,
    `Price: ${inr(price.total)} (incl. making charge & GST, at today's rate)`,
    ``,
    `Photo: ${photoUrl}`,
  ].join("\n");

  return (
    <main className="py-10 md:py-14">
      <nav className="mx-auto mb-6 max-w-6xl px-4 text-sm text-wine/70">
        <a href="/" className="hover:text-alta">Home</a>
        {category && <> / <a href={`/collections/${category.slug}`} className="hover:text-alta">{category.name}</a></>}
      </nav>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.alt} />

        <div>
          <p className="text-sm uppercase tracking-wide text-alta">{category?.name ?? product.category}</p>
          <h1 className="font-heading mt-1 text-3xl text-wine">{product.name}</h1>
          <p className="mt-1 text-sm text-ink/60">SKU {product.code}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-sm bg-blush px-3 py-1 text-sm font-medium text-wine">{product.purity} Gold</span>
            <span className="rounded-sm bg-blush px-3 py-1 text-sm font-medium text-wine">Net weight {product.netWeight.toFixed(2)} g</span>
            {!product.inStock && <span className="rounded-sm bg-wine/10 px-3 py-1 text-sm font-medium text-wine/70">Currently unavailable</span>}
          </div>

          {product.description && (
            <p className="mt-5 max-w-[60ch] text-ink/80">{product.description}</p>
          )}

          <div className="mt-6 border border-wine/15">
            <p className="border-b border-wine/15 bg-blush/60 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-wine">Price break-up</p>
            <dl className="divide-y divide-wine/10 px-4 text-sm">
              <div className="flex justify-between py-2"><dt>Gold value</dt><dd>{inr(price.goldValue)}</dd></div>
              <div className="flex justify-between py-2"><dt>Making charge</dt><dd>{inr(price.makingCharge)}</dd></div>
              <div className="flex justify-between py-2"><dt>GST</dt><dd>{inr(price.gst)}</dd></div>
              <div className="flex justify-between py-2 font-semibold text-wine"><dt>Total</dt><dd>{inr(price.total)}</dd></div>
            </dl>
            <p className="border-t border-wine/15 px-4 py-2 text-xs text-ink/50">At today&apos;s {product.purity} rate of {inr(rate)}/g. Final price is confirmed in-store on the day of purchase.</p>
          </div>

          <div className="mt-6 flex items-center gap-4 border border-wine/15 bg-blush/30 px-4 py-3">
            <Image src="/images/trust/certifications.png" alt="Certified by BIS, GIA, IGI and SGL" width={181} height={106} className="h-14 w-auto shrink-0" />
            <p className="text-xs text-ink/70">Every piece is certified for authenticity by recognised bodies — BIS, GIA, IGI and SGL.</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink(message)} variant="whatsapp">Ask on WhatsApp</Button>
            <Button href={site.phoneHref} variant="outline">Call the store</Button>
          </div>
          <p className="mt-3 text-xs text-ink/50">We don&apos;t sell online — message or call us to check stock, try it on, or place an order at the shop.</p>
        </div>
      </div>
    </main>
  );
}

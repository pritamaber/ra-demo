import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { footerBlurb } from "@/data/home";

const h = "font-heading mb-3 text-lg text-gold";
const link = "inline-flex min-h-11 items-center hover:text-gold";

export default function Footer() {
  return (
    <footer className="bg-wine text-silk">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-xl">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-blush">{footerBlurb}</p>
        </div>
        <div>
          <h3 className={h}>Support</h3>
          <ul className="text-sm">
            <li><Link className={link} href="/contact">Contact</Link></li>
            <li><Link className={link} href="/contact">Custom orders</Link></li>
            <li><Link className={link} href="/contact">Old gold exchange</Link></li>
          </ul>
        </div>
        <div>
          <h3 className={h}>Shop</h3>
          <ul className="text-sm">
            {categories.map((c) => (
              <li key={c.slug}><Link className={link} href={`/collections/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={h}>Shop timings</h3>
          <p className="text-sm text-blush">{site.hours}</p>
          <p className="mt-3 text-sm">{site.address.line}, {site.address.city} {site.address.pin}</p>
          <a className={`${link} mt-2 text-sm`} href={site.phoneHref}>{site.phone}</a>
        </div>
      </div>
      <div className="border-t border-gold/30 px-4 py-4 text-center text-xs text-blush">
        © {new Date().getFullYear()} {site.name} · Website by{" "}
        <a className="underline" href={site.agency.url} target="_blank" rel="noopener noreferrer">{site.agency.name}</a>
        {" "}·{" "}
        <a className="underline" href={site.adminUrl} target="_blank" rel="noopener noreferrer">Admin</a>
      </div>
    </footer>
  );
}

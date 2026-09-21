import Image from "next/image";
import Link from "next/link";
import { nav } from "@/config/nav";
import { site, whatsappLink } from "@/config/site";
import MobileNav from "./MobileNav";
import { PhoneIcon } from "./Icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-silk/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-h-11 items-center gap-3 text-wine">
          <Image src="/images/logo/ra-logo.png" alt="" width={44} height={44} priority className="h-11 w-11" />
          <span className="font-heading text-base leading-tight md:text-xl">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center text-sm font-medium hover:text-alta">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <a href={site.phoneHref} aria-label={`Call ${site.phone}`} className="flex h-11 w-11 items-center justify-center text-wine">
            <PhoneIcon />
          </a>
          <a
            href={whatsappLink("Hi, I'd like to know about your jewellery collection.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-sm bg-alta px-4 text-sm font-medium text-white hover:bg-wine sm:inline-flex"
          >
            WhatsApp us
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

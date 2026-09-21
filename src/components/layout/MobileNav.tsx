"use client";
import { useState } from "react";
import Link from "next/link";
import { nav } from "@/config/nav";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="drawer"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center text-wine"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav id="drawer" aria-label="Mobile" className="absolute inset-x-0 top-full border-t border-gold/40 bg-silk shadow-lg">
          <ul className="px-4 py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="font-heading flex min-h-12 items-center text-lg text-wine">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

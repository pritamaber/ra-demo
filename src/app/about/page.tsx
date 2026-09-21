import Image from "next/image";
import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import { about } from "@/data/about";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <main className="py-12 md:py-16">
      <h1 className="sr-only">About New R. A. Jewellery House</h1>
      <SectionTitle title="Our Story" bn="আমাদের কথা" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden bg-wine">
          <Image src="/images/store/store-front-01.jpg" alt="Front of New R. A. Jewellery House at Rajarhat Chowmatha" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="max-w-[65ch] space-y-4">
          {about.story.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
      <div className="mt-14"><SectionTitle title="Craftsmanship" bn="নিখুঁত কারিগরি" /></div>
      <p className="mx-auto max-w-[65ch] px-4 text-center">{about.craft}</p>
    </main>
  );
}

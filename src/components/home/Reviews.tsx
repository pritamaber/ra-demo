import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { reviews } from "@/data/reviews";
import { site } from "@/config/site";

const Stars = ({ n }: { n: number }) => (
  <span className="text-[#a87a1c]" aria-label={`${n} out of 5 stars`}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>
);

export default function Reviews() {
  // TODO(client): replace with real Google Maps URL
  const googleUrl = site.mapsUrl || "https://www.google.com/maps/search/?api=1&query=New+R.+A.+Jewellery+House+Rajarhat";
  return (
    <section className="bg-blush py-14 md:py-20">
      <SectionTitle title="Loved by Our Neighbours" bn="আমাদের প্রতিবেশীদের কথা" />
      <div className="mx-auto max-w-5xl px-4">
        <p className="mb-8 text-center">
          <span className="font-heading text-4xl text-wine">{site.rating.value}</span>{" "}
          <Stars n={4} /> <span className="text-sm">· {site.rating.count} Google reviews</span>
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.name} className="bg-silk p-6">
              <Stars n={r.stars} />
              <p className="mt-3">{r.text}</p>
              <p className="mt-3 text-sm text-ink/70">— {r.name}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-ink/70">Sample reviews for demo — real Google reviews to be added.</p>
        <div className="mt-6 text-center">
          <Button href={googleUrl} variant="outline">Read reviews on Google</Button>
        </div>
      </div>
    </section>
  );
}

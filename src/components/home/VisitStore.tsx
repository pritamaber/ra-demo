import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { site } from "@/config/site";

const query = encodeURIComponent(`New R. A. Jewellery House, ${site.address.line}, ${site.address.city} ${site.address.pin}`);
export const mapEmbed = `https://www.google.com/maps?q=${query}&output=embed`;
export const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

export default function VisitStore() {
  return (
    <section className="py-14 md:py-20">
      <SectionTitle title="Visit the Store" bn="দোকানে আসুন" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2">
        <iframe
          title="Map to New R. A. Jewellery House"
          src={mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0 md:h-full md:min-h-96"
        />
        <div className="flex flex-col justify-center">
          <p className="font-heading text-2xl text-wine">{site.tagline}</p>
          <address className="mt-4 not-italic">{site.address.line}, {site.address.city}, {site.address.state} {site.address.pin}</address>
          <p className="mt-2 text-sm text-ink/80">{site.hours}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={directions}>Get directions</Button>
            <Button href={site.phoneHref} variant="outline">Call now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

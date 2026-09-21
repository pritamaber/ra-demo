import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import EnquiryForm from "@/components/ui/EnquiryForm";
import { mapEmbed, directions } from "@/components/home/VisitStore";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <main className="py-12 md:py-16">
      <h1 className="sr-only">Contact New R. A. Jewellery House</h1>
      <SectionTitle title="Get in Touch" bn="যোগাযোগ করুন" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div>
          <address className="not-italic">{site.address.line}, {site.address.city}, {site.address.state} {site.address.pin}</address>
          <p className="mt-2 text-sm">{site.hours}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={site.phoneHref}>Call {site.phone}</Button>
            <Button href={whatsappLink("Hi, I'd like to know about your jewellery collection.")} variant="whatsapp">WhatsApp</Button>
            <Button href={directions} variant="outline">Get directions</Button>
          </div>
          <iframe title="Map to New R. A. Jewellery House" src={mapEmbed} loading="lazy" className="mt-8 h-72 w-full border-0" />
        </div>
        <div>
          <h2 className="font-heading mb-4 text-2xl text-wine">Send an enquiry</h2>
          <EnquiryForm />
        </div>
      </div>
    </main>
  );
}

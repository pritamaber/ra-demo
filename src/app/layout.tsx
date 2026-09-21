import type { Metadata } from "next";
import { Marcellus, Jost, Noto_Serif_Bengali } from "next/font/google";
import { site } from "@/config/site";
import GoldRateBar from "@/components/layout/GoldRateBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import "./globals.css";

const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus" });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost" });
const bengali = Noto_Serif_Bengali({ subsets: ["bengali"], weight: ["400", "500"], variable: "--font-bengali" });

const title = "Gold Jewellery Shop in Rajarhat, New Town | New R. A. Jewellery House";
const description = "Gold jewellery at Rajarhat Chowmatha, Kolkata — bridal, everyday and custom pieces.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | New R. A. Jewellery House, Rajarhat" },
  description,
  openGraph: {
    title,
    description,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/store/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: site.name,
  telephone: "+919038513522",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.pin,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng }, // TODO(client): confirm
  // TODO(client): openingHours, sameAs (Google Maps URL)
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count },
  areaServed: site.serviceAreas,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable} ${bengali.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <GoldRateBar />
        <Header />
        {children}
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}

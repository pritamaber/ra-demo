import Hero from "@/components/home/Hero";
import CategoryRow from "@/components/home/CategoryRow";
import BridalMosaic from "@/components/home/BridalMosaic";
import TrustStrip from "@/components/home/TrustStrip";
import ProductShowcase from "@/components/home/ProductShowcase";
import EverydaySection from "@/components/home/EverydaySection";
import Reviews from "@/components/home/Reviews";
import VisitStore from "@/components/home/VisitStore";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryRow />
      <BridalMosaic />
      <TrustStrip />
      <ProductShowcase />
      <EverydaySection />
      <Reviews />
      <VisitStore />
    </main>
  );
}

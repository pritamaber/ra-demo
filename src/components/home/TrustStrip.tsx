import { trustPoints, type TrustIcon } from "@/data/trust";

const paths: Record<TrustIcon, React.ReactNode> = {
  craft: <><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8 9.5 8z" /></>,
  hallmark: <><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  occasion: <><circle cx="12" cy="14" r="5" /><path d="M9 6l3-3 3 3M12 3v6" /></>,
  custom: <><path d="M4 20l4-1L19 8l-3-3L5 16z" /><path d="M14 7l3 3" /></>,
  exchange: <><path d="M4 9h13l-3-3M20 15H7l3 3" /></>,
};

export default function TrustStrip() {
  return (
    <section className="bg-blush py-10 md:py-14" aria-label="Why choose us">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-4 md:grid-cols-5">
        {trustPoints.map(({ icon, label }) => (
          <li key={icon} className="flex flex-col items-center gap-3 text-center last:col-span-2 md:last:col-span-1">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {paths[icon]}
            </svg>
            <span className="text-sm font-medium text-ink">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

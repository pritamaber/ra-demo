import { getGoldRate } from "@/config/goldRate";

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default async function GoldRateBar() {
  const goldRate = await getGoldRate();
  return (
    <div className="bg-wine px-4 py-2 text-center text-xs text-silk md:text-sm">
      Today&apos;s gold rate (22K / 916): <strong className="text-gold">{fmt(goldRate.perGram22K)}</strong> per gram · 18K:{" "}
      <strong className="text-gold">{fmt(goldRate.perGram18K)}</strong>
      {goldRate.isDemo && <span className="ml-2 opacity-70">(demo values, {goldRate.updatedAt})</span>}
    </div>
  );
}

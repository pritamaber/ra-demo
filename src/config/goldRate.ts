import { sbSelect } from "@/lib/supabase";

type Row = { purity: string; rate_per_gram: number; effective_date: string };

// Shown until the admin's gold rate has synced to Supabase (see that repo's README).
const DEMO_RATES: Record<string, number> = { "24K": 10920, "22K": 10000, "18K": 8200 };
const DEMO = { perGram22K: DEMO_RATES["22K"], perGram18K: DEMO_RATES["18K"], updatedAt: "2026-09-21", isDemo: true };

async function liveRates() {
  return sbSelect<Row>("gold_rates_public", "?purity=in.(24K,22K,18K)");
}

/** Today's 22K/18K gold rate, live from the admin's Gold Rate master via the Supabase mirror — used
 *  by the header bar. */
export async function getGoldRate() {
  const rows = await liveRates();
  const r22 = rows.find((r) => r.purity === "22K");
  const r18 = rows.find((r) => r.purity === "18K");
  if (!r22 || !r18) return DEMO;
  return { perGram22K: r22.rate_per_gram, perGram18K: r18.rate_per_gram, updatedAt: r22.effective_date, isDemo: false };
}

/** Live per-gram rate for one purity — used on the product page's price break-up. */
export async function getRatePerGram(purity: string) {
  const rows = await liveRates();
  return rows.find((r) => r.purity === purity)?.rate_per_gram ?? DEMO_RATES[purity] ?? DEMO_RATES["22K"];
}

// Mirrors the admin app's current default pricing rule (Settings → Pricing in demo-ra-jewellers):
// making charge per gram, GST on gold + making combined, 3% GST, components rounded to the rupee.
// If the shop changes those defaults, update this to match — see that repo's src/services/pricing.js.
const round = (n: number) => Math.round(n);

export function priceBreakup(netWeight: number, makingChargePerGram: number, ratePerGram: number, gstRatePercent = 3) {
  const goldValue = round(netWeight * ratePerGram);
  const makingCharge = round(netWeight * makingChargePerGram);
  const gst = round((goldValue + makingCharge) * (gstRatePercent / 100));
  const total = goldValue + makingCharge + gst;
  return { goldValue, makingCharge, gst, total };
}

export type TrustIcon = "craft" | "hallmark" | "occasion" | "custom" | "exchange";

export const trustPoints: { icon: TrustIcon; label: string }[] = [
  { icon: "craft", label: "Expert craftsmanship" },
  { icon: "hallmark", label: "BIS hallmarked gold" }, // TODO(client): confirm
  { icon: "occasion", label: "Jewellery for every occasion" },
  { icon: "custom", label: "Custom orders" },
  { icon: "exchange", label: "Old gold exchange" }, // TODO(client): confirm
];

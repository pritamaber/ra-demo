type Props = { title: string; bn?: string; tone?: "light" | "dark" };

export default function SectionTitle({ title, bn, tone = "light" }: Props) {
  const text = tone === "dark" ? "text-silk" : "text-wine";
  return (
    <div className="mx-auto mb-8 max-w-3xl px-4 text-center md:mb-12">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-gold" aria-hidden />
        <h2 className={`font-heading text-2xl tracking-[0.12em] md:text-4xl ${text}`}>{title}</h2>
        <span className="h-px flex-1 bg-gold" aria-hidden />
      </div>
      {bn && <p className={`font-bengali mt-3 text-base md:text-lg ${tone === "dark" ? "text-blush" : "text-alta"}`}>{bn}</p>}
    </div>
  );
}

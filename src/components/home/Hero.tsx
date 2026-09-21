"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { hero } from "@/data/home";
import Button from "@/components/ui/Button";

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % hero.length), 6000);
    return () => clearInterval(t);
  }, [paused, reduced]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative aspect-[4/5] w-full overflow-hidden bg-wine md:aspect-[16/7]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {hero.map((s, n) => (
        <div key={s.image} className={`absolute inset-0 transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`} aria-hidden={n !== i}>
          <Image src={s.image} alt={s.alt} fill priority={n === 0} sizes="100vw" className="object-cover object-[72%_center] md:object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-wine/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-14 md:pb-16">
            {n === 0 ? (
              <h1 className="hero-rise font-heading max-w-xl text-4xl text-silk md:text-6xl">{s.headline}</h1>
            ) : (
              <p className="font-heading max-w-xl text-4xl text-silk md:text-6xl">{s.headline}</p>
            )}
            <div className={`mt-5 ${n === 0 ? "hero-rise-late" : ""}`}>
              <Button href={s.href} variant="light" >{s.cta}</Button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        {hero.map((s, n) => (
          <button key={s.image} type="button" aria-label={`Show slide ${n + 1}`} aria-current={n === i} onClick={() => setI(n)}
            className="flex h-11 w-8 items-center justify-center">
            <span className={`h-1.5 rounded-full transition-all ${n === i ? "w-6 bg-gold" : "w-1.5 bg-silk/70"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frameRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="relative aspect-square cursor-zoom-in overflow-hidden bg-wine"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMouseMove}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(min-width:768px) 45vw, 100vw"
          className="object-cover transition-transform duration-200 ease-out"
          style={{ transformOrigin: origin, transform: zoom ? "scale(2)" : "scale(1)" }}
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`relative aspect-square overflow-hidden border-2 ${i === active ? "border-alta" : "border-transparent"}`}
            >
              <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

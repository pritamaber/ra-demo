import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { collections } from "@/data/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/contact", ...collections.map((c) => `/collections/${c.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}

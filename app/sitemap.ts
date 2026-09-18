import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { locales, localizedPath } from "@/lib/i18n";

function entry(path: string, priority: number, changeFrequency: "monthly" | "yearly"): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, new URL(localizedPath(l, path), site.url).toString()]));
  return locales.map((l) => ({
    url: new URL(localizedPath(l, path), site.url).toString(),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...entry("/", 1, "monthly"), ...entry("/privacy", 0.2, "yearly")];
}

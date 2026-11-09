import type { MetadataRoute } from "next";

const base = "https://fotisoikonomou.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${base}/en`, el: `${base}/el` };
  return [
    { url: `${base}/en`, lastModified: new Date(), alternates: { languages } },
    { url: `${base}/el`, lastModified: new Date(), alternates: { languages } },
  ];
}

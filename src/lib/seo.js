const fallbackSiteUrl = "https://eyeoptic.pl";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl;

export const siteRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products/ttl", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products/flipUp", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products/ergo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/products/led", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];

export function absoluteUrl(path = "/") {
  if (!path) return siteUrl;

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(path, siteUrl).toString();
}

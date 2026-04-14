import { absoluteUrl, siteRoutes } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date();

  return siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

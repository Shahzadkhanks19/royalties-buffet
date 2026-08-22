import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const env = loadEnv(mode, process.cwd(), "VITE_");
const rawSiteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || "").trim();
const siteUrl = rawSiteUrl.replace(/\/+$/, "");
const publicDir = path.resolve("public");

const routes = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/menu", "weekly", "0.9"],
  ["/reservation", "weekly", "0.9"],
  ["/catering", "monthly", "0.8"],
  ["/franchise", "monthly", "0.8"],
  ["/gallery", "weekly", "0.7"],
  ["/locations", "weekly", "0.9"],
  ["/contact", "monthly", "0.7"],
  ["/faq", "monthly", "0.6"],
  ["/privacy", "yearly", "0.2"],
  ["/terms", "yearly", "0.2"],
];

await mkdir(publicDir, { recursive: true });

if (!siteUrl) {
  await writeFile(
    path.join(publicDir, "robots.txt"),
    "User-agent: *\nDisallow: /\n\n# Set VITE_SITE_URL to the final production domain before deployment.\n",
  );

  await writeFile(
    path.join(publicDir, "sitemap.xml"),
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"></urlset>\n",
  );

  console.warn("[seo] VITE_SITE_URL is not set. Generated noindex-safe robots.txt and an empty sitemap.");
  process.exit(0);
}

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const sitemapEntries = routes
  .map(([route, changefreq, priority]) => {
    const loc = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
    return `  <url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  })
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

await writeFile(path.join(publicDir, "robots.txt"), robots);
await writeFile(path.join(publicDir, "sitemap.xml"), sitemap);
console.log(`[seo] Generated robots.txt and sitemap.xml for ${siteUrl}`);

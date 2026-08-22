import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const defaultDescription = "Royalties Buffet brings premium buffet dining, live counters, catering and franchise opportunities to Delhi NCR.";

const seoByPath = {
  "/": {
    title: "Royalties Buffet | Premium Buffet Dining in Delhi NCR",
    description: "Experience Royalties Buffet in Delhi NCR with live counters, multi-cuisine dining, celebrations, catering and premium buffet experiences.",
  },
  "/about": {
    title: "About Royalties Buffet | Premium Dining Experience",
    description: "Discover the Royalties Buffet philosophy, hospitality standards and premium multi-cuisine buffet experience across Delhi NCR.",
  },
  "/menu": {
    title: "Buffet Menu | Royalties Buffet Delhi NCR",
    description: "Explore Indian, regional, Italian, Indo-Chinese, Japanese, Middle Eastern, Mexican and global buffet favourites at Royalties Buffet.",
  },
  "/reservation": {
    title: "Book a Table | Royalties Buffet Delhi NCR",
    description: "Reserve your table at Royalties Buffet in Gurugram, Delhi or Noida for premium buffet dining, celebrations and group experiences.",
  },
  "/catering": {
    title: "Catering Services Delhi NCR | Royalties Buffet",
    description: "Premium wedding, corporate and celebration catering across Delhi NCR with multi-cuisine buffets, live counters and chef-led service.",
  },
  "/franchise": {
    title: "Royalties Buffet Franchise | Restaurant Partnership",
    description: "Explore Royalties Buffet franchise opportunities, partner support and expansion across Delhi NCR and selected growth markets.",
  },
  "/gallery": {
    title: "Gallery | Royalties Buffet",
    description: "See the Royalties Buffet experience through ambience, buffet spreads, live counters, celebrations and catered events.",
  },
  "/locations": {
    title: "Royalties Buffet Locations | Gurugram, Delhi & Noida",
    description: "Explore Royalties Buffet locations and dining availability across Gurugram, Delhi, Noida and the wider Delhi NCR region.",
  },
  "/contact": {
    title: "Contact Royalties Buffet | Delhi NCR",
    description: "Contact Royalties Buffet for reservations, outlet enquiries, catering, franchise opportunities and general support across Delhi NCR.",
  },
  "/faq": {
    title: "Frequently Asked Questions | Royalties Buffet",
    description: "Find answers about Royalties Buffet reservations, menu, dietary preferences, catering, locations, celebrations and franchise enquiries.",
  },
  "/privacy": {
    title: "Privacy Policy | Royalties Buffet",
    description: "Read the Royalties Buffet privacy policy covering website enquiries, reservations, catering and franchise information.",
  },
  "/terms": {
    title: "Terms & Conditions | Royalties Buffet",
    description: "Read the terms and conditions for using the Royalties Buffet website, reservation, catering and franchise enquiry services.",
  },
};

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const knownRoute = Boolean(seoByPath[pathname]);
    const seo = seoByPath[pathname] || {
      title: "Page Not Found | Royalties Buffet",
      description: defaultDescription,
    };
    const origin = window.location.origin;
    const canonical = `${origin}${pathname === "/" ? "" : pathname}`;
    const image = `${origin}/royalties-logo.png`;
    const noIndex = !knownRoute || pathname === "/error";

    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Royalties Buffet" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsertLink("canonical", canonical);

    upsertJsonLd("royalties-organization-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Royalties Buffet",
      url: origin,
      logo: image,
      areaServed: "Delhi NCR",
      sameAs: [],
    });

    upsertJsonLd("royalties-restaurant-schema", {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Royalties Buffet",
      url: origin,
      image,
      servesCuisine: ["Indian", "Italian", "Indo-Chinese", "Japanese", "Middle Eastern", "Mexican", "Continental"],
      areaServed: ["Gurugram", "Delhi", "Noida", "Delhi NCR"],
      priceRange: "₹₹₹",
      acceptsReservations: true,
    });
  }, [pathname]);

  return null;
}

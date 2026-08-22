import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { shell } from "../config/site";

const titles = {
  "/about": "About Royalties",
  "/menu": "The Buffet Menu",
  "/reservation": "Reserve Your Table",
  "/catering": "Premium Catering",
  "/franchise": "Franchise With Royalties",
  "/gallery": "Royalties Gallery",
  "/locations": "Our Locations",
  "/contact": "Contact Royalties",
  "/privacy": "Privacy Policy",
  "/terms": "Terms & Conditions",
};

export default function ComingSoonPage() {
  const { pathname } = useLocation();
  const title = titles[pathname] || "Royalties Buffet";

  return (
    <section className="min-h-[75vh] bg-[#0a0a0a] pt-36 text-white lg:pt-44">
      <div className={`${shell} py-20`}>
        <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">Next in development</p>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3.8rem,7vw,7.2rem)] leading-[0.9] tracking-[-0.045em]">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/50">This route is now part of the real React Router structure. We’ll design and build this page next without disturbing the approved homepage.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 border border-[#d8ab4d]/45 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#e8c66d] transition hover:bg-[#d8ab4d] hover:text-black"><ArrowLeft className="size-4" /> Back Home</Link>
      </div>
    </section>
  );
}

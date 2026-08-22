import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonGold, buttonOutline, shell } from "../config/site";

export default function NotFoundPage() {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#070707] px-4 py-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,171,77,.12),transparent_42%)]" />
      <div className={`${shell} relative z-10 text-center`}>
        <div className="mx-auto grid size-16 place-items-center border border-[#d8ab4d]/35 bg-[#d8ab4d]/5 text-[#d8ab4d]"><SearchX className="size-7" /></div>
        <p className="mt-8 text-[0.68rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Page not found</p>
        <div className="mt-2 font-serif text-[clamp(7rem,22vw,15rem)] leading-none tracking-[-0.08em] text-white/5">404</div>
        <h1 className="-mt-10 font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.04em]">This table isn’t<br /><span className="text-[#d8ab4d]">on our floor plan.</span></h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/48 sm:text-base">The page may have moved, the link may be outdated, or the address may have been entered incorrectly.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className={`${buttonGold} gap-3`}><Home className="size-4" />Back Home</Link>
          <Link to="/menu" className={`${buttonOutline} gap-3`}><ArrowLeft className="size-4" />Explore Menu</Link>
        </div>
      </div>
    </section>
  );
}

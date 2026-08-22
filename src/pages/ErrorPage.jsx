import { Home, RefreshCw, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonGold, buttonOutline, shell } from "../config/site";

export default function ErrorPage({ onRetry, title = "Something went wrong.", message = "We couldn’t complete that request. Please try again, or return to the homepage." }) {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#070707] px-4 py-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,171,77,.1),transparent_40%)]" />
      <div className={`${shell} relative z-10 max-w-3xl text-center`}>
        <div className="mx-auto grid size-16 place-items-center border border-[#d8ab4d]/35 bg-[#d8ab4d]/5 text-[#d8ab4d]"><TriangleAlert className="size-7" /></div>
        <p className="mt-8 text-[0.68rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Royalties Buffet</p>
        <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.04em]">{title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/48 sm:text-base">{message}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {onRetry ? <button type="button" onClick={onRetry} className={`${buttonGold} gap-3`}><RefreshCw className="size-4" />Try Again</button> : null}
          <Link to="/" className={`${buttonOutline} gap-3`}><Home className="size-4" />Back Home</Link>
        </div>
      </div>
    </section>
  );
}

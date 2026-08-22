import { Facebook, Instagram, Menu, X, Youtube } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { buttonGold, navItems, shell } from "../../config/site";

function SocialLinks() {
  const items = [[Instagram, "Instagram"], [Facebook, "Facebook"], [Youtube, "YouTube"]];
  return <div className="flex items-center gap-2">{items.map(([Icon, label]) => <a key={label} href="#footer-contact" aria-label={label} className="grid size-7 place-items-center border border-white/15 text-white/58 transition hover:-translate-y-0.5 hover:border-[#d8ab4d] hover:bg-[#d8ab4d] hover:text-black"><Icon className="size-3.5" strokeWidth={1.8} /></a>)}</div>;
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#070707]/95 text-white shadow-[0_12px_45px_rgba(0,0,0,.28)] backdrop-blur-xl">
      <div className="hidden border-b border-[#d8ab4d]/15 bg-[#050505] text-[0.62rem] font-semibold tracking-[0.07em] text-white/55 lg:block">
        <div className={`${shell} flex min-h-8 items-center justify-between`}><div className="flex items-center gap-7"><span>Delhi NCR</span><span className="text-white/20">|</span><span>12:00 PM - 11:00 PM</span></div><div className="flex items-center gap-3"><span>Follow Us:</span><SocialLinks /></div></div>
      </div>
      <div className={`${shell} flex min-h-[76px] items-center justify-between gap-5`}>
        <NavLink to="/" aria-label="Royalties Buffet home" className="group flex shrink-0 items-center"><img src="/royalties-logo.png" alt="Royalties Buffet" className="h-14 w-auto object-contain transition group-hover:scale-[1.03] sm:h-16" /></NavLink>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">{navItems.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => `group relative py-6 text-[0.63rem] font-bold uppercase tracking-[0.1em] transition ${isActive ? "text-[#e9c66d]" : "text-white/78 hover:text-white"}`}>{({ isActive }) => <>{label}<span className={`absolute bottom-3 left-1/2 h-px -translate-x-1/2 bg-[#d8ab4d] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} /></>}</NavLink>)}</nav>
        <div className="hidden sm:flex"><NavLink to="/reservation" className={buttonGold}>Book a Table</NavLink></div>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Toggle navigation" className="grid size-11 place-items-center border border-white/15 bg-white/[0.03] transition hover:border-[#d8ab4d]/50 hover:text-[#eac86e] xl:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open ? <nav className="border-t border-white/10 bg-[#080808] px-4 py-5 xl:hidden" aria-label="Mobile navigation"><div className={`${shell} grid gap-1`}>{navItems.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className="border-b border-white/5 px-3 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white/70 transition hover:bg-[#d8ab4d]/8 hover:text-[#eac86e]">{label}</NavLink>)}<NavLink to="/reservation" onClick={() => setOpen(false)} className={`${buttonGold} mt-3`}>Book a Table</NavLink></div></nav> : null}
    </header>
  );
}

import { Facebook, Instagram, Menu, X, Youtube } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { buttonGold, navItems, shell } from "../../config/site";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import useDismissableLayer from "../../hooks/useDismissableLayer";

function SocialLinks({ settings }) {
  const items = [
    [Instagram, "Instagram", settings.instagramUrl],
    [Facebook, "Facebook", settings.facebookUrl],
    [Youtube, "YouTube", settings.youtubeUrl],
  ];

  return <div className="flex items-center gap-2">{items.map(([Icon, label, href]) => <a key={label} href={href || "#footer-contact"} target={href ? "_blank" : undefined} rel={href ? "noreferrer" : undefined} aria-label={label} className="grid size-7 place-items-center border border-white/15 text-white/58 transition hover:-translate-y-0.5 hover:border-[#d8ab4d] hover:bg-[#d8ab4d] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ab4d]"><Icon className="size-3.5" strokeWidth={1.8} /></a>)}</div>;
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const settings = useSiteSettings();

  useBodyScrollLock(open);
  useDismissableLayer(headerRef, open, () => setOpen(false));

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 bg-[#070707]/95 text-white shadow-[0_12px_45px_rgba(0,0,0,.28)] backdrop-blur-xl">
      <div className="hidden border-b border-[#d8ab4d]/15 bg-[#050505] text-[0.62rem] font-semibold tracking-[0.07em] text-white/55 lg:block">
        <div className={`${shell} flex min-h-8 items-center justify-between`}><div className="flex items-center gap-7"><span>{settings.regionLabel}</span><span className="text-white/20">|</span><span>{settings.weekdayHours}</span></div><div className="flex items-center gap-3"><span>Follow Us:</span><SocialLinks settings={settings} /></div></div>
      </div>
      <div className={`${shell} flex min-h-[76px] items-center justify-between gap-5`}>
        <NavLink to="/" onClick={() => setOpen(false)} aria-label={`${settings.businessName} home`} className="group flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ab4d]"><img src="/royalties-logo.png" alt={settings.businessName} className="h-14 w-auto object-contain transition group-hover:scale-[1.03] sm:h-16" /></NavLink>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">{navItems.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => `group relative py-6 text-[0.63rem] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ab4d] ${isActive ? "text-[#e9c66d]" : "text-white/78 hover:text-white"}`}>{({ isActive }) => <>{label}<span className={`absolute bottom-3 left-1/2 h-px -translate-x-1/2 bg-[#d8ab4d] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} /></>}</NavLink>)}</nav>
        <div className="hidden sm:flex"><NavLink to="/reservation" className={buttonGold}>Book a Table</NavLink></div>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-primary-navigation" aria-label={open ? "Close navigation" : "Open navigation"} className="grid size-11 place-items-center border border-white/15 bg-white/[0.03] transition hover:border-[#d8ab4d]/50 hover:text-[#eac86e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ab4d] xl:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open ? <><div className="fixed inset-x-0 top-full h-screen bg-black/60 backdrop-blur-sm xl:hidden" aria-hidden="true" /><nav id="mobile-primary-navigation" className="relative z-10 max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/10 bg-[#080808] px-4 py-5 shadow-2xl xl:hidden" aria-label="Mobile navigation"><div className={`${shell} grid gap-1`}>{navItems.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `border-b border-white/5 px-3 py-3 text-sm font-bold uppercase tracking-[0.12em] transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#d8ab4d] ${isActive ? "bg-[#d8ab4d]/8 text-[#eac86e]" : "text-white/70 hover:bg-[#d8ab4d]/8 hover:text-[#eac86e]"}`}>{label}</NavLink>)}<NavLink to="/reservation" onClick={() => setOpen(false)} className={`${buttonGold} mt-3`}>Book a Table</NavLink></div></nav></> : null}
    </header>
  );
}

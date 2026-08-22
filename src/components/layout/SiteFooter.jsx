import { Facebook, Instagram, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";
import { shell } from "../../config/site";

const footerLinks = [["Home", "/"], ["About Us", "/about"], ["Menu", "/menu"], ["Reservation", "/reservation"], ["Gallery", "/gallery"], ["Locations", "/locations"], ["FAQ", "/faq"], ["Contact Us", "/contact"]];
const serviceLinks = [["Catering", "/catering"], ["Franchise", "/franchise"], ["Private Events", "/catering"], ["Bulk Bookings", "/reservation"], ["Gift Vouchers", "/contact"]];

export default function SiteFooter() {
  const socials = [[Instagram, "Instagram"], [Facebook, "Facebook"], [Youtube, "YouTube"]];
  return (
    <footer id="footer-contact" className="bg-[#050505] text-white">
      <div className={`${shell} grid gap-10 border-b border-white/10 py-14 md:grid-cols-2 xl:grid-cols-[1.2fr_.8fr_.8fr_1fr_.8fr]`}>
        <div><img src="/royalties-logo.png" alt="Royalties Buffet" className="h-24 w-auto object-contain" /><p className="mt-5 max-w-xs text-sm leading-7 text-white/45">A premium buffet destination where every meal is designed to feel like a royal experience.</p><div className="mt-5 flex gap-2">{socials.map(([Icon, label]) => <a key={label} href="#footer-contact" aria-label={label} className="grid size-9 place-items-center border border-white/15 text-white/58 transition hover:-translate-y-1 hover:border-[#d8ab4d] hover:bg-[#d8ab4d] hover:text-black"><Icon className="size-4" strokeWidth={1.8} /></a>)}</div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Quick Links</h3><div className="mt-5 grid gap-2.5">{footerLinks.map(([label, to]) => <NavLink key={to} to={to} className="group w-fit text-sm text-white/46 transition hover:text-white">{label}<span className="ml-2 inline-block text-[#d8ab4d] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span></NavLink>)}</div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Our Services</h3><div className="mt-5 grid gap-2.5">{serviceLinks.map(([label, to]) => <NavLink key={label} to={to} className="group w-fit text-sm text-white/46 transition hover:text-white">{label}<span className="ml-2 inline-block text-[#d8ab4d] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span></NavLink>)}</div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Contact Us</h3><div className="mt-5 space-y-4 text-sm leading-6 text-white/46"><p>Royalties Buffet<br />Delhi NCR</p><p>+91 98765 43210</p><p>info@royaltiesbuffet.com</p></div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Opening Hours</h3><div className="mt-5 space-y-3 text-sm text-white/46"><p>Mon - Fri<br /><span className="text-white/70">12:00 PM - 11:00 PM</span></p><p>Sat - Sun<br /><span className="text-white/70">11:30 AM - 11:30 PM</span></p><p className="text-[#d8ab4d]">Open all days</p></div></div>
      </div>
      <div className={`${shell} flex flex-col gap-3 py-5 text-[0.62rem] text-white/28 sm:flex-row sm:items-center sm:justify-between`}><span>© 2026 Royalties Buffet. All Rights Reserved.</span><div className="flex flex-wrap gap-5"><NavLink to="/faq" className="transition hover:text-[#d8ab4d]">FAQ</NavLink><NavLink to="/privacy" className="transition hover:text-[#d8ab4d]">Privacy Policy</NavLink><NavLink to="/terms" className="transition hover:text-[#d8ab4d]">Terms & Conditions</NavLink></div></div>
    </footer>
  );
}

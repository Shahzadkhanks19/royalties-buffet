import { Activity, CalendarClock, CalendarDays, Handshake, Images, LayoutDashboard, LogOut, Mail, MapPin, Settings, Soup, UtensilsCrossed, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

const nav = [
  [LayoutDashboard, "Dashboard", "/admin"],
  [CalendarDays, "Reservations", "/admin/reservations"],
  [CalendarClock, "Availability", "/admin/availability"],
  [Mail, "Contact Enquiries", "/admin/contacts"],
  [UtensilsCrossed, "Catering Leads", "/admin/catering"],
  [Handshake, "Franchise Leads", "/admin/franchise"],
  [Soup, "Menu Manager", "/admin/menu"],
  [Images, "Gallery Manager", "/admin/gallery"],
  [MapPin, "Locations", "/admin/locations"],
  [Settings, "Site Settings", "/admin/settings"],
  [Activity, "Activity Log", "/admin/activity"],
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const signOut = async () => { await logout(); navigate("/admin/login", { replace: true }); };
  const sidebar = <aside className="flex h-full w-72 flex-col border-r border-white/10 bg-[#0a0a0a] text-white"><div className="flex min-h-24 items-center justify-between border-b border-white/10 px-5"><img src="/royalties-logo.png" alt="Royalties Buffet" className="h-14 w-auto" /><button type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center border border-white/10 lg:hidden" aria-label="Close admin navigation"><X className="size-4" /></button></div><nav className="flex-1 space-y-1 overflow-y-auto p-4">{nav.map(([Icon,label,to]) => <NavLink end={to === "/admin"} key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => `flex min-h-12 items-center gap-3 border px-4 text-sm font-bold transition ${isActive ? "border-[#d8ab4d]/40 bg-[#d8ab4d]/10 text-[#efcb73]" : "border-transparent text-white/58 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"}`}><Icon className="size-4" />{label}</NavLink>)}</nav><div className="border-t border-white/10 p-4"><p className="truncate px-2 text-xs text-white/35">{admin?.email}</p><button type="button" onClick={signOut} className="mt-3 flex min-h-11 w-full items-center gap-3 border border-white/10 px-4 text-sm font-bold text-white/60 transition hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-200"><LogOut className="size-4" />Sign Out</button></div></aside>;
  return <div className="min-h-screen bg-[#f3ecdf]"><div className="fixed inset-y-0 left-0 z-50 hidden lg:block">{sidebar}</div>{open ? <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={() => setOpen(false)}><div className="h-full w-72" onClick={(event) => event.stopPropagation()}>{sidebar}</div></div> : null}<div className="lg:pl-72"><header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-black/10 bg-[#fffaf2]/95 px-4 backdrop-blur sm:px-6 lg:px-8"><button type="button" onClick={() => setOpen(true)} className="border border-black/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] lg:hidden">Menu</button><p className="text-xs font-black uppercase tracking-[0.16em] text-[#876326]">Royalties Buffet Admin</p></header><main className="p-4 sm:p-6 lg:p-8"><Outlet /></main></div></div>;
}

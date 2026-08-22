import { CalendarDays, Clock3, Handshake, Images, Mail, MapPin, Soup, UtensilsCrossed } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";

const cards = [
  [CalendarDays, "Reservations", "reservations", "/admin/reservations"],
  [Mail, "Contact Enquiries", "contacts", "/admin/contacts"],
  [UtensilsCrossed, "Catering Leads", "catering", "/admin/catering"],
  [Handshake, "Franchise Leads", "franchise", "/admin/franchise"],
  [Soup, "Menu Items", "menu", "/admin/menu"],
  [Images, "Gallery Items", "gallery", "/admin/gallery"],
];

const widthClasses = [
  "w-[5%]", "w-[10%]", "w-[15%]", "w-[20%]", "w-[25%]", "w-[30%]", "w-[35%]", "w-[40%]", "w-[45%]", "w-[50%]",
  "w-[55%]", "w-[60%]", "w-[65%]", "w-[70%]", "w-[75%]", "w-[80%]", "w-[85%]", "w-[90%]", "w-[95%]", "w-full",
];

const heightClasses = [
  "h-[8px]", "h-[16px]", "h-[24px]", "h-[32px]", "h-[40px]", "h-[48px]", "h-[56px]", "h-[64px]", "h-[72px]", "h-[80px]",
  "h-[88px]", "h-[96px]", "h-[104px]", "h-[112px]", "h-[120px]", "h-[128px]", "h-[136px]", "h-[144px]", "h-[152px]", "h-[160px]",
];

function scaleClass(value, max, classes) {
  const ratio = Math.max(0, Math.min(1, Number(value || 0) / Math.max(Number(max || 0), 1)));
  const index = Math.max(0, Math.min(classes.length - 1, Math.ceil(ratio * classes.length) - 1));
  return classes[index];
}

function MetricBars({ items = [], empty = "No data yet." }) {
  const max = Math.max(...items.map((item) => item.count), 1);
  return <div className="mt-5 space-y-4">{items.length ? items.map((item) => <div key={item.label}><div className="mb-1 flex items-center justify-between gap-3 text-xs"><span className="truncate font-bold text-[#4f4538]">{item.label}</span><strong className="text-[#8a641f]">{item.count}</strong></div><div className="h-2 bg-black/7"><div className={`h-full bg-[#b88731] ${scaleClass(item.count, max, widthClasses)}`} /></div></div>) : <p className="text-sm text-black/40">{empty}</p>}</div>;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ menu: 0, gallery: 0, reservations: 0, contacts: 0, catering: 0, franchise: 0 });
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([apiRequest("/api/admin/dashboard"), apiRequest("/api/admin/analytics")])
      .then(([dashboard, insights]) => { if (active) { setCounts(dashboard.counts || {}); setAnalytics(insights); } })
      .catch((err) => { if (active) setError(err.message || "Unable to load dashboard."); });
    return () => { active = false; };
  }, []);

  const maxTrend = useMemo(() => Math.max(...(analytics?.reservations?.trend || []).map((item) => item.count), 1), [analytics]);
  const statusCounts = analytics?.reservations?.statusCounts || {};

  return <section>
    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">Overview</p>
    <h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">Operations dashboard</h1>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c6254]">A live view of guest demand, booking operations, lead funnels and recent administrative activity.</p>
    {error ? <div className="mt-6 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}

    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cards.map(([Icon,label,key,to]) => <Link key={to} to={to} className="group border border-black/10 bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(36,24,10,.08)] transition hover:-translate-y-1 hover:border-[#b98832]/45"><div className="grid size-11 place-items-center bg-[#17130e] text-[#d8ab4d]"><Icon className="size-5" /></div><p className="mt-8 text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#8b682b]">{label}</p><strong className="mt-2 block font-serif text-5xl text-[#17130e]">{counts[key] || 0}</strong><span className="mt-5 inline-block text-sm font-bold text-[#6c6254] group-hover:text-[#8b682b]">Open manager →</span></Link>)}</div>

    <div className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
      <article className="border border-black/10 bg-[#fffaf2] p-5 sm:p-6"><div className="flex items-end justify-between gap-4"><div><p className="text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#956c25]">7-day trend</p><h2 className="mt-2 font-serif text-3xl text-[#17130e]">Reservation requests</h2></div><strong className="font-serif text-4xl text-[#8a641f]">{analytics?.reservations?.total || 0}</strong></div><div className="mt-8 flex h-52 items-end gap-2 border-b border-black/10 pb-1">{(analytics?.reservations?.trend || []).map((item) => <div key={item.date} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"><span className="text-[0.58rem] font-bold text-black/45">{item.count}</span><div className={`w-full bg-[#b88731] ${scaleClass(item.count, maxTrend, heightClasses)}`} /><span className="text-[0.52rem] text-black/40">{item.date.slice(5)}</span></div>)}</div></article>
      <article className="border border-black/10 bg-[#17130e] p-5 text-white sm:p-6"><p className="text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Reservation status</p><h2 className="mt-2 font-serif text-3xl">Current pipeline</h2><div className="mt-6 grid grid-cols-2 gap-3">{Object.entries(statusCounts).map(([status,count]) => <div key={status} className="border border-white/10 bg-white/[0.03] p-4"><p className="text-[0.58rem] font-black uppercase tracking-[0.1em] text-white/45">{status}</p><strong className="mt-2 block font-serif text-3xl text-[#efcb73]">{count}</strong></div>)}</div></article>
    </div>

    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <article className="border border-black/10 bg-[#fffaf2] p-5 sm:p-6"><div className="flex items-center gap-3"><MapPin className="size-5 text-[#956c25]"/><h2 className="font-serif text-2xl text-[#17130e]">Busiest outlets</h2></div><MetricBars items={analytics?.reservations?.busiestOutlets || []}/></article>
      <article className="border border-black/10 bg-[#fffaf2] p-5 sm:p-6"><div className="flex items-center gap-3"><Clock3 className="size-5 text-[#956c25]"/><h2 className="font-serif text-2xl text-[#17130e]">Popular time slots</h2></div><MetricBars items={analytics?.reservations?.busiestTimes || []}/></article>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
      <article className="border border-black/10 bg-[#fffaf2] p-5 sm:p-6"><div className="flex items-end justify-between gap-4"><div><p className="text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#956c25]">Next on the floor</p><h2 className="mt-2 font-serif text-3xl text-[#17130e]">Upcoming reservations</h2></div><Link to="/admin/reservations" className="text-xs font-black uppercase text-[#8a641f]">View all →</Link></div><div className="mt-5 divide-y divide-black/8">{analytics?.reservations?.upcoming?.length ? analytics.reservations.upcoming.map((item) => <div key={item._id} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><strong className="text-sm text-[#17130e]">{item.name}</strong><p className="mt-1 text-xs text-[#6c6254]">{item.outlet} · {item.guestCount}</p></div><div className="text-left sm:text-right"><p className="text-xs font-bold text-[#8a641f]">{item.date} · {item.time}</p><span className="text-[0.58rem] font-black uppercase text-black/35">{item.status}</span></div></div>) : <p className="py-8 text-sm text-black/40">No upcoming reservations.</p>}</div></article>
      <article className="border border-black/10 bg-[#fffaf2] p-5 sm:p-6"><p className="text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#956c25]">Recent admin activity</p><h2 className="mt-2 font-serif text-3xl text-[#17130e]">Audit trail</h2><div className="mt-5 space-y-4">{analytics?.recentActivity?.length ? analytics.recentActivity.map((item) => <div key={item._id} className="border-l-2 border-[#d8ab4d] pl-4"><p className="text-sm font-bold capitalize text-[#17130e]">{item.action} {item.resource}</p><p className="mt-1 text-xs text-[#6c6254]">{item.summary || item.path}</p><p className="mt-1 text-[0.58rem] text-black/35">{new Date(item.createdAt).toLocaleString("en-IN")}</p></div>) : <p className="text-sm text-black/40">Activity will appear after admin changes are made.</p>}</div><Link to="/admin/activity" className="mt-6 inline-block text-xs font-black uppercase text-[#8a641f]">Open activity log →</Link></article>
    </div>

    <div className="mt-5 grid gap-5 lg:grid-cols-2"><article className="border border-black/10 bg-[#fffaf2] p-5 sm:p-6"><p className="text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#956c25]">Catering funnel</p><div className="mt-5 flex flex-wrap gap-2">{Object.entries(analytics?.leads?.funnels?.catering || {}).map(([status,count]) => <span key={status} className="border border-[#b88731]/25 bg-[#d8ab4d]/10 px-3 py-2 text-xs font-bold capitalize text-[#76551c]">{status}: {count}</span>)}</div></article><article className="border border-black/10 bg-[#fffaf2] p-5 sm:p-6"><p className="text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#956c25]">Franchise funnel</p><div className="mt-5 flex flex-wrap gap-2">{Object.entries(analytics?.leads?.funnels?.franchise || {}).map(([status,count]) => <span key={status} className="border border-[#b88731]/25 bg-[#d8ab4d]/10 px-3 py-2 text-xs font-bold capitalize text-[#76551c]">{status}: {count}</span>)}</div></article></div>
  </section>;
}

import { ArrowRight, Clock3, MapPin, Navigation, Phone, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonGold, buttonLightOutline, internalHero, internalHeroInner, shell } from "../config/site";

const locations = [
  {
    city: "Gurugram",
    region: "Gurgaon · Haryana",
    area: "Prime Gurugram dining district",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=88",
    description: "A flagship-style Royalties experience designed for family dining, celebrations and corporate gatherings in Gurugram.",
    services: ["Lunch & Dinner Buffet", "Celebration Dining", "Corporate Groups", "Catering Support"],
  },
  {
    city: "Delhi",
    region: "Delhi NCR",
    area: "Central / South Delhi catchment",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1500&q=88",
    description: "A premium urban buffet format for Delhi guests, bringing the same live-counter energy and broad multi-cuisine spread.",
    services: ["Grand Buffet", "Live Counters", "Group Reservations", "Private Celebrations"],
  },
  {
    city: "Noida",
    region: "Uttar Pradesh · Delhi NCR",
    area: "Noida commercial & family dining zone",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1500&q=88",
    description: "A spacious Delhi NCR destination positioned for family meals, office groups and weekend celebrations around Noida.",
    services: ["Buffet Dining", "Weekend Dining", "Office Groups", "Event Catering"],
  },
];

const hours = [
  ["Lunch", "12:00 PM – 4:00 PM"],
  ["Dinner", "7:00 PM – 11:00 PM"],
  ["Reservations", "Recommended for peak hours"],
];

export default function LocationsPage() {
  return (
    <>
      <section className={internalHero}>
        <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90" alt="Premium restaurant dining room" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.82)_42%,rgba(3,3,3,.28)_100%)]" />
        <div className={internalHeroInner}>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Our Locations</p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Find your nearest<br /><span className="text-[#d8ab4d]">royal table.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Discover Royalties across Gurugram and Delhi NCR, with each outlet carrying the same buffet theatre, warm hospitality and celebration-first experience.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24">
        <div className={shell}>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Delhi NCR</p>
              <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">Three destinations. One Royalties experience.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#6c6254]">Exact street addresses can be connected later through the admin CMS once final outlet information is confirmed. For now, the site is structured around the Gurugram, Delhi and Noida markets.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {locations.map((location) => (
              <article key={location.city} className="group overflow-hidden border border-black/10 bg-[#fffaf2] shadow-[0_16px_40px_rgba(38,25,10,.08)] transition duration-500 hover:-translate-y-2 hover:border-[#c79536]/50 hover:shadow-[0_28px_70px_rgba(38,25,10,.15)]">
                <div className="relative h-72 overflow-hidden">
                  <img src={location.image} alt={`Royalties Buffet ${location.city}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[0.58rem] font-black uppercase tracking-[0.16em] text-[#e8bd5f]">{location.region}</p>
                    <h3 className="mt-2 font-serif text-4xl">{location.city}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 text-sm text-[#5f5547]"><MapPin className="mt-0.5 size-4 shrink-0 text-[#a97822]" /><span>{location.area}</span></div>
                  <p className="mt-5 text-sm leading-7 text-[#716758]">{location.description}</p>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {location.services.map((service) => <span key={service} className="border border-[#9b7a43]/18 bg-[#f7efe3] px-3 py-2 text-[0.58rem] font-black uppercase tracking-[0.1em] text-[#7b633a]">{service}</span>)}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/reservation" className={buttonLightOutline}>Reserve Here</Link>
                    <Link to="/contact" className="group inline-flex min-h-11 items-center gap-2 px-1 text-[0.65rem] font-black uppercase tracking-[0.13em] text-[#8c6623] transition hover:text-[#17130e]">Outlet Details <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 text-white lg:py-24">
        <div className={`${shell} grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch`}>
          <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[#111]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(216,171,77,.18),transparent_24%),radial-gradient(circle_at_72%_48%,rgba(216,171,77,.12),transparent_22%),linear-gradient(135deg,#15120d,#080808_65%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:46px_46px]" />
            <div className="relative h-full p-7 sm:p-10">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#d8ab4d]">Delhi NCR footprint</p>
              <h2 className="mt-3 max-w-xl font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.94]">From Gurugram to Noida.</h2>
              <div className="mt-10 space-y-5">
                {locations.map((location, index) => (
                  <div key={location.city} className="flex items-center gap-4 border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
                    <div className="grid size-11 shrink-0 place-items-center border border-[#d8ab4d]/40 text-[#d8ab4d]"><Navigation className="size-4" /></div>
                    <div><p className="text-[0.56rem] font-black uppercase tracking-[0.12em] text-white/35">0{index + 1} · Delhi NCR</p><p className="mt-1 font-serif text-2xl">{location.city}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-[#11100d] p-7 sm:p-9">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6"><div><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Plan your visit</p><h2 className="mt-2 font-serif text-4xl">Dining hours</h2></div><Clock3 className="size-8 text-[#d8ab4d]" strokeWidth={1.5} /></div>
            <div className="mt-7 space-y-0 border-y border-white/10">
              {hours.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-5 border-b border-white/10 py-5 last:border-b-0"><span className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/38">{label}</span><span className="text-right text-sm text-white/75">{value}</span></div>)}
            </div>
            <div className="mt-7 border border-[#d8ab4d]/20 bg-[#d8ab4d]/5 p-5"><div className="flex items-start gap-4"><UtensilsCrossed className="mt-1 size-5 shrink-0 text-[#d8ab4d]" /><div><h3 className="font-serif text-2xl">Peak-hour dining</h3><p className="mt-2 text-sm leading-7 text-white/45">Weekend dinners and celebration periods can be busy, so reserving ahead is recommended for larger groups.</p></div></div></div>
            <div className="mt-7 flex flex-wrap gap-3"><Link to="/reservation" className={buttonGold}>Reserve a Table</Link><Link to="/contact" className="inline-flex min-h-11 items-center gap-3 border border-white/15 px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/70 transition hover:border-[#d8ab4d]/55 hover:text-[#efce83]"><Phone className="size-4" /> Contact an Outlet</Link></div>
          </div>
        </div>
      </section>

      <section className="bg-[#d8ab4d] py-16 text-[#120f09]">
        <div className={`${shell} flex flex-col justify-between gap-7 lg:flex-row lg:items-center`}><div><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] opacity-55">Bringing Royalties closer</p><h2 className="mt-2 max-w-3xl font-serif text-[clamp(2.7rem,5vw,4.5rem)] leading-[0.94]">More Delhi NCR destinations can follow.</h2></div><Link to="/franchise" className="group inline-flex min-h-14 shrink-0 items-center gap-4 bg-black px-7 text-xs font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-1">Explore Franchise <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link></div>
      </section>
    </>
  );
}

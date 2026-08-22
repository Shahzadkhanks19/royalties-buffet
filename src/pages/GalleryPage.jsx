import { ArrowRight, Expand, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SafeImage from "../components/ui/SafeImage";
import { buttonGold, internalHero, internalHeroInner, shell } from "../config/site";

const filters = ["All", "Ambience", "Buffet", "Live Counters", "Celebrations", "Catering"];

const galleryItems = [
  { title: "Evening Dining", category: "Ambience", size: "tall", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=88" },
  { title: "The Grand Spread", category: "Buffet", size: "wide", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=88" },
  { title: "Open Kitchen Energy", category: "Live Counters", size: "standard", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=88" },
  { title: "Celebration Table", category: "Celebrations", size: "standard", image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1400&q=88" },
  { title: "Chef at the Counter", category: "Live Counters", size: "tall", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=88" },
  { title: "Buffet Favourites", category: "Buffet", size: "standard", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=88" },
  { title: "Private Celebration", category: "Celebrations", size: "wide", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=88" },
  { title: "Premium Event Service", category: "Catering", size: "standard", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=88" },
  { title: "Restaurant Details", category: "Ambience", size: "standard", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=88" },
  { title: "Dessert Finish", category: "Buffet", size: "tall", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=88" },
  { title: "Catered Gathering", category: "Catering", size: "standard", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=88" },
  { title: "Dining Together", category: "Ambience", size: "wide", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=88" },
];

const sizeClasses = {
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  standard: "",
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeItem, setActiveItem] = useState(null);

  const visibleItems = useMemo(
    () => activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  return (
    <>
      <section className={internalHero}>
        <SafeImage src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90" alt="Premium restaurant dining experience" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.82)_42%,rgba(3,3,3,.28)_100%)]" />
        <div className={internalHeroInner}>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">The Gallery</p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">A feast for<br /><span className="text-[#d8ab4d]">every sense.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Explore the visual world of Royalties—from buffet theatre and lively counters to celebrations, catered events and the atmosphere around the table.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24">
        <div className={shell}>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Inside the experience</p>
              <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">Moments worth remembering.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#6c6254]">The current photography is representative content for the website build. It can later be replaced from the admin CMS with Royalties’ own outlet, food and event photography.</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
            {filters.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button key={filter} type="button" role="tab" aria-selected={active} onClick={() => setActiveFilter(filter)} className={`min-h-11 border px-4 text-[0.62rem] font-black uppercase tracking-[0.13em] transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a641f] ${active ? "border-[#17130e] bg-[#17130e] text-[#f1cf77] shadow-lg" : "border-[#8d7447]/25 bg-[#fffaf2] text-[#735b30] hover:-translate-y-0.5 hover:border-[#a97c29] hover:text-[#17130e]"}`}>
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-flow-dense md:grid-cols-2 md:auto-rows-[280px] xl:grid-cols-4 xl:auto-rows-[260px]">
            {visibleItems.map((item) => (
              <button key={item.title} type="button" onClick={() => setActiveItem(item)} className={`group relative min-h-[280px] overflow-hidden bg-black text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a97c29] md:min-h-0 ${sizeClasses[item.size] || ""}`} aria-label={`Open ${item.title} image`}>
                <SafeImage src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition duration-500 group-hover:bg-black/28" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div><span className="text-[0.58rem] font-black uppercase tracking-[0.15em] text-[#e8bd5f]">{item.category}</span><h3 className="mt-2 font-serif text-2xl text-white">{item.title}</h3></div>
                  <span className="grid size-10 shrink-0 place-items-center border border-white/25 bg-black/30 text-white backdrop-blur transition group-hover:border-[#d8ab4d] group-hover:bg-[#d8ab4d] group-hover:text-black"><Expand className="size-4" /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090909] py-20 text-white">
        <div className={`${shell} flex flex-col justify-between gap-8 lg:flex-row lg:items-center`}>
          <div className="max-w-3xl"><p className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-[#d8ab4d]">Make your own moment</p><h2 className="mt-3 font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.94] tracking-[-0.04em]">See the experience. Then come live it.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/48">Reserve a table for your next meal or bring the Royalties experience to a celebration through our catering team.</p></div>
          <div className="flex flex-wrap gap-3"><Link to="/reservation" className={buttonGold}>Reserve a Table</Link><Link to="/catering" className="group inline-flex min-h-11 items-center gap-3 border border-[#d8ab4d]/45 px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#efce83] transition hover:border-[#d8ab4d] hover:bg-[#d8ab4d]/10">Explore Catering <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link></div>
        </div>
      </section>

      {activeItem ? (
        <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/94 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={activeItem.title}>
          <button type="button" onClick={() => setActiveItem(null)} className="absolute right-4 top-4 grid size-12 place-items-center border border-white/20 bg-black/70 text-white transition hover:border-[#d8ab4d] hover:bg-[#d8ab4d] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ab4d] sm:right-6 sm:top-6" aria-label="Close gallery image"><X className="size-5" /></button>
          <div className="my-16 w-full max-w-6xl overflow-hidden border border-white/10 bg-[#0b0b0b] shadow-2xl">
            <div className="relative min-h-[300px] sm:min-h-[420px]"><SafeImage src={activeItem.image} alt={activeItem.title} className="h-full max-h-[72vh] w-full object-contain" /></div>
            <div className="flex flex-col justify-between gap-3 border-t border-white/10 p-5 text-white sm:flex-row sm:items-end sm:p-6"><div><span className="text-[0.58rem] font-black uppercase tracking-[0.15em] text-[#d8ab4d]">{activeItem.category}</span><h2 className="mt-1 font-serif text-3xl">{activeItem.title}</h2></div><p className="text-xs text-white/38">Royalties Buffet gallery preview</p></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

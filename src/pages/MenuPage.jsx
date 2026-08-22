import { useMemo, useState } from "react";
import { Beef, CakeSlice, ChefHat, Flame, Leaf, Salad, Soup, Sparkles, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonGold, buttonLightOutline, internalHero, internalHeroInner, shell } from "../config/site";

const categories = ["All", "Live Grill", "Starters", "Indian", "Global", "Desserts", "Beverages"];

const menuItems = [
  { title: "Smoky Paneer Tikka", category: "Live Grill", type: "veg", copy: "Charred cottage cheese, peppers and aromatic spices finished hot from the grill.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=85" },
  { title: "Tandoori Chicken", category: "Live Grill", type: "non-veg", copy: "Yoghurt-marinated chicken roasted with bold tandoor spices and smoke.", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1200&q=85" },
  { title: "Crispy Corn & Chilli", category: "Starters", type: "veg", copy: "Crunchy corn tossed with chilli, herbs and a savoury house seasoning.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85" },
  { title: "Royal Indian Curry", category: "Indian", type: "veg", copy: "Slow-cooked Indian comfort with a rich, aromatic gravy and warming spices.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=85" },
  { title: "Global Table Selection", category: "Global", type: "veg", copy: "A rotating selection inspired by continental and Asian favourites from the buffet.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85" },
  { title: "Celebration Dessert Bar", category: "Desserts", type: "veg", copy: "Cakes, chilled desserts and sweet finishes designed for one more plate.", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=85" },
  { title: "Fresh Cooler Selection", category: "Beverages", type: "veg", copy: "Refreshing cold beverages and colourful coolers to balance the feast.", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=85" },
  { title: "Chef's Starter Selection", category: "Starters", type: "non-veg", copy: "A rotating selection of hot starters prepared in small batches for the buffet.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85" },
];

const experience = [
  [Flame, "Live Grill", "Fresh off the flame, served sizzling and replenished throughout the experience."],
  [Soup, "Grand Buffet", "Indian favourites and global comfort food arranged for easy discovery."],
  [ChefHat, "Chef Counters", "Interactive counters that add freshness, movement and theatre to the meal."],
  [CakeSlice, "Dessert Finale", "A generous ending with chilled sweets, cakes and celebration favourites."],
];

function FoodType({ type }) {
  const veg = type === "veg";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.58rem] font-black uppercase tracking-[0.12em] ${veg ? "text-emerald-700" : "text-red-700"}`}>
      <span className={`grid size-4 place-items-center border ${veg ? "border-emerald-700" : "border-red-700"}`}><span className={`size-1.5 rounded-full ${veg ? "bg-emerald-700" : "bg-red-700"}`} /></span>
      {veg ? "Veg" : "Non-Veg"}
    </span>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredItems = useMemo(() => activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory), [activeCategory]);

  return (
    <>
      <section className={internalHero}>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2200&q=90" alt="Premium buffet spread" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.84)_42%,rgba(3,3,3,.28)_100%)]" />
        <div className={internalHeroInner}>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">The Royalties Buffet</p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">A world of flavour.<br /><span className="text-[#d8ab4d]">One grand spread.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Explore live grills, comforting Indian dishes, global favourites, fresh counters and an indulgent dessert finish—all designed for discovery.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16 text-white lg:py-20">
        <div className={shell}>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {experience.map(([Icon, title, copy]) => (
              <article key={title} className="group bg-[#0d0d0d] p-7 transition duration-500 hover:bg-[#15120c]">
                <div className="grid size-11 place-items-center border border-[#d8ab4d]/35 text-[#d8ab4d] transition group-hover:bg-[#d8ab4d] group-hover:text-black"><Icon className="size-5" /></div>
                <h2 className="mt-6 font-serif text-2xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/46">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] py-24 lg:py-28">
        <div className={shell}>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Explore the spread</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">Find your next favourite.</h2></div>
            <p className="max-w-md text-sm leading-7 text-[#6c6254]">The final live menu can later be managed from the admin panel. For now, these cards establish the visual and interaction system.</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
            {categories.map((category) => {
              const active = activeCategory === category;
              return <button key={category} type="button" role="tab" aria-selected={active} onClick={() => setActiveCategory(category)} className={`min-h-11 border px-4 text-[0.62rem] font-black uppercase tracking-[0.13em] transition duration-300 ${active ? "border-[#17130e] bg-[#17130e] text-[#f1cf77] shadow-lg" : "border-[#8d7447]/25 bg-[#fffaf2] text-[#735b30] hover:-translate-y-0.5 hover:border-[#a97c29] hover:text-[#17130e]"}`}>{category}</button>;
            })}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <article key={item.title} className="group overflow-hidden border border-black/10 bg-[#fffaf2] shadow-[0_14px_35px_rgba(36,24,10,.08)] transition duration-500 hover:-translate-y-2 hover:border-[#c9983d]/55 hover:shadow-[0_24px_55px_rgba(36,24,10,.15)]">
                <div className="relative h-56 overflow-hidden"><img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 bg-black/75 px-3 py-1.5 text-[0.58rem] font-black uppercase tracking-[0.12em] text-[#efcb73] backdrop-blur">{item.category}</span></div>
                <div className="p-5"><FoodType type={item.type} /><h3 className="mt-4 font-serif text-2xl text-[#1b1711]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#706658]">{item.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#090909] text-white lg:grid-cols-2">
        <div className="relative min-h-[520px] overflow-hidden"><img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1500&q=90" alt="Live grill station" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/10 to-[#090909]/85" /></div>
        <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-2xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">The live experience</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em]">Not everything belongs behind a counter.</h2><p className="mt-6 text-base leading-8 text-white/52">The strongest buffet experiences feel alive. Grill stations, fresh finishing, chef interaction and visible preparation keep the meal moving and make every round feel different.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/reservation" className={buttonGold}>Reserve Your Table</Link><Link to="/catering" className="inline-flex min-h-11 items-center justify-center border border-[#d8ab4d]/55 px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#efce83] transition hover:bg-[#d8ab4d]/10 hover:text-white">Explore Catering</Link></div></div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] py-20">
        <div className={`${shell} grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center`}>
          <div><p className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-[#997026]">A note on the buffet</p><h2 className="mt-3 font-serif text-[clamp(2.7rem,5vw,4.4rem)] leading-none text-[#17130e]">The spread can change. The experience stays Royalties.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-[#695f51]">Buffet selections may rotate by service, season, event and outlet. The final system can surface live availability, pricing and outlet-specific menus once the backend and admin CMS are connected.</p></div>
          <Link to="/reservation" className={buttonLightOutline}>Book Your Table</Link>
        </div>
      </section>
    </>
  );
}

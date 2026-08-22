import { useMemo, useState } from "react";
import { CakeSlice, ChefHat, Flame, Soup } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonGold, buttonLightOutline, internalHero, internalHeroInner, shell } from "../config/site";

const categories = ["All", "Live Grill", "Starters", "Indian", "Italian", "Indo-Chinese", "Mexican", "Global", "Desserts", "Beverages"];

const menuItems = [
  { title: "Smoky Paneer Tikka", category: "Live Grill", type: "veg", copy: "Charred paneer, peppers and aromatic Indian spices finished hot from the grill." },
  { title: "Tandoori Chicken", category: "Live Grill", type: "non-veg", protein: "Chicken", copy: "Yoghurt-marinated chicken roasted with bold tandoor spices and smoke." },
  { title: "Malai Chicken Tikka", category: "Live Grill", type: "non-veg", protein: "Chicken", copy: "Creamy, mildly spiced chicken tikka with a smoky char from the grill." },
  { title: "Tandoori Mushroom", category: "Live Grill", type: "veg", copy: "Juicy mushrooms marinated with yoghurt and spices, roasted until smoky." },
  { title: "Grilled Fish Tikka", category: "Live Grill", type: "non-veg", protein: "Seafood", copy: "Spiced fish pieces grilled with citrus, herbs and a gentle tandoori finish." },
  { title: "Crispy Corn & Chilli", category: "Starters", type: "veg", copy: "Crunchy corn tossed with chilli, herbs and savoury house seasoning." },
  { title: "Hara Bhara Kebab", category: "Starters", type: "veg", copy: "Spinach, peas and potato patties seasoned with familiar Indian spices." },
  { title: "Dahi Ke Kebab", category: "Starters", type: "veg", copy: "Crisp outside, creamy hung-curd centre with gentle herbs and spices." },
  { title: "Chicken 65", category: "Starters", type: "non-veg", protein: "Chicken", copy: "South Indian-style spicy fried chicken with curry leaves and chilli." },
  { title: "Chilli Chicken", category: "Starters", type: "non-veg", protein: "Chicken", copy: "Crisp chicken tossed with peppers, onion and a punchy Indo-Chinese sauce." },
  { title: "Crispy Fried Prawns", category: "Starters", type: "non-veg", protein: "Seafood", copy: "Golden fried prawns served crisp with a bright, savoury seasoning." },
  { title: "Dal Makhani", category: "Indian", type: "veg", copy: "Slow-cooked black lentils enriched with butter, tomato and warming spices." },
  { title: "Paneer Butter Masala", category: "Indian", type: "veg", copy: "Paneer in a rich tomato-butter gravy, a buffet favourite across India." },
  { title: "Kadai Paneer", category: "Indian", type: "veg", copy: "Paneer, peppers and onion tossed in a robust kadai masala gravy." },
  { title: "Chole Masala", category: "Indian", type: "veg", copy: "North Indian chickpeas simmered with tomato, onion and fragrant spices." },
  { title: "Veg Biryani", category: "Indian", type: "veg", copy: "Fragrant basmati rice layered with vegetables, herbs and aromatic spices." },
  { title: "Butter Chicken", category: "Indian", type: "non-veg", protein: "Chicken", copy: "Tandoori chicken folded into a silky tomato, butter and cream gravy." },
  { title: "Chicken Biryani", category: "Indian", type: "non-veg", protein: "Chicken", copy: "Basmati rice layered with spiced chicken, herbs and aromatic whole spices." },
  { title: "Mutton Rogan Josh", category: "Indian", type: "non-veg", protein: "Mutton", copy: "Tender mutton slow-cooked in a deeply aromatic Kashmiri-inspired gravy." },
  { title: "Egg Curry", category: "Indian", type: "non-veg", protein: "Egg", copy: "Boiled eggs simmered in a homestyle onion-tomato masala gravy." },
  { title: "Fish Curry", category: "Indian", type: "non-veg", protein: "Seafood", copy: "Fish cooked in a fragrant Indian curry with spice, tang and fresh herbs." },
  { title: "Margherita Pizza", category: "Italian", type: "veg", copy: "Classic tomato, mozzarella and basil pizza baked until bubbling and crisp." },
  { title: "Farmhouse Pizza", category: "Italian", type: "veg", copy: "A familiar Indian pizzeria favourite loaded with peppers, onion and vegetables." },
  { title: "Penne Arrabbiata", category: "Italian", type: "veg", copy: "Penne tossed in a lively tomato, garlic, herb and chilli sauce." },
  { title: "Creamy Alfredo Pasta", category: "Italian", type: "veg", copy: "Creamy white-sauce pasta with herbs, vegetables and parmesan-style richness." },
  { title: "Chicken Arrabbiata Pasta", category: "Italian", type: "non-veg", protein: "Chicken", copy: "Pasta with chicken in a spicy tomato, garlic and herb sauce." },
  { title: "Veg Hakka Noodles", category: "Indo-Chinese", type: "veg", copy: "Wok-tossed noodles with vegetables, spring onion and classic sauces." },
  { title: "Veg Manchurian", category: "Indo-Chinese", type: "veg", copy: "Crisp vegetable dumplings tossed in a savoury garlic-chilli Manchurian sauce." },
  { title: "Chilli Paneer", category: "Indo-Chinese", type: "veg", copy: "Paneer tossed with peppers, onion, chilli and soy in an Indian-Chinese classic." },
  { title: "Schezwan Fried Rice", category: "Indo-Chinese", type: "veg", copy: "Wok-fried rice with vegetables and a bold Schezwan chilli-garlic kick." },
  { title: "Chicken Hakka Noodles", category: "Indo-Chinese", type: "non-veg", protein: "Chicken", copy: "Wok-tossed noodles with chicken, vegetables and savoury sauces." },
  { title: "Egg Fried Rice", category: "Indo-Chinese", type: "non-veg", protein: "Egg", copy: "Classic wok-fried rice with egg, vegetables, spring onion and light soy." },
  { title: "Loaded Veg Nachos", category: "Mexican", type: "veg", copy: "Crisp nachos layered with beans, salsa, cheese, jalapeños and fresh toppings." },
  { title: "Mexican Bean Tacos", category: "Mexican", type: "veg", copy: "Soft or crisp tacos filled with seasoned beans, salsa and crunchy vegetables." },
  { title: "Veg Quesadilla", category: "Mexican", type: "veg", copy: "Toasted tortilla packed with cheese, peppers, corn and Mexican-style seasoning." },
  { title: "Chicken Tacos", category: "Mexican", type: "non-veg", protein: "Chicken", copy: "Seasoned chicken, salsa, vegetables and creamy dressing in warm tortillas." },
  { title: "Thai Green Curry", category: "Global", type: "veg", copy: "Aromatic coconut curry with vegetables, basil and fragrant Thai-style seasoning." },
  { title: "Vegetable Au Gratin", category: "Global", type: "veg", copy: "Baked vegetables in a creamy sauce beneath a golden cheesy crust." },
  { title: "Herbed Grilled Vegetables", category: "Global", type: "veg", copy: "Seasonal vegetables grilled with herbs, olive oil and light seasoning." },
  { title: "Grilled Lemon Chicken", category: "Global", type: "non-veg", protein: "Chicken", copy: "Juicy grilled chicken with lemon, herbs and a light pepper finish." },
  { title: "Garlic Butter Fish", category: "Global", type: "non-veg", protein: "Seafood", copy: "Pan-finished fish with garlic, butter, herbs and fresh citrus notes." },
  { title: "Gulab Jamun", category: "Desserts", type: "veg", copy: "Warm, soft milk-solid dumplings soaked in fragrant sugar syrup." },
  { title: "Jalebi with Rabri", category: "Desserts", type: "veg", copy: "Crisp syrupy jalebi paired with rich, chilled rabri." },
  { title: "Brownie & Ice Cream", category: "Desserts", type: "veg", copy: "Warm chocolate brownie paired with cold vanilla ice cream." },
  { title: "Pastry & Mousse Selection", category: "Desserts", type: "veg", copy: "A rotating assortment of cakes, pastries, mousse and chilled sweet bites." },
  { title: "Kulfi Selection", category: "Desserts", type: "veg", copy: "Classic Indian frozen dessert in rotating familiar flavours." },
  { title: "Fresh Lime Soda", category: "Beverages", type: "veg", copy: "Fresh lime served sweet, salted or balanced to taste." },
  { title: "Virgin Mojito", category: "Beverages", type: "veg", copy: "Mint, lime and fizz combined into a bright, refreshing cooler." },
  { title: "Mango Cooler", category: "Beverages", type: "veg", copy: "A chilled tropical mango cooler made for the Indian summer table." },
  { title: "Masala Chaas", category: "Beverages", type: "veg", copy: "Cooling spiced buttermilk with roasted cumin and fresh herbs." },
];

const featuredDishes = [
  { title: "Paneer Tikka", tag: "Live Grill", image: "https://b.zmtcdn.com/data/dish_photos/b18/ca866359880f76daac386236663b8b18.jpeg" },
  { title: "Tandoori Chicken", tag: "Live Grill", image: "https://flavorfeasthub.com/assets/images/1777292828626-235nfbgt.webp" },
  { title: "Fish Tikka", tag: "Live Grill", image: "https://teresasrecipes.com/wp-content/uploads/2024/01/tandoori-fish-tikka.jpg" },
  { title: "Hara Bhara Kebab", tag: "Starter", image: "https://c.ndtvimg.com/2023-08/6j48jg4g_hara-bhara-kebab_625x300_25_August_23.jpg" },
  { title: "Chicken 65", tag: "Starter", image: "https://www.hindustantimes.com/ht-img/img/2024/12/02/1000x563/chic_1733124596892_1733124608402.jpg" },
  { title: "Butter Chicken", tag: "Indian", image: "https://www.skipthedishes.com/_next/image?q=75&url=https%3A%2F%2Frestaurants-static.skipthedishes.com%2Fimages%2Fresized%2Fitem-7d151945571d6995418f.jpg&w=3840" },
  { title: "Veg Hakka Noodles", tag: "Indo-Chinese", image: "https://i.pinimg.com/736x/ee/8e/91/ee8e91ad53d6aa4691835222267c0bde.jpg" },
  { title: "Gulab Jamun", tag: "Dessert", image: "https://www.himalayan-flavours.com/wp-content/uploads/2024/07/gulab-jamun.jpg" },
];

const experience = [
  [Flame, "Live Grill", "Fresh off the flame, served sizzling and replenished throughout the experience."],
  [Soup, "Grand Buffet", "Indian favourites and global comfort food arranged for easy discovery."],
  [ChefHat, "Chef Counters", "Interactive counters that add freshness, movement and theatre to the meal."],
  [CakeSlice, "Dessert Finale", "A generous ending with Indian sweets, cakes, chilled desserts and celebration favourites."],
];

function FoodType({ type, protein }) {
  const veg = type === "veg";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.58rem] font-black uppercase tracking-[0.12em] ${veg ? "text-emerald-700" : "text-red-700"}`}>
      <span className={`grid size-4 place-items-center border ${veg ? "border-emerald-700" : "border-red-700"}`}><span className={`size-1.5 rounded-full ${veg ? "bg-emerald-700" : "bg-red-700"}`} /></span>
      {veg ? "Veg" : `Non-Veg · ${protein}`}
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
        <div className={internalHeroInner}><div className="max-w-3xl"><p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">The Royalties Buffet</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">A world of flavour.<br /><span className="text-[#d8ab4d]">One grand spread.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Explore Indian favourites alongside Italian, Indo-Chinese, Mexican and other popular global flavours, plus live grills and an indulgent dessert finish.</p></div></div>
      </section>

      <section className="bg-[#0a0a0a] py-16 text-white lg:py-20"><div className={shell}><div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">{experience.map(([Icon, title, copy]) => <article key={title} className="group bg-[#0d0d0d] p-7 transition duration-500 hover:bg-[#15120c]"><div className="grid size-11 place-items-center border border-[#d8ab4d]/35 text-[#d8ab4d] transition group-hover:bg-[#d8ab4d] group-hover:text-black"><Icon className="size-5" /></div><h2 className="mt-6 font-serif text-2xl">{title}</h2><p className="mt-3 text-sm leading-7 text-white/46">{copy}</p></article>)}</div></div></section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24">
        <div className={shell}>
          <div className="text-center"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">A closer look</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.04em] text-[#17130e]">Food that looks like the food.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6c6254]">Featured dishes use dish-specific photography. The larger buffet catalogue below stays image-free unless we have a genuinely matching photo.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featuredDishes.map((dish) => <article key={dish.title} className="group relative min-h-[310px] overflow-hidden bg-black"><img src={dish.image} alt={dish.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/12 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5"><span className="text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#e7bd5c]">{dish.tag}</span><h3 className="mt-2 font-serif text-2xl text-white">{dish.title}</h3></div></article>)}</div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-24 lg:py-28">
        <div className={shell}>
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div className="max-w-3xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Explore the spread</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">Familiar favourites. More to discover.</h2></div><p className="max-w-md text-sm leading-7 text-[#6c6254]">A broad India-focused buffet mix with popular international cuisines. Non-vegetarian selections are limited to chicken, mutton, eggs and seafood.</p></div>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">{categories.map((category) => { const active = activeCategory === category; return <button key={category} type="button" role="tab" aria-selected={active} onClick={() => setActiveCategory(category)} className={`min-h-11 border px-4 text-[0.62rem] font-black uppercase tracking-[0.13em] transition duration-300 ${active ? "border-[#17130e] bg-[#17130e] text-[#f1cf77] shadow-lg" : "border-[#8d7447]/25 bg-white text-[#735b30] hover:-translate-y-0.5 hover:border-[#a97c29] hover:text-[#17130e]"}`}>{category}</button>; })}</div>
          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filteredItems.map((item) => <article key={item.title} className="group border border-black/10 bg-[#f7efe1] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9983d]/55 hover:bg-white hover:shadow-[0_14px_35px_rgba(36,24,10,.08)]"><div className="flex items-start justify-between gap-4"><div><FoodType type={item.type} protein={item.protein} /><h3 className="mt-3 font-serif text-2xl text-[#1b1711]">{item.title}</h3></div><span className="shrink-0 text-[0.56rem] font-black uppercase tracking-[0.12em] text-[#9b762f]">{item.category}</span></div><p className="mt-3 text-sm leading-7 text-[#706658]">{item.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="grid bg-[#090909] text-white lg:grid-cols-2"><div className="relative min-h-[520px] overflow-hidden"><img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1500&q=90" alt="Live grill station" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/10 to-[#090909]/85" /></div><div className="flex items-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20"><div className="max-w-2xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">The live experience</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em]">Not everything belongs behind a counter.</h2><p className="mt-6 text-base leading-8 text-white/52">Grill stations, fresh finishing, chef interaction and visible preparation keep the meal moving and make every round feel different.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/reservation" className={buttonGold}>Reserve Your Table</Link><Link to="/catering" className="inline-flex min-h-11 items-center justify-center border border-[#d8ab4d]/55 px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#efce83] transition hover:bg-[#d8ab4d]/10 hover:text-white">Explore Catering</Link></div></div></div></section>

      <section className="bg-[#f3ecdf] py-20"><div className={`${shell} grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center`}><div><p className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-[#997026]">A note on the buffet</p><h2 className="mt-3 font-serif text-[clamp(2.7rem,5vw,4.4rem)] leading-none text-[#17130e]">The spread can change. The experience stays Royalties.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-[#695f51]">Buffet selections may rotate by service, season, event and outlet. The final system can surface live availability, pricing and outlet-specific menus once the backend and admin CMS are connected.</p></div><Link to="/reservation" className={buttonLightOutline}>Book Your Table</Link></div></section>
    </>
  );
}

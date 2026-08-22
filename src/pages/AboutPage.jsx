import {
  ArrowRight,
  BriefcaseBusiness,
  Crown,
  Flame,
  HeartHandshake,
  PartyPopper,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  buttonGold,
  buttonLightOutline,
  internalHero,
  internalHeroInner,
  shell,
} from "../config/site";

const values = [
  [Crown, "Royal Hospitality", "Warm, attentive service designed to make every table feel special."],
  [Flame, "Live Experiences", "Fresh grills, active counters and food prepared with theatre and energy."],
  [UtensilsCrossed, "Abundant Choice", "A generous buffet bringing familiar favourites and global flavours together."],
  [HeartHandshake, "Made for Moments", "From family dinners to celebrations, the experience is built around togetherness."],
];

const experiencePaths = [
  [UtensilsCrossed, "Dine at Royalties", "A complete buffet outing with live counters, variety and an atmosphere built for groups.", "/menu", "Explore the buffet"],
  [PartyPopper, "Celebrate With Us", "Birthdays, anniversaries, family occasions and group dining that feel effortless to host.", "/reservation", "Plan your table"],
  [BriefcaseBusiness, "Catering Beyond Our Doors", "Bring the Royalties food-and-hospitality experience to private and corporate events.", "/catering", "Explore catering"],
  [Store, "Grow With Royalties", "A future-facing franchise model designed to carry one recognizable buffet experience to new markets.", "/franchise", "Franchise with us"],
];

export default function AboutPage() {
  return (
    <>
      <section className={internalHero}>
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=90" alt="Premium restaurant dining room" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.82)_42%,rgba(3,3,3,.32)_100%)]" />
        <div className={internalHeroInner}>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">The Royalties Story</p>
            <h1 className="mt-5 font-serif text-[clamp(3.8rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.05em]">More than a buffet.<br /><span className="text-[#d8ab4d]">A royal gathering.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Royalties Buffet is imagined as a destination where abundance, live food experiences and thoughtful hospitality come together for everyday dining and life’s bigger celebrations.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] py-24 lg:py-28">
        <div className={`${shell} grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20`}>
          <div className="relative min-h-[520px]">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=90" alt="Elegant dining experience" className="absolute inset-0 h-[88%] w-[88%] object-cover shadow-[0_30px_70px_rgba(45,29,10,.18)]" />
            <div className="absolute bottom-0 right-0 w-[58%] border border-[#d8ab4d]/35 bg-[#0b0b0b] p-7 text-white shadow-2xl">
              <Sparkles className="size-6 text-[#d8ab4d]" />
              <p className="mt-4 font-serif text-2xl leading-tight">Every visit should feel like an occasion.</p>
            </div>
          </div>
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Our Philosophy</p>
            <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">Generous food.<br />Gracious hospitality.</h2>
            <p className="mt-7 text-base leading-8 text-[#625849]">The idea behind Royalties is simple: bring people together around a table that always feels abundant. The buffet format gives guests freedom to explore, while live counters add freshness, aroma and theatre to the experience.</p>
            <p className="mt-5 text-base leading-8 text-[#625849]">The same philosophy extends beyond the restaurant through celebrations, private events, catering and future franchise locations—one recognizable Royalties experience, wherever the table is set.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/menu" className={buttonGold}>Explore the Buffet</Link><Link to="/reservation" className={buttonLightOutline}>Reserve a Table</Link></div>
          </div>
        </div>
      </section>

      <section className="bg-[#090909] py-24 text-white lg:py-28">
        <div className={shell}>
          <div className="max-w-3xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">The Royalties Standard</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.04em]">What defines the experience</h2></div>
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {values.map(([Icon, title, copy], index) => <article key={title} className="group bg-[#0d0d0d] p-7 transition duration-500 hover:bg-[#15120c]"><div className="flex items-center justify-between"><div className="grid size-12 place-items-center border border-[#d8ab4d]/35 text-[#d8ab4d] transition group-hover:bg-[#d8ab4d] group-hover:text-black"><Icon className="size-5" /></div><span className="font-serif text-3xl text-white/12">0{index + 1}</span></div><h3 className="mt-8 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-white/48">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#efe5d5] py-24 lg:py-28">
        <div className={shell}>
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">One Brand, Many Occasions</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">Designed to travel beyond the buffet table.</h2></div>
            <p className="max-w-2xl text-base leading-8 text-[#625849] lg:justify-self-end">Royalties is being shaped as more than a dine-in concept. The same food-first identity can support celebrations, catering and expansion while keeping the core guest experience consistent.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {experiencePaths.map(([Icon, title, copy, to, cta]) => <article key={title} className="group border border-black/10 bg-[#fffaf2] p-7 shadow-[0_16px_38px_rgba(42,28,10,.07)] transition duration-500 hover:-translate-y-2 hover:border-[#c6973d]/45 hover:shadow-[0_26px_60px_rgba(42,28,10,.13)]"><div className="grid size-12 place-items-center border border-[#b5842e]/35 text-[#a77727] transition group-hover:bg-[#17130e] group-hover:text-[#e5bc62]"><Icon className="size-5" /></div><h3 className="mt-7 font-serif text-2xl text-[#1b1711]">{title}</h3><p className="mt-3 min-h-28 text-sm leading-7 text-[#6d6254]">{copy}</p><Link to={to} className="group/link mt-5 inline-flex items-center gap-2 text-[0.63rem] font-black uppercase tracking-[0.14em] text-[#7a581d]">{cta}<ArrowRight className="size-3.5 transition group-hover/link:translate-x-1" /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="grid bg-[#080808] text-white lg:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=90" alt="Buffet table with shared dishes" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/10 to-[#080808]/55" /></div>
        <div className="flex items-center px-6 py-16 sm:px-10 lg:px-14 xl:px-20"><div className="max-w-2xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">The Feeling We’re Building</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em]">A place people choose when being together matters.</h2><p className="mt-6 text-base leading-8 text-white/52">The goal is not simply to serve a large spread. It is to create an environment where groups can relax, discover food at their own pace and turn an ordinary meal into a shared experience worth returning to.</p><Link to="/reservation" className={`${buttonGold} mt-8`}>Plan Your Visit</Link></div></div>
      </section>

      <section className="relative overflow-hidden bg-[#d8ab4d] py-20 text-[#100d08]">
        <div className={`${shell} flex flex-col justify-between gap-8 lg:flex-row lg:items-center`}><div><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] opacity-60">Your table is waiting</p><h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.94] tracking-[-0.04em]">Come hungry. Leave with a story.</h2></div><Link to="/reservation" className="group inline-flex min-h-14 shrink-0 items-center gap-4 bg-black px-7 text-xs font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-1 hover:bg-[#17130e]">Book Your Table <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link></div>
      </section>
    </>
  );
}

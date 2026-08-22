import { useState } from "react";

const navItems = [
  ["Home", "#home"],
  ["Buffet", "#buffet"],
  ["Catering", "#catering"],
  ["Franchise", "#franchise"],
  ["Locations", "#locations"],
];

const buffetCards = [
  {
    kicker: "Signature Experience",
    title: "Live Grill Starters",
    copy: "Hot skewers, bold marinades and table-side theatre that keeps the first course exciting from start to finish.",
    accent: "from-[#35150d] via-[#7d2b15] to-[#d06b25]",
    symbol: "GRILL",
  },
  {
    kicker: "Grand Spread",
    title: "The Big Buffet",
    copy: "A generous mix of Indian favourites, global comfort food, breads, rice, salads and rotating chef specials.",
    accent: "from-[#151515] via-[#31302c] to-[#866b3d]",
    symbol: "FEAST",
  },
  {
    kicker: "Sweet Finale",
    title: "Dessert Theatre",
    copy: "Classic favourites, chilled treats and celebration-ready desserts designed to end the meal on a high note.",
    accent: "from-[#2f141c] via-[#6e2636] to-[#c77a55]",
    symbol: "SWEET",
  },
];

const occasions = ["Birthdays", "Anniversaries", "Corporate Events", "Family Gatherings"];

const experiences = [
  ["01", "Unlimited spirit", "A dining format built around abundance, choice and the freedom to go back for more."],
  ["02", "Made for groups", "Comfortable for family dinners, office outings, celebrations and larger get-togethers."],
  ["03", "Food with theatre", "Live counters, grills and visible preparation make the experience feel active rather than static."],
  ["04", "Beyond dine-in", "The same brand can extend naturally into catering, events and future franchise locations."],
];

const buttonPrimary = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#e2b557] px-6 text-xs font-black uppercase tracking-[0.16em] text-[#17120c] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f1ca75] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2b557]";
const buttonDark = "inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-[#e2b557]/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2b557]";
const eyebrow = "text-[0.68rem] font-black uppercase tracking-[0.32em] text-[#bd8a37]";
const sectionTitle = "font-serif text-[clamp(2.7rem,5.4vw,5.8rem)] leading-[0.92] font-semibold tracking-[-0.04em] text-[#191714]";
const shell = "mx-auto w-[min(1220px,calc(100%-2rem))] sm:w-[min(1220px,calc(100%-3rem))]";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d0d0d]/90 text-white backdrop-blur-xl">
      <div className={`${shell} flex min-h-20 items-center justify-between gap-6`}>
        <a href="#home" aria-label="Royalties Buffet home" className="flex shrink-0 items-center">
          <img src="/royalties-logo.png" alt="Royalties Buffet" className="h-14 w-auto object-contain sm:h-16" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/70 transition hover:text-[#e2b557]">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a href="#locations" className="text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition hover:text-white">Find a Restaurant</a>
          <a href="#reserve" className={buttonPrimary}>Book a Table</a>
        </div>

        <button type="button" className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
          <span className="text-xl">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#0d0d0d] px-4 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className={`${shell} grid gap-1`}>
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white/75 hover:bg-white/5 hover:text-[#e2b557]">
                {label}
              </a>
            ))}
            <a href="#reserve" onClick={() => setOpen(false)} className={`${buttonPrimary} mt-3`}>Book a Table</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0d0d0d] pb-16 pt-28 text-white sm:pt-32 lg:min-h-screen lg:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(226,181,87,.18),transparent_24%),radial-gradient(circle_at_10%_80%,rgba(126,31,24,.3),transparent_27%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e2b557]/70 to-transparent" aria-hidden="true" />

      <div className={`${shell} relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16`}>
        <div className="max-w-3xl pt-8 lg:pt-12">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#e2b557]/25 bg-[#e2b557]/10 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#f0c873]">
            <span className="size-1.5 rounded-full bg-[#e2b557]" /> Premium Buffet · Catering · Franchise
          </div>
          <h1 className="font-serif text-[clamp(4rem,8vw,8.3rem)] leading-[0.82] font-semibold tracking-[-0.055em]">
            Gather.<br />Grill. <span className="text-[#e2b557]">Feast.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            A bold buffet experience built around live food, generous variety and celebrations that deserve more than an ordinary dinner.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className={buttonPrimary} href="#reserve">Book Your Table</a>
            <a className={buttonDark} href="#buffet">Explore the Buffet</a>
          </div>
          <div className="mt-12 grid grid-cols-3 border-y border-white/10 py-5 text-center sm:text-left">
            <div className="border-r border-white/10 px-2 sm:px-0"><strong className="block font-serif text-2xl text-[#e2b557] sm:text-3xl">Live</strong><span className="text-[0.65rem] uppercase tracking-[0.14em] text-white/45">Grills & counters</span></div>
            <div className="border-r border-white/10 px-2 sm:px-6"><strong className="block font-serif text-2xl text-[#e2b557] sm:text-3xl">Grand</strong><span className="text-[0.65rem] uppercase tracking-[0.14em] text-white/45">Buffet spread</span></div>
            <div className="px-2 sm:px-6"><strong className="block font-serif text-2xl text-[#e2b557] sm:text-3xl">More</strong><span className="text-[0.65rem] uppercase tracking-[0.14em] text-white/45">Catering & events</span></div>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[480px] w-full max-w-2xl items-center justify-center lg:min-h-[650px]">
          <div className="absolute left-[8%] top-[12%] h-[74%] w-[74%] rounded-[48%] border border-[#e2b557]/15" />
          <div className="absolute right-[4%] top-[22%] h-[62%] w-[62%] rounded-[44%] bg-gradient-to-br from-[#7f2e19] via-[#32150e] to-[#0f0f0f] shadow-[0_40px_120px_rgba(0,0,0,.55)]" />
          <div className="absolute right-[13%] top-[31%] grid h-[46%] w-[46%] place-items-center rounded-full border border-[#e2b557]/20 bg-[#0e0e0e]/85 shadow-2xl backdrop-blur">
            <img src="/royalties-logo.png" alt="" className="w-[72%] object-contain" />
          </div>
          <div className="absolute bottom-[8%] left-[4%] max-w-[220px] rounded-3xl border border-white/10 bg-[#171717]/90 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#e2b557]">The Royalties way</p>
            <p className="mt-2 font-serif text-2xl leading-tight">Big tables. Bigger appetite.</p>
          </div>
          <div className="absolute right-0 top-[10%] rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/70 backdrop-blur">Unlimited dining energy</div>
        </div>
      </div>

      <div className="mt-6 border-y border-white/10 py-3 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-white/30">
        <div className={`${shell} flex flex-wrap justify-center gap-x-8 gap-y-2 sm:justify-between`}>
          <span>Live Grill</span><span>Indian Classics</span><span>Global Favourites</span><span>Desserts</span><span>Celebrations</span>
        </div>
      </div>
    </section>
  );
}

function BuffetSection() {
  return (
    <section id="buffet" className="bg-[#f4efe5] py-20 sm:py-24 lg:py-32">
      <div className={shell}>
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className={eyebrow}>Today at Royalties</p>
            <h2 className={`${sectionTitle} mt-4`}>A buffet that feels like an event.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#6d665c] lg:justify-self-end">The homepage now puts the guest experience first: hot grills, variety, choice and the feeling of a complete outing — not just a restaurant menu.</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {buffetCards.map((card) => (
            <article key={card.title} className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(32,25,15,.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_75px_rgba(32,25,15,.13)]">
              <div className={`relative flex h-72 items-end overflow-hidden bg-gradient-to-br ${card.accent} p-7`}>
                <div className="absolute -right-12 -top-16 size-48 rounded-full border border-white/15" />
                <div className="absolute right-8 top-8 size-24 rounded-full border border-white/10" />
                <span className="font-serif text-6xl font-semibold tracking-[-0.04em] text-white/20 transition duration-500 group-hover:scale-105">{card.symbol}</span>
              </div>
              <div className="p-7 sm:p-8">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.23em] text-[#a87931]">{card.kicker}</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#191714]">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#71695f]">{card.copy}</p>
                <a href="#reserve" className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#201a13]">Experience it <span className="text-[#bd8a37]">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceStrip() {
  return (
    <section className="bg-[#171717] py-20 text-white sm:py-24">
      <div className={shell}>
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-[#e2b557]">Why Royalties</p>
            <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[0.92] tracking-[-0.04em]">Designed for appetite and occasion.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            {experiences.map(([number, title, copy]) => (
              <div key={number} className="bg-[#171717] p-7 sm:p-8">
                <span className="text-xs font-black tracking-[0.18em] text-[#e2b557]">{number}</span>
                <h3 className="mt-8 font-serif text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Catering() {
  return (
    <section id="catering" className="bg-[#fffaf1] py-20 sm:py-24 lg:py-32">
      <div className={`${shell} grid overflow-hidden rounded-[2.2rem] bg-[#6e2519] text-white shadow-[0_30px_90px_rgba(70,30,18,.18)] lg:grid-cols-[.95fr_1.05fr]`}>
        <div className="relative min-h-[430px] overflow-hidden bg-[radial-gradient(circle_at_30%_25%,rgba(226,181,87,.35),transparent_23%),linear-gradient(145deg,#32130d,#7b2a18_55%,#ae5c2f)] p-8 sm:p-12">
          <div className="absolute -bottom-24 -right-20 size-72 rounded-full border border-white/15" />
          <div className="absolute bottom-12 right-12 size-40 rounded-full border border-[#e2b557]/35" />
          <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#f3cb79]">Royalties Catering</p>
          <h2 className="mt-5 max-w-lg font-serif text-[clamp(3.3rem,6vw,6.2rem)] leading-[0.88] tracking-[-0.045em]">Your venue. Our feast.</h2>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-base leading-8 text-white/70">Bring the Royalties experience to birthdays, weddings, office celebrations, family functions and private events with a catering proposition built around flexibility and scale.</p>
          <div className="mt-8 flex flex-wrap gap-2">{occasions.map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white/75">{item}</span>)}</div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#catering-enquiry" className={buttonPrimary}>Plan an Event</a>
            <a href="#locations" className={buttonDark}>Talk to Our Team</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Franchise() {
  return (
    <section id="franchise" className="border-y border-[#d8c7a7] bg-[#eadab7] py-20 sm:py-24">
      <div className={`${shell} grid items-center gap-10 lg:grid-cols-[1fr_.55fr]`}>
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-[#7a521d]">Grow with Royalties</p>
          <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3.1rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.045em] text-[#191714]">Build the next table people gather around.</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#625743]">A dedicated franchise page can later explain investment bands, space requirements, operational support, training, launch assistance and the application journey.</p>
        </div>
        <div className="lg:justify-self-end"><a href="#franchise-enquiry" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#171717] px-7 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-black">Explore Franchise</a></div>
      </div>
    </section>
  );
}

function Reservation() {
  return (
    <section id="reserve" className="bg-[#f6f1e8] py-20 sm:py-24 lg:py-32">
      <div className={`${shell} grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]`}>
        <div>
          <p className={eyebrow}>Book a Table</p>
          <h2 className={`${sectionTitle} mt-4`}>Your next feast starts here.</h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-[#6d665c]">The final version will connect these choices to outlet-specific availability and the Express/MongoDB booking flow.</p>
        </div>
        <form className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-[0_20px_70px_rgba(38,31,21,.09)] sm:grid-cols-2 sm:p-8">
          <label className="grid gap-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#625b52]"><span>Restaurant</span><select className="min-h-13 rounded-xl border border-black/10 bg-[#fbf8f2] px-4 text-sm font-semibold normal-case tracking-normal text-[#25211c] outline-none focus:border-[#bd8a37]" defaultValue=""><option value="" disabled>Select restaurant</option></select></label>
          <label className="grid gap-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#625b52]"><span>Guests</span><select className="min-h-13 rounded-xl border border-black/10 bg-[#fbf8f2] px-4 text-sm font-semibold normal-case tracking-normal text-[#25211c] outline-none focus:border-[#bd8a37]" defaultValue="2"><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option></select></label>
          <label className="grid gap-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#625b52]"><span>Date</span><input type="date" className="min-h-13 rounded-xl border border-black/10 bg-[#fbf8f2] px-4 text-sm font-semibold normal-case tracking-normal text-[#25211c] outline-none focus:border-[#bd8a37]" /></label>
          <label className="grid gap-2 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#625b52]"><span>Occasion</span><select className="min-h-13 rounded-xl border border-black/10 bg-[#fbf8f2] px-4 text-sm font-semibold normal-case tracking-normal text-[#25211c] outline-none focus:border-[#bd8a37]" defaultValue="Dining"><option>Dining</option><option>Birthday</option><option>Anniversary</option><option>Corporate</option><option>Other</option></select></label>
          <button type="button" className={`${buttonPrimary} mt-2 sm:col-span-2`}>Check Availability</button>
        </form>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" className="bg-[#101010] py-20 text-white sm:py-24">
      <div className={`${shell} flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end`}>
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-[#e2b557]">Our Restaurants</p>
          <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3rem,5.5vw,6rem)] leading-[0.9] tracking-[-0.04em]">Find the Royalties nearest to you.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/50">Each outlet will eventually get its own page with timings, buffet information, contact details, directions, offers and booking availability.</p>
        </div>
        <a href="#reserve" className={buttonPrimary}>Explore Locations</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#090909] pb-8 pt-16 text-white">
      <div className={`${shell} grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.1fr_.55fr_.55fr]`}>
        <div><img src="/royalties-logo.png" alt="Royalties Buffet" className="h-24 w-auto object-contain" /><p className="mt-5 max-w-md text-sm leading-7 text-white/45">Premium buffet dining, catering and franchise opportunities under one Royalties identity.</p></div>
        <div className="grid content-start gap-3 text-sm text-white/55"><strong className="mb-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#e2b557]">Discover</strong><a href="#buffet" className="hover:text-white">Buffet Experience</a><a href="#catering" className="hover:text-white">Catering</a><a href="#franchise" className="hover:text-white">Franchise</a><a href="#locations" className="hover:text-white">Locations</a></div>
        <div className="grid content-start gap-3 text-sm text-white/55"><strong className="mb-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#e2b557]">Visit</strong><a href="#reserve" className="hover:text-white">Book a Table</a><a href="#catering-enquiry" className="hover:text-white">Catering Enquiry</a><a href="#franchise-enquiry" className="hover:text-white">Franchise Enquiry</a></div>
      </div>
      <div className={`${shell} flex flex-col gap-2 pt-6 text-[0.65rem] uppercase tracking-[0.14em] text-white/30 sm:flex-row sm:justify-between`}><span>© 2026 Royalties Buffet</span><span>Made for memorable tables</span></div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#191714] antialiased">
      <Header />
      <main><Hero /><BuffetSection /><ExperienceStrip /><Catering /><Franchise /><Reservation /><Locations /></main>
      <Footer />
    </div>
  );
}

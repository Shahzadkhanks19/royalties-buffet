import { useEffect, useState } from "react";

const navItems = [
  ["Home", "#home"],
  ["Buffet", "#buffet"],
  ["Catering", "#catering"],
  ["Franchise", "#franchise"],
  ["Locations", "#locations"],
];

const buffetCards = [
  ["01", "Live Grill Starters", "Table-side heat, bold marinades and an opening course that feels like theatre.", "from-[#6f2c16] via-[#2d140c] to-[#111]"],
  ["02", "The Grand Buffet", "Indian favourites, global comfort food, breads, rice, salads and rotating chef specials.", "from-[#6c5733] via-[#28241b] to-[#111]"],
  ["03", "Dessert Theatre", "A generous sweet finish with celebration-ready classics and chilled favourites.", "from-[#7a3341] via-[#2d171b] to-[#111]"],
];

const experiences = [
  ["01", "Unlimited spirit", "A format built around abundance, choice and the freedom to go back for more."],
  ["02", "Built for groups", "Family dinners, celebrations, office outings and large get-togethers feel natural here."],
  ["03", "Food with theatre", "Live counters, visible preparation and active service keep the experience energetic."],
  ["04", "Beyond dine-in", "Royalties extends into catering, events and franchise opportunities without losing the core identity."],
];

const occasions = ["Birthdays", "Anniversaries", "Corporate Events", "Family Gatherings"];

const shell = "mx-auto w-[min(1240px,calc(100%-2rem))] sm:w-[min(1240px,calc(100%-3rem))]";
const gold = "#e3b95f";
const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#e3b95f] px-6 text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#15110a] shadow-[0_10px_30px_rgba(227,185,95,.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#f3cb76] hover:shadow-[0_16px_40px_rgba(227,185,95,.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e3b95f]";
const darkButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-[0.7rem] font-black uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-1 hover:border-[#e3b95f]/60 hover:bg-[#e3b95f]/10 hover:text-[#f6d78f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e3b95f]";
const eyebrow = "text-[0.66rem] font-black uppercase tracking-[0.34em] text-[#b88633]";

function useScrollState() {
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
      const ids = ["home", "buffet", "catering", "franchise", "locations"];
      let current = "home";
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { active, showTop };
}

function Header({ active }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/88 text-white shadow-[0_12px_45px_rgba(0,0,0,.25)] backdrop-blur-2xl">
      <div className={`${shell} flex min-h-20 items-center justify-between gap-5`}>
        <a href="#home" aria-label="Royalties Buffet home" className="group flex shrink-0 items-center">
          <img src="/royalties-logo.png" alt="Royalties Buffet" className="h-14 w-auto object-contain transition duration-300 group-hover:scale-[1.04] sm:h-16" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                className={`group relative py-3 text-[0.69rem] font-black uppercase tracking-[0.2em] transition duration-300 ${isActive ? "text-[#f3cd7c]" : "text-white/58 hover:text-white"}`}
              >
                {label}
                <span className={`absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-[#e3b95f] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <a href="#locations" className="group relative text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/55 transition hover:text-[#f2d18a]">
            Find a Restaurant
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#e3b95f] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#reserve" className={primaryButton}>Book a Table</a>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-lg transition hover:border-[#e3b95f]/50 hover:bg-[#e3b95f]/10 lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#0a0a0a] px-4 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className={`${shell} grid gap-1`}>
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white/72 transition hover:bg-[#e3b95f]/10 hover:text-[#f2d18a]">
                {label}
              </a>
            ))}
            <a href="#reserve" onClick={() => setOpen(false)} className={`${primaryButton} mt-3`}>Book a Table</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0a0a0a] pb-16 pt-28 text-white sm:pt-32 lg:min-h-screen lg:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(227,185,95,.18),transparent_24%),radial-gradient(circle_at_18%_80%,rgba(115,35,20,.32),transparent_28%)]" />
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-[#e3b95f]/35 to-transparent" />

      <div className={`${shell} relative z-10 grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16`}>
        <div className="max-w-3xl pt-8 lg:pt-14">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#e3b95f]/25 bg-[#e3b95f]/10 px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#f0cf83]">
            <span className="size-1.5 rounded-full bg-[#e3b95f] shadow-[0_0_14px_rgba(227,185,95,.8)]" />
            Premium Buffet · Catering · Franchise
          </div>
          <h1 className="font-serif text-[clamp(4rem,8vw,8.4rem)] leading-[0.82] font-semibold tracking-[-0.055em]">
            Gather.<br />Grill. <span className="text-[#e3b95f]">Feast.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
            A richer buffet experience built around live food, generous variety and celebrations that deserve more than an ordinary dinner.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className={primaryButton} href="#reserve">Book Your Table</a>
            <a className={darkButton} href="#buffet">Explore the Buffet</a>
          </div>

          <div className="mt-12 grid grid-cols-3 overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.035] backdrop-blur">
            {[["Live", "Grills & counters"], ["Grand", "Buffet spread"], ["More", "Catering & events"]].map(([value, label], index) => (
              <div key={label} className={`px-3 py-5 text-center sm:px-6 sm:text-left ${index < 2 ? "border-r border-white/10" : ""}`}>
                <strong className="block font-serif text-2xl text-[#e3b95f] sm:text-3xl">{value}</strong>
                <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.14em] text-white/38">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto min-h-[500px] w-full max-w-2xl lg:min-h-[650px]">
          <div className="absolute left-[7%] top-[11%] h-[76%] w-[76%] rounded-[46%] border border-[#e3b95f]/14" />
          <div className="absolute right-[4%] top-[18%] h-[66%] w-[66%] rounded-[42%] bg-gradient-to-br from-[#812f18] via-[#34160e] to-[#0d0d0d] shadow-[0_45px_120px_rgba(0,0,0,.62)]" />
          <div className="absolute right-[14%] top-[29%] grid h-[47%] w-[47%] place-items-center rounded-full border border-[#e3b95f]/20 bg-[#0c0c0c]/88 shadow-2xl backdrop-blur-xl">
            <img src="/royalties-logo.png" alt="" className="w-[74%] object-contain transition duration-500 hover:scale-105" />
          </div>
          <div className="absolute left-[3%] top-[18%] rounded-full border border-white/10 bg-black/30 px-5 py-3 text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl">Unlimited dining energy</div>
          <div className="absolute bottom-[9%] left-[5%] max-w-[230px] rounded-[1.7rem] border border-white/10 bg-[#151515]/92 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-[#e3b95f]">The Royalties way</p>
            <p className="mt-2 font-serif text-2xl leading-tight">Big tables. Bigger appetite.</p>
          </div>
          <div className="absolute bottom-[18%] right-[1%] size-24 rounded-full border border-[#e3b95f]/20 bg-[#e3b95f]/10 shadow-[0_0_60px_rgba(227,185,95,.15)]" />
        </div>
      </div>

      <div className="mt-6 border-y border-white/10 py-3 text-[0.61rem] font-bold uppercase tracking-[0.25em] text-white/28">
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
            <p className={eyebrow}>Signature experience</p>
            <h2 className="mt-4 font-serif text-[clamp(3rem,5.4vw,5.9rem)] leading-[0.92] font-semibold tracking-[-0.04em] text-[#171410]">A buffet that feels like an event.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#6b6257] lg:justify-self-end">Hot grills, variety, choice and the feeling of a complete outing — not just another restaurant meal.</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {buffetCards.map(([number, title, copy, accent]) => (
            <article key={number} className="group overflow-hidden rounded-[2rem] border border-black/[0.05] bg-white shadow-[0_18px_50px_rgba(32,24,14,.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(32,24,14,.14)]">
              <div className={`relative flex h-72 items-end overflow-hidden bg-gradient-to-br ${accent} p-7`}>
                <div className="absolute -right-12 -top-14 size-48 rounded-full border border-white/12 transition duration-500 group-hover:scale-110" />
                <div className="absolute right-8 top-8 size-24 rounded-full border border-[#e3b95f]/18" />
                <span className="font-serif text-[6rem] leading-none text-white/[0.12] transition duration-500 group-hover:translate-x-2">{number}</span>
              </div>
              <div className="p-7 sm:p-8">
                <p className="text-[0.61rem] font-black uppercase tracking-[0.24em] text-[#a97930]">Royalties Buffet</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#191611]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#71685d]">{copy}</p>
                <a href="#reserve" className="group/link mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#211a12]">
                  Experience it <span className="transition duration-300 group-hover/link:translate-x-1 text-[#b7842f]">→</span>
                </a>
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
    <section className="bg-[#151515] py-20 text-white sm:py-24">
      <div className={shell}>
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="text-[0.66rem] font-black uppercase tracking-[0.34em] text-[#e3b95f]">Why Royalties</p>
            <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.7rem)] leading-[0.92] tracking-[-0.04em]">Designed for appetite and occasion.</h2>
          </div>
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            {experiences.map(([number, title, copy], index) => (
              <div key={number} className={`group bg-[#151515] p-7 transition duration-300 hover:bg-[#1d1a15] sm:p-8 ${index % 2 === 0 ? "sm:border-r sm:border-white/10" : ""} ${index < 2 ? "border-b border-white/10" : ""}`}>
                <span className="text-xs font-black tracking-[0.18em] text-[#e3b95f]">{number}</span>
                <h3 className="mt-8 font-serif text-3xl transition duration-300 group-hover:text-[#f1d18c]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/48">{copy}</p>
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
      <div className={`${shell} grid overflow-hidden rounded-[2.4rem] bg-[#692318] text-white shadow-[0_30px_90px_rgba(70,30,18,.18)] lg:grid-cols-[.95fr_1.05fr]`}>
        <div className="relative min-h-[440px] overflow-hidden bg-[radial-gradient(circle_at_30%_25%,rgba(227,185,95,.35),transparent_22%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,.08),transparent_24%),linear-gradient(145deg,#2a0f0b,#7b2d1a_58%,#35130c)] p-8 sm:p-10 lg:p-12">
          <div className="absolute -right-16 top-12 size-64 rounded-full border border-white/10" />
          <div className="absolute bottom-8 right-10 size-36 rounded-full border border-[#e3b95f]/20" />
          <p className="text-[0.64rem] font-black uppercase tracking-[0.32em] text-[#f2d38f]">Beyond the restaurant</p>
          <p className="mt-10 max-w-sm font-serif text-5xl leading-[0.94] sm:text-6xl">Bring the feast to your occasion.</p>
          <div className="mt-10 grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.12em] text-white/65">
            {occasions.map((item) => <span key={item} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-center transition hover:border-[#e3b95f]/45 hover:bg-[#e3b95f]/10 hover:text-white">{item}</span>)}
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
          <p className="text-[0.66rem] font-black uppercase tracking-[0.32em] text-[#f0d18b]">Premium Catering</p>
          <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.4rem)] leading-[0.92]">The Royalties experience, wherever you host.</h2>
          <p className="mt-6 max-w-xl leading-8 text-white/62">Weddings, birthdays, private functions and corporate events can carry the same generous food-first experience beyond the restaurant.</p>
          <a className={`${primaryButton} mt-8 w-fit`} href="#reserve">Plan Your Event</a>
        </div>
      </div>
    </section>
  );
}

function Franchise() {
  return (
    <section id="franchise" className="bg-[#ede4d3] py-20 sm:py-24 lg:py-28">
      <div className={`${shell} grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]`}>
        <div>
          <p className={eyebrow}>Grow with Royalties</p>
          <h2 className="mt-4 font-serif text-[clamp(3rem,5.2vw,5.7rem)] leading-[0.92] tracking-[-0.04em] text-[#171410]">A buffet brand designed to travel.</h2>
          <p className="mt-6 max-w-2xl leading-8 text-[#665d51]">Franchise partners should see the brand as a complete hospitality concept: buffet, celebrations, catering and a consistent premium identity.</p>
          <a href="#reserve" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#171410] px-6 py-4 text-[0.68rem] font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-[#2a2218] hover:text-[#f2d18a]">Explore Franchise <span>→</span></a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Brand-led design", "Operational support", "Marketing framework", "Growth-ready concept"].map((item, index) => (
            <div key={item} className="group rounded-[1.7rem] border border-black/[0.06] bg-white/65 p-6 shadow-[0_12px_30px_rgba(30,25,15,.05)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_45px_rgba(30,25,15,.1)]">
              <span className="text-[0.65rem] font-black tracking-[0.2em] text-[#b17b29]">0{index + 1}</span>
              <h3 className="mt-8 font-serif text-2xl text-[#1b1711] transition group-hover:text-[#9c681e]">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" className="bg-[#101010] py-20 text-white sm:py-24">
      <div className={`${shell} flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between`}>
        <div>
          <p className="text-[0.66rem] font-black uppercase tracking-[0.34em] text-[#e3b95f]">Find your Royalties</p>
          <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3rem,5.5vw,6rem)] leading-[0.9] tracking-[-0.04em]">Your next feast starts with the right table.</h2>
          <p className="mt-5 max-w-2xl leading-8 text-white/48">Outlet pages will carry timings, local offers, contact details and reservation availability.</p>
        </div>
        <a href="#reserve" className={darkButton}>Explore Locations</a>
      </div>
    </section>
  );
}

function Reservation() {
  return (
    <section id="reserve" className="bg-[#f8f2e8] py-20 sm:py-24 lg:py-28">
      <div className={`${shell} grid gap-12 rounded-[2.4rem] border border-black/[0.05] bg-white p-7 shadow-[0_25px_70px_rgba(35,28,18,.08)] sm:p-10 lg:grid-cols-[.9fr_1.1fr] lg:p-12`}>
        <div>
          <p className={eyebrow}>Reservations</p>
          <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.04em] text-[#171410]">Make the next meal an occasion.</h2>
          <p className="mt-6 max-w-xl leading-8 text-[#6d6458]">The full outlet-aware booking system will plug into this experience as the backend grows.</p>
        </div>
        <form className="grid gap-4 sm:grid-cols-2">
          {[["Outlet", ["Select outlet", "Coming soon"]], ["Guests", ["2 Guests", "3 Guests", "4 Guests", "5+ Guests"]], ["Occasion", ["Dinner", "Birthday", "Anniversary", "Corporate"]], ["Timing", ["Dinner", "Lunch"]]].map(([label, options]) => (
            <label key={label} className="grid gap-2 text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#594f43]">
              <span>{label}</span>
              <select className="min-h-14 rounded-2xl border border-black/10 bg-[#fbf7f0] px-4 text-sm font-semibold normal-case tracking-normal text-[#2a241d] outline-none transition focus:border-[#b9842f] focus:ring-2 focus:ring-[#e3b95f]/15">
                {options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <button className={`${primaryButton} mt-2 sm:col-span-2`} type="button">Continue Booking</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    ["Buffet Experience", "#buffet"], ["Catering", "#catering"], ["Franchise", "#franchise"], ["Locations", "#locations"], ["Book a Table", "#reserve"],
  ];

  return (
    <footer className="bg-[#090909] pb-8 pt-16 text-white">
      <div className={`${shell} grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_.6fr_.8fr]`}>
        <div>
          <img src="/royalties-logo.png" alt="Royalties Buffet" className="h-28 w-auto object-contain" />
          <p className="mt-5 max-w-md leading-7 text-white/42">Premium buffet dining, catering experiences and franchise opportunities under one royal identity.</p>
        </div>
        <div className="grid content-start gap-1">
          <p className="mb-3 text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#e3b95f]">Explore</p>
          {footerLinks.map(([label, href]) => (
            <a key={href} href={href} className="group flex items-center justify-between border-b border-white/[0.06] py-3 text-sm text-white/58 transition duration-300 hover:border-[#e3b95f]/35 hover:text-white">
              <span className="transition duration-300 group-hover:translate-x-1">{label}</span>
              <span className="text-[#e3b95f] opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
            </a>
          ))}
        </div>
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#e3b95f]">Start here</p>
          <h3 className="mt-4 font-serif text-3xl">Reservations, celebrations and business enquiries.</h3>
          <a href="#reserve" className="group mt-6 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:text-[#f1cf86]">Book now <span className="transition duration-300 group-hover:translate-x-1">→</span></a>
        </div>
      </div>
      <div className={`${shell} mt-7 flex flex-col gap-3 text-[0.66rem] text-white/30 sm:flex-row sm:items-center sm:justify-between`}>
        <span>© 2026 Royalties Buffet. All rights reserved.</span>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Contact"].map((item) => <a key={item} href="#home" className="relative transition hover:text-[#e3b95f]">{item}</a>)}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { active, showTop } = useScrollState();

  return (
    <div className="min-h-screen bg-[#fffaf1] text-[#171410] antialiased">
      <Header active={active} />
      <main className="overflow-hidden">
        <Hero />
        <BuffetSection />
        <ExperienceStrip />
        <Catering />
        <Franchise />
        <Locations />
        <Reservation />
      </main>
      <Footer />

      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full border border-[#f2cf86]/35 bg-[#e3b95f] text-lg font-black text-[#15110a] shadow-[0_16px_40px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#f3cb76] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e3b95f] ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        ↑
      </button>
    </div>
  );
}

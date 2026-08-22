import { useEffect, useState } from "react";
import {
  ArrowUp,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  Instagram,
  Users,
  Youtube,
} from "lucide-react";

const shell = "mx-auto w-[min(1280px,calc(100%-2rem))] sm:w-[min(1280px,calc(100%-3rem))]";
const navItems = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Menu", "#menu"],
  ["Reservation", "#reservation"],
  ["Catering", "#catering"],
  ["Franchise", "#franchise"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

const signatureCards = [
  { title: "Global Buffet", copy: "A generous spread of global favourites crafted for every appetite.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85" },
  { title: "Live Grill Station", copy: "From smoky starters to sizzling grills, enjoy every bite fresh and hot.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85" },
  { title: "Indian Delicacies", copy: "Rich Indian flavours, comforting classics and bold regional favourites.", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=85" },
  { title: "Irresistible Desserts", copy: "A lavish sweet finale with celebration-ready desserts and chilled treats.", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=85" },
  { title: "Refreshing Beverages", copy: "Cool, colourful drinks that balance the feast and complete the experience.", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=85" },
];

const occasions = [
  ["Family Dinner", "Create beautiful memories together."],
  ["Birthday Celebrations", "Make your special day unforgettable."],
  ["Kitty Parties", "Good food, easy hosting, great company."],
  ["Corporate Events", "Impress your team with royal hospitality."],
];

const galleryItems = [
  ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85", "Buffet dishes"],
  ["https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85", "Restaurant ambience"],
  ["https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85", "Grilled food"],
  ["https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=85", "Desserts"],
  ["https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85", "Celebration dining"],
];

const footerLinks = ["Home", "About Us", "Menu", "Reservation", "Gallery", "Contact Us"];
const serviceLinks = ["Catering", "Franchise", "Private Events", "Bulk Bookings", "Gift Vouchers"];
const buttonGold = "inline-flex min-h-11 items-center justify-center border border-[#d8ab4d] bg-[#d8ab4d] px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#120f09] transition duration-300 hover:-translate-y-0.5 hover:bg-[#efc86f] hover:shadow-[0_12px_30px_rgba(216,171,77,.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ab4d]";
const buttonOutline = "inline-flex min-h-11 items-center justify-center border border-[#d8ab4d]/55 bg-black/20 px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#efce83] transition duration-300 hover:-translate-y-0.5 hover:border-[#efc86f] hover:bg-[#d8ab4d]/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ab4d]";

const browser = {
  getScrollY() {
    return typeof window === "undefined" ? 0 : window.scrollY;
  },
  getSectionTop(id) {
    if (typeof document === "undefined") return Number.POSITIVE_INFINITY;
    return document.getElementById(id)?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
  },
  subscribeToScroll(handler) {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  },
  scrollToTop() {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  },
};

function useScrollSpy() {
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(browser.getScrollY() > 550);
      const ids = navItems.map(([, href]) => href.slice(1));
      let current = "home";
      for (const id of ids) {
        if (browser.getSectionTop(id) <= 150) current = id;
      }
      setActive(current);
    };

    onScroll();
    return browser.subscribeToScroll(onScroll);
  }, []);

  return { active, showTop };
}

function SocialLinks({ compact = false }) {
  const items = [
    [Instagram, "Instagram"],
    [Facebook, "Facebook"],
    [Youtube, "YouTube"],
  ];

  return (
    <div className="flex items-center gap-2">
      {items.map(([Icon, label]) => (
        <a
          key={label}
          href="#contact"
          aria-label={label}
          className={`group grid place-items-center border border-white/15 text-white/58 transition duration-300 hover:-translate-y-0.5 hover:border-[#d8ab4d] hover:bg-[#d8ab4d] hover:text-black ${compact ? "size-7" : "size-9"}`}
        >
          <Icon className={compact ? "size-3.5" : "size-4"} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}

function TopBar() {
  return (
    <div className="hidden border-b border-[#d8ab4d]/15 bg-[#050505] text-[0.62rem] font-semibold tracking-[0.07em] text-white/55 lg:block">
      <div className={`${shell} flex min-h-8 items-center justify-between`}>
        <div className="flex items-center gap-7">
          <span>Jodhpur, Rajasthan</span>
          <span className="text-white/20">|</span>
          <span>12:00 PM - 11:00 PM</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Follow Us:</span>
          <SocialLinks compact />
        </div>
      </div>
    </div>
  );
}

function Header({ active }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#070707]/95 text-white shadow-[0_12px_45px_rgba(0,0,0,.28)] backdrop-blur-xl">
      <TopBar />
      <div className={`${shell} flex min-h-[76px] items-center justify-between gap-5`}>
        <a href="#home" className="group flex shrink-0 items-center" aria-label="Royalties Buffet home">
          <img src="/royalties-logo.png" alt="Royalties Buffet" className="h-14 w-auto object-contain transition duration-300 group-hover:scale-[1.03] sm:h-16" />
        </a>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a key={href} href={href} className={`group relative py-6 text-[0.66rem] font-bold uppercase tracking-[0.11em] transition duration-300 ${isActive ? "text-[#e9c66d]" : "text-white/78 hover:text-white"}`}>
                {label}
                <span className={`absolute bottom-3 left-1/2 h-px -translate-x-1/2 bg-[#d8ab4d] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a href="#reservation" className={buttonOutline}>Reserve</a>
          <a href="#reservation" className={buttonGold}>Book a Table</a>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation" className="grid size-11 place-items-center border border-white/15 bg-white/[0.03] text-xl transition hover:border-[#d8ab4d]/50 hover:text-[#eac86e] xl:hidden">
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#080808] px-4 py-5 xl:hidden" aria-label="Mobile navigation">
          <div className={`${shell} grid gap-1`}>
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/5 px-3 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white/70 transition hover:bg-[#d8ab4d]/8 hover:text-[#eac86e]">
                {label}
              </a>
            ))}
            <a href="#reservation" onClick={() => setOpen(false)} className={`${buttonGold} mt-3`}>Book a Table</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#070707] pt-[88px] text-white lg:pt-[108px]">
      <div className="relative min-h-[720px]">
        <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2200&q=90" alt="Premium live grill buffet spread" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.94)_0%,rgba(3,3,3,.86)_32%,rgba(3,3,3,.43)_58%,rgba(3,3,3,.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.06)_0%,transparent_42%,rgba(0,0,0,.5)_100%)]" />

        <div className={`${shell} relative z-10 flex min-h-[620px] items-center py-14 sm:py-16 lg:py-20`}>
          <div className="max-w-2xl">
            <p className="text-[0.73rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">A Feast Fit For Royalty</p>
            <h1 className="mt-4 font-serif text-[clamp(3.7rem,7.5vw,7rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              Royalty<br /><span className="text-[#d8ab4d]">on every table.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/72">Where global flavours meet royal hospitality. Indulge in live grills, an abundant buffet and memorable celebrations under one premium dining experience.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#reservation" className={buttonGold}>Book a Table</a>
              <a href="#menu" className={buttonOutline}>Explore Menu</a>
            </div>
          </div>
        </div>

        <div className={`${shell} absolute inset-x-0 bottom-0 z-20 grid overflow-hidden border border-[#d8ab4d]/22 bg-[#0b0b0beF] shadow-[0_22px_60px_rgba(0,0,0,.38)] sm:grid-cols-2 xl:grid-cols-5`}>
          {[
            ["Live Grill", "Sizzling delights"],
            ["Grand Buffet", "Global cuisines"],
            ["Premium Service", "Always with heart"],
            ["Royal Ambience", "Feel like royalty"],
            ["Hygiene First", "Comfort & care"],
          ].map(([title, copy], index) => (
            <div key={title} className={`group flex items-center gap-4 px-5 py-5 transition duration-300 hover:bg-[#d8ab4d]/8 ${index < 4 ? "xl:border-r xl:border-[#d8ab4d]/12" : ""}`}>
              <div className="grid size-11 shrink-0 place-items-center rounded-full border border-[#d8ab4d]/32 text-lg text-[#d8ab4d] transition group-hover:bg-[#d8ab4d] group-hover:text-black">✦</div>
              <div><strong className="block text-[0.68rem] font-black uppercase tracking-[0.11em] text-white">{title}</strong><span className="mt-1 block text-xs text-white/42">{copy}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section id="menu" className="bg-[#f3ecdf] pb-24 pt-24 lg:pb-28 lg:pt-28">
      <div className={shell}>
        <div className="flex flex-col gap-4 text-center">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Our Signature Highlights</p>
          <h2 className="font-serif text-[clamp(2.8rem,5vw,4.9rem)] leading-none tracking-[-0.035em] text-[#17130e]">A World of Flavors</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {signatureCards.map((card) => (
            <article key={card.title} className="group overflow-hidden border border-black/10 bg-[#fffaf2] shadow-[0_14px_35px_rgba(36,24,10,.08)] transition duration-500 hover:-translate-y-2 hover:border-[#c9983d]/50 hover:shadow-[0_24px_55px_rgba(36,24,10,.14)]">
              <div className="relative h-48 overflow-hidden">
                <img src={card.image} alt={card.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold text-[#1b1711]">{card.title}</h3>
                <p className="mt-2 min-h-20 text-xs leading-6 text-[#6e665b]">{card.copy}</p>
                <a href="#reservation" className="group/link mt-4 inline-flex items-center gap-2 text-[0.63rem] font-black uppercase tracking-[0.13em] text-[#8a641f]">View Menu <span className="transition group-hover/link:translate-x-1">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutOccasions() {
  return (
    <section id="about" className="grid bg-[#0b0b0b] text-white lg:grid-cols-[.38fr_.62fr]">
      <div className="relative min-h-[420px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85" alt="Friends dining together" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-[#0b0b0b]/80" />
      </div>
      <div className="flex items-center px-6 py-14 sm:px-10 lg:px-14 xl:px-20">
        <div className="w-full">
          <p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-[#d8ab4d]">Perfect for every occasion</p>
          <h2 className="mt-3 max-w-xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.95]">Made for celebrations that matter.</h2>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {occasions.map(([title, copy]) => (
              <div key={title} className="group bg-[#0b0b0b] p-5 transition duration-300 hover:bg-[#d8ab4d]/8">
                <div className="mb-6 text-2xl text-[#d8ab4d] transition duration-300 group-hover:scale-110">♛</div>
                <h3 className="font-serif text-xl">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/45">{copy}</p>
              </div>
            ))}
          </div>
          <a href="#reservation" className={`${buttonOutline} mt-8`}>Book for an Occasion</a>
        </div>
      </div>
    </section>
  );
}

function PromoPanels() {
  const panels = [
    ["catering", "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1400&q=85", "Beyond the restaurant", "Premium Catering", "Bring the Royalties experience to weddings, celebrations, corporate events and private gatherings.", "Explore Catering", "#contact"],
    ["franchise", "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85", "Grow with the brand", "Franchise Opportunities", "Build the next Royalties destination with a scalable buffet concept and brand support.", "Partner With Us", "#contact"],
    ["locations", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85", "Visit Royalties", "Find Your Restaurant", "Discover outlets, timings, buffet experiences and reservations near you.", "Find Us", "#reservation"],
  ];

  return (
    <section className="grid bg-black text-white lg:grid-cols-3">
      {panels.map(([id, image, kicker, title, copy, cta, href], index) => (
        <article key={id} id={id} className={`group relative min-h-[360px] overflow-hidden border-[#d8ab4d]/20 ${index < 2 ? "border-b lg:border-b-0 lg:border-r" : ""}`}>
          <img src={image} alt={title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/18" />
          <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-8 sm:p-10">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#d8ab4d]">{kicker}</p>
            <h3 className="mt-3 font-serif text-4xl">{title}</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/62">{copy}</p>
            <a href={href} className={`${buttonOutline} mt-6 w-fit`}>{cta}</a>
          </div>
        </article>
      ))}
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-[#f3ecdf] py-20 lg:py-24">
      <div className={shell}>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-[#997026]">Inside Royalties</p><h2 className="mt-3 font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-none text-[#17130e]">A taste of the experience.</h2></div>
          <a href="#reservation" className="group text-[0.66rem] font-black uppercase tracking-[0.15em] text-[#8f6720]">Reserve your table <span className="inline-block transition group-hover:translate-x-1">→</span></a>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:auto-rows-[205px] lg:grid-cols-4">
          {galleryItems.map(([src, alt], index) => (
            <div key={alt} className={`group relative min-h-[240px] overflow-hidden lg:min-h-0 ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
              <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 transition duration-300 group-hover:opacity-85" />
              <span className="absolute bottom-4 left-4 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/90">{alt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomSelect({ label, value, placeholder, options, icon: Icon, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`group flex min-h-12 w-full items-center gap-3 border bg-black/55 px-4 text-left text-sm transition duration-300 ${open ? "border-[#d8ab4d] shadow-[0_0_0_3px_rgba(216,171,77,.08)]" : "border-[#d8ab4d]/28 hover:border-[#d8ab4d]/60"}`}
      >
        <Icon className="size-4 shrink-0 text-[#d8ab4d]" strokeWidth={1.8} />
        <span className={`min-w-0 flex-1 truncate ${value ? "text-white" : "text-white/45"}`}>{value || placeholder}</span>
        <ChevronDown className={`size-4 shrink-0 text-white/45 transition duration-300 ${open ? "rotate-180 text-[#d8ab4d]" : "group-hover:text-white"}`} strokeWidth={1.8} />
      </button>

      {open && (
        <div role="listbox" aria-label={label} className="absolute inset-x-0 top-[calc(100%+6px)] z-40 overflow-hidden border border-[#d8ab4d]/30 bg-[#0b0b0b] p-1.5 shadow-[0_18px_55px_rgba(0,0,0,.5)]">
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                type="button"
                role="option"
                aria-selected={selected}
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-4 px-3 py-3 text-left text-sm transition ${selected ? "bg-[#d8ab4d]/12 text-[#f1ce81]" : "text-white/65 hover:bg-white/[0.05] hover:text-white"}`}
              >
                <span>{option}</span>
                {selected && <Check className="size-4 text-[#d8ab4d]" strokeWidth={2} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Reservation() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2 Guests");

  return (
    <section id="reservation" className="relative overflow-visible bg-[#0a0a0a] py-16 text-white lg:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=80" alt="Elegant dining table" loading="lazy" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.96),rgba(5,5,5,.85),rgba(5,5,5,.92))]" />
      </div>
      <div className={`${shell} relative z-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end`}>
        <div>
          <p className="text-[0.64rem] font-black uppercase tracking-[0.24em] text-[#d8ab4d]">Reserve your experience</p>
          <h2 className="mt-3 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.95]">Book your table now.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/48">Choose your date, time and party size. The full reservation workflow will connect to the Express/MongoDB backend.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <CustomSelect label="Date" value={date} placeholder="Select Date" options={["Today", "Tomorrow", "This Weekend", "Next Week"]} icon={CalendarDays} onChange={setDate} />
          <CustomSelect label="Time" value={time} placeholder="Select Time" options={["12:30 PM", "1:30 PM", "7:00 PM", "8:00 PM", "9:00 PM"]} icon={Clock3} onChange={setTime} />
          <CustomSelect label="Guests" value={guests} placeholder="Select Guests" options={["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6+ Guests"]} icon={Users} onChange={setGuests} />
          <button type="button" className={`${buttonGold} self-end`}>Book Now</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#050505] text-white">
      <div className={`${shell} grid gap-10 border-b border-white/10 py-14 md:grid-cols-2 xl:grid-cols-[1.2fr_.8fr_.8fr_1fr_.8fr]`}>
        <div>
          <img src="/royalties-logo.png" alt="Royalties Buffet" className="h-24 w-auto object-contain" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/45">A premium buffet destination where every meal is designed to feel like a royal experience.</p>
          <div className="mt-5"><SocialLinks /></div>
        </div>

        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Quick Links</h3><div className="mt-5 grid gap-2.5">{footerLinks.map((item) => <a key={item} href="#home" className="group w-fit text-sm text-white/46 transition hover:text-white">{item}<span className="ml-2 inline-block text-[#d8ab4d] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span></a>)}</div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Our Services</h3><div className="mt-5 grid gap-2.5">{serviceLinks.map((item) => <a key={item} href="#catering" className="group w-fit text-sm text-white/46 transition hover:text-white">{item}<span className="ml-2 inline-block text-[#d8ab4d] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span></a>)}</div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Contact Us</h3><div className="mt-5 space-y-4 text-sm leading-6 text-white/46"><p>Royalties Buffet<br />Jodhpur, Rajasthan</p><p>+91 98765 43210</p><p>info@royaltiesbuffet.com</p></div></div>
        <div><h3 className="text-xs font-black uppercase tracking-[0.14em] text-[#d8ab4d]">Opening Hours</h3><div className="mt-5 space-y-3 text-sm text-white/46"><p>Mon - Fri<br /><span className="text-white/70">12:00 PM - 11:00 PM</span></p><p>Sat - Sun<br /><span className="text-white/70">11:30 AM - 11:30 PM</span></p><p className="text-[#d8ab4d]">Open all days</p></div></div>
      </div>
      <div className={`${shell} flex flex-col gap-3 py-5 text-[0.62rem] text-white/28 sm:flex-row sm:items-center sm:justify-between`}>
        <span>© 2026 Royalties Buffet. All Rights Reserved.</span>
        <div className="flex gap-5"><a href="#contact" className="transition hover:text-[#d8ab4d]">Privacy Policy</a><a href="#contact" className="transition hover:text-[#d8ab4d]">Terms & Conditions</a></div>
      </div>
    </footer>
  );
}

function ScrollTop({ visible }) {
  return (
    <button type="button" onClick={browser.scrollToTop} aria-label="Scroll to top" className={`fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-[#d8ab4d] text-black shadow-[0_14px_40px_rgba(0,0,0,.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#efc86f] ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <ArrowUp className="size-5" strokeWidth={2.2} />
    </button>
  );
}

export default function App() {
  const { active, showTop } = useScrollSpy();
  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased">
      <Header active={active} />
      <main>
        <Hero />
        <Signature />
        <AboutOccasions />
        <PromoPanels />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
      <ScrollTop visible={showTop} />
    </div>
  );
}

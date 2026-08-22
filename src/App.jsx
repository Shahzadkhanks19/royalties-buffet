const primaryNavigation = [
  ["Experience", "#experience"],
  ["Menu", "#menu"],
  ["Catering", "#catering"],
  ["Franchise", "#franchise"],
  ["Locations", "#locations"],
];

const highlights = [
  ["100+", "Dishes & live counters"],
  ["7", "Cuisine experiences"],
  ["∞", "Unlimited celebrations"],
];

const experienceCards = [
  ["Live", "Grill & Tandoor", "Smoky favourites, served hot from live counters and finished to your taste."],
  ["Global", "A World on Your Plate", "Indian classics meet Asian, continental, street-food and dessert favourites."],
  ["Sweet", "Dessert Theatre", "An indulgent finish with handcrafted desserts, live sweets and celebration specials."],
];

const services = [
  ["catering", "01", "Catering", "From intimate gatherings to weddings and corporate events, Royalties brings the buffet experience to your venue.", "Plan an event"],
  ["franchise", "02", "Franchise", "Build the next Royalties destination with a scalable dining concept, operational support and a premium brand experience.", "Explore franchise"],
];

const buttonClass = "inline-flex min-h-13 items-center justify-center border border-[#c9a45d] bg-[#c9a45d] px-6 text-xs font-extrabold uppercase tracking-[0.08em] text-[#21160d] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a45d]";
const eyebrowClass = "mb-4 text-[0.7rem] font-extrabold uppercase tracking-[0.24em] text-[#c9a45d]";
const sectionTitleClass = "font-serif text-[clamp(2.75rem,5.3vw,5.3rem)] leading-[0.94] font-semibold tracking-[-0.035em] text-[#17110c]";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[#1c0a0ae8] via-[#1c0a0a75] to-transparent py-4 text-white">
      <div className="mx-auto flex w-[min(1180px,calc(100%-2.5rem))] items-center justify-between gap-6">
        <a className="flex items-center gap-2.5" href="#home" aria-label="Royalties Buffet home">
          <span className="hidden text-2xl text-[#c9a45d] sm:inline" aria-hidden="true">♛</span>
          <span className="grid leading-none">
            <strong className="text-sm tracking-[0.14em]">ROYALTIES</strong>
            <small className="mt-1 text-[0.52rem] tracking-[0.34em] text-[#d6c3a6]">BUFFET</small>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-xs text-[#efe4d5] lg:flex" aria-label="Primary navigation">
          {primaryNavigation.map(([label, href]) => (
            <a className="transition hover:text-[#c9a45d]" key={href} href={href}>{label}</a>
          ))}
        </nav>

        <a className={`${buttonClass} min-h-10 px-4 text-[0.65rem] sm:px-5`} href="#reserve">Book a Table</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#100908] pb-7 pt-20 text-white md:pt-24">
      <div className="mx-auto grid w-[min(1180px,calc(100%-2.5rem))] gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_.55fr_.7fr] lg:gap-16">
        <div className="md:col-span-2 lg:col-span-1">
          <p className={eyebrowClass}>Royalties Buffet</p>
          <h2 className="font-serif text-[clamp(2.8rem,4.8vw,4.8rem)] leading-[0.96] tracking-[-0.035em]">Come hungry.<br />Leave like royalty.</h2>
        </div>
        <div className="grid content-start gap-3 text-sm text-[#c9b9ad]">
          <a className="transition hover:text-[#c9a45d]" href="#experience">Buffet Experience</a>
          <a className="transition hover:text-[#c9a45d]" href="#catering">Catering</a>
          <a className="transition hover:text-[#c9a45d]" href="#franchise">Franchise</a>
          <a className="transition hover:text-[#c9a45d]" href="#locations">Locations</a>
        </div>
        <div>
          <p className="leading-7 text-[#9d8f86]">For reservations, celebrations and business enquiries.</p>
          <a className="mt-4 inline-block text-sm font-bold text-[#c9a45d]" href="#reserve">Start here →</a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex w-[min(1180px,calc(100%-2.5rem))] flex-col gap-2 border-t border-white/10 pt-5 text-[0.68rem] text-[#6f625b] sm:flex-row sm:justify-between">
        <span>© 2026 Royalties Buffet</span>
        <span>Premium buffet dining · India</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#17110c] antialiased">
      <Header />
      <main className="overflow-hidden">
        <section className="relative flex min-h-svh items-center bg-[radial-gradient(circle_at_72%_40%,#762726_0,transparent_31%),linear-gradient(135deg,#18090a,#391011_54%,#17090a)] pb-24 pt-36 text-white md:pt-40" id="home">
          <div className="absolute -left-36 top-1/4 size-96 rounded-full bg-[#b87940]/20 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-10 right-[5%] size-72 rounded-full bg-[#7d1d28]/25 blur-3xl" aria-hidden="true" />

          <div className="relative z-10 mx-auto grid w-[min(1180px,calc(100%-2.5rem))] items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <div className="max-w-3xl">
              <p className={eyebrowClass}>The Grand Buffet Experience</p>
              <h1 className="font-serif text-[clamp(3.6rem,8vw,7.6rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
                Feast without limits.<br /><em className="font-medium text-[#c9a45d]">Dine like royalty.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#d8c8bb]">A theatre of live grills, global flavours, indulgent desserts and celebrations made bigger — all under one roof.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className={buttonClass} href="#reserve">Book a Table</a>
                <a className={`${buttonClass} border-white/30 bg-transparent text-[#fff3df] hover:bg-white/5`} href="#menu">Explore the Buffet</a>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-7 sm:gap-8">
                {highlights.map(([value, label]) => (
                  <div className="grid gap-1" key={label}>
                    <strong className="font-serif text-2xl text-[#c9a45d] sm:text-3xl">{value}</strong>
                    <span className="text-[0.65rem] leading-5 text-[#bfaea2] sm:text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto grid aspect-square w-full max-w-xl place-items-center" aria-label="Royalties Buffet dining experience visual">
              <div className="absolute size-[82%] rounded-full border border-[#c9a45d]/20" aria-hidden="true" />
              <div className="absolute size-full rounded-full border border-dashed border-[#c9a45d]/20" aria-hidden="true" />
              <div className="flex aspect-square w-[68%] -rotate-6 flex-col items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_35%_30%,#e4c184,#9b7037_32%,#3b2013_70%)] text-center shadow-[0_35px_100px_rgba(0,0,0,.45),inset_0_0_0_16px_rgba(255,255,255,.08)]">
                <span className="text-[0.62rem] tracking-[0.34em]">LIVE</span>
                <strong className="font-serif text-[clamp(2.7rem,5vw,4.5rem)]">BUFFET</strong>
                <small className="text-[#f1ddbc]">crafted around you</small>
              </div>
              <div className="absolute right-0 top-[12%] grid min-w-36 gap-1 border border-white/10 bg-[#150a09b8] px-4 py-3 backdrop-blur-xl">
                <span className="text-[0.62rem] text-[#bcaea3]">Tonight&apos;s mood</span><strong className="font-serif text-xl text-[#fff4df]">Unlimited</strong>
              </div>
              <div className="absolute bottom-[10%] left-0 grid min-w-36 gap-1 border border-white/10 bg-[#150a09b8] px-4 py-3 backdrop-blur-xl">
                <span className="text-[0.62rem] text-[#bcaea3]">Made for</span><strong className="font-serif text-xl text-[#fff4df]">Celebrations</strong>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 py-3 text-[0.65rem] tracking-[0.22em] text-white/30">
            <p className="w-max whitespace-nowrap">LIVE GRILLS ✦ GLOBAL CUISINE ✦ DESSERT THEATRE ✦ CELEBRATIONS ✦ LIVE GRILLS ✦ GLOBAL CUISINE ✦ DESSERT THEATRE ✦</p>
          </div>
        </section>

        <section className="py-20 md:py-28" id="experience">
          <div className="mx-auto w-[min(1180px,calc(100%-2.5rem))]">
            <div className="grid items-end gap-6 lg:grid-cols-[1fr_.65fr] lg:gap-20">
              <div><p className={eyebrowClass}>More Than a Meal</p><h2 className={sectionTitleClass}>The buffet, elevated.</h2></div>
              <p className="max-w-xl leading-8 text-[#62584e]">Every visit is designed as an experience — movement, aroma, theatre and choice, from the first live counter to the final dessert.</p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {experienceCards.map(([eyebrow, title, copy], index) => (
                <article className="group relative border border-black/10 bg-[#fffdf8] p-4 pb-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl" key={title}>
                  <span className="absolute right-7 top-7 z-10 text-xs tracking-[0.15em] text-white">0{index + 1}</span>
                  <div className="mb-6 flex h-60 items-end overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(255,224,166,.75),transparent_18%),linear-gradient(145deg,#7b2a1f,#2a100f_70%)] p-6 text-[#f3d79b] md:h-72">
                    <span className="font-serif text-5xl italic transition duration-300 group-hover:scale-105">{eyebrow}</span>
                  </div>
                  <h3 className="font-serif text-3xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#62584e]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f0e4] py-20 md:py-28" id="menu">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2.5rem))] items-center gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={eyebrowClass}>The Spread</p>
              <h2 className={sectionTitleClass}>One table.<br />A world of flavour.</h2>
              <p className="mt-6 max-w-lg leading-8 text-[#62584e]">From charcoal-kissed starters and comforting Indian mains to Asian favourites, street-food counters and an irresistible dessert finale.</p>
              <a className="mt-5 inline-block text-sm font-extrabold text-[#5d1719]" href="#reserve">Discover today&apos;s buffet →</a>
            </div>
            <div className="relative mx-auto grid aspect-[1.25] w-full max-w-3xl place-items-center">
              <div className="relative aspect-square w-[82%] rounded-full border border-[#5d1719]/20">
                <span className="absolute left-[43%] top-[4%] font-serif text-lg text-[#5d1719]">Indian</span>
                <span className="absolute -right-[4%] top-[48%] font-serif text-lg text-[#5d1719]">Asian</span>
                <span className="absolute bottom-[5%] left-[37%] font-serif text-lg text-[#5d1719]">Continental</span>
                <span className="absolute -left-[5%] top-[48%] font-serif text-lg text-[#5d1719]">Desserts</span>
              </div>
              <div className="absolute grid aspect-square w-[50%] place-content-center rounded-full bg-[#5d1719] text-center text-white shadow-2xl">
                <strong className="font-serif text-5xl leading-none text-[#c9a45d] sm:text-6xl">100+</strong>
                <small className="mt-2 uppercase tracking-[0.12em]">ways to indulge</small>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1b1110] py-20 text-white md:py-28">
          <div className="mx-auto w-[min(1180px,calc(100%-2.5rem))]">
            <p className={eyebrowClass}>Beyond the Restaurant</p>
            <h2 className="max-w-4xl font-serif text-[clamp(2.75rem,5.3vw,5.3rem)] leading-[0.94] tracking-[-0.035em]">Royalties, wherever the occasion takes you.</h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {services.map(([id, number, title, copy, cta]) => (
                <article className="grid min-h-72 gap-6 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 sm:grid-cols-[auto_1fr] sm:p-10" id={id} key={id}>
                  <span className="text-xs tracking-[0.15em] text-[#c9a45d]">{number}</span>
                  <div>
                    <h3 className="font-serif text-5xl">{title}</h3>
                    <p className="mt-5 leading-8 text-[#b9a9a0]">{copy}</p>
                    <a className="mt-5 inline-block text-sm font-bold text-[#c9a45d]" href={`#${id}-enquiry`}>{cta} →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#5d1719] py-20 text-white md:py-24" id="locations">
          <div className="mx-auto flex w-[min(1180px,calc(100%-2.5rem))] flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className={eyebrowClass}>Our Table Is Growing</p>
              <h2 className="font-serif text-[clamp(2.75rem,5.3vw,5.3rem)] leading-[0.94] tracking-[-0.035em]">Find your nearest Royalties.</h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#ddc9c4]">Discover buffet timings, experiences and reservations at a Royalties Buffet near you.</p>
            </div>
            <a className={`${buttonClass} border-[#17110c] bg-[#17110c] text-white`} href="#reserve">Explore Locations</a>
          </div>
        </section>

        <section className="bg-[#f9f3ea] py-20 md:py-28" id="reserve">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2.5rem))] items-center gap-12 lg:grid-cols-[1fr_.9fr] lg:gap-16">
            <div>
              <p className={eyebrowClass}>Reservations</p>
              <h2 className={sectionTitleClass}>Your table is waiting.</h2>
              <p className="mt-6 max-w-xl leading-8 text-[#62584e]">The outlet-aware booking flow and APIs will sit on the Express/MongoDB backend as we build the next phase.</p>
            </div>
            <form className="grid gap-3 border border-black/10 bg-white p-5 sm:grid-cols-2 sm:p-7">
              <label className="grid gap-2 text-[0.68rem] font-bold uppercase tracking-[0.08em]">
                <span>Guests</span>
                <select className="min-h-12 border border-black/10 bg-[#fffaf3] px-3 outline-none focus:border-[#c9a45d]" defaultValue="2">
                  <option>2</option><option>3</option><option>4</option><option>5+</option>
                </select>
              </label>
              <label className="grid gap-2 text-[0.68rem] font-bold uppercase tracking-[0.08em]">
                <span>Occasion</span>
                <select className="min-h-12 border border-black/10 bg-[#fffaf3] px-3 outline-none focus:border-[#c9a45d]" defaultValue="Dinner">
                  <option>Dinner</option><option>Birthday</option><option>Anniversary</option><option>Corporate</option>
                </select>
              </label>
              <button className={`${buttonClass} mt-1 sm:col-span-2`} type="button">Continue Booking</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

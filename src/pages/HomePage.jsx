import { Link } from "react-router-dom";
import HomeReservationStrip from "../components/home/HomeReservationStrip";
import { buttonGold, buttonOutline, shell } from "../config/site";

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

const promoPanels = [
  ["catering", "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1400&q=85", "Beyond the restaurant", "Premium Catering", "Bring the Royalties experience to weddings, celebrations, corporate events and private gatherings.", "Explore Catering", "/catering"],
  ["franchise", "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85", "Grow with the brand", "Franchise Opportunities", "Build the next Royalties destination with a scalable buffet concept and brand support.", "Partner With Us", "/franchise"],
  ["locations", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85", "Visit Royalties", "Find Your Restaurant", "Discover outlets, timings, buffet experiences and reservations near you.", "Find Us", "/locations"],
];

const galleryItems = [
  ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85", "Buffet dishes"],
  ["https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85", "Restaurant ambience"],
  ["https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85", "Grilled food"],
  ["https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=85", "Desserts"],
  ["https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85", "Celebration dining"],
];

function Hero() {
  return <section className="relative overflow-hidden bg-[#070707] pt-[88px] text-white lg:pt-[108px]"><div className="relative min-h-[720px]"><img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2200&q=90" alt="Premium live grill buffet spread" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.94)_0%,rgba(3,3,3,.86)_32%,rgba(3,3,3,.43)_58%,rgba(3,3,3,.18)_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.06)_0%,transparent_42%,rgba(0,0,0,.5)_100%)]" /><div className={`${shell} relative z-10 flex min-h-[620px] items-center py-14 sm:py-16 lg:py-20`}><div className="max-w-2xl"><p className="text-[0.73rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">A Feast Fit For Royalty</p><h1 className="mt-4 font-serif text-[clamp(3.7rem,7.5vw,7rem)] leading-[0.9] font-semibold tracking-[-0.045em]">Royalty<br /><span className="text-[#d8ab4d]">on every table.</span></h1><p className="mt-6 max-w-xl text-base leading-8 text-white/72">Where global flavours meet royal hospitality. Indulge in live grills, an abundant buffet and memorable celebrations under one premium dining experience.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/reservation" className={buttonGold}>Book a Table</Link><Link to="/menu" className={buttonOutline}>Explore Menu</Link></div></div></div><div className={`${shell} absolute inset-x-0 bottom-0 z-20 grid overflow-hidden border border-[#d8ab4d]/22 bg-[#0b0b0bef] shadow-[0_22px_60px_rgba(0,0,0,.38)] sm:grid-cols-2 xl:grid-cols-5`}>{[["Live Grill","Sizzling delights"],["Grand Buffet","Global cuisines"],["Premium Service","Always with heart"],["Royal Ambience","Feel like royalty"],["Hygiene First","Comfort & care"]].map(([title,copy],index)=><div key={title} className={`group flex items-center gap-4 px-5 py-5 transition hover:bg-[#d8ab4d]/8 ${index<4?"xl:border-r xl:border-[#d8ab4d]/12":""}`}><div className="grid size-11 shrink-0 place-items-center rounded-full border border-[#d8ab4d]/32 text-lg text-[#d8ab4d] transition group-hover:bg-[#d8ab4d] group-hover:text-black">✦</div><div><strong className="block text-[0.68rem] font-black uppercase tracking-[0.11em]">{title}</strong><span className="mt-1 block text-xs text-white/42">{copy}</span></div></div>)}</div></div></section>;
}

function Signature() {
  return <section className="bg-[#f3ecdf] pb-24 pt-24 lg:pb-28 lg:pt-28"><div className={shell}><div className="text-center"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Our Signature Highlights</p><h2 className="mt-4 font-serif text-[clamp(2.8rem,5vw,4.9rem)] leading-none tracking-[-0.035em] text-[#17130e]">A World of Flavors</h2></div><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{signatureCards.map((card)=><article key={card.title} className="group overflow-hidden border border-black/10 bg-[#fffaf2] shadow-[0_14px_35px_rgba(36,24,10,.08)] transition duration-500 hover:-translate-y-2 hover:border-[#c9983d]/50 hover:shadow-[0_24px_55px_rgba(36,24,10,.14)]"><div className="relative h-48 overflow-hidden"><img src={card.image} alt={card.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" /></div><div className="p-5"><h3 className="font-serif text-xl font-semibold text-[#1b1711]">{card.title}</h3><p className="mt-2 min-h-20 text-xs leading-6 text-[#6e665b]">{card.copy}</p><Link to="/menu" className="group/link mt-4 inline-flex items-center gap-2 text-[0.63rem] font-black uppercase tracking-[0.13em] text-[#8a641f]">View Menu <span className="transition group-hover/link:translate-x-1">→</span></Link></div></article>)}</div></div></section>;
}

function AboutOccasions() {
  return <section className="grid bg-[#0b0b0b] text-white lg:grid-cols-[.38fr_.62fr]"><div className="relative min-h-[420px] overflow-hidden"><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85" alt="Friends dining together" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/10 to-[#0b0b0b]/80" /></div><div className="flex items-center px-6 py-14 sm:px-10 lg:px-14 xl:px-20"><div className="w-full"><p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-[#d8ab4d]">Perfect for every occasion</p><h2 className="mt-3 max-w-xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.95]">Made for celebrations that matter.</h2><div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">{occasions.map(([title,copy])=><div key={title} className="group bg-[#0b0b0b] p-5 transition hover:bg-[#d8ab4d]/8"><div className="mb-6 text-2xl text-[#d8ab4d]">♛</div><h3 className="font-serif text-xl">{title}</h3><p className="mt-2 text-xs leading-6 text-white/45">{copy}</p></div>)}</div><Link to="/reservation" className={`${buttonOutline} mt-8`}>Book for an Occasion</Link></div></div></section>;
}

function PromoPanels() {
  return <section className="grid bg-black text-white lg:grid-cols-3">{promoPanels.map(([id,image,kicker,title,copy,cta,to],index)=><article key={id} className={`group relative min-h-[360px] overflow-hidden border-[#d8ab4d]/20 ${index<2?"border-b lg:border-b-0 lg:border-r":""}`}><img src={image} alt={title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/18" /><div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-8 sm:p-10"><p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#d8ab4d]">{kicker}</p><h3 className="mt-3 font-serif text-4xl">{title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-white/62">{copy}</p><Link to={to} className={`${buttonOutline} mt-6 w-fit`}>{cta}</Link></div></article>)}</section>;
}

function Gallery() {
  return <section className="bg-[#f3ecdf] py-20 lg:py-24"><div className={shell}><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[0.66rem] font-black uppercase tracking-[0.24em] text-[#997026]">Inside Royalties</p><h2 className="mt-3 font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-none text-[#17130e]">A taste of the experience.</h2></div><Link to="/gallery" className="group text-[0.66rem] font-black uppercase tracking-[0.15em] text-[#8f6720]">View Gallery <span className="inline-block transition group-hover:translate-x-1">→</span></Link></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:auto-rows-[205px] lg:grid-cols-4">{galleryItems.map(([src,alt],index)=><div key={alt} className={`group relative min-h-[240px] overflow-hidden lg:min-h-0 ${index===0?"lg:col-span-2 lg:row-span-2":""}`}><img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 transition group-hover:opacity-85" /><span className="absolute bottom-4 left-4 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/90">{alt}</span></div>)}</div></div></section>;
}

export default function HomePage() {
  return <><Hero /><Signature /><AboutOccasions /><PromoPanels /><Gallery /><HomeReservationStrip /></>;
}

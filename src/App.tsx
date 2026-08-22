const primaryNavigation = [
  ["Experience", "#experience"], ["Menu", "#menu"], ["Catering", "#catering"], ["Franchise", "#franchise"], ["Locations", "#locations"],
] as const;

const highlights = [
  ["100+", "Dishes & live counters"], ["7", "Cuisine experiences"], ["∞", "Unlimited celebrations"],
] as const;

const experienceCards = [
  ["Live", "Grill & Tandoor", "Smoky favourites, served hot from live counters and finished to your taste."],
  ["Global", "A World on Your Plate", "Indian classics meet Asian, continental, street-food and dessert favourites."],
  ["Sweet", "Dessert Theatre", "An indulgent finish with handcrafted desserts, live sweets and celebration specials."],
] as const;

const services = [
  ["catering", "01", "Catering", "From intimate gatherings to weddings and corporate events, Royalties brings the buffet experience to your venue.", "Plan an event"],
  ["franchise", "02", "Franchise", "Build the next Royalties destination with a scalable dining concept, operational support and a premium brand experience.", "Explore franchise"],
] as const;

function Header() {
  return <header className="site-header"><div className="shell nav-shell">
    <a className="brand" href="#home" aria-label="Royalties Buffet home"><span className="brand-crown" aria-hidden="true">♛</span><span className="brand-copy"><strong>ROYALTIES</strong><small>BUFFET</small></span></a>
    <nav className="desktop-nav" aria-label="Primary navigation">{primaryNavigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a className="button button-small" href="#reserve">Book a Table</a>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid">
    <div><p className="eyebrow">ROYALTIES BUFFET</p><h2>Come hungry.<br/>Leave like royalty.</h2></div>
    <div className="footer-links"><a href="#experience">Buffet Experience</a><a href="#catering">Catering</a><a href="#franchise">Franchise</a><a href="#locations">Locations</a></div>
    <div className="footer-cta"><p>For reservations, celebrations and business enquiries.</p><a className="text-link" href="#reserve">Start here →</a></div>
  </div><div className="shell footer-bottom"><span>© 2026 Royalties Buffet</span><span>Premium buffet dining · India</span></div></footer>;
}

export default function App() {
  return <><Header/><main>
    <section className="hero" id="home"><div className="hero-glow hero-glow-one"/><div className="hero-glow hero-glow-two"/><div className="shell hero-grid">
      <div className="hero-copy"><p className="eyebrow">THE GRAND BUFFET EXPERIENCE</p><h1>Feast without limits.<br/><em>Dine like royalty.</em></h1><p className="hero-lede">A theatre of live grills, global flavours, indulgent desserts and celebrations made bigger — all under one roof.</p><div className="hero-actions"><a className="button" href="#reserve">Book a Table</a><a className="button button-ghost" href="#menu">Explore the Buffet</a></div><div className="hero-stats">{highlights.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
      <div className="hero-stage" aria-label="Royalties Buffet dining experience visual"><div className="hero-orbit hero-orbit-one"/><div className="hero-orbit hero-orbit-two"/><div className="plate plate-main"><span>LIVE</span><strong>BUFFET</strong><small>crafted around you</small></div><div className="floating-card floating-card-top"><span>Tonight&apos;s mood</span><strong>Unlimited</strong></div><div className="floating-card floating-card-bottom"><span>Made for</span><strong>Celebrations</strong></div></div>
    </div><div className="hero-marquee" aria-hidden="true"><span>LIVE GRILLS ✦ GLOBAL CUISINE ✦ DESSERT THEATRE ✦ CELEBRATIONS ✦ LIVE GRILLS ✦ GLOBAL CUISINE ✦ DESSERT THEATRE ✦</span></div></section>

    <section className="section experience" id="experience"><div className="shell"><div className="section-heading split-heading"><div><p className="eyebrow">MORE THAN A MEAL</p><h2>The buffet, elevated.</h2></div><p>Every visit is designed as an experience — movement, aroma, theatre and choice, from the first live counter to the final dessert.</p></div><div className="experience-grid">{experienceCards.map(([eyebrow,title,copy],index)=><article className="experience-card" key={title}><span className="card-index">0{index+1}</span><div className="card-visual"><span>{eyebrow}</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section menu-section" id="menu"><div className="shell menu-layout"><div className="menu-copy"><p className="eyebrow">THE SPREAD</p><h2>One table.<br/>A world of flavour.</h2><p>From charcoal-kissed starters and comforting Indian mains to Asian favourites, street-food counters and an irresistible dessert finale.</p><a className="text-link" href="#reserve">Discover today&apos;s buffet →</a></div><div className="menu-rings"><div className="menu-ring ring-outer"><span>Indian</span><span>Asian</span><span>Continental</span><span>Desserts</span></div><div className="menu-ring ring-inner"><strong>100+</strong><small>ways to indulge</small></div></div></div></section>

    <section className="section service-section"><div className="shell"><div className="section-heading"><p className="eyebrow">BEYOND THE RESTAURANT</p><h2>Royalties, wherever the occasion takes you.</h2></div><div className="service-grid">{services.map(([id,number,title,copy,cta])=><article className="service-card" id={id} key={id}><span className="service-number">{number}</span><div><h3>{title}</h3><p>{copy}</p><a className="text-link" href={`#${id}-enquiry`}>{cta} →</a></div></article>)}</div></div></section>

    <section className="section locations" id="locations"><div className="shell location-card"><div><p className="eyebrow">OUR TABLE IS GROWING</p><h2>Find your nearest Royalties.</h2><p>Discover buffet timings, experiences and reservations at a Royalties Buffet near you.</p></div><a className="button button-dark" href="#reserve">Explore Locations</a></div></section>

    <section className="section reservation" id="reserve"><div className="shell reservation-grid"><div><p className="eyebrow">RESERVATIONS</p><h2>Your table is waiting.</h2><p>The outlet-aware booking flow and APIs will sit on the Express/MongoDB backend as we build the next phase.</p></div><form className="reservation-form"><label><span>Guests</span><select defaultValue="2"><option>2</option><option>3</option><option>4</option><option>5+</option></select></label><label><span>Occasion</span><select defaultValue="Dinner"><option>Dinner</option><option>Birthday</option><option>Anniversary</option><option>Corporate</option></select></label><button className="button" type="button">Continue Booking</button></form></div></section>
  </main><Footer/></>;
}

import Link from "next/link";
import { buffetHighlights, experienceCards, services } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">THE GRAND BUFFET EXPERIENCE</p>
            <h1>Feast without limits.<br/><em>Dine like royalty.</em></h1>
            <p className="hero-lede">A theatre of live grills, global flavours, indulgent desserts and celebrations made bigger — all under one roof.</p>
            <div className="hero-actions">
              <Link className="button" href="#reserve">Book a Table</Link>
              <Link className="button button-ghost" href="#menu">Explore the Buffet</Link>
            </div>
            <div className="hero-stats">
              {buffetHighlights.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
            </div>
          </div>
          <div className="hero-stage" aria-label="Royalties Buffet dining experience visual">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="plate plate-main"><span>LIVE</span><strong>BUFFET</strong><small>crafted around you</small></div>
            <div className="floating-card floating-card-top"><span>Tonight&apos;s mood</span><strong>Unlimited</strong></div>
            <div className="floating-card floating-card-bottom"><span>Made for</span><strong>Celebrations</strong></div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true"><span>LIVE GRILLS ✦ GLOBAL CUISINE ✦ DESSERT THEATRE ✦ CELEBRATIONS ✦ LIVE GRILLS ✦ GLOBAL CUISINE ✦ DESSERT THEATRE ✦</span></div>
      </section>

      <section className="section experience" id="experience">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">MORE THAN A MEAL</p><h2>The buffet, elevated.</h2></div>
            <p>Every visit is designed as an experience — movement, aroma, theatre and choice, from the first live counter to the final dessert.</p>
          </div>
          <div className="experience-grid">
            {experienceCards.map((card, index) => (
              <article className="experience-card" key={card.title}>
                <span className="card-index">0{index + 1}</span>
                <div className="card-visual"><span>{card.eyebrow}</span></div>
                <h3>{card.title}</h3><p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section menu-section" id="menu">
        <div className="shell menu-layout">
          <div className="menu-copy">
            <p className="eyebrow">THE SPREAD</p>
            <h2>One table.<br/>A world of flavour.</h2>
            <p>From charcoal-kissed starters and comforting Indian mains to Asian favourites, street-food counters and an irresistible dessert finale.</p>
            <Link className="text-link" href="#reserve">Discover today&apos;s buffet →</Link>
          </div>
          <div className="menu-rings">
            <div className="menu-ring ring-outer"><span>Indian</span><span>Asian</span><span>Continental</span><span>Desserts</span></div>
            <div className="menu-ring ring-inner"><strong>100+</strong><small>ways to indulge</small></div>
          </div>
        </div>
      </section>

      <section className="section service-section">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">BEYOND THE RESTAURANT</p><h2>Royalties, wherever the occasion takes you.</h2></div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" id={service.id} key={service.id}>
                <span className="service-number">{service.number}</span>
                <div><h3>{service.title}</h3><p>{service.copy}</p><Link className="text-link" href={`#${service.id}-enquiry`}>{service.cta} →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section locations" id="locations">
        <div className="shell location-card">
          <div><p className="eyebrow">OUR TABLE IS GROWING</p><h2>Find your nearest Royalties.</h2><p>Discover buffet timings, experiences and reservations at a Royalties Buffet near you.</p></div>
          <Link className="button button-dark" href="#reserve">Explore Locations</Link>
        </div>
      </section>

      <section className="section reservation" id="reserve">
        <div className="shell reservation-grid">
          <div><p className="eyebrow">RESERVATIONS</p><h2>Your table is waiting.</h2><p>We&apos;re building the full outlet-aware reservation flow next. This first release establishes the visual and technical foundation.</p></div>
          <form className="reservation-form">
            <label><span>Guests</span><select defaultValue="2"><option>2</option><option>3</option><option>4</option><option>5+</option></select></label>
            <label><span>Occasion</span><select defaultValue="Dinner"><option>Dinner</option><option>Birthday</option><option>Anniversary</option><option>Corporate</option></select></label>
            <button className="button" type="button">Continue Booking</button>
          </form>
        </div>
      </section>
    </>
  );
}

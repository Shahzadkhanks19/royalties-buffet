import Link from "next/link";
import { primaryNavigation } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="Royalties Buffet home">
          <span className="brand-crown" aria-hidden="true">♛</span>
          <span className="brand-copy"><strong>ROYALTIES</strong><small>BUFFET</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button button-small" href="#reserve">Book a Table</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">ROYALTIES BUFFET</p>
          <h2>Come hungry.<br/>Leave like royalty.</h2>
        </div>
        <div className="footer-links">
          <Link href="#experience">Buffet Experience</Link>
          <Link href="#catering">Catering</Link>
          <Link href="#franchise">Franchise</Link>
          <Link href="#locations">Locations</Link>
        </div>
        <div className="footer-cta">
          <p>For reservations, celebrations and business enquiries.</p>
          <Link className="text-link" href="#reserve">Start here →</Link>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Royalties Buffet</span><span>Premium buffet dining · India</span></div>
    </footer>
  );
}

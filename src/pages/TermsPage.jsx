import { ScrollText } from "lucide-react";
import { internalHero, internalHeroInner, shell } from "../config/site";

const sections = [
  ["Website use", "This website is intended to provide information about Royalties Buffet, its dining experience, reservations, catering, franchise opportunities and related services. Users should provide accurate information when submitting forms or enquiries."],
  ["Reservations", "A reservation request is not necessarily a confirmed booking until the outlet or connected reservation system confirms availability. Final timing, seating and applicable booking conditions may vary by outlet and service period."],
  ["Buffet availability", "Menu selections, live counters, service formats, timings and pricing may vary by outlet, day, season, event or operational requirement. Website imagery and sample menu content may be representative during development."],
  ["Catering enquiries", "Catering requests are subject to availability, event requirements, venue conditions, guest count, menu selection and commercial confirmation. An enquiry submission by itself does not create a binding catering booking."],
  ["Franchise enquiries", "Franchise information on this website is introductory and does not constitute an investment offer, earnings guarantee or franchise agreement. Commercial terms, eligibility and approvals must be confirmed separately through authorised representatives."],
  ["Payments and refunds", "If online payments are introduced, the applicable payment, cancellation and refund rules should be shown before a transaction is completed. Final payment terms may differ between dining, events, catering and franchise-related services."],
  ["Intellectual property", "The Royalties Buffet name, logo, branding, website design, text, graphics and original content should not be copied, reproduced or commercially reused without permission, except where permitted by law."],
  ["Third-party services", "The website may link to or integrate with third-party services such as maps, payment gateways, analytics, messaging or social platforms. Royalties is not responsible for independent third-party terms, availability or policies."],
  ["Limitation and changes", "Website information may be changed, corrected or updated as the business evolves. Final production terms should be reviewed by the business and legal advisers before public launch."],
];

export default function TermsPage() {
  return (
    <>
      <section className={internalHero}>
        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=88" alt="Premium dining and event setting" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.97)_0%,rgba(3,3,3,.86)_46%,rgba(3,3,3,.36)_100%)]" />
        <div className={internalHeroInner}><div className="max-w-3xl"><p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Terms & Conditions</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.2rem)] leading-[0.88] tracking-[-0.05em]">Clear expectations.<br /><span className="text-[#d8ab4d]">Better experiences.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">General terms covering use of the Royalties Buffet website and enquiries for dining, catering and franchise opportunities.</p></div></div>
      </section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24">
        <div className={`${shell} grid gap-10 lg:grid-cols-[.7fr_1.3fr]`}>
          <aside className="lg:sticky lg:top-32 lg:self-start"><div className="grid size-14 place-items-center border border-[#9d7328]/35 text-[#8c641d]"><ScrollText className="size-6" /></div><p className="mt-6 text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Using the website</p><h2 className="mt-4 font-serif text-4xl leading-tight text-[#17130e]">Simple terms for a growing hospitality brand.</h2><p className="mt-5 text-sm leading-7 text-[#6c6254]">This is development-stage copy. Before production launch, the final legal terms should reflect actual reservation, pricing, payment, cancellation and franchise policies.</p></aside>
          <div className="space-y-4">{sections.map(([title, copy], index) => <article key={title} className="border border-black/10 bg-[#fffaf2] p-6 sm:p-7"><div className="flex items-start gap-4"><span className="font-serif text-2xl text-[#b2873c]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-serif text-2xl text-[#17130e]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#6c6254] sm:text-base sm:leading-8">{copy}</p></div></div></article>)}</div>
        </div>
      </section>
    </>
  );
}

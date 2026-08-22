import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { buttonGold, internalHero, internalHeroInner, shell } from "../config/site";

const faqs = [
  ["Do I need a reservation?", "Walk-ins may be possible, but reservations are recommended for evenings, weekends, larger groups and celebrations so the outlet can plan seating properly."],
  ["Do you serve both vegetarian and non-vegetarian food?", "Yes. The buffet can include vegetarian choices and selected non-vegetarian dishes. Non-vegetarian items on the current website menu are limited to chicken, mutton, eggs and seafood."],
  ["Does the buffet menu stay the same every day?", "No. Buffet selections may rotate by outlet, service, season and event. The final live menu and outlet-specific availability can be connected through the backend and admin CMS."],
  ["Can I book for birthdays or anniversaries?", "Yes. You can mention the occasion while making a reservation and add any celebration-related request in the special requests field."],
  ["Do you handle large group bookings?", "Yes. For larger parties, corporate dinners or group celebrations, use the reservation or contact page so the team can review the requirement."],
  ["Do you offer catering?", "Yes. Royalties has a dedicated catering enquiry flow for weddings, corporate events, private celebrations and larger gatherings across Delhi NCR."],
  ["Can the catering menu be customised?", "The catering experience is designed to support different cuisines, service formats and guest scales. Final menu customisation and commercials are confirmed by the catering team."],
  ["Do you offer franchise opportunities?", "Yes. Prospective partners can submit an enquiry through the Franchise page with their preferred city, investment range, business background and site status."],
  ["Where are Royalties Buffet locations?", "The current website is positioned around Delhi NCR, with Gurugram, Delhi and Noida represented in the outlet and reservation experience."],
  ["Can I change or cancel a reservation?", "Once the backend reservation system is connected, booking confirmation, modification and cancellation rules can be managed outlet-by-outlet. For now, use the Contact page for assistance."],
  ["Are buffet prices shown online?", "Not yet. Pricing can vary by outlet, day, service and event. The website is structured so live pricing can be added later without redesigning the page."],
  ["How do I contact the team?", "Use the Contact page for general enquiries, reservation support, catering, franchise questions or feedback."],
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className={internalHero}>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90" alt="Premium restaurant table setting" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.84)_42%,rgba(3,3,3,.28)_100%)]" />
        <div className={internalHeroInner}>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Frequently Asked Questions</p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Questions answered.<br /><span className="text-[#d8ab4d]">Plans made easier.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Everything you may want to know before dining, celebrating, catering or exploring a franchise opportunity with Royalties.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24">
        <div className={`${shell} grid gap-10 lg:grid-cols-[.72fr_1.28fr]`}>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="grid size-14 place-items-center border border-[#9d7328]/35 text-[#8c641d]"><HelpCircle className="size-6" /></div>
            <p className="mt-6 text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Need clarity?</p>
            <h2 className="mt-4 font-serif text-[clamp(3rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.04em] text-[#17130e]">The details before the feast.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#6c6254]">If your question is specific to a reservation, event or outlet, the contact team can help after you share the details.</p>
            <Link to="/contact" className={`${buttonGold} mt-7`}>Contact the Team</Link>
          </div>

          <div className="border-t border-black/10">
            {faqs.map(([question, answer], index) => {
              const open = openIndex === index;
              return (
                <article key={question} className="border-b border-black/10">
                  <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? -1 : index)} className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7">
                    <span className="font-serif text-xl text-[#1b1711] transition group-hover:text-[#8c641d] sm:text-2xl">{question}</span>
                    <span className={`grid size-10 shrink-0 place-items-center border transition ${open ? "border-[#17130e] bg-[#17130e] text-[#efcb73]" : "border-[#9d7328]/30 text-[#8c641d] group-hover:border-[#8c641d]"}`}><ChevronDown className={`size-4 transition duration-300 ${open ? "rotate-180" : ""}`} /></span>
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-6 sm:pb-7" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="max-w-3xl text-sm leading-7 text-[#6c6254] sm:text-base sm:leading-8">{answer}</p></div></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

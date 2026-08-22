import { Check, Clock3, Mail, MapPin, MessageSquareText, Phone, Send } from "lucide-react";
import { useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import { buttonGold, internalHero, internalHeroInner, shell } from "../config/site";

const subjects = ["General Enquiry", "Reservation Help", "Catering", "Franchise", "Feedback", "Other"];
const outlets = ["General / Delhi NCR", "Gurugram", "Delhi", "Noida"];

const contactCards = [
  [Phone, "Call Us", "+91 98765 43210", "For reservations, outlet help and general enquiries."],
  [Mail, "Email Us", "info@royaltiesbuffet.com", "For detailed enquiries, partnerships and business communication."],
  [MapPin, "Visit Us", "Delhi NCR", "Explore our Gurugram, Delhi and Noida locations."],
  [Clock3, "Opening Hours", "12:00 PM - 11:00 PM", "Weekend hours may vary by outlet."],
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: subjects[0], outlet: outlets[0], message: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <>
      <section className={internalHero}>
        <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2200&q=90" alt="Guests dining together at a restaurant" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.84)_42%,rgba(3,3,3,.28)_100%)]" />
        <div className={internalHeroInner}>
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Contact Royalties</p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Let’s talk.<br /><span className="text-[#d8ab4d]">We’re listening.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Questions about dining, reservations, catering, franchise opportunities or anything else? Reach the Royalties team here.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24">
        <div className={shell}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactCards.map(([Icon, title, value, copy]) => (
              <article key={title} className="group border border-black/10 bg-[#fffaf2] p-6 shadow-[0_16px_36px_rgba(36,24,10,.08)] transition duration-500 hover:-translate-y-1 hover:border-[#c9983d]/55 hover:shadow-[0_24px_50px_rgba(36,24,10,.14)]">
                <div className="grid size-11 place-items-center border border-[#a97c29]/35 text-[#9d7328] transition group-hover:bg-[#17130e] group-hover:text-[#efcb73]"><Icon className="size-5" /></div>
                <h2 className="mt-6 font-serif text-2xl text-[#17130e]">{title}</h2>
                <p className="mt-2 text-sm font-bold text-[#7b5b22]">{value}</p>
                <p className="mt-3 text-sm leading-7 text-[#6c6254]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090909] py-20 text-white lg:py-24">
        <div className={`${shell} grid gap-8 xl:grid-cols-[1.1fr_.9fr]`}>
          <form onSubmit={handleSubmit} className="border border-white/10 bg-[#0d0d0d] p-5 sm:p-7 lg:p-9">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Send a message</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">How can we help?</h2></div>
              <MessageSquareText className="size-8 text-[#d8ab4d]" strokeWidth={1.5} />
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" className="min-h-12 w-full border border-[#d8ab4d]/28 bg-black/55 px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d8ab4d]/65" /></label>
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Phone</span><input value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="10-digit mobile number" inputMode="numeric" className="min-h-12 w-full border border-[#d8ab4d]/28 bg-black/55 px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d8ab4d]/65" /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Email</span><input value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className="min-h-12 w-full border border-[#d8ab4d]/28 bg-black/55 px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d8ab4d]/65" /></label>
              <CustomSelect label="Subject" value={form.subject} options={subjects} icon={MessageSquareText} onChange={(value) => update("subject", value)} />
              <CustomSelect label="Outlet / Area" value={form.outlet} options={outlets} icon={MapPin} onChange={(value) => update("outlet", value)} />
              <label className="block md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Message</span><textarea value={form.message} onChange={(event) => update("message", event.target.value)} rows={6} placeholder="Tell us how we can help..." className="w-full resize-none border border-[#d8ab4d]/28 bg-black/55 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-white/28 focus:border-[#d8ab4d]/65" /></label>
            </div>

            <button type="submit" className={`${buttonGold} mt-7 gap-3`}>Send Message <Send className="size-4" /></button>
          </form>

          <aside className="space-y-5">
            <div className="border border-[#d8ab4d]/25 bg-[#15120c] p-6 sm:p-7">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Delhi NCR presence</p>
              <h2 className="mt-3 font-serif text-3xl">Gurugram. Delhi. Noida.</h2>
              <p className="mt-4 text-sm leading-7 text-white/48">Use the Locations page to explore current development locations and reservation options. Exact street addresses can be connected once the final outlet details are confirmed.</p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Gurugram", "Delhi", "Noida"].map((city) => <div key={city} className="border border-white/10 bg-black/20 px-3 py-4 text-center text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#e4bd63]">{city}</div>)}
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-black">
              <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=88" alt="India Gate in New Delhi" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-6"><p className="text-[0.58rem] font-black uppercase tracking-[0.15em] text-[#d8ab4d]">Reach us across NCR</p><h3 className="mt-2 font-serif text-3xl">One brand. Multiple ways to connect.</h3></div>
            </div>
          </aside>
        </div>
      </section>

      {submitted ? <section className="bg-[#d8ab4d] py-14 text-[#120f09]"><div className={`${shell} flex items-start gap-4`}><div className="grid size-12 shrink-0 place-items-center bg-black text-[#d8ab4d]"><Check className="size-5" /></div><div><p className="text-[0.62rem] font-black uppercase tracking-[0.16em] opacity-60">Message received</p><h2 className="mt-1 font-serif text-3xl">Thanks. The Royalties team will be able to follow up once the contact backend is connected.</h2></div></div></section> : null}
    </>
  );
}

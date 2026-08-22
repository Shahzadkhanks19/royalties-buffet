import { Building2, Check, ChefHat, Crown, HeartHandshake, MapPin, PartyPopper, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import SafeImage from "../components/ui/SafeImage";
import { buttonGold, internalHero, internalHeroInner, shell } from "../config/site";
import useApiSubmission from "../hooks/useApiSubmission";
import { fieldClass, textareaClass, validateCommonLeadFields } from "../utils/validation";

const eventTypes = [
  [PartyPopper, "Weddings & Celebrations", "Buffet-led experiences for weddings, engagements, anniversaries, birthdays and milestone occasions."],
  [Building2, "Corporate Events", "Professional catering for office gatherings, launches, conferences, annual meets and team celebrations."],
  [HeartHandshake, "Private Gatherings", "Thoughtful menus for family functions, house parties and intimate celebrations across Delhi NCR."],
  [Crown, "Premium Hosted Events", "Elevated live counters, chef-led service and a more theatrical Royalties-style dining experience."],
];
const formats = [
  { title: "Grand Buffet", copy: "A complete multi-cuisine spread with starters, mains, breads, rice, desserts and beverages." },
  { title: "Live Counter Experience", copy: "Interactive grills, chaat, pasta, Asian, dessert and other chef-finished counters." },
  { title: "Corporate Service", copy: "Efficient, polished food service designed for professional venues and scheduled event formats." },
  { title: "Celebration Dining", copy: "Flexible menus and presentation for weddings, birthdays, anniversaries and family functions." },
];
const cuisines = ["North Indian", "Regional Indian", "Live Grill", "Italian", "Indo-Chinese", "Japanese", "Middle Eastern", "Mexican", "Continental", "Desserts & Beverages"];
const eventOptions = ["Wedding", "Engagement", "Birthday", "Anniversary", "Corporate Event", "House Party", "Social Gathering", "Other"];
const guestOptions = ["Up to 50 Guests", "50-100 Guests", "100-250 Guests", "250-500 Guests", "500-1000 Guests", "1000+ Guests"];
const areaOptions = ["Gurugram", "Delhi", "Noida", "Greater Noida", "Faridabad", "Ghaziabad", "Other Delhi NCR"];
const serviceOptions = ["Grand Buffet", "Live Counters + Buffet", "Corporate Catering", "Custom Catering Plan"];
const initialForm = { event: "Wedding", guests: "100-250 Guests", area: "Gurugram", service: "Grand Buffet", name: "", phone: "", email: "", venue: "", notes: "" };

function ErrorText({ message }) {
  return message ? <span className="mt-2 block text-xs font-semibold text-red-300">{message}</span> : null;
}

export default function CateringPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { submitting, serverError, successMessage, submit, clearSubmissionState } = useApiSubmission();

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    clearSubmissionState();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateCommonLeadFields({ name: form.name, phone: form.phone, email: form.email });
    if (form.venue.trim().length < 2) nextErrors.venue = "Please enter a venue or locality.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const result = await submit("/api/catering", form);
    if (result) {
      setForm(initialForm);
      setErrors({});
    }
  };

  return (
    <>
      <section className={internalHero}>
        <SafeImage src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=90" alt="Premium catered celebration" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.82)_44%,rgba(3,3,3,.28)_100%)]" />
        <div className={internalHeroInner}><div className="max-w-3xl"><p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Royalties Catering</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Your occasion.<br /><span className="text-[#d8ab4d]">Our grand table.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Bring the Royalties buffet experience to weddings, corporate events and private celebrations across Delhi NCR.</p></div></div>
      </section>

      <section className="bg-[#0a0a0a] py-20 text-white lg:py-24"><div className={shell}><div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">{eventTypes.map(([Icon, title, copy]) => <article key={title} className="group bg-[#0d0d0d] p-7 transition duration-500 hover:bg-[#15120c]"><div className="grid size-12 place-items-center border border-[#d8ab4d]/35 text-[#d8ab4d] transition group-hover:bg-[#d8ab4d] group-hover:text-black"><Icon className="size-5" /></div><h2 className="mt-7 font-serif text-2xl">{title}</h2><p className="mt-3 text-sm leading-7 text-white/48">{copy}</p></article>)}</div></div></section>

      <section className="bg-[#f3ecdf] py-24 lg:py-28"><div className={shell}><div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-18"><div><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Built around your event</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">From one buffet line to a complete food experience.</h2><p className="mt-6 max-w-2xl text-base leading-8 text-[#665c4e]">The catering format can scale from a focused buffet to multiple live counters and chef-led stations. Menus can mix Indian favourites with global cuisines while keeping service coordinated around the event schedule.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{formats.map((item) => <div key={item.title} className="border border-black/10 bg-[#fffaf2] p-5 transition hover:-translate-y-1 hover:border-[#bd8e37]/45 hover:shadow-lg"><Check className="size-5 text-[#a97928]" /><h3 className="mt-4 font-serif text-2xl text-[#17130e]">{item.title}</h3><p className="mt-2 text-sm leading-7 text-[#716758]">{item.copy}</p></div>)}</div></div><div className="relative min-h-[480px] overflow-hidden bg-black sm:min-h-[560px] lg:min-h-[620px]"><SafeImage src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1500&q=90" alt="Catering buffet and event service" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/8 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 sm:p-9"><ChefHat className="size-7 text-[#d8ab4d]" /><p className="mt-5 max-w-md font-serif text-3xl leading-tight text-white">Food, service and presentation planned as one experience.</p></div></div></div></div></section>

      <section className="bg-[#101010] py-24 text-white"><div className={shell}><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div className="max-w-3xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">Multi-cuisine catering</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.04em]">A menu that can travel across cuisines.</h2></div><p className="max-w-md text-sm leading-7 text-white/45">Cuisine combinations can be tailored to the event instead of forcing every celebration into one fixed package.</p></div><div className="mt-10 flex flex-wrap gap-2">{cuisines.map((cuisine) => <span key={cuisine} className="border border-[#d8ab4d]/25 bg-[#d8ab4d]/[.04] px-4 py-3 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#edc66c]">{cuisine}</span>)}</div></div></section>

      <section className="bg-[#f3ecdf] py-24 lg:py-28">
        <div className={`${shell} grid gap-8 xl:grid-cols-[.9fr_1.1fr]`}>
          <div className="bg-[#d8ab4d] p-7 text-[#151108] sm:p-9 lg:p-11"><Sparkles className="size-8" /><p className="mt-8 text-[0.65rem] font-black uppercase tracking-[0.2em] opacity-55">Plan with Royalties</p><h2 className="mt-3 font-serif text-[clamp(3rem,5vw,4.7rem)] leading-[0.92] tracking-[-0.04em]">Tell us what you’re hosting.</h2><p className="mt-6 max-w-lg text-sm leading-7 opacity-70">Share the event type, approximate guest count and location. Your enquiry is now stored as a managed catering lead ready for admin follow-up and proposal tracking.</p><div className="mt-9 space-y-4 border-t border-black/15 pt-7 text-sm"><div className="flex items-center gap-3"><MapPin className="size-4" /><span>Delhi NCR focused service area</span></div><div className="flex items-center gap-3"><Users className="size-4" /><span>Small gatherings to large-format events</span></div><div className="flex items-center gap-3"><ChefHat className="size-4" /><span>Buffets, live counters and custom combinations</span></div></div></div>

          <form onSubmit={handleSubmit} noValidate className="bg-[#0d0d0d] p-6 text-white sm:p-8 lg:p-10">
            <div><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Catering enquiry</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">Start your event brief</h2></div>
            <div className="mt-7 grid gap-5 md:grid-cols-2"><CustomSelect label="Event Type" value={form.event} options={eventOptions} icon={PartyPopper} onChange={(value) => update("event", value)} /><CustomSelect label="Guest Count" value={form.guests} options={guestOptions} icon={Users} onChange={(value) => update("guests", value)} /><CustomSelect label="Area" value={form.area} options={areaOptions} icon={MapPin} onChange={(value) => update("area", value)} /><CustomSelect label="Service Format" value={form.service} options={serviceOptions} icon={ChefHat} onChange={(value) => update("service", value)} /></div>
            <div className="mt-6 grid gap-5 md:grid-cols-2"><label><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Name</span><input value={form.name} onChange={(e) => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} placeholder="Your name" autoComplete="name" className={fieldClass(errors.name)} /><ErrorText message={errors.name} /></label><label><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Phone</span><input value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} aria-invalid={Boolean(errors.phone)} inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" className={fieldClass(errors.phone)} /><ErrorText message={errors.phone} /></label><label><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Email</span><input value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} inputMode="email" autoComplete="email" placeholder="you@example.com" className={fieldClass(errors.email)} /><ErrorText message={errors.email} /></label><label><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Venue / Locality</span><input value={form.venue} onChange={(e) => update("venue", e.target.value)} aria-invalid={Boolean(errors.venue)} placeholder="Venue or locality" className={fieldClass(errors.venue)} /><ErrorText message={errors.venue} /></label><label className="md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Event Details</span><textarea rows={5} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Event date, cuisine preferences, live counters, special requirements..." className={textareaClass(false)} /></label></div>
            <button type="submit" disabled={submitting} className={`${buttonGold} mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}>{submitting ? "Sending..." : "Send Catering Enquiry"}</button>
            {serverError ? <div className="mt-6 border border-red-400/25 bg-red-400/8 p-4 text-sm text-red-200" role="alert">{serverError}</div> : null}
            {successMessage ? <div className="mt-6 flex items-start gap-3 border border-[#d8ab4d]/25 bg-[#d8ab4d]/8 p-4" role="status"><Check className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><p className="text-sm leading-6 text-white/70">{successMessage}</p></div> : null}
          </form>
        </div>
      </section>
    </>
  );
}

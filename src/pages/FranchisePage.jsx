import { BadgeCheck, Building2, CheckCircle2, MapPin, Rocket, Store, Users2 } from "lucide-react";
import { useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import SafeImage from "../components/ui/SafeImage";
import { buttonGold, internalHero, internalHeroInner, shell } from "../config/site";
import useApiSubmission from "../hooks/useApiSubmission";
import { fieldClass, textareaClass, validateCommonLeadFields } from "../utils/validation";

const investmentBands = ["₹75L - ₹1Cr", "₹1Cr - ₹1.5Cr", "₹1.5Cr - ₹2Cr", "₹2Cr+"];
const cityOptions = ["Gurugram", "Delhi", "Noida", "Greater Noida", "Faridabad", "Ghaziabad", "Other NCR / North India"];
const experienceOptions = ["Hospitality / F&B", "Retail", "Real Estate", "Business Owner", "Investor", "First-time Entrepreneur"];
const siteOptions = ["Site already identified", "Actively searching", "Need site support"];
const initialForm = { city: "Gurugram", investment: "₹1Cr - ₹1.5Cr", experience: "Business Owner", site: "Actively searching", name: "", phone: "", email: "", company: "", message: "" };

const support = [
  [Building2, "Site & Layout Guidance", "Support on catchment, frontage, capacity planning and the overall guest-flow concept."],
  [Store, "Brand & Experience System", "A consistent Royalties visual language, restaurant experience, menu architecture and service standards."],
  [Users2, "Training & Operations", "Structured team training, operating processes and launch-readiness support for the outlet."],
  [Rocket, "Launch & Growth Support", "Opening campaign guidance, local marketing direction and ongoing brand-aligned growth support."],
];
const journey = ["Initial Enquiry", "Business Discussion", "Location Review", "Commercial Alignment", "Design & Setup", "Training & Launch"];

function ErrorText({ message }) {
  return message ? <span className="mt-2 block text-xs font-semibold text-red-300">{message}</span> : null;
}

export default function FranchisePage() {
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
    if (form.message.trim().length < 10) nextErrors.message = "Tell us a little more about your expansion plan.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const result = await submit("/api/franchise", form);
    if (result) {
      setForm(initialForm);
      setErrors({});
    }
  };

  return (
    <>
      <section className={internalHero}>
        <SafeImage src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2200&q=90" alt="Premium restaurant interior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.97)_0%,rgba(3,3,3,.84)_43%,rgba(3,3,3,.34)_100%)]" />
        <div className={internalHeroInner}><div className="max-w-3xl"><p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Franchise With Royalties</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Build the next<br /><span className="text-[#d8ab4d]">royal table.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Partner with a premium buffet concept designed around scale, celebration, live food experiences and a recognizable hospitality identity.</p></div></div>
      </section>

      <section className="bg-[#f3ecdf] py-24 lg:py-28"><div className={`${shell} grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center`}><div><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">The opportunity</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-[#17130e]">A format built for high-energy dining.</h2><p className="mt-6 text-base leading-8 text-[#695f51]">Royalties combines a buffet-led dining model with live counters, celebrations, group dining and catering extensions. The franchise proposition is designed around a strong guest experience rather than a simple restaurant licence.</p><p className="mt-4 text-base leading-8 text-[#695f51]">The current growth focus is Delhi NCR, with the format positioned for dense residential, corporate and destination dining catchments.</p></div><div className="grid gap-px bg-[#c9a45d]/30 sm:grid-cols-2">{support.map(([Icon, title, copy]) => <article key={title} className="group bg-[#fffaf2] p-7 transition duration-500 hover:-translate-y-1 hover:bg-white"><div className="grid size-11 place-items-center bg-[#17130e] text-[#d8ab4d]"><Icon className="size-5" /></div><h3 className="mt-6 font-serif text-2xl text-[#1b1711]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#6e6457]">{copy}</p></article>)}</div></div></section>

      <section className="bg-[#090909] py-24 text-white lg:py-28"><div className={shell}><div className="max-w-3xl"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">Ideal partner profile</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.04em]">Right market. Right operator. Right experience.</h2></div><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{["Strong local market understanding", "Commitment to hospitality quality", "Ability to build and lead a team", "Long-term brand-building mindset"].map((item) => <div key={item} className="border border-white/10 bg-white/[0.02] p-6"><BadgeCheck className="size-5 text-[#d8ab4d]" /><p className="mt-5 font-serif text-xl">{item}</p></div>)}</div></div></section>

      <section className="bg-[#f3ecdf] py-24 lg:py-28"><div className={shell}><div className="text-center"><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Partnership journey</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.04em] text-[#17130e]">From first conversation to opening night.</h2></div><div className="mt-12 grid gap-3 md:grid-cols-3 xl:grid-cols-6">{journey.map((step, index) => <div key={step} className="relative border border-black/10 bg-[#fffaf2] p-5"><span className="font-serif text-4xl text-[#c89b43]/35">0{index + 1}</span><p className="mt-5 text-sm font-black uppercase tracking-[0.08em] text-[#2c2419]">{step}</p>{index < journey.length - 1 ? <div className="absolute -right-2 top-1/2 z-10 hidden size-4 rotate-45 border-r border-t border-[#c89b43]/40 bg-[#f3ecdf] xl:block" /> : null}</div>)}</div></div></section>

      <section className="bg-[#0a0a0a] py-24 text-white lg:py-28">
        <div className={`${shell} grid gap-8 xl:grid-cols-[.8fr_1.2fr]`}>
          <div><p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#d8ab4d]">Franchise enquiry</p><h2 className="mt-4 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.95] tracking-[-0.04em]">Tell us where you want to build.</h2><p className="mt-6 max-w-xl text-sm leading-7 text-white/48">Share your city, investment comfort and operating background. Commercials, territory, format and site feasibility can then be discussed in detail.</p><div className="mt-8 border border-[#d8ab4d]/25 bg-[#15120c] p-5"><MapPin className="size-5 text-[#d8ab4d]" /><p className="mt-3 text-sm leading-7 text-white/58">Primary expansion focus: Gurugram, Delhi, Noida and the wider Delhi NCR market.</p></div></div>

          <form onSubmit={handleSubmit} noValidate className="border border-white/10 bg-[#0d0d0d] p-5 sm:p-7 lg:p-9">
            <div className="grid gap-5 md:grid-cols-2"><CustomSelect label="Preferred City" value={form.city} options={cityOptions} icon={MapPin} onChange={(value) => update("city", value)} /><CustomSelect label="Investment Range" value={form.investment} options={investmentBands} icon={Building2} onChange={(value) => update("investment", value)} /><CustomSelect label="Your Background" value={form.experience} options={experienceOptions} icon={Users2} onChange={(value) => update("experience", value)} /><CustomSelect label="Site Status" value={form.site} options={siteOptions} icon={Store} onChange={(value) => update("site", value)} />
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} placeholder="Your name" autoComplete="name" className={fieldClass(errors.name)} /><ErrorText message={errors.name} /></label>
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Phone</span><input value={form.phone} onChange={(event) => update("phone", event.target.value.replace(/\D/g, "").slice(0, 10))} aria-invalid={Boolean(errors.phone)} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" className={fieldClass(errors.phone)} /><ErrorText message={errors.phone} /></label>
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Email</span><input value={form.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} placeholder="you@example.com" inputMode="email" autoComplete="email" className={fieldClass(errors.email)} /><ErrorText message={errors.email} /></label>
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Company / Business</span><input value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Optional" className={fieldClass(false)} /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Tell us about your plan</span><textarea value={form.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} rows={5} placeholder="Target area, site size, timeline, operating plan or anything else we should know..." className={textareaClass(errors.message)} /><ErrorText message={errors.message} /></label>
            </div>
            <button type="submit" disabled={submitting} className={`${buttonGold} mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}>{submitting ? "Submitting..." : "Submit Franchise Interest"}</button>
            {serverError ? <div className="mt-5 border border-red-400/25 bg-red-400/8 p-4 text-sm text-red-200" role="alert">{serverError}</div> : null}
            {successMessage ? <div className="mt-5 flex items-start gap-3 border border-[#d8ab4d]/30 bg-[#d8ab4d]/8 p-4" role="status"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#d8ab4d]" /><p className="text-sm leading-6 text-white/70">{successMessage}</p></div> : null}
          </form>
        </div>
      </section>
    </>
  );
}

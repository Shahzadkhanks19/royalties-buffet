import { Check, Clock3, Mail, MapPin, MessageSquareText, Phone, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import SafeImage from "../components/ui/SafeImage";
import { buttonGold, internalHero, internalHeroInner, shell } from "../config/site";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { locationItems } from "../data/locations";
import useApiSubmission from "../hooks/useApiSubmission";
import { apiRequest } from "../lib/api";
import { fieldClass, textareaClass, validateCommonLeadFields } from "../utils/validation";

const subjects = ["General Enquiry", "Reservation Help", "Catering", "Franchise", "Feedback", "Other"];
const fallbackOutlets = ["General / Delhi NCR", ...locationItems.map((location) => location.city)];

function createInitialForm(outlets = fallbackOutlets) {
  return { name: "", phone: "", email: "", subject: subjects[0], outlet: outlets[0], message: "" };
}

function ErrorText({ message }) {
  return message ? <span className="mt-2 block text-xs font-semibold text-red-300">{message}</span> : null;
}

export default function ContactPage() {
  const settings = useSiteSettings();
  const [outlets, setOutlets] = useState(fallbackOutlets);
  const [form, setForm] = useState(() => createInitialForm(fallbackOutlets));
  const [errors, setErrors] = useState({});
  const { submitting, serverError, successMessage, submit, clearSubmissionState } = useApiSubmission();

  useEffect(() => {
    let active = true;
    apiRequest("/api/locations")
      .then((result) => {
        if (!active || !Array.isArray(result?.items)) return;
        const nextOutlets = [`General / ${settings.regionLabel}`, ...result.items.map((location) => location.city)];
        setOutlets(nextOutlets);
        setForm((current) => nextOutlets.includes(current.outlet) ? current : { ...current, outlet: nextOutlets[0] });
      })
      .catch(() => {});
    return () => { active = false; };
  }, [settings.regionLabel]);

  const contactCards = useMemo(() => [
    [Phone, "Call Us", settings.phone || "—", "For reservations, outlet help and general enquiries."],
    [Mail, "Email Us", settings.email || "—", "For detailed enquiries, partnerships and business communication."],
    [MapPin, "Visit Us", settings.regionLabel || "Delhi NCR", "Explore our active Royalties Buffet locations."],
    [Clock3, "Opening Hours", settings.weekdayHours || "—", settings.weekendHours ? `Weekend: ${settings.weekendHours}` : "Weekend hours may vary by outlet."],
  ], [settings]);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    clearSubmissionState();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateCommonLeadFields({ ...form, requireMessage: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const result = await submit("/api/contact", form);
    if (result) {
      setForm(createInitialForm(outlets));
      setErrors({});
    }
  };

  return (
    <>
      <section className={internalHero}>
        <SafeImage src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2200&q=90" alt="Guests dining together at a restaurant" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.84)_42%,rgba(3,3,3,.28)_100%)]" />
        <div className={internalHeroInner}><div className="max-w-3xl"><p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Contact Royalties</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Let’s talk.<br /><span className="text-[#d8ab4d]">We’re listening.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Questions about dining, reservations, catering, franchise opportunities or anything else? Reach the Royalties team here.</p></div></div>
      </section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24"><div className={shell}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{contactCards.map(([Icon, title, value, copy]) => <article key={title} className="group border border-black/10 bg-[#fffaf2] p-6 shadow-[0_16px_36px_rgba(36,24,10,.08)] transition duration-500 hover:-translate-y-1 hover:border-[#c9983d]/55 hover:shadow-[0_24px_50px_rgba(36,24,10,.14)]"><div className="grid size-11 place-items-center border border-[#a97c29]/35 text-[#9d7328] transition group-hover:bg-[#17130e] group-hover:text-[#efcb73]"><Icon className="size-5" /></div><h2 className="mt-6 font-serif text-2xl text-[#17130e]">{title}</h2><p className="mt-2 break-words text-sm font-bold text-[#7b5b22]">{value}</p><p className="mt-3 text-sm leading-7 text-[#6c6254]">{copy}</p></article>)}</div></div></section>

      <section className="bg-[#090909] py-20 text-white lg:py-24">
        <div className={`${shell} grid gap-8 xl:grid-cols-[1.1fr_.9fr]`}>
          <form onSubmit={handleSubmit} noValidate className="border border-white/10 bg-[#0d0d0d] p-5 sm:p-7 lg:p-9">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6"><div><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Send a message</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">How can we help?</h2></div><MessageSquareText className="size-8 shrink-0 text-[#d8ab4d]" strokeWidth={1.5} /></div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} placeholder="Your name" autoComplete="name" className={fieldClass(errors.name)} /><span id="contact-name-error"><ErrorText message={errors.name} /></span></label>
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Phone</span><input value={form.phone} onChange={(event) => update("phone", event.target.value.replace(/\D/g, "").slice(0, 10))} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" className={fieldClass(errors.phone)} /><span id="contact-phone-error"><ErrorText message={errors.phone} /></span></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Email</span><input value={form.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} placeholder="you@example.com" inputMode="email" autoComplete="email" className={fieldClass(errors.email)} /><span id="contact-email-error"><ErrorText message={errors.email} /></span></label>
              <CustomSelect label="Subject" value={form.subject} options={subjects} icon={MessageSquareText} onChange={(value) => update("subject", value)} />
              <CustomSelect label="Outlet / Area" value={form.outlet} options={outlets} icon={MapPin} onChange={(value) => update("outlet", value)} />
              <label className="block md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Message</span><textarea value={form.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} rows={6} placeholder="Tell us how we can help..." className={textareaClass(errors.message)} /><span id="contact-message-error"><ErrorText message={errors.message} /></span></label>
            </div>
            <button type="submit" disabled={submitting} className={`${buttonGold} mt-7 w-full gap-3 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}>{submitting ? "Sending..." : "Send Message"} <Send className="size-4" /></button>
            {serverError ? <div className="mt-6 border border-red-400/25 bg-red-400/8 p-4 text-sm text-red-200" role="alert">{serverError}</div> : null}
            {successMessage ? <div className="mt-6 flex items-start gap-3 border border-[#d8ab4d]/30 bg-[#d8ab4d]/8 p-4" role="status"><Check className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><p className="text-sm leading-6 text-white/72">{successMessage}</p></div> : null}
          </form>

          <aside className="space-y-5"><div className="border border-[#d8ab4d]/25 bg-[#15120c] p-6 sm:p-7"><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">{settings.regionLabel} presence</p><h2 className="mt-3 font-serif text-3xl">Multiple destinations. One Royalties experience.</h2><p className="mt-4 text-sm leading-7 text-white/48">Use the Locations page for current outlet information, directions, timings and reservation options. This information is now managed centrally through the CMS.</p><div className="mt-6 flex flex-wrap gap-2">{outlets.slice(1).map((city) => <div key={city} className="border border-white/10 bg-black/20 px-3 py-4 text-center text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#e4bd63]">{city}</div>)}</div></div><div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-black"><SafeImage src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=88" alt="India Gate in New Delhi" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" /><div className="absolute inset-x-0 bottom-0 p-6"><p className="text-[0.58rem] font-black uppercase tracking-[0.15em] text-[#d8ab4d]">Reach us across {settings.regionLabel}</p><h3 className="mt-2 font-serif text-3xl">One brand. Multiple ways to connect.</h3></div></div></aside>
        </div>
      </section>
    </>
  );
}

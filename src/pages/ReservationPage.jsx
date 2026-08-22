import { CalendarDays, Check, Clock3, MapPin, PartyPopper, Phone, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import SafeImage from "../components/ui/SafeImage";
import { buttonGold, internalHero, internalHeroInner, shell } from "../config/site";
import { locationItems } from "../data/locations";
import useApiSubmission from "../hooks/useApiSubmission";
import { apiRequest } from "../lib/api";
import { fieldClass, textareaClass, validateCommonLeadFields } from "../utils/validation";

const fallbackOutlets = locationItems.map((location) => `Royalties Buffet - ${location.city}`);
const guests = ["2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7 Guests", "8 Guests", "9+ Guests"];
const occasions = ["Casual Dining", "Birthday", "Anniversary", "Family Celebration", "Corporate Dinner", "Other"];
const preferences = ["No Preference", "Mostly Vegetarian", "Mixed Veg & Non-Veg"];
const times = ["12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];

const dates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return {
    value: date.toISOString().slice(0, 10),
    day: date.toLocaleDateString("en-IN", { weekday: "short" }),
    number: date.getDate(),
    month: date.toLocaleDateString("en-IN", { month: "short" }),
  };
});

const createInitialForm = (outletOptions = fallbackOutlets) => ({
  outlet: outletOptions[0] || "",
  guestCount: "4 Guests",
  occasion: "Casual Dining",
  preference: "No Preference",
  date: dates[0].value,
  time: "8:00 PM",
  name: "",
  phone: "",
  email: "",
  requests: "",
});

function ErrorText({ message }) {
  return message ? <span className="mt-2 block text-xs font-semibold text-red-300">{message}</span> : null;
}

export default function ReservationPage() {
  const [outlets, setOutlets] = useState(fallbackOutlets);
  const [form, setForm] = useState(() => createInitialForm(fallbackOutlets));
  const [errors, setErrors] = useState({});
  const { submitting, serverError, successMessage, submit, clearSubmissionState } = useApiSubmission();

  useEffect(() => {
    let active = true;
    apiRequest("/api/locations")
      .then((result) => {
        if (!active || !Array.isArray(result?.items) || !result.items.length) return;
        const nextOutlets = result.items.map((location) => `Royalties Buffet - ${location.city}`);
        setOutlets(nextOutlets);
        setForm((current) => nextOutlets.includes(current.outlet) ? current : { ...current, outlet: nextOutlets[0] });
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const selectedDate = useMemo(() => dates.find((date) => date.value === form.date), [form.date]);
  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    clearSubmissionState();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateCommonLeadFields({ name: form.name, phone: form.phone, email: form.email });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const result = await submit("/api/reservations", form);
    if (result) {
      setForm(createInitialForm(outlets));
      setErrors({});
    }
  };

  return (
    <>
      <section className={internalHero}>
        <SafeImage src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90" alt="Premium restaurant table setting" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.96)_0%,rgba(3,3,3,.84)_42%,rgba(3,3,3,.3)_100%)]" />
        <div className={internalHeroInner}><div className="max-w-3xl"><p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Reservations</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.05em]">Your table.<br /><span className="text-[#d8ab4d]">Your occasion.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Plan your Royalties experience in a few simple steps and we’ll keep your table ready for the feast.</p></div></div>
      </section>

      <section className="bg-[#0a0a0a] py-20 text-white lg:py-24">
        <div className={`${shell} grid gap-8 xl:grid-cols-[1.15fr_.85fr]`}>
          <form onSubmit={handleSubmit} noValidate className="border border-white/10 bg-[#0d0d0d] p-5 sm:p-7 lg:p-9">
            <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6"><div><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Book your table</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">Choose the details</h2></div><CalendarDays className="size-8 shrink-0 text-[#d8ab4d]" strokeWidth={1.5} /></div>

            <div className="mt-7 grid gap-5 md:grid-cols-2"><CustomSelect label="Outlet" value={form.outlet} options={outlets} icon={MapPin} onChange={(value) => update("outlet", value)} /><CustomSelect label="Guests" value={form.guestCount} options={guests} icon={Users} onChange={(value) => update("guestCount", value)} /></div>

            <div className="mt-7"><span className="mb-3 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Select date</span><div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-4 sm:grid-cols-7">{dates.map((date) => { const active = form.date === date.value; return <button key={date.value} type="button" aria-pressed={active} onClick={() => update("date", date.value)} className={`min-h-24 border px-2 py-3 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ab4d] ${active ? "border-[#d8ab4d] bg-[#d8ab4d] text-black" : "border-white/10 bg-white/[0.02] text-white hover:border-[#d8ab4d]/45 hover:bg-[#d8ab4d]/5"}`}><span className="block text-[0.56rem] font-black uppercase tracking-[0.12em] opacity-60">{date.day}</span><strong className="mt-1 block font-serif text-2xl">{date.number}</strong><span className="text-[0.58rem] uppercase tracking-[0.1em] opacity-60">{date.month}</span></button>; })}</div></div>

            <div className="mt-7"><span className="mb-3 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Select time</span><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{times.map((time) => { const active = form.time === time; return <button key={time} type="button" aria-pressed={active} onClick={() => update("time", time)} className={`min-h-12 border px-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ab4d] ${active ? "border-[#d8ab4d] bg-[#d8ab4d]/12 text-[#efc86f]" : "border-white/10 bg-white/[0.02] text-white/66 hover:border-[#d8ab4d]/40 hover:text-white"}`}>{time}</button>; })}</div></div>

            <div className="mt-7 grid gap-5 md:grid-cols-2"><CustomSelect label="Occasion" value={form.occasion} options={occasions} icon={PartyPopper} onChange={(value) => update("occasion", value)} /><CustomSelect label="Dining Preference" value={form.preference} options={preferences} icon={Check} onChange={(value) => update("preference", value)} /></div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} placeholder="Your name" autoComplete="name" className={fieldClass(errors.name)} /><ErrorText message={errors.name} /></label>
              <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Phone</span><input value={form.phone} onChange={(event) => update("phone", event.target.value.replace(/\D/g, "").slice(0, 10))} aria-invalid={Boolean(errors.phone)} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" className={fieldClass(errors.phone)} /><ErrorText message={errors.phone} /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Email</span><input value={form.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} placeholder="you@example.com" inputMode="email" autoComplete="email" className={fieldClass(errors.email)} /><ErrorText message={errors.email} /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Special requests</span><textarea value={form.requests} onChange={(event) => update("requests", event.target.value)} placeholder="High chair, celebration note, accessibility needs, seating preference..." rows={4} className={textareaClass(false)} /></label>
            </div>

            <button type="submit" disabled={submitting || !form.outlet} className={`${buttonGold} mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}>{submitting ? "Submitting..." : "Confirm Reservation Request"}</button>
            {serverError ? <div className="mt-6 border border-red-400/25 bg-red-400/8 p-4 text-sm text-red-200" role="alert">{serverError}</div> : null}
            {successMessage ? <div className="mt-6 flex items-start gap-3 border border-[#d8ab4d]/30 bg-[#d8ab4d]/8 p-4" role="status"><Check className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><p className="text-sm leading-6 text-white/72">{successMessage}</p></div> : null}
          </form>

          <aside className="space-y-5"><div className="border border-[#d8ab4d]/25 bg-[#15120c] p-6 sm:p-7 xl:sticky xl:top-32"><p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Booking summary</p><h2 className="mt-3 font-serif text-3xl">Your Royalties table</h2><div className="mt-7 space-y-4 border-y border-white/10 py-6 text-sm"><div className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><span className="text-white/68">{form.outlet || "No active outlet"}</span></div><div className="flex items-start gap-3"><CalendarDays className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><span className="text-white/68">{selectedDate ? `${selectedDate.day}, ${selectedDate.number} ${selectedDate.month}` : "Select a date"}</span></div><div className="flex items-start gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><span className="text-white/68">{form.time}</span></div><div className="flex items-start gap-3"><Users className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><span className="text-white/68">{form.guestCount}</span></div><div className="flex items-start gap-3"><PartyPopper className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><span className="text-white/68">{form.occasion}</span></div></div><p className="mt-5 text-xs leading-6 text-white/38">Reservation requests are stored in the backend and outlet choices now follow the active Locations CMS records.</p><div className="mt-6 flex items-center gap-3 border border-white/10 bg-black/20 p-4"><Phone className="size-4 text-[#d8ab4d]" /><div><p className="text-[0.56rem] font-black uppercase tracking-[0.12em] text-white/38">Need help?</p><p className="mt-1 text-sm text-white/72">Contact the restaurant team</p></div></div></div></aside>
        </div>
      </section>
    </>
  );
}

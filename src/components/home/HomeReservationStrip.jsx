import { CalendarDays, Check, Clock3, Mail, MapPin, Phone, User, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "../ui/CustomSelect";
import { buttonGold, shell } from "../../config/site";
import { locationItems } from "../../data/locations";
import useApiSubmission from "../../hooks/useApiSubmission";
import { apiRequest } from "../../lib/api";
import { nextReservationDates } from "../../utils/reservationTime";
import { fieldClass, validateCommonLeadFields } from "../../utils/validation";

const fallbackOutlets = locationItems.map((location) => `Royalties Buffet - ${location.city}`);
const guestOptions = ["2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7 Guests", "8 Guests", "9+ Guests"];
const occasionOptions = ["Casual Dining", "Birthday", "Anniversary", "Family Celebration", "Corporate Dinner", "Other"];
const preferenceOptions = ["No Preference", "Mostly Vegetarian", "Mixed Veg & Non-Veg"];
const dateOptions = nextReservationDates(7);

export default function HomeReservationStrip() {
  const [outlets, setOutlets] = useState(fallbackOutlets);
  const [outlet, setOutlet] = useState(fallbackOutlets[0] || "");
  const [date, setDate] = useState(dateOptions[0]?.value || "");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2 Guests");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState({ name: "", phone: "", email: "", occasion: "Casual Dining", preference: "No Preference" });
  const [errors, setErrors] = useState({});
  const { submitting, serverError, successMessage, submit, clearSubmissionState } = useApiSubmission();

  useEffect(() => {
    let active = true;
    apiRequest("/api/locations").then((result) => {
      if (!active || !result?.items?.length) return;
      const next = result.items.map((item) => `Royalties Buffet - ${item.city}`);
      setOutlets(next);
      setOutlet((current) => next.includes(current) ? current : next[0]);
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!outlet || !date) return;
    let active = true;
    setLoading(true);
    setError("");
    apiRequest(`/api/reservation-availability?outlet=${encodeURIComponent(outlet)}&date=${encodeURIComponent(date)}`)
      .then((result) => {
        if (!active) return;
        setSlots(result.slots || []);
      })
      .catch((err) => {
        if (!active) return;
        setSlots([]);
        setError(err.message || "Unable to check availability.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [outlet, date]);

  const partySize = Number(guests.match(/\d+/)?.[0] || 9);
  const availableTimes = useMemo(
    () => slots.filter((slot) => slot.available && slot.remaining >= partySize).map((slot) => slot.time),
    [slots, partySize],
  );

  useEffect(() => {
    if (time && availableTimes.includes(time)) return;
    setTime(availableTimes[0] || "");
  }, [availableTimes, time]);

  useEffect(() => {
    if (!modalOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => { if (event.key === "Escape" && !submitting) setModalOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, submitting]);

  const openBooking = () => {
    clearSubmissionState();
    if (!outlet || !date || !time || !guests) {
      setError("Please choose an outlet, date, available time and party size.");
      return;
    }
    setError("");
    setErrors({});
    setModalOpen(true);
  };

  const updateDetail = (key, value) => {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    clearSubmissionState();
  };

  const completeBooking = async (event) => {
    event.preventDefault();
    const nextErrors = validateCommonLeadFields({ name: details.name, phone: details.phone, email: details.email });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const result = await submit("/api/reservations", {
      outlet,
      date,
      time,
      guestCount: guests,
      occasion: details.occasion,
      preference: details.preference,
      name: details.name,
      phone: details.phone,
      email: details.email,
      requests: "",
    });

    if (result) {
      setDetails({ name: "", phone: "", email: "", occasion: "Casual Dining", preference: "No Preference" });
      setErrors({});
    }
  };

  const closeModal = () => {
    if (submitting) return;
    setModalOpen(false);
    clearSubmissionState();
  };

  return (
    <>
      <section className="relative overflow-visible bg-[#0a0a0a] py-16 text-white lg:py-20">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=80" alt="Elegant dining table" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.96),rgba(5,5,5,.85),rgba(5,5,5,.92))]" />
        <div className={`${shell} relative z-10 grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end`}>
          <div>
            <p className="text-[0.64rem] font-black uppercase tracking-[0.24em] text-[#d8ab4d]">Reserve your experience</p>
            <h2 className="mt-3 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.95]">Book your table now.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/48">Choose an outlet, date, time and party size, then complete your reservation right here without leaving the homepage.</p>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <CustomSelect label="Outlet" value={outlet} placeholder="Select Outlet" options={outlets} icon={MapPin} onChange={setOutlet} />
              <CustomSelect label="Date" value={date} placeholder="Select Date" options={dateOptions.map((item) => item.value)} optionLabels={Object.fromEntries(dateOptions.map((item) => [item.value, item.label]))} icon={CalendarDays} onChange={setDate} />
              <CustomSelect label="Time" value={time} placeholder={loading ? "Checking..." : "Select Time"} options={availableTimes} icon={Clock3} onChange={setTime} />
              <CustomSelect label="Guests" value={guests} options={guestOptions} icon={Users} onChange={setGuests} />
              <button type="button" onClick={openBooking} disabled={loading || !availableTimes.length} className={`${buttonGold} self-end disabled:cursor-not-allowed disabled:opacity-45`}>{loading ? "Checking..." : "Book Now"}</button>
            </div>
            {!loading && slots.length && !availableTimes.length ? <p className="mt-3 text-xs text-[#efcb73]">No suitable slots are available for this party size on the selected date.</p> : null}
            {error ? <p className="mt-3 text-xs font-semibold text-red-300" role="alert">{error}</p> : null}
          </div>
        </div>
      </section>

      {modalOpen ? (
        <div className="fixed inset-0 z-[150] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="mx-auto my-8 w-full max-w-2xl border border-[#d8ab4d]/25 bg-[#0d0d0d] text-white shadow-[0_30px_90px_rgba(0,0,0,.55)]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:p-7">
              <div><p className="text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#d8ab4d]">Complete reservation</p><h3 className="mt-2 font-serif text-3xl sm:text-4xl">Your table is almost ready.</h3></div>
              <button type="button" onClick={closeModal} disabled={submitting} className="grid size-10 shrink-0 place-items-center border border-white/10 text-white/60 transition hover:border-[#d8ab4d]/40 hover:text-white" aria-label="Close booking"><X className="size-4" /></button>
            </div>

            <div className="grid gap-3 border-b border-white/10 bg-[#d8ab4d]/5 p-5 text-xs text-white/65 sm:grid-cols-2 sm:p-7">
              <p><span className="block text-[0.55rem] font-black uppercase tracking-[0.12em] text-[#d8ab4d]">Outlet</span><span className="mt-1 block">{outlet}</span></p>
              <p><span className="block text-[0.55rem] font-black uppercase tracking-[0.12em] text-[#d8ab4d]">Date & Time</span><span className="mt-1 block">{date} · {time}</span></p>
              <p><span className="block text-[0.55rem] font-black uppercase tracking-[0.12em] text-[#d8ab4d]">Party</span><span className="mt-1 block">{guests}</span></p>
            </div>

            <form onSubmit={completeBooking} noValidate className="p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label><span className="mb-2 flex items-center gap-2 text-[0.58rem] font-black uppercase tracking-[0.12em] text-white/45"><User className="size-3.5 text-[#d8ab4d]" />Name</span><input value={details.name} onChange={(event) => updateDetail("name", event.target.value)} placeholder="Your name" autoComplete="name" aria-invalid={Boolean(errors.name)} className={fieldClass(errors.name)} />{errors.name ? <span className="mt-2 block text-xs font-semibold text-red-300">{errors.name}</span> : null}</label>
                <label><span className="mb-2 flex items-center gap-2 text-[0.58rem] font-black uppercase tracking-[0.12em] text-white/45"><Phone className="size-3.5 text-[#d8ab4d]" />Phone</span><input value={details.phone} onChange={(event) => updateDetail("phone", event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" aria-invalid={Boolean(errors.phone)} className={fieldClass(errors.phone)} />{errors.phone ? <span className="mt-2 block text-xs font-semibold text-red-300">{errors.phone}</span> : null}</label>
                <label className="sm:col-span-2"><span className="mb-2 flex items-center gap-2 text-[0.58rem] font-black uppercase tracking-[0.12em] text-white/45"><Mail className="size-3.5 text-[#d8ab4d]" />Email <span className="font-medium normal-case tracking-normal text-white/25">optional</span></span><input value={details.email} onChange={(event) => updateDetail("email", event.target.value)} placeholder="you@example.com" inputMode="email" autoComplete="email" aria-invalid={Boolean(errors.email)} className={fieldClass(errors.email)} />{errors.email ? <span className="mt-2 block text-xs font-semibold text-red-300">{errors.email}</span> : null}</label>
                <CustomSelect label="Occasion" value={details.occasion} options={occasionOptions} onChange={(value) => updateDetail("occasion", value)} />
                <CustomSelect label="Dining Preference" value={details.preference} options={preferenceOptions} onChange={(value) => updateDetail("preference", value)} />
              </div>

              {serverError ? <div className="mt-5 border border-red-400/25 bg-red-400/8 p-4 text-sm text-red-200" role="alert">{serverError}</div> : null}
              {successMessage ? <div className="mt-5 flex items-start gap-3 border border-[#d8ab4d]/30 bg-[#d8ab4d]/8 p-4" role="status"><Check className="mt-0.5 size-4 shrink-0 text-[#d8ab4d]" /><p className="text-sm leading-6 text-white/72">{successMessage} We’ll update you once the restaurant team confirms it.</p></div> : null}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeModal} disabled={submitting} className="min-h-12 border border-white/10 px-5 text-xs font-black uppercase tracking-[0.1em] text-white/65 transition hover:border-white/25 hover:text-white disabled:opacity-40">{successMessage ? "Close" : "Cancel"}</button>
                {!successMessage ? <button type="submit" disabled={submitting} className={`${buttonGold} disabled:cursor-not-allowed disabled:opacity-55`}>{submitting ? "Booking..." : "Confirm Booking"}</button> : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

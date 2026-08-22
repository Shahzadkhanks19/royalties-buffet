import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../ui/CustomSelect";
import { buttonGold, shell } from "../../config/site";
import { locationItems } from "../../data/locations";
import { apiRequest } from "../../lib/api";
import { nextReservationDates } from "../../utils/reservationTime";

const fallbackOutlets = locationItems.map((location) => `Royalties Buffet - ${location.city}`);
const guestOptions = ["2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7 Guests", "8 Guests", "9+ Guests"];
const dateOptions = nextReservationDates(7);

export default function HomeReservationStrip() {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState(fallbackOutlets);
  const [outlet, setOutlet] = useState(fallbackOutlets[0] || "");
  const [date, setDate] = useState(dateOptions[0]?.value || "");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2 Guests");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const book = () => {
    if (!outlet || !date || !time || !guests) {
      setError("Please choose an outlet, date, available time and party size.");
      return;
    }
    const query = new URLSearchParams({ outlet, date, time, guests });
    navigate(`/reservation?${query.toString()}`);
  };

  return (
    <section className="relative overflow-visible bg-[#0a0a0a] py-16 text-white lg:py-20">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=80" alt="Elegant dining table" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.96),rgba(5,5,5,.85),rgba(5,5,5,.92))]" />
      <div className={`${shell} relative z-10 grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end`}>
        <div>
          <p className="text-[0.64rem] font-black uppercase tracking-[0.24em] text-[#d8ab4d]">Reserve your experience</p>
          <h2 className="mt-3 font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.95]">Book your table now.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/48">Check live availability here, then continue with your contact details on the reservation page.</p>
        </div>
        <div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <CustomSelect label="Outlet" value={outlet} placeholder="Select Outlet" options={outlets} icon={MapPin} onChange={setOutlet} />
            <CustomSelect label="Date" value={date} placeholder="Select Date" options={dateOptions.map((item) => item.value)} optionLabels={Object.fromEntries(dateOptions.map((item) => [item.value, item.label]))} icon={CalendarDays} onChange={setDate} />
            <CustomSelect label="Time" value={time} placeholder={loading ? "Checking..." : "Select Time"} options={availableTimes} icon={Clock3} onChange={setTime} />
            <CustomSelect label="Guests" value={guests} options={guestOptions} icon={Users} onChange={setGuests} />
            <button type="button" onClick={book} disabled={loading || !availableTimes.length} className={`${buttonGold} self-end disabled:cursor-not-allowed disabled:opacity-45`}>{loading ? "Checking..." : "Book Now"}</button>
          </div>
          {!loading && slots.length && !availableTimes.length ? <p className="mt-3 text-xs text-[#efcb73]">No suitable slots are available for this party size on the selected date.</p> : null}
          {error ? <p className="mt-3 text-xs font-semibold text-red-300" role="alert">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}

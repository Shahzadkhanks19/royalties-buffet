import { Ban, CalendarDays, Check, Save } from "lucide-react";
import { useEffect, useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import { apiRequest, postJson, putJson } from "../lib/api";

const today = new Date().toISOString().slice(0, 10);

export default function AdminAvailabilityPage() {
  const [outlets, setOutlets] = useState([]);
  const [times, setTimes] = useState([]);
  const [outlet, setOutlet] = useState("");
  const [date, setDate] = useState(today);
  const [rules, setRules] = useState({});
  const [usage, setUsage] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async (nextOutlet = outlet, nextDate = date) => {
    try {
      const result = await apiRequest(`/api/admin/availability?date=${encodeURIComponent(nextDate)}${nextOutlet ? `&outlet=${encodeURIComponent(nextOutlet)}` : ""}`);
      setOutlets(result.outlets || []);
      setTimes(result.times || []);
      const chosen = nextOutlet || result.outlets?.[0] || "";
      if (!nextOutlet && chosen) setOutlet(chosen);
      const map = {};
      for (const item of result.items || []) if (!chosen || item.outlet === chosen) map[item.time] = item;
      setRules(map);
      if (chosen) {
        const used = await apiRequest(`/api/admin/availability/usage?outlet=${encodeURIComponent(chosen)}&date=${encodeURIComponent(nextDate)}`);
        setUsage(used.usage || {});
      }
    } catch (err) { setError(err.message || "Unable to load availability."); }
  };

  useEffect(() => { load("", date); }, []);
  useEffect(() => { if (outlet) load(outlet, date); }, [outlet, date]);

  const editRule = (time, key, value) => setRules((current) => ({ ...current, [time]: { outlet, date, time, capacity: 40, isBlocked: false, note: "", ...(current[time] || {}), [key]: value } }));

  const save = async (time) => {
    setError(""); setMessage("");
    try {
      const rule = { outlet, date, time, capacity: Number(rules[time]?.capacity || 40), isBlocked: Boolean(rules[time]?.isBlocked), note: rules[time]?.note || "" };
      await putJson("/api/admin/availability", rule);
      setMessage(`${time} availability saved.`);
      await load(outlet, date);
    } catch (err) { setError(err.message || "Unable to save availability."); }
  };

  const blockDay = async (isBlocked) => {
    setError(""); setMessage("");
    try {
      await postJson("/api/admin/availability/block-date", { outlet, date, isBlocked, capacity: 40, note: isBlocked ? "Date blocked by admin" : "" });
      setMessage(isBlocked ? "All slots blocked for this date." : "All slots reopened for this date.");
      await load(outlet, date);
    } catch (err) { setError(err.message || "Unable to update date."); }
  };

  return <section>
    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">Reservations</p>
    <h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">Availability Manager</h1>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c6254]">Control outlet-wise capacity and sold-out slots. Pending and confirmed reservations both consume capacity so the public booking page cannot overbook a configured slot.</p>

    <div className="mt-8 grid gap-4 border border-black/10 bg-[#fffaf2] p-5 md:grid-cols-[1fr_220px_auto] md:items-end">
      <CustomSelect label="Outlet" value={outlet} options={outlets} onChange={setOutlet} />
      <label><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/45">Date</span><input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} className="min-h-12 w-full border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#b88731]" /></label>
      <div className="flex gap-2"><button type="button" onClick={() => blockDay(true)} className="inline-flex min-h-12 items-center gap-2 border border-red-700/20 px-4 text-xs font-black uppercase text-red-700"><Ban className="size-4" />Block day</button><button type="button" onClick={() => blockDay(false)} className="inline-flex min-h-12 items-center gap-2 bg-[#17130e] px-4 text-xs font-black uppercase text-[#efcb73]"><Check className="size-4" />Open day</button></div>
    </div>

    {error ? <div className="mt-5 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}
    {message ? <div className="mt-5 border border-emerald-700/20 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div> : null}

    <div className="mt-6 overflow-x-auto border border-black/10 bg-[#fffaf2]">
      <table className="w-full min-w-[820px] border-collapse text-left"><thead className="bg-[#17130e] text-[#efcb73]"><tr>{["Time","Booked","Capacity","Remaining","Status","Admin note",""].map((label) => <th key={label} className="px-4 py-4 text-[0.58rem] font-black uppercase tracking-[0.12em]">{label}</th>)}</tr></thead><tbody>{times.map((time) => { const rule = rules[time] || {}; const capacity = Number(rule.capacity || 40); const used = Number(usage[time] || 0); const remaining = Math.max(0, capacity - used); return <tr key={time} className="border-t border-black/10"><td className="px-4 py-4 font-bold">{time}</td><td className="px-4 py-4">{used}</td><td className="px-4 py-3"><input type="number" min="1" max="1000" value={capacity} onChange={(event) => editRule(time, "capacity", Number(event.target.value))} className="h-10 w-24 border border-black/10 bg-white px-3" /></td><td className="px-4 py-4 font-bold">{remaining}</td><td className="px-4 py-3"><button type="button" aria-pressed={Boolean(rule.isBlocked)} onClick={() => editRule(time, "isBlocked", !rule.isBlocked)} className={`min-h-10 px-3 text-[0.6rem] font-black uppercase ${rule.isBlocked ? "bg-red-700 text-white" : "bg-emerald-700 text-white"}`}>{rule.isBlocked ? "Blocked" : remaining ? "Open" : "Full"}</button></td><td className="px-4 py-3"><input value={rule.note || ""} onChange={(event) => editRule(time, "note", event.target.value)} placeholder="Optional note" className="h-10 w-full min-w-48 border border-black/10 bg-white px-3 text-sm" /></td><td className="px-4 py-3"><button type="button" onClick={() => save(time)} className="grid size-10 place-items-center bg-[#17130e] text-[#efcb73]" aria-label={`Save ${time}`}><Save className="size-4" /></button></td></tr>; })}</tbody></table>
    </div>
    <div className="mt-5 flex items-start gap-3 text-xs leading-6 text-[#6c6254]"><CalendarDays className="mt-1 size-4 shrink-0 text-[#956c25]" /><p>Slots without a custom rule use the default capacity of 40 guests. Saving a row creates an explicit rule for that outlet/date/time.</p></div>
  </section>;
}

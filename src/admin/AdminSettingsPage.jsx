import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest, putJson } from "../lib/api";

const fields = [
  ["businessName", "Business Name"],
  ["regionLabel", "Region Label"],
  ["phone", "Primary Phone"],
  ["email", "Primary Email"],
  ["weekdayHours", "Weekday Hours"],
  ["weekendHours", "Weekend Hours"],
  ["openingNote", "Opening Note"],
  ["instagramUrl", "Instagram URL"],
  ["facebookUrl", "Facebook URL"],
  ["youtubeUrl", "YouTube URL"],
];

export default function AdminSettingsPage() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/api/admin/settings")
      .then((result) => setForm(result.settings || {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const result = await putJson("/api/admin/settings", form);
      setForm(result.settings || form);
      setMessage("Site settings saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-sm text-black/45">Loading settings…</div>;

  return (
    <section>
      <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">Configuration</p>
      <h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">Site Settings</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c6254]">Manage the shared business information used across the header, footer and public site. Technical secrets such as API keys remain in environment variables and are never exposed here.</p>

      <form onSubmit={submit} className="mt-8 border border-black/10 bg-[#fffaf2] p-5 shadow-[0_18px_40px_rgba(36,24,10,.08)] sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map(([key, label]) => (
            <label key={key} className={key.includes("Url") ? "md:col-span-2" : ""}>
              <span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/45">{label}</span>
              <input value={form[key] || ""} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} className="min-h-12 w-full border border-black/10 bg-white px-4 text-sm text-[#30291f] outline-none transition focus:border-[#b88731]" />
            </label>
          ))}
        </div>
        {error ? <div className="mt-5 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}
        {message ? <div className="mt-5 border border-emerald-700/20 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div> : null}
        <button disabled={saving} type="submit" className="mt-6 inline-flex min-h-12 items-center gap-3 bg-[#17130e] px-6 text-xs font-black uppercase tracking-[0.12em] text-[#efcb73] transition hover:bg-black disabled:opacity-50"><Save className="size-4" />{saving ? "Saving…" : "Save Settings"}</button>
      </form>
    </section>
  );
}

import { MapPin, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest, deleteJson, postJson, putJson } from "../lib/api";

const emptyLocation = {
  city: "",
  region: "Delhi NCR",
  area: "",
  address: "",
  phone: "",
  email: "",
  lunchHours: "12:00 PM – 4:00 PM",
  dinnerHours: "7:00 PM – 11:00 PM",
  mapUrl: "",
  image: "",
  description: "",
  services: [],
  sortOrder: 0,
  isActive: true,
};

export default function AdminLocationsPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [serviceText, setServiceText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    try {
      const result = await apiRequest("/api/admin/locations");
      setItems(result.items || []);
    } catch (err) {
      setError(err.message || "Unable to load locations.");
    }
  };

  useEffect(() => { load(); }, []);

  const openEditor = (item = emptyLocation) => {
    setEditing({ ...item, services: [...(item.services || [])] });
    setServiceText((item.services || []).join(", "));
    setError("");
  };

  const save = async (event) => {
    event.preventDefault();
    if (!editing || saving) return;
    setSaving(true);
    setError("");
    const payload = { ...editing, services: serviceText.split(",").map((value) => value.trim()).filter(Boolean) };
    try {
      if (editing._id) await putJson(`/api/admin/locations/${editing._id}`, payload);
      else await postJson("/api/admin/locations", payload);
      await load();
      setEditing(null);
    } catch (err) {
      setError(err.message || "Unable to save location.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleteTarget || saving) return;
    setSaving(true);
    try {
      await deleteJson(`/api/admin/locations/${deleteTarget._id}`);
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setError(err.message || "Unable to delete location.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">CMS</p><h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">Locations Manager</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-[#6c6254]">Manage public outlets, timings, contact details, maps, services and visibility.</p></div>
        <button type="button" onClick={() => openEditor()} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17130e] px-5 text-xs font-black uppercase tracking-[0.12em] text-[#efcb73]"><Plus className="size-4" />Add Location</button>
      </div>

      {error ? <div className="mt-5 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => <button key={item._id} type="button" onClick={() => openEditor(item)} className="overflow-hidden border border-black/10 bg-[#fffaf2] text-left shadow-[0_14px_35px_rgba(36,24,10,.08)] transition hover:-translate-y-1 hover:border-[#b98832]/40"><img src={item.image} alt="" className="h-44 w-full object-cover" /><div className="p-5"><div className="flex items-center justify-between gap-3"><h2 className="font-serif text-2xl text-[#17130e]">{item.city}</h2><span className={`text-[0.58rem] font-black uppercase tracking-[0.1em] ${item.isActive ? "text-emerald-700" : "text-black/35"}`}>{item.isActive ? "Active" : "Hidden"}</span></div><p className="mt-2 text-sm text-[#6c6254]">{item.region}</p><p className="mt-3 text-xs leading-5 text-black/45">{item.area}</p></div></button>)}
      </div>

      {editing ? <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/75 p-4" onClick={() => setEditing(null)}><form onSubmit={save} onClick={(event) => event.stopPropagation()} className="mx-auto my-8 max-w-4xl bg-[#fffaf2] shadow-2xl"><div className="flex items-center justify-between border-b border-black/10 p-5"><div><p className="text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#956c25]">Location CMS</p><h2 className="mt-1 font-serif text-3xl text-[#17130e]">{editing._id ? `Edit ${editing.city}` : "Add Location"}</h2></div><button type="button" onClick={() => setEditing(null)} className="grid size-10 place-items-center border border-black/10"><X className="size-4" /></button></div>
        <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
          {[["city","City"],["region","Region"],["area","Area / Catchment"],["address","Exact Address"],["phone","Phone"],["email","Email"],["lunchHours","Lunch Hours"],["dinnerHours","Dinner Hours"],["mapUrl","Google Maps URL"],["image","Image URL"]].map(([key,label]) => <label key={key} className={key === "mapUrl" || key === "image" ? "md:col-span-2" : ""}><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/45">{label}</span><input value={editing[key] || ""} onChange={(event) => setEditing((current) => ({ ...current, [key]: event.target.value }))} className="min-h-12 w-full border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#b88731]" /></label>)}
          <label className="md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/45">Description</span><textarea rows={4} value={editing.description || ""} onChange={(event) => setEditing((current) => ({ ...current, description: event.target.value }))} className="w-full resize-none border border-black/10 bg-white p-4 text-sm leading-6 outline-none focus:border-[#b88731]" /></label>
          <label className="md:col-span-2"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/45">Services (comma separated)</span><input value={serviceText} onChange={(event) => setServiceText(event.target.value)} className="min-h-12 w-full border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#b88731]" /></label>
          <label><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/45">Sort Order</span><input type="number" value={editing.sortOrder ?? 0} onChange={(event) => setEditing((current) => ({ ...current, sortOrder: Number(event.target.value) }))} className="min-h-12 w-full border border-black/10 bg-white px-4 text-sm outline-none" /></label>
          <label className="flex min-h-12 items-center gap-3 self-end border border-black/10 bg-white px-4"><button type="button" aria-pressed={editing.isActive} onClick={() => setEditing((current) => ({ ...current, isActive: !current.isActive }))} className={`relative h-6 w-11 rounded-full transition ${editing.isActive ? "bg-[#b88731]" : "bg-black/20"}`}><span className={`absolute top-1 size-4 rounded-full bg-white transition ${editing.isActive ? "left-6" : "left-1"}`} /></button><span className="text-sm font-bold text-[#4f4538]">Visible on public site</span></label>
        </div>
        <div className="flex flex-col gap-3 border-t border-black/10 p-5 sm:flex-row sm:justify-between sm:p-6">{editing._id ? <button type="button" onClick={() => setDeleteTarget(editing)} className="inline-flex min-h-11 items-center justify-center gap-2 border border-red-700/20 px-4 text-xs font-black uppercase tracking-[0.1em] text-red-700"><Trash2 className="size-4" />Delete</button> : <span />}<button disabled={saving} type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17130e] px-5 text-xs font-black uppercase tracking-[0.1em] text-[#efcb73] disabled:opacity-50"><Save className="size-4" />{saving ? "Saving…" : "Save Location"}</button></div>
      </form></div> : null}

      {deleteTarget ? <div className="fixed inset-0 z-[140] grid place-items-center bg-black/75 p-4"><div className="w-full max-w-md bg-[#fffaf2] p-6 shadow-2xl"><MapPin className="size-7 text-red-700" /><h2 className="mt-5 font-serif text-3xl text-[#17130e]">Delete {deleteTarget.city}?</h2><p className="mt-3 text-sm leading-7 text-[#6c6254]">This permanently removes the outlet from the CMS. Hiding it is safer if the outlet may return later.</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="min-h-11 flex-1 border border-black/10 px-4 text-xs font-black uppercase">Cancel</button><button type="button" onClick={remove} className="min-h-11 flex-1 bg-red-700 px-4 text-xs font-black uppercase text-white">Delete</button></div></div></div> : null}
    </section>
  );
}

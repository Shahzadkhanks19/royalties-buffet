import { Archive, ArchiveRestore, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiRequest, deleteJson, patchJson } from "../lib/api";

const config = {
  reservations: { title: "Reservations", subtitle: "Manage table requests and booking status." },
  contacts: { title: "Contact Enquiries", subtitle: "Review and resolve messages from the public contact form." },
  catering: { title: "Catering Leads", subtitle: "Track event enquiries from first contact to outcome." },
  franchise: { title: "Franchise Leads", subtitle: "Manage partnership enquiries and qualification progress." },
};

function itemSummary(kind, item) {
  if (kind === "reservations") return `${item.outlet} · ${item.date} · ${item.time} · ${item.guestCount}`;
  if (kind === "contacts") return `${item.subject} · ${item.outlet}`;
  if (kind === "catering") return `${item.event} · ${item.guests} · ${item.area}`;
  return `${item.city} · ${item.investment} · ${item.experience}`;
}

function detailRows(kind, item) {
  const common = [["Name", item.name], ["Phone", item.phone], ["Email", item.email || "—"]];
  if (kind === "reservations") return [...common, ["Outlet", item.outlet], ["Guests", item.guestCount], ["Date", item.date], ["Time", item.time], ["Occasion", item.occasion], ["Preference", item.preference], ["Requests", item.requests || "—"]];
  if (kind === "contacts") return [...common, ["Subject", item.subject], ["Outlet / Area", item.outlet], ["Message", item.message]];
  if (kind === "catering") return [...common, ["Event", item.event], ["Guests", item.guests], ["Area", item.area], ["Service", item.service], ["Venue", item.venue || "—"], ["Event Notes", item.notes || "—"]];
  return [...common, ["City", item.city], ["Investment", item.investment], ["Background", item.experience], ["Site", item.site], ["Company", item.company || "—"], ["Plan", item.message || "—"]];
}

export default function AdminLeadManager({ kind }) {
  const meta = config[kind];
  const [items, setItems] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [archiveFilter, setArchiveFilter] = useState("active");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setError("");
      const result = await apiRequest(`/api/admin/${kind}`);
      setItems(result.items || []);
      setStatuses(result.statuses || []);
    } catch (err) {
      setError(err.message || "Unable to load records.");
    }
  };

  useEffect(() => { load(); }, [kind]);

  const filtered = useMemo(() => items.filter((item) => {
    const text = JSON.stringify(item).toLowerCase();
    const matchesSearch = !search || text.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesArchive = archiveFilter === "all" || (archiveFilter === "archived" ? item.isArchived : !item.isArchived);
    return matchesSearch && matchesStatus && matchesArchive;
  }), [items, search, statusFilter, archiveFilter]);

  const updateSelected = async (changes) => {
    if (!selected || saving) return;
    setSaving(true);
    try {
      const result = await patchJson(`/api/admin/${kind}/${selected._id}`, changes);
      setItems((current) => current.map((item) => item._id === result.item._id ? result.item : item));
      setSelected(result.item);
    } catch (err) {
      setError(err.message || "Unable to update record.");
    } finally {
      setSaving(false);
    }
  };

  const removeSelected = async () => {
    if (!selected || saving) return;
    setSaving(true);
    try {
      await deleteJson(`/api/admin/${kind}/${selected._id}`);
      setItems((current) => current.filter((item) => item._id !== selected._id));
      setSelected(null);
    } catch (err) {
      setError(err.message || "Unable to delete record.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">Operations</p>
      <h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">{meta.title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6c6254]">{meta.subtitle}</p>

      <div className="mt-7 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <label className="flex min-h-11 items-center gap-3 border border-black/10 bg-[#fffaf2] px-4"><Search className="size-4 text-[#8b682b]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, phone, email, city, date..." className="w-full bg-transparent text-sm outline-none" /></label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-h-11 border border-black/10 bg-[#fffaf2] px-4 text-sm font-bold text-[#4f4538] outline-none"><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select>
        <select value={archiveFilter} onChange={(event) => setArchiveFilter(event.target.value)} className="min-h-11 border border-black/10 bg-[#fffaf2] px-4 text-sm font-bold text-[#4f4538] outline-none"><option value="active">Active</option><option value="archived">Archived</option><option value="all">All</option></select>
      </div>

      {error ? <div className="mt-5 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}

      <div className="mt-6 overflow-hidden border border-black/10 bg-[#fffaf2]">
        {filtered.length ? filtered.map((item) => (
          <button key={item._id} type="button" onClick={() => setSelected(item)} className="grid w-full gap-2 border-b border-black/8 px-4 py-4 text-left transition last:border-0 hover:bg-[#f7eddc] sm:grid-cols-[1fr_auto] sm:items-center sm:px-5">
            <div><div className="flex flex-wrap items-center gap-2"><strong className="text-sm text-[#17130e]">{item.name}</strong><span className="border border-[#a77a2b]/25 bg-[#d8ab4d]/10 px-2 py-1 text-[0.58rem] font-black uppercase tracking-[0.1em] text-[#805c20]">{item.status}</span>{item.isArchived ? <span className="text-[0.58rem] font-black uppercase tracking-[0.1em] text-black/40">Archived</span> : null}</div><p className="mt-2 text-sm text-[#6c6254]">{itemSummary(kind, item)}</p></div>
            <span className="text-xs text-black/40">{new Date(item.createdAt).toLocaleString("en-IN")}</span>
          </button>
        )) : <div className="p-10 text-center text-sm text-black/45">No matching records.</div>}
      </div>

      {selected ? <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4" onClick={() => setSelected(null)}><div className="mx-auto my-8 max-w-3xl bg-[#fffaf2] shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-5 border-b border-black/10 p-5 sm:p-6"><div><p className="text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#956c25]">Record details</p><h2 className="mt-1 font-serif text-3xl text-[#17130e]">{selected.name}</h2></div><button type="button" onClick={() => setSelected(null)} className="border border-black/10 px-3 py-2 text-xs font-black uppercase">Close</button></div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">{detailRows(kind, selected).map(([label, value]) => <div key={label} className={label === "Message" || label === "Requests" || label === "Event Notes" || label === "Plan" ? "sm:col-span-2" : ""}><p className="text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/40">{label}</p><p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-[#4f4538]">{value}</p></div>)}</div>
        <div className="border-t border-black/10 p-5 sm:p-6"><div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/40">Status</span><select value={selected.status} onChange={(event) => updateSelected({ status: event.target.value })} disabled={saving} className="min-h-11 w-full border border-black/10 bg-white px-3 text-sm font-bold outline-none">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label><div className="flex items-end"><button type="button" disabled={saving} onClick={() => updateSelected({ isArchived: !selected.isArchived })} className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-black/10 px-4 text-xs font-black uppercase tracking-[0.1em] transition hover:bg-black/5">{selected.isArchived ? <ArchiveRestore className="size-4" /> : <Archive className="size-4" />}{selected.isArchived ? "Restore" : "Archive"}</button></div></div>
          <label className="mt-4 block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/40">Internal Notes</span><textarea value={selected.adminNotes || ""} onChange={(event) => setSelected((current) => ({ ...current, adminNotes: event.target.value }))} rows={5} className="w-full resize-none border border-black/10 bg-white p-3 text-sm leading-6 outline-none focus:border-[#b88731]" /></label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between"><button type="button" disabled={saving} onClick={removeSelected} className="inline-flex min-h-11 items-center justify-center gap-2 border border-red-700/20 px-4 text-xs font-black uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-50"><Trash2 className="size-4" />Delete Permanently</button><button type="button" disabled={saving} onClick={() => updateSelected({ adminNotes: selected.adminNotes || "" })} className="min-h-11 bg-[#17130e] px-5 text-xs font-black uppercase tracking-[0.1em] text-[#efcb73] disabled:opacity-50">{saving ? "Saving..." : "Save Notes"}</button></div>
        </div>
      </div></div> : null}
    </section>
  );
}

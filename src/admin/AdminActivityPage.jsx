import { Activity, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api";
import AdminSelect from "./AdminSelect";

export default function AdminActivityPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [resource, setResource] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest("/api/admin/activity?limit=200")
      .then((result) => { if (active) setItems(result.items || []); })
      .catch((err) => { if (active) setError(err.message || "Unable to load activity."); });
    return () => { active = false; };
  }, []);

  const resources = useMemo(() => ["all", ...Array.from(new Set(items.map((item) => item.resource))).sort()], [items]);
  const filtered = useMemo(() => items.filter((item) => {
    const matchesResource = resource === "all" || item.resource === resource;
    const text = `${item.action} ${item.resource} ${item.summary} ${item.path} ${item.actorEmail}`.toLowerCase();
    return matchesResource && (!search || text.includes(search.toLowerCase()));
  }), [items, search, resource]);

  return <section>
    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">Security & Operations</p>
    <h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">Activity log</h1>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c6254]">A chronological audit trail of successful protected admin changes across reservations, CMS content, settings, locations and availability.</p>

    <div className="mt-7 grid gap-3 lg:grid-cols-[1fr_220px]">
      <label className="flex min-h-11 items-center gap-3 border border-black/10 bg-[#fffaf2] px-4"><Search className="size-4 text-[#8b682b]"/><input value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Search activity, resource, path or admin..." className="w-full bg-transparent text-sm outline-none"/></label>
      <AdminSelect value={resource} options={resources} onChange={setResource}/>
    </div>

    {error ? <div className="mt-5 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}

    <div className="mt-6 overflow-hidden border border-black/10 bg-[#fffaf2]">
      {filtered.length ? filtered.map((item) => <article key={item._id} className="grid gap-4 border-b border-black/8 p-5 last:border-0 md:grid-cols-[auto_1fr_auto] md:items-start">
        <div className="grid size-10 place-items-center bg-[#17130e] text-[#d8ab4d]"><Activity className="size-4"/></div>
        <div><div className="flex flex-wrap items-center gap-2"><strong className="text-sm capitalize text-[#17130e]">{item.action} {item.resource}</strong><span className="border border-black/10 px-2 py-1 text-[0.55rem] font-black uppercase tracking-[0.08em] text-black/40">{item.method}</span></div><p className="mt-2 break-all text-sm leading-6 text-[#6c6254]">{item.summary || item.path}</p><p className="mt-2 text-[0.62rem] text-black/35">{item.actorEmail || "Admin"}</p></div>
        <time className="text-xs text-black/40">{new Date(item.createdAt).toLocaleString("en-IN")}</time>
      </article>) : <div className="p-10 text-center text-sm text-black/45">No matching activity.</div>}
    </div>
  </section>;
}

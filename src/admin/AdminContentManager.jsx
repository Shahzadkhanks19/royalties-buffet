import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SafeImage from "../components/ui/SafeImage";
import { apiRequest, deleteJson, postJson, putJson } from "../lib/api";

const menuInitial = { title: "", category: "", type: "veg", protein: "", copy: "", image: "", sortOrder: 0, isActive: true };
const galleryInitial = { title: "", category: "", size: "standard", image: "", sortOrder: 0, isActive: true };

function Field({ label, children }) {
  return <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.13em] text-[#80622d]">{label}</span>{children}</label>;
}

const inputClass = "min-h-11 w-full border border-black/15 bg-white px-3 text-sm text-[#1c1710] outline-none transition placeholder:text-black/30 focus:border-[#a7792d]";

function Segments({ value, options, onChange }) {
  return <div className="flex flex-wrap gap-2">{options.map((option) => <button key={option} type="button" onClick={() => onChange(option)} className={`min-h-10 border px-3 text-xs font-black uppercase tracking-[0.08em] transition ${value === option ? "border-[#17130e] bg-[#17130e] text-[#e9c66d]" : "border-black/15 bg-white text-[#6f5a35] hover:border-[#a7792d]"}`}>{option}</button>)}</div>;
}

export default function AdminContentManager({ kind }) {
  const isMenu = kind === "menu";
  const label = isMenu ? "Menu" : "Gallery";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editor, setEditor] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiRequest(`/api/admin/${kind}`);
      setItems(result.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [kind]);

  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);

  const openNew = () => setEditor({ mode: "create", form: { ...(isMenu ? menuInitial : galleryInitial), sortOrder: items.length } });
  const openEdit = (item) => setEditor({ mode: "edit", id: item._id, form: { ...item } });
  const update = (key, value) => setEditor((current) => ({ ...current, form: { ...current.form, [key]: value } }));

  const save = async (event) => {
    event.preventDefault();
    if (!editor || saving) return;
    setSaving(true);
    setError("");
    try {
      if (editor.mode === "create") await postJson(`/api/admin/${kind}`, editor.form);
      else await putJson(`/api/admin/${kind}/${editor.id}`, editor.form);
      setEditor(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleteTarget || saving) return;
    setSaving(true);
    setError("");
    try {
      await deleteJson(`/api/admin/${kind}/${deleteTarget._id}`);
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">CMS</p><h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">{label} Manager</h1><p className="mt-3 text-sm text-[#6c6254]">{items.length} records · current public content remains editable here.</p></div><button type="button" onClick={openNew} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17130e] px-5 text-xs font-black uppercase tracking-[0.12em] text-[#efcb73] transition hover:bg-black"><Plus className="size-4" />Add {isMenu ? "Item" : "Photo"}</button></div>
      {categories.length ? <div className="mt-5 flex flex-wrap gap-2">{categories.map((category) => <span key={category} className="border border-[#9e7938]/20 bg-[#fffaf2] px-3 py-2 text-[0.58rem] font-black uppercase tracking-[0.1em] text-[#7d612e]">{category}</span>)}</div> : null}
      {error ? <div role="alert" className="mt-6 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? Array.from({ length: 6 }, (_, i) => <div key={i} className="h-72 animate-pulse border border-black/10 bg-[#fffaf2]" />) : items.map((item) => (
          <article key={item._id} className="overflow-hidden border border-black/10 bg-[#fffaf2] shadow-[0_14px_35px_rgba(36,24,10,.07)]">
            <div className="relative h-44 bg-black"><SafeImage src={item.image} alt={item.title} className="h-full w-full object-cover" /><span className={`absolute right-3 top-3 px-2 py-1 text-[0.55rem] font-black uppercase tracking-[0.1em] ${item.isActive ? "bg-emerald-700 text-white" : "bg-black/75 text-white/70"}`}>{item.isActive ? "Active" : "Hidden"}</span></div>
            <div className="p-5"><p className="text-[0.58rem] font-black uppercase tracking-[0.12em] text-[#9a722c]">{item.category}</p><h2 className="mt-2 font-serif text-2xl text-[#17130e]">{item.title}</h2>{isMenu ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6c6254]">{item.copy}</p> : <p className="mt-2 text-sm text-[#6c6254]">Layout: {item.size}</p>}<div className="mt-5 flex gap-2"><button type="button" onClick={() => openEdit(item)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 border border-black/15 text-xs font-black uppercase tracking-[0.09em] text-[#4d402b] transition hover:border-[#a7792d]"><Pencil className="size-3.5" />Edit</button><button type="button" onClick={() => setDeleteTarget(item)} className="grid size-10 place-items-center border border-red-800/20 text-red-700 transition hover:bg-red-50" aria-label={`Delete ${item.title}`}><Trash2 className="size-4" /></button></div></div>
          </article>
        ))}
      </div>

      {editor ? <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4" role="dialog" aria-modal="true"><div className="mx-auto my-8 w-full max-w-2xl bg-[#f3ecdf] shadow-2xl"><div className="flex items-center justify-between border-b border-black/10 p-5"><div><p className="text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#8c6725]">{editor.mode === "create" ? "New" : "Edit"} {label}</p><h2 className="mt-1 font-serif text-3xl text-[#17130e]">{editor.form.title || `Untitled ${label}`}</h2></div><button type="button" onClick={() => setEditor(null)} className="grid size-10 place-items-center border border-black/10" aria-label="Close editor"><X className="size-4" /></button></div><form onSubmit={save} className="grid gap-5 p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2"><Field label="Title"><input className={inputClass} value={editor.form.title} onChange={(e) => update("title", e.target.value)} /></Field><Field label="Category"><input className={inputClass} value={editor.form.category} onChange={(e) => update("category", e.target.value)} /></Field></div>
          {isMenu ? <><div className="grid gap-5 sm:grid-cols-2"><Field label="Food Type"><Segments value={editor.form.type} options={["veg", "non-veg"]} onChange={(value) => update("type", value)} /></Field>{editor.form.type === "non-veg" ? <Field label="Protein"><input className={inputClass} value={editor.form.protein || ""} onChange={(e) => update("protein", e.target.value)} placeholder="Chicken, Mutton, Egg, Seafood" /></Field> : <div />}</div><Field label="Description"><textarea className={`${inputClass} min-h-28 resize-none py-3`} value={editor.form.copy} onChange={(e) => update("copy", e.target.value)} /></Field></> : <Field label="Card Layout"><Segments value={editor.form.size} options={["standard", "wide", "tall"]} onChange={(value) => update("size", value)} /></Field>}
          <Field label="Image URL"><input className={inputClass} value={editor.form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." /></Field>
          {editor.form.image ? <div className="h-48 overflow-hidden border border-black/10 bg-black"><SafeImage src={editor.form.image} alt="Preview" className="h-full w-full object-cover" /></div> : null}
          <div className="grid gap-5 sm:grid-cols-2"><Field label="Sort Order"><input className={inputClass} type="number" value={editor.form.sortOrder} onChange={(e) => update("sortOrder", Number(e.target.value))} /></Field><Field label="Visibility"><Segments value={editor.form.isActive ? "active" : "hidden"} options={["active", "hidden"]} onChange={(value) => update("isActive", value === "active")} /></Field></div>
          <button disabled={saving} type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17130e] px-5 text-xs font-black uppercase tracking-[0.12em] text-[#efcb73] disabled:opacity-50"><Check className="size-4" />{saving ? "Saving..." : "Save Changes"}</button>
        </form></div></div> : null}

      {deleteTarget ? <div className="fixed inset-0 z-[110] grid place-items-center bg-black/75 p-4" role="alertdialog" aria-modal="true"><div className="w-full max-w-md bg-[#fffaf2] p-6 shadow-2xl"><Trash2 className="size-7 text-red-700" /><h2 className="mt-5 font-serif text-3xl text-[#17130e]">Delete this item?</h2><p className="mt-3 text-sm leading-7 text-[#6c6254]">“{deleteTarget.title}” will be removed from the CMS and public website. This action cannot be undone.</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="min-h-11 flex-1 border border-black/15 text-xs font-black uppercase tracking-[0.1em]">Cancel</button><button disabled={saving} type="button" onClick={remove} className="min-h-11 flex-1 bg-red-700 text-xs font-black uppercase tracking-[0.1em] text-white disabled:opacity-50">{saving ? "Deleting..." : "Delete"}</button></div></div></div> : null}
    </section>
  );
}

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AdminSelect({ label, value, options, onChange, disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (event) => { if (ref.current && !ref.current.contains(event.target)) setOpen(false); };
    const onKey = (event) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div ref={ref} className="relative">
      {label ? <span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.12em] text-black/40">{label}</span> : null}
      <button type="button" disabled={disabled} onClick={() => setOpen((current) => !current)} className="flex min-h-11 w-full items-center justify-between border border-black/10 bg-white px-3 text-left text-sm font-bold text-[#4f4538] outline-none transition hover:border-[#b88731]/50 disabled:opacity-50" aria-haspopup="listbox" aria-expanded={open}>
        <span className="capitalize">{value}</span><ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? <div role="listbox" className="absolute inset-x-0 top-[calc(100%+.35rem)] z-40 max-h-64 overflow-y-auto border border-black/10 bg-white p-1 shadow-2xl">{options.map((option) => <button key={option} type="button" role="option" aria-selected={option === value} onClick={() => { onChange(option); setOpen(false); }} className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm capitalize transition ${option === value ? "bg-[#d8ab4d]/12 text-[#7c5b22]" : "text-[#4f4538] hover:bg-black/[0.03]"}`}><span>{option}</span>{option === value ? <Check className="size-4 text-[#9d7328]" /> : null}</button>)}</div> : null}
    </div>
  );
}

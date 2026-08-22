import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CustomSelect({ label, value, placeholder, options, icon: Icon, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-12 w-full items-center justify-between border border-[#d8ab4d]/28 bg-black/55 px-4 text-left text-sm text-white transition hover:border-[#d8ab4d]/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ab4d]"
      >
        <span className="flex items-center gap-3">
          {Icon ? <Icon className="size-4 text-[#d8ab4d]" strokeWidth={1.8} /> : null}
          <span className={value ? "text-white" : "text-white/42"}>{value || placeholder}</span>
        </span>
        <ChevronDown className={`size-4 text-[#d8ab4d] transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div role="listbox" className="absolute inset-x-0 top-[calc(100%+.35rem)] z-30 border border-[#d8ab4d]/25 bg-[#0b0b0b] p-1 shadow-[0_18px_45px_rgba(0,0,0,.45)]">
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition ${selected ? "bg-[#d8ab4d]/12 text-[#efc86f]" : "text-white/68 hover:bg-white/[0.04] hover:text-white"}`}
              >
                <span>{option}</span>
                {selected ? <Check className="size-4 text-[#d8ab4d]" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

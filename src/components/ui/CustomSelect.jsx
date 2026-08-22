import { Check, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import useDismissableLayer from "../../hooks/useDismissableLayer";

export default function CustomSelect({ label, value, placeholder, options, icon: Icon, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useDismissableLayer(rootRef, open, () => setOpen(false));

  const handleTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
        className="flex min-h-12 w-full items-center justify-between border border-[#d8ab4d]/28 bg-black/55 px-4 text-left text-sm text-white transition hover:border-[#d8ab4d]/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8ab4d]"
      >
        <span className="flex min-w-0 items-center gap-3">
          {Icon ? <Icon className="size-4 shrink-0 text-[#d8ab4d]" strokeWidth={1.8} /> : null}
          <span className={`truncate ${value ? "text-white" : "text-white/42"}`}>{value || placeholder}</span>
        </span>
        <ChevronDown className={`size-4 shrink-0 text-[#d8ab4d] transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div role="listbox" className="absolute inset-x-0 top-[calc(100%+.35rem)] z-40 max-h-72 overflow-y-auto border border-[#d8ab4d]/25 bg-[#0b0b0b] p-1 shadow-[0_18px_45px_rgba(0,0,0,.45)]">
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
                className={`flex min-h-11 w-full items-center justify-between gap-4 px-3 py-2.5 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#d8ab4d] ${selected ? "bg-[#d8ab4d]/12 text-[#efc86f]" : "text-white/68 hover:bg-white/[0.04] hover:text-white"}`}
              >
                <span>{option}</span>
                {selected ? <Check className="size-4 shrink-0 text-[#d8ab4d]" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

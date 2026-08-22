import { ArrowUp } from "lucide-react";

export default function ScrollTop({ visible, onScrollTop }) {
  return (
    <button
      type="button"
      onClick={onScrollTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-[#d8ab4d] text-black shadow-[0_14px_40px_rgba(0,0,0,.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#efc86f] ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp className="size-5" strokeWidth={2.2} />
    </button>
  );
}

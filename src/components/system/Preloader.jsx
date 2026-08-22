export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-[#050505] text-white" role="status" aria-live="polite" aria-label="Loading Royalties Buffet">
      <div className="text-center">
        <div className="mx-auto grid size-28 place-items-center border border-[#d8ab4d]/25 bg-[#d8ab4d]/[0.03] shadow-[0_0_80px_rgba(216,171,77,.08)]">
          <img src="/royalties-logo.png" alt="" className="h-20 w-auto animate-pulse object-contain" />
        </div>
        <p className="mt-7 text-[0.62rem] font-black uppercase tracking-[0.34em] text-[#d8ab4d]">Preparing your table</p>
        <div className="mx-auto mt-5 h-px w-40 overflow-hidden bg-white/10">
          <div className="h-full w-2/3 animate-[pulse_1.1s_ease-in-out_infinite] bg-[#d8ab4d]" />
        </div>
      </div>
    </div>
  );
}

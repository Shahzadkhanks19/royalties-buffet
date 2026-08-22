import { shell } from "../../config/site";

const shimmer = "animate-pulse bg-white/[0.07]";

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#090909] pt-[108px] text-white" aria-busy="true" aria-label="Loading page">
      <section className="min-h-[512px] border-b border-white/10 bg-[#0c0c0c]">
        <div className={`${shell} flex min-h-[512px] items-center py-16`}>
          <div className="w-full max-w-3xl">
            <div className={`${shimmer} h-3 w-32`} />
            <div className={`${shimmer} mt-7 h-16 w-4/5`} />
            <div className={`${shimmer} mt-3 h-16 w-3/5`} />
            <div className={`${shimmer} mt-7 h-4 w-full max-w-xl`} />
            <div className={`${shimmer} mt-3 h-4 w-4/5 max-w-lg`} />
          </div>
        </div>
      </section>
      <section className="bg-[#f3ecdf] py-20">
        <div className={`${shell} grid gap-5 md:grid-cols-2 xl:grid-cols-4`}>
          {Array.from({ length: 8 }, (_, index) => <div key={index} className="border border-black/8 bg-[#fffaf2] p-4"><div className="h-48 animate-pulse bg-black/8" /><div className="mt-5 h-3 w-20 animate-pulse bg-black/10" /><div className="mt-4 h-6 w-3/4 animate-pulse bg-black/10" /><div className="mt-3 h-3 w-full animate-pulse bg-black/8" /><div className="mt-2 h-3 w-4/5 animate-pulse bg-black/8" /></div>)}
        </div>
      </section>
    </div>
  );
}

export function CardGridSkeleton({ count = 8 }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" aria-busy="true" aria-label="Loading content">
      {Array.from({ length: count }, (_, index) => <div key={index} className="border border-black/8 bg-[#fffaf2] p-4"><div className="h-52 animate-pulse bg-black/8" /><div className="mt-5 h-3 w-24 animate-pulse bg-black/10" /><div className="mt-4 h-6 w-2/3 animate-pulse bg-black/10" /><div className="mt-3 h-3 w-full animate-pulse bg-black/8" /></div>)}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="border border-white/10 bg-[#0d0d0d] p-6" aria-busy="true" aria-label="Loading form">
      <div className={`${shimmer} h-4 w-28`} />
      <div className={`${shimmer} mt-4 h-9 w-56`} />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => <div key={index}><div className={`${shimmer} h-3 w-20`} /><div className={`${shimmer} mt-2 h-12 w-full`} /></div>)}
      </div>
      <div className={`${shimmer} mt-7 h-12 w-44`} />
    </div>
  );
}

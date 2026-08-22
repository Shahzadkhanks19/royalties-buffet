import { Images, Soup } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ menu: 0, gallery: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/api/admin/dashboard").then((result) => setCounts(result.counts)).catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#956c25]">Overview</p>
      <h1 className="mt-2 font-serif text-4xl text-[#17130e] sm:text-5xl">Content dashboard</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6c6254]">Manage the public menu and gallery records already seeded from the approved website content.</p>
      {error ? <div className="mt-6 border border-red-700/20 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[[Soup, "Menu Items", counts.menu, "/admin/menu"], [Images, "Gallery Items", counts.gallery, "/admin/gallery"]].map(([Icon, label, count, to]) => (
          <Link key={to} to={to} className="group border border-black/10 bg-[#fffaf2] p-6 shadow-[0_18px_40px_rgba(36,24,10,.08)] transition hover:-translate-y-1 hover:border-[#b98832]/45">
            <div className="grid size-11 place-items-center bg-[#17130e] text-[#d8ab4d]"><Icon className="size-5" /></div>
            <p className="mt-8 text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#8b682b]">{label}</p>
            <strong className="mt-2 block font-serif text-5xl text-[#17130e]">{count}</strong>
            <span className="mt-5 inline-block text-sm font-bold text-[#6c6254] group-hover:text-[#8b682b]">Open manager →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

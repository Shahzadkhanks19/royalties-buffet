import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export default function AdminLoginPage() {
  const { admin, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!loading && admin) return <Navigate to="/admin" replace />;

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    if (!form.email.trim() || !form.password) {
      setError("Enter your admin email and password.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await login(form.email.trim().toLowerCase(), form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#070707] px-4 py-12 text-white">
      <section className="w-full max-w-md border border-[#d8ab4d]/25 bg-[#0d0d0d] p-6 shadow-2xl sm:p-8">
        <div className="text-center"><img src="/royalties-logo.png" alt="Royalties Buffet" className="mx-auto h-20 w-auto" /><p className="mt-6 text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#d8ab4d]">Admin CMS</p><h1 className="mt-2 font-serif text-4xl">Welcome back.</h1><p className="mt-3 text-sm leading-7 text-white/45">Sign in to manage Royalties content and enquiries.</p></div>
        <form onSubmit={submit} noValidate className="mt-8 space-y-5">
          <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Email</span><div className="flex items-center border border-[#d8ab4d]/25 bg-black/50 px-4 focus-within:border-[#d8ab4d]/65"><Mail className="size-4 shrink-0 text-[#d8ab4d]" /><input value={form.email} onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))} type="email" autoComplete="username" className="min-h-12 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/25" placeholder="admin@example.com" /></div></label>
          <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Password</span><div className="flex items-center border border-[#d8ab4d]/25 bg-black/50 px-4 focus-within:border-[#d8ab4d]/65"><LockKeyhole className="size-4 shrink-0 text-[#d8ab4d]" /><input value={form.password} onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))} type={showPassword ? "text" : "password"} autoComplete="current-password" className="min-h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/25" placeholder="Your password" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="grid size-9 shrink-0 place-items-center text-white/45 transition hover:text-[#d8ab4d]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></label>
          <div className="flex justify-end"><Link to="/admin/forgot-password" className="text-xs font-bold text-[#d8ab4d] transition hover:text-[#efc86f]">Forgot password?</Link></div>
          {error ? <div role="alert" className="border border-red-400/25 bg-red-400/8 p-3 text-sm text-red-200">{error}</div> : null}
          <button disabled={submitting} type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#d8ab4d] px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#efc86f] disabled:cursor-not-allowed disabled:opacity-55">{submitting ? "Signing In..." : "Sign In"}<LogIn className="size-4" /></button>
        </form>
      </section>
    </main>
  );
}

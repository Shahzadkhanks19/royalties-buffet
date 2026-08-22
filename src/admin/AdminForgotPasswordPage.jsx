import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { postJson } from "../lib/api";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [developmentUrl, setDevelopmentUrl] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setError("");
    setMessage("");
    setDevelopmentUrl("");
    try {
      const result = await postJson("/api/admin/forgot-password", { email: email.trim().toLowerCase() });
      setMessage(result.message);
      setDevelopmentUrl(result.developmentResetUrl || "");
    } catch (err) {
      setError(err.message || "Unable to request a password reset.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#070707] px-4 py-12 text-white">
      <section className="w-full max-w-md border border-[#d8ab4d]/25 bg-[#0d0d0d] p-6 shadow-2xl sm:p-8">
        <img src="/royalties-logo.png" alt="Royalties Buffet" className="mx-auto h-20 w-auto" />
        <div className="mt-7 text-center"><p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#d8ab4d]">Admin Recovery</p><h1 className="mt-2 font-serif text-4xl">Forgot password?</h1><p className="mt-3 text-sm leading-7 text-white/45">Enter the admin email and we’ll send a secure reset link.</p></div>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">Admin Email</span><div className="flex items-center border border-[#d8ab4d]/25 bg-black/50 px-4 focus-within:border-[#d8ab4d]/65"><Mail className="size-4 shrink-0 text-[#d8ab4d]" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="admin@example.com" className="min-h-12 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/25" /></div></label>
          {message ? <div role="status" className="border border-emerald-400/25 bg-emerald-400/8 p-3 text-sm leading-6 text-emerald-100">{message}</div> : null}
          {developmentUrl ? <div className="border border-[#d8ab4d]/25 bg-[#d8ab4d]/8 p-3 text-xs leading-6 text-white/65"><p className="font-bold text-[#d8ab4d]">Development reset link</p><Link to={developmentUrl.replace(/^https?:\/\/[^/]+/, "")} className="mt-1 block break-all underline">Open reset page</Link></div> : null}
          {error ? <div role="alert" className="border border-red-400/25 bg-red-400/8 p-3 text-sm text-red-200">{error}</div> : null}
          <button disabled={submitting} type="submit" className="min-h-12 w-full bg-[#d8ab4d] px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#efc86f] disabled:opacity-55">{submitting ? "Sending..." : "Send Reset Link"}</button>
        </form>
        <Link to="/admin/login" className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-white/45 transition hover:text-[#d8ab4d]"><ArrowLeft className="size-3.5" />Back to sign in</Link>
      </section>
    </main>
  );
}

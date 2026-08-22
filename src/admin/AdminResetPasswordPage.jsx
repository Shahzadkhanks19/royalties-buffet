import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { postJson } from "../lib/api";

export default function AdminResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    if (!token) return setError("This reset link is invalid or incomplete.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");

    setSubmitting(true);
    setError("");
    setMessage("");
    try {
      const result = await postJson("/api/admin/reset-password", { token, password: form.password });
      setMessage(result.message);
      setForm({ password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message || "Unable to reset the password.");
    } finally {
      setSubmitting(false);
    }
  };

  const passwordField = (label, key, visible, toggle, autoComplete) => (
    <label className="block"><span className="mb-2 block text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/45">{label}</span><div className="flex items-center border border-[#d8ab4d]/25 bg-black/50 px-4 focus-within:border-[#d8ab4d]/65"><LockKeyhole className="size-4 shrink-0 text-[#d8ab4d]" /><input value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} type={visible ? "text" : "password"} autoComplete={autoComplete} className="min-h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/25" placeholder="Minimum 10 characters" /><button type="button" onClick={toggle} className="grid size-9 shrink-0 place-items-center text-white/45 transition hover:text-[#d8ab4d]" aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}>{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></label>
  );

  return (
    <main className="grid min-h-screen place-items-center bg-[#070707] px-4 py-12 text-white">
      <section className="w-full max-w-md border border-[#d8ab4d]/25 bg-[#0d0d0d] p-6 shadow-2xl sm:p-8">
        <img src="/royalties-logo.png" alt="Royalties Buffet" className="mx-auto h-20 w-auto" />
        <div className="mt-7 text-center"><p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#d8ab4d]">Admin Recovery</p><h1 className="mt-2 font-serif text-4xl">Reset password.</h1><p className="mt-3 text-sm leading-7 text-white/45">Use at least 10 characters with uppercase, lowercase and a number.</p></div>
        <form onSubmit={submit} className="mt-8 space-y-5">
          {passwordField("New Password", "password", showPassword, () => setShowPassword((value) => !value), "new-password")}
          {passwordField("Confirm Password", "confirmPassword", showConfirm, () => setShowConfirm((value) => !value), "new-password")}
          {message ? <div role="status" className="border border-emerald-400/25 bg-emerald-400/8 p-3 text-sm leading-6 text-emerald-100">{message}</div> : null}
          {error ? <div role="alert" className="border border-red-400/25 bg-red-400/8 p-3 text-sm text-red-200">{error}</div> : null}
          <button disabled={submitting || Boolean(message)} type="submit" className="min-h-12 w-full bg-[#d8ab4d] px-5 text-[0.68rem] font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#efc86f] disabled:opacity-55">{submitting ? "Resetting..." : "Reset Password"}</button>
        </form>
        <Link to="/admin/login" className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-white/45 transition hover:text-[#d8ab4d]"><ArrowLeft className="size-3.5" />Back to sign in</Link>
      </section>
    </main>
  );
}

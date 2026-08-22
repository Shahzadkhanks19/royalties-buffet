import { ShieldCheck } from "lucide-react";
import { internalHero, internalHeroInner, shell } from "../config/site";

const sections = [
  ["Information we may collect", "Information you submit through reservation, catering, franchise or contact forms may include your name, phone number, email address, selected outlet, event details, guest count and any message or special request you provide."],
  ["How information may be used", "Submitted information may be used to respond to enquiries, manage reservations and event requests, communicate service updates, support customer service and improve the Royalties experience."],
  ["Cookies and website data", "The website may use essential technical storage and analytics tools when those services are enabled. Any production analytics, marketing cookies or third-party tracking should be disclosed through the final cookie and consent setup."],
  ["Sharing of information", "Personal information should only be shared with service providers or business partners when needed to operate the website, process a request, provide a service or comply with applicable legal obligations."],
  ["Data security", "Reasonable technical and organisational safeguards should be used to protect information. No internet-based system can guarantee absolute security, so production deployment should include secure hosting, access controls, encryption where appropriate and regular maintenance."],
  ["Data retention", "Information should be retained only for as long as it is reasonably required for the purpose for which it was collected, business records, customer support or applicable legal and accounting requirements."],
  ["Your choices", "You may contact Royalties to ask about personal information submitted through the website or to request correction or deletion where applicable and legally permitted."],
  ["Third-party services", "The production website may eventually connect to services such as payment providers, email delivery, analytics, maps or messaging platforms. Those providers may have their own privacy practices and policies."],
  ["Policy updates", "This policy may be updated as website functionality, integrations and business operations evolve. The published version should display the latest effective date once the final legal copy is approved."],
];

export default function PrivacyPage() {
  return (
    <>
      <section className={internalHero}>
        <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2200&q=88" alt="Royalties restaurant interior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.97)_0%,rgba(3,3,3,.86)_46%,rgba(3,3,3,.36)_100%)]" />
        <div className={internalHeroInner}><div className="max-w-3xl"><p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#d8ab4d]">Privacy Policy</p><h1 className="mt-5 font-serif text-[clamp(4rem,8vw,7.2rem)] leading-[0.88] tracking-[-0.05em]">Your information.<br /><span className="text-[#d8ab4d]">Handled thoughtfully.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">A clear overview of how information submitted through the Royalties Buffet website may be collected, used and protected.</p></div></div>
      </section>

      <section className="bg-[#f3ecdf] py-20 lg:py-24">
        <div className={`${shell} grid gap-10 lg:grid-cols-[.7fr_1.3fr]`}>
          <aside className="lg:sticky lg:top-32 lg:self-start"><div className="grid size-14 place-items-center border border-[#9d7328]/35 text-[#8c641d]"><ShieldCheck className="size-6" /></div><p className="mt-6 text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#9d7328]">Privacy at Royalties</p><h2 className="mt-4 font-serif text-4xl leading-tight text-[#17130e]">Built for clarity, not fine-print confusion.</h2><p className="mt-5 text-sm leading-7 text-[#6c6254]">This is development-stage website copy and should be reviewed against the final business processes, integrations and applicable legal requirements before production launch.</p></aside>
          <div className="space-y-4">{sections.map(([title, copy], index) => <article key={title} className="border border-black/10 bg-[#fffaf2] p-6 sm:p-7"><div className="flex items-start gap-4"><span className="font-serif text-2xl text-[#b2873c]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-serif text-2xl text-[#17130e]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#6c6254] sm:text-base sm:leading-8">{copy}</p></div></div></article>)}</div>
        </div>
      </section>
    </>
  );
}

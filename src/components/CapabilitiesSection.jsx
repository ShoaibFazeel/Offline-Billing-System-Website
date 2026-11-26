import { CheckCircle2 } from "lucide-react"
import { CORE_CAPABILITIES } from "../data/showcaseData"

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
            System Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Engineered for High-Volume Wholesale &amp; Field Distribution
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            Every workflow in Offline Billing System was designed around real distributor bottlenecks—negotiated
            per-client pricing, free scheme units, route batching, tax-filer documentation, and compact instant printing.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CORE_CAPABILITIES.map((cap) => (
            <article
              key={cap.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-500/40"
            >
              <div>
                <span className="inline-block rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  {cap.badge}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-white">{cap.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">{cap.description}</p>
              </div>

              <ul className="mt-5 space-y-2 border-t border-slate-800 pt-4">
                {cap.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

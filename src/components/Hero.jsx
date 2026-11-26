import { ArrowDown, ArrowUpRight, Database, FileText, Github, Layers, ShieldCheck } from "lucide-react"
import { CONTACT_URL, GITHUB_REPO_URL, PORTFOLIO_URL } from "../data/showcaseData"

const HERO_METRICS = [
  {
    icon: Database,
    label: "SQLite WAL Engine",
    value: "100% Offline Persistence",
    accent: "text-blue-400",
  },
  {
    icon: FileText,
    label: "pdf-lib Generator",
    value: "15×21cm Print Invoices",
    accent: "text-indigo-400",
  },
  {
    icon: Layers,
    label: "Atomic Batch Queue",
    value: "Single & Bulk Billing",
    accent: "text-emerald-400",
  },
  {
    icon: ShieldCheck,
    label: "Electron v1.1.2",
    value: "NSIS + Portable + Auto-Update",
    accent: "text-cyan-400",
  },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-slate-800/80 bg-slate-950 bg-grid-slate">
      {/* Ambient radial lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-cyan-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Project Showcase</span>
            <span className="text-slate-500">•</span>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-4 hover:text-cyan-200"
            >
              Built by Shoaib Fazeel Butt
            </a>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl sm:leading-[1.08]">
            Offline-First Billing, Inventory &amp;{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Invoice Engine
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            A production desktop application built with <strong className="text-white">Electron, React 18, and SQLite</strong>{" "}
            for wholesale and distribution businesses. Create single or bulk invoices in seconds, recall negotiated
            client-specific rates automatically, track bonus stock, and export compact print-ready PDFs—completely without internet dependency.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a
              href="#interactive-views"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-950/60 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 sm:w-auto"
            >
              Try Interactive App Views
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-6 py-3.5 text-sm font-bold text-cyan-200 transition-all hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white sm:w-auto"
            >
              Contact Us on Main Portfolio
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
            >
              <Github className="h-4 w-4" />
              GitHub Repo
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md transition-colors hover:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                    <Icon className={`h-5 w-5 ${item.accent}`} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-white">{item.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

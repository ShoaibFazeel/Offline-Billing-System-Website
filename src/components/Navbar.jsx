import { ArrowUpRight, Github, Monitor } from "lucide-react"
import { CONTACT_URL, GITHUB_REPO_URL, PORTFOLIO_URL } from "../data/showcaseData"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 font-black text-white shadow-lg shadow-blue-950/50 transition-transform group-hover:scale-105">
            B
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-white sm:text-base">
              Offline Billing System
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Enterprise Desktop Showcase
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-400 md:flex">
          <a href="#interactive-views" className="transition-colors hover:text-white">
            App Views
          </a>
          <a href="#capabilities" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#architecture" className="transition-colors hover:text-white">
            Architecture
          </a>
          <a href="#shortcuts" className="transition-colors hover:text-white">
            Workflow
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:text-white sm:inline-flex"
          >
            <Monitor className="h-3.5 w-3.5 text-cyan-400" />
            Portfolio
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="View Source on GitHub"
            className="hidden items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-2 text-slate-300 transition-colors hover:border-slate-700 hover:text-white lg:inline-flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-950/50 transition-all hover:from-blue-500 hover:to-indigo-500"
          >
            Contact Us
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  )
}

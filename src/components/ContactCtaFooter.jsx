import { ArrowUpRight, ExternalLink, Github, Mail } from "lucide-react"
import {
  CONTACT_URL,
  GITHUB_REPO_URL,
  PORTFOLIO_PROJECTS_URL,
  PORTFOLIO_URL,
} from "../data/showcaseData"

export default function ContactCtaFooter() {
  return (
    <footer className="bg-slate-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Contact Us Redirect Card */}
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-900 via-blue-950/60 to-indigo-950/70 p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              Custom Desktop &amp; Web Solutions
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Interested in Offline Billing System?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Want a tailored deployment for your distribution business, custom invoice templates, or a full-stack
              desktop/web application? Reach out directly through my main portfolio website.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto"
              >
                <Mail className="h-4 w-4 text-blue-700" />
                Contact Us on shoaibfazeelbutt.com
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href={PORTFOLIO_PROJECTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Explore All Projects
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-400 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-xs font-black text-white">
              B
            </div>
            <span>Offline Billing System Showcase</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              shoaibfazeelbutt.com
            </a>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Contact
            </a>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

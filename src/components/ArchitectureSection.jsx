import { Cpu, Database, HardDrive, Keyboard, Lock, RefreshCw } from "lucide-react"
import { KEYBOARD_SHORTCUTS } from "../data/showcaseData"

const ARCHITECTURE_LAYERS = [
  {
    icon: Cpu,
    layer: "Renderer Process",
    tech: "React 18 · HashRouter · Tailwind CSS",
    detail:
      "Componentized UI with custom useLazyData hook for paginated 50-row incremental loading, debounced search, and cache invalidation callbacks across Dashboard, Billing, Inventory, and Reports.",
    items: ["src/App.js & 11 functional views", "Client-side pdf-lib 15×21cm generator", "Toast notifications & ErrorBoundary"],
  },
  {
    icon: Lock,
    layer: "IPC Security Bridge",
    tech: "Electron preload.js · contextIsolation: true",
    detail:
      "Renderer runs with nodeIntegration disabled. All database mutations, settings updates, auto-update checks, and OS PDF opening pass through a typed window.api bridge.",
    items: ["Zero direct Node access in UI", "Structured ipcRenderer.invoke channels", "Clean update-status event listener"],
  },
  {
    icon: Database,
    layer: "SQLite Persistence",
    tech: "better-sqlite3 · WAL Mode · synchronous=FULL",
    detail:
      "Disk-backed billing_system.sqlite stored in Electron userData with Write-Ahead Logging, 5s busy timeout, indexed lookups, and atomic db.transaction() guarantees.",
    items: [
      "7 tables: products, clients, bills, client_products, field_officers, salesmen, settings",
      "Auto stock deduction & refund on bill edit/delete",
      "Full JSON backup & restore importer",
    ],
  },
  {
    icon: RefreshCw,
    layer: "Build & Distribution",
    tech: "electron-builder · GitHub Actions · electron-updater",
    detail:
      "Automated Windows x64 NSIS installer and Portable .exe releases triggered on v* git tags, complete with in-app background update download and one-click Install & Restart.",
    items: [
      "NSIS desktop/start-menu installer + Portable .exe",
      "Cross-platform targets (Win, macOS DMG, Linux AppImage)",
      "Auto-updater banner & Settings update center",
    ],
  },
]

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="border-b border-slate-800/80 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
            Technical Architecture
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Built for Durability, Speed &amp; Zero-Cloud Reliability
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            From context-isolated Electron IPC handlers to Write-Ahead-Logged SQLite transactions and automated GitHub
            release pipelines, every layer prioritizes data safety and counter-speed responsiveness.
          </p>
        </div>

        {/* 4-Layer Architecture Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {ARCHITECTURE_LAYERS.map((block) => {
            const Icon = block.icon
            return (
              <div
                key={block.layer}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">{block.layer}</h3>
                      <p className="font-mono text-xs text-cyan-300">{block.tech}</p>
                    </div>
                  </div>
                  <HardDrive className="h-4 w-4 text-slate-600" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{block.detail}</p>

                <ul className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-4">
                  {block.items.map((item) => (
                    <li key={item} className="font-mono text-xs text-slate-400">
                      <span className="mr-2 text-blue-400">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Keyboard-First Workflow Table */}
        <div id="shortcuts" className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-2.5">
                <Keyboard className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Keyboard-First Counter Workflow</h3>
                <p className="text-xs text-slate-400">
                  Designed so operators can generate invoices without taking hands off the keyboard
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {KEYBOARD_SHORTCUTS.map((sc) => (
              <div
                key={sc.keys}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <kbd className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-blue-300">
                    {sc.keys}
                  </kbd>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{sc.scope}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">{sc.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

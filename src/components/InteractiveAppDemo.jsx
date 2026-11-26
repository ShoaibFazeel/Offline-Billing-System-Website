import { useState } from "react"
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FilePlus2,
  FileText,
  Home,
  Layers,
  Package,
  Printer,
} from "lucide-react"
import { DEMO_CLIENTS, DEMO_PRODUCTS, INITIAL_DEMO_BILLS } from "../data/showcaseData"
import DashboardView from "./views/DashboardView"
import NewBillView from "./views/NewBillView"
import BulkBillsView from "./views/BulkBillsView"
import DirectoryView from "./views/DirectoryView"
import ReportsView from "./views/ReportsView"
import InvoicePdfView from "./views/InvoicePdfView"

const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "new-bill", label: "New Bill", icon: FilePlus2, highlight: true },
  { id: "bulk-bills", label: "Bulk Bills", icon: Layers, highlight: true },
  { id: "invoice", label: "Invoice & PDF", icon: Printer },
  { id: "directory", label: "Inventory & Clients", icon: Package },
  { id: "reports", label: "Reports", icon: BarChart3 },
]

export default function InteractiveAppDemo() {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [bills, setBills] = useState(INITIAL_DEMO_BILLS)
  const [selectedBillId, setSelectedBillId] = useState(INITIAL_DEMO_BILLS[0]._id)

  const handleOpenInvoice = (billId) => {
    setSelectedBillId(billId)
    setActiveView("invoice")
  }

  const handleCreateBill = (billPayload) => {
    const nextId = Math.max(...bills.map((b) => Number(b.billId || 1000))) + 1
    const created = {
      ...billPayload,
      _id: String(nextId),
      billId: nextId,
    }
    setBills((prev) => [created, ...prev])
    setSelectedBillId(created._id)
    setActiveView("invoice")
  }

  return (
    <section id="interactive-views" className="border-b border-slate-800/80 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-300">
              Interactive HTML Page Views
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Explore the Desktop Interface Live
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              Navigate through realistic HTML replicas of the actual Electron screens—test the Low Stock threshold,
              compose a live invoice with Client-Specific Pricing &amp; Bonus items, inspect Bulk Billing, and preview the 15×21cm PDF output.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeView === item.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/50"
                    : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Electron Desktop Window Frame */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/60">
          {/* Native-like Window Titlebar */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-semibold text-slate-400">
                OfflineBillingSystem.exe — Interactive Preview (Local SQLite Simulated)
              </span>
            </div>
            <span className="hidden rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-slate-400 sm:inline">
              v1.1.2 · Offline Mode
            </span>
          </div>

          {/* App Shell Layout (mirrors src/App.js) */}
          <div className="flex min-h-[640px] flex-col bg-slate-100 text-slate-900 md:flex-row">
            {/* Dark Sidebar */}
            <aside
              className={`${
                sidebarOpen ? "md:w-60" : "md:w-20"
              } flex shrink-0 flex-col border-b border-slate-800 bg-slate-900 text-slate-100 transition-all duration-300 md:border-b-0 md:border-r`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 p-4">
                <div className={`flex items-center gap-3 ${!sidebarOpen && "md:w-full md:justify-center"}`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-lg font-black text-white shadow-lg">
                    B
                  </div>
                  {sidebarOpen && (
                    <div className="leading-tight">
                      <span className="block text-sm font-extrabold tracking-tight text-white">Offline Billing</span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-400">
                        Enterprise System
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  className="hidden rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white md:inline-flex"
                  title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              </div>

              <nav className="flex gap-1.5 overflow-x-auto p-3 md:flex-1 md:flex-col md:overflow-visible">
                {SIDEBAR_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = activeView === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveView(item.id)}
                      className={`flex shrink-0 items-center rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950/40"
                          : item.highlight
                            ? "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:text-white"
                            : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${sidebarOpen ? "mr-3" : "mx-auto"}`} />
                      {sidebarOpen && <span>{item.label}</span>}
                    </button>
                  )
                })}
              </nav>

              {sidebarOpen && (
                <div className="hidden border-t border-slate-800 p-3 text-[11px] text-slate-400 md:block">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-800/60 px-3 py-2">
                    <FileText className="h-3.5 w-3.5 text-emerald-400" />
                    <span>SQLite WAL · Ready</span>
                  </div>
                </div>
              )}
            </aside>

            {/* Main View Canvas */}
            <div className="app-scroll max-h-[720px] flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6">
              {activeView === "dashboard" && (
                <DashboardView
                  products={DEMO_PRODUCTS}
                  clients={DEMO_CLIENTS}
                  bills={bills}
                  onOpenInvoice={handleOpenInvoice}
                  onNavigate={setActiveView}
                />
              )}
              {activeView === "new-bill" && (
                <NewBillView clients={DEMO_CLIENTS} products={DEMO_PRODUCTS} onCreateBill={handleCreateBill} />
              )}
              {activeView === "bulk-bills" && <BulkBillsView />}
              {activeView === "directory" && <DirectoryView products={DEMO_PRODUCTS} clients={DEMO_CLIENTS} />}
              {activeView === "reports" && <ReportsView bills={bills} />}
              {activeView === "invoice" && (
                <InvoicePdfView bills={bills} selectedBillId={selectedBillId} onSelectBill={setSelectedBillId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from "react"
import { CheckCircle2, Layers } from "lucide-react"

const INITIAL_QUEUE = [
  {
    id: "q-1",
    clientName: "Sample Agro Mart",
    address: "Zone A",
    itemCount: 3,
    bonusUnits: 2,
    total: 58420,
  },
  {
    id: "q-2",
    clientName: "City Agro Traders",
    address: "Zone A",
    itemCount: 2,
    bonusUnits: 1,
    total: 41200,
  },
  {
    id: "q-3",
    clientName: "Valley Distributors",
    address: "Zone C",
    itemCount: 4,
    bonusUnits: 0,
    total: 67850,
  },
]

export default function BulkBillsView() {
  const [committed, setCommitted] = useState(false)
  const batchTotal = INITIAL_QUEUE.reduce((acc, row) => acc + row.total, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-5 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">Bulk Bill Batch Queue</h3>
          <p className="mt-0.5 text-xs text-blue-200">
            Queue multiple customer bills under shared Field Officer, Salesman &amp; Date, then save atomically
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1">Ctrl+Shift+B: New Bill</span>
          <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1">Ctrl+S: Save All</span>
        </div>
      </div>

      {/* Shared Batch Parameters */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Shared Bill Date</span>
          <p className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900">
            2026-11-26
          </p>
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Shared Field Officer
          </span>
          <p className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900">
            Field Officer 1
          </p>
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Shared Salesman</span>
          <p className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900">
            Salesman 1
          </p>
        </div>
      </div>

      {/* Queued Bills Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-extrabold text-slate-900">Queued Route Bills ({INITIAL_QUEUE.length})</h4>
          </div>
          <span className="text-xs font-extrabold text-slate-900">
            Batch Total: PKR {batchTotal.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Seq</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Client &amp; Area</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Line Items</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Bonus Units</th>
                <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase text-slate-500">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {INITIAL_QUEUE.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-xs font-bold text-blue-700">#{idx + 1}</td>
                  <td className="px-4 py-2.5">
                    <p className="text-xs font-bold text-slate-900">{row.clientName}</p>
                    <p className="text-[11px] text-slate-500">{row.address}</p>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-semibold text-slate-700">{row.itemCount} items</td>
                  <td className="px-4 py-2.5 text-xs font-semibold text-emerald-700">
                    {row.bonusUnits > 0 ? `+${row.bonusUnits} free` : "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs font-extrabold text-slate-900">
                    PKR {row.total.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            Executes <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">db.transaction()</code> for
            sequential invoice IDs, stock deduction, and client pricing updates.
          </p>

          <button
            type="button"
            onClick={() => setCommitted((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold shadow transition-all ${
              committed
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {committed ? "Batch Saved Atomically (Invoices #1043–#1045)" : "Simulate Save All Bills"}
          </button>
        </div>
      </div>
    </div>
  )
}

import { useMemo, useState } from "react"

const REPORT_TYPES = [
  { id: "daily", label: "Daily Sale Report" },
  { id: "item", label: "Item Report" },
  { id: "itemCompany", label: "Item Company Report" },
  { id: "company", label: "Company Item Report" },
]

export default function ReportsView({ bills }) {
  const [reportType, setReportType] = useState("daily")
  const [groupBy, setGroupBy] = useState("address")

  const dailyGroups = useMemo(() => {
    const map = new Map()
    for (const bill of bills) {
      const key =
        groupBy === "address"
          ? bill.clientAddress
          : groupBy === "client"
            ? bill.clientName
            : bill.billDate
      const current = map.get(key) || { key, count: 0, total: 0 }
      current.count += 1
      current.total += Number(bill.totalAmount || 0)
      map.set(key, current)
    }
    return Array.from(map.values())
  }, [bills, groupBy])

  const itemRows = useMemo(() => {
    const map = new Map()
    for (const bill of bills) {
      for (const item of bill.items) {
        const key = item.productName
        const current = map.get(key) || {
          name: item.productName,
          company: item.companyName,
          soldQty: 0,
          bonusQty: 0,
          revenue: 0,
        }
        if (item.isBonus) current.bonusQty += Number(item.quantity || 0)
        else {
          current.soldQty += Number(item.quantity || 0)
          current.revenue += Number(item.total || 0)
        }
        map.set(key, current)
      }
    }
    return Array.from(map.values())
  }, [bills])

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-5 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">Sales &amp; Inventory Reports</h3>
          <p className="mt-0.5 text-xs text-blue-200">
            Switch between all 4 built-in analytical report modes &amp; grouping dimensions
          </p>
        </div>
        <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
          One-Click PDF Export
        </span>
      </div>

      {/* Report Mode Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex flex-wrap gap-2">
            {REPORT_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setReportType(t.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                  reportType === t.id
                    ? "bg-blue-600 text-white shadow"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {reportType === "daily" && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600">Group By:</span>
              {["address", "client", "date"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroupBy(g)}
                  className={`rounded-lg px-2.5 py-1 font-bold capitalize ${
                    groupBy === g ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Report Table */}
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
          {reportType === "daily" ? (
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">
                    Grouped By ({groupBy})
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Invoices</th>
                  <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase text-slate-500">Net Sales</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {dailyGroups.map((row) => (
                  <tr key={row.key} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-xs font-bold text-slate-900">{row.key}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">{row.count} bills</td>
                    <td className="px-4 py-2.5 text-right text-xs font-extrabold text-slate-900">
                      PKR {row.total.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Product</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Manufacturer</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Sold Qty</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Bonus Qty</th>
                  <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase text-slate-500">Net Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {itemRows.map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-xs font-bold text-slate-900">{row.name}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">{row.company}</td>
                    <td className="px-4 py-2.5 text-xs font-bold text-slate-800">{row.soldQty}</td>
                    <td className="px-4 py-2.5 text-xs font-bold text-emerald-700">{row.bonusQty}</td>
                    <td className="px-4 py-2.5 text-right text-xs font-extrabold text-slate-900">
                      PKR {row.revenue.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

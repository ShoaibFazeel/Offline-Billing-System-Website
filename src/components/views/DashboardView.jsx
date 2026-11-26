import { useMemo, useState } from "react"
import { COMPANY_DEMO } from "../../data/showcaseData"

export default function DashboardView({ products, clients, bills, onOpenInvoice, onNavigate }) {
  const [threshold, setThreshold] = useState(50)

  const lowStockProducts = useMemo(
    () =>
      products
        .filter((p) => !p.hasInfiniteQuantity && p.quantity <= threshold)
        .sort((a, b) => a.quantity - b.quantity),
    [products, threshold]
  )

  return (
    <div className="space-y-5">
      {/* Company Info Top Header Card (mirrors Dashboard.js) */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-5 text-white shadow-lg lg:flex-row lg:items-center">
        <div className="flex items-center gap-3.5">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-md">
            <svg className="h-7 w-7 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">{COMPANY_DEMO.companyName}</h3>
            <p className="mt-0.5 text-xs font-medium text-blue-200">{COMPANY_DEMO.companyAddress}</p>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => onNavigate("directory")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-left text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="absolute bottom-0 right-0 top-0 w-24 skew-x-12 bg-white/5 transition-transform group-hover:translate-x-2" />
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/80">
            Inventory Catalog
          </span>
          <span className="mt-0.5 block text-base font-bold">Total Products</span>
          <span className="mt-2 block text-3xl font-black tracking-tight">{products.length}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("directory")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-5 text-left text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="absolute bottom-0 right-0 top-0 w-24 skew-x-12 bg-white/5 transition-transform group-hover:translate-x-2" />
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/80">Active Parties</span>
          <span className="mt-0.5 block text-base font-bold">Registered Clients</span>
          <span className="mt-2 block text-3xl font-black tracking-tight">{clients.length}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("invoice")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-5 text-left text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="absolute bottom-0 right-0 top-0 w-24 skew-x-12 bg-white/5 transition-transform group-hover:translate-x-2" />
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/80">Sales Invoices</span>
          <span className="mt-0.5 block text-base font-bold">Generated Bills</span>
          <span className="mt-2 block text-3xl font-black tracking-tight">{bills.length}</span>
        </button>
      </div>

      {/* Low Stock Alert Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-100 pb-3.5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="rounded-xl border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
              Alert
            </span>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">Low Stock Alert</h4>
              <p className="text-xs text-slate-500">Adjust threshold below to test live filtering</p>
            </div>
            <span className="rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-900">
              {lowStockProducts.length} items
            </span>
          </div>

          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Threshold:</span>
            <input
              type="number"
              min="0"
              max="200"
              value={threshold}
              onChange={(e) => setThreshold(Math.max(0, Number(e.target.value) || 0))}
              className="w-16 rounded-lg border border-slate-300 bg-white p-1 text-center text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        {lowStockProducts.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Product</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Current Stock
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {lowStockProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <p className="text-xs font-bold text-slate-900">{product.productName}</p>
                      <p className="text-[11px] text-slate-500">
                        {product.companyName} · {product.containerSize}
                      </p>
                    </td>
                    <td className="px-4 py-2.5 text-xs font-extrabold text-slate-800">{product.quantity} units</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                          product.quantity <= 10
                            ? "border-red-200 bg-red-100 text-red-800"
                            : "border-amber-200 bg-amber-100 text-amber-800"
                        }`}
                      >
                        {product.quantity <= 10 ? "Critical Stock" : "Low Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-xs text-slate-500">
            All tracked products are adequately stocked above {threshold} units.
          </div>
        )}
      </div>

      {/* Recent Invoices Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div>
            <h4 className="text-base font-extrabold text-slate-900">Recent Invoices</h4>
            <p className="text-xs text-slate-500">Click any invoice to inspect its 15×21cm print preview</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("new-bill")}
            className="rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow transition-colors hover:bg-blue-700"
          >
            + New Bill
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Invoice</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Party</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Total</th>
                <th className="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {bills.slice(0, 5).map((bill) => (
                <tr key={bill._id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5">
                    <span className="rounded-lg border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">
                      #{bill.billId}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-bold text-slate-900">{bill.clientName}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">{bill.billDate}</td>
                  <td className="px-4 py-2.5 text-xs font-extrabold text-slate-900">
                    PKR {Number(bill.totalAmount).toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => onOpenInvoice(bill._id)}
                      className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

import { useMemo, useState } from "react"

export default function DirectoryView({ products, clients }) {
  const [tab, setTab] = useState("inventory")
  const [search, setSearch] = useState("")

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) => p.productName.toLowerCase().includes(q) || p.companyName.toLowerCase().includes(q)
    )
  }, [products, search])

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.clientName.toLowerCase().includes(q) ||
        c.clientAddress.toLowerCase().includes(q) ||
        c.clientNumber.includes(q)
    )
  }, [clients, search])

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-5 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">
            {tab === "inventory" ? "Inventory Management" : "Client Directory"}
          </h3>
          <p className="mt-0.5 text-xs text-blue-200">
            {tab === "inventory"
              ? "Dual-mode stock tracking with selling/purchase prices & container sizes"
              : "Customer contact records with Tax Filer status and NTN verification"}
          </p>
        </div>

        <div className="flex rounded-xl bg-white/10 p-1">
          <button
            type="button"
            onClick={() => {
              setTab("inventory")
              setSearch("")
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              tab === "inventory" ? "bg-white text-blue-900" : "text-blue-100 hover:bg-white/10"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("clients")
              setSearch("")
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              tab === "clients" ? "bg-white text-blue-900" : "text-blue-100 hover:bg-white/10"
            }`}
          >
            Clients ({clients.length})
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            tab === "inventory" ? "Search products by name or manufacturer..." : "Search clients by name, area, or phone..."
          }
          className="mb-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {tab === "inventory" ? (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Product</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Sale / Purchase</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Stock Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <p className="text-xs font-bold text-slate-900">{p.productName}</p>
                      <p className="text-[11px] text-slate-500">
                        {p.companyName} · {p.containerSize}
                      </p>
                    </td>
                    <td className="px-4 py-2.5 text-xs">
                      <span className="font-extrabold text-slate-900">PKR {p.productPrice.toLocaleString()}</span>
                      <span className="block text-[11px] text-slate-500">
                        Cost: PKR {p.purchasePrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      {p.hasInfiniteQuantity ? (
                        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
                          ∞ Infinite Stock
                        </span>
                      ) : (
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                            p.quantity <= 20
                              ? "border-amber-200 bg-amber-100 text-amber-800"
                              : "border-emerald-200 bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {p.quantity} units tracked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Party Name</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Area &amp; Contact</th>
                  <th className="px-4 py-2.5 text-[11px] font-bold uppercase text-slate-500">Tax Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredClients.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-xs font-bold text-slate-900">{c.clientName}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">{c.clientAddress}</span>
                      <span className="block text-[11px] text-slate-500">{c.clientNumber}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      {c.isFiler ? (
                        <span className="rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                          Filer · NTN {c.ntnNumber}
                        </span>
                      ) : (
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                          Non-Filer
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

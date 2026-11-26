import { useMemo, useState } from "react"
import { Sparkles, Trash2 } from "lucide-react"
import { DEMO_CLIENT_PRICING, DEMO_FIELD_OFFICERS, DEMO_SALESMEN } from "../../data/showcaseData"

function calcLineTotal(qty, rate, discount, extraDiscount) {
  const afterDiscount = Number(qty || 0) * Number(rate || 0) * (1 - Number(discount || 0) / 100)
  const finalTotal = afterDiscount * (1 - Number(extraDiscount || 0) / 100)
  return Math.round(finalTotal * 100) / 100
}

export default function NewBillView({ clients, products, onCreateBill }) {
  const [clientId, setClientId] = useState(clients[0]._id)
  const [fieldOfficerId, setFieldOfficerId] = useState(DEMO_FIELD_OFFICERS[0]._id)
  const [salesmanId, setSalesmanId] = useState(DEMO_SALESMEN[0]._id)
  const [billDate, setBillDate] = useState("2026-11-26")

  const [selectedProductId, setSelectedProductId] = useState(products[0]._id)
  const [quantity, setQuantity] = useState(10)
  const [rate, setRate] = useState(DEMO_CLIENT_PRICING[clients[0]._id]?.[products[0]._id]?.rate ?? products[0].productPrice)
  const [discount, setDiscount] = useState(DEMO_CLIENT_PRICING[clients[0]._id]?.[products[0]._id]?.discount ?? 0)
  const [extraDiscount, setExtraDiscount] = useState(
    DEMO_CLIENT_PRICING[clients[0]._id]?.[products[0]._id]?.extraDiscount ?? 0
  )
  const [bonusQty, setBonusQty] = useState(1)
  const [usedMemory, setUsedMemory] = useState(true)

  const [draftItems, setDraftItems] = useState([
    {
      _id: "draft-1",
      productId: "prod-1",
      productName: "CropShield Max 250EC",
      companyName: "Syngenta Agro",
      containerSize: "1 Liter",
      quantity: 10,
      rate: 2800,
      discount: 10,
      extraDiscount: 2,
      total: calcLineTotal(10, 2800, 10, 2),
      isBonus: false,
    },
    {
      _id: "draft-2",
      productId: "prod-1",
      productName: "CropShield Max 250EC",
      companyName: "Syngenta Agro",
      containerSize: "1 Liter",
      quantity: 1,
      rate: 2800,
      discount: 0,
      extraDiscount: 0,
      total: 0,
      isBonus: true,
    },
  ])

  const selectedClient = clients.find((c) => c._id === clientId) || clients[0]

  const applyClientProductDefaults = (nextClientId, nextProductId) => {
    const product = products.find((p) => p._id === nextProductId)
    const memory = DEMO_CLIENT_PRICING[nextClientId]?.[nextProductId]
    if (memory) {
      setRate(memory.rate)
      setDiscount(memory.discount)
      setExtraDiscount(memory.extraDiscount)
      setUsedMemory(true)
    } else if (product) {
      setRate(product.productPrice)
      setDiscount(0)
      setExtraDiscount(0)
      setUsedMemory(false)
    }
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    const product = products.find((p) => p._id === selectedProductId)
    if (!product || quantity <= 0) return

    const newItems = [
      {
        _id: `draft-${Date.now()}-main`,
        productId: product._id,
        productName: product.productName,
        companyName: product.companyName,
        containerSize: product.containerSize,
        quantity: Number(quantity),
        rate: Number(rate),
        discount: Number(discount),
        extraDiscount: Number(extraDiscount),
        total: calcLineTotal(quantity, rate, discount, extraDiscount),
        isBonus: false,
      },
    ]

    if (Number(bonusQty) > 0) {
      newItems.push({
        _id: `draft-${Date.now()}-bonus`,
        productId: product._id,
        productName: product.productName,
        companyName: product.companyName,
        containerSize: product.containerSize,
        quantity: Number(bonusQty),
        rate: Number(rate),
        discount: 0,
        extraDiscount: 0,
        total: 0,
        isBonus: true,
      })
    }

    setDraftItems((prev) => [...prev, ...newItems])
  }

  const billTotal = useMemo(
    () => draftItems.reduce((sum, item) => (!item.isBonus ? sum + Number(item.total || 0) : sum), 0),
    [draftItems]
  )

  const handleSaveBill = () => {
    if (draftItems.length === 0) return
    onCreateBill({
      clientId: selectedClient._id,
      clientName: selectedClient.clientName,
      clientAddress: selectedClient.clientAddress,
      fieldOfficerId,
      salesmanId,
      billDate,
      totalAmount: Math.round(billTotal * 100) / 100,
      items: draftItems,
    })
  }

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-5 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">New Invoice Composer</h3>
          <p className="mt-0.5 text-xs text-blue-200">
            Interactive simulation of client-specific rate memory, dual discounts, and free bonus items
          </p>
        </div>
        <span className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
          Keyboard-First Flow
        </span>
      </div>

      {/* Party & Dispatch Metadata */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Client</label>
          <select
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value)
              applyClientProductDefaults(e.target.value, selectedProductId)
            }}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
          >
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.clientName} ({c.clientAddress})
              </option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-slate-500">
            {selectedClient.isFiler ? `Tax Filer · NTN ${selectedClient.ntnNumber}` : "Non-Filer Party"}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Field Officer
          </label>
          <select
            value={fieldOfficerId}
            onChange={(e) => setFieldOfficerId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
          >
            {DEMO_FIELD_OFFICERS.map((fo) => (
              <option key={fo._id} value={fo._id}>
                {fo.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Salesman</label>
          <select
            value={salesmanId}
            onChange={(e) => setSalesmanId(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
          >
            {DEMO_SALESMEN.map((sm) => (
              <option key={sm._id} value={sm._id}>
                {sm.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Bill Date</label>
          <input
            type="date"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900"
          />
        </div>
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-extrabold text-slate-900">Add Product Line Item</h4>
          {usedMemory ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
              <Sparkles className="h-3 w-3" />
              Client-Specific Rate &amp; Discount Auto-Loaded
            </span>
          ) : (
            <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
              Standard Catalog Price
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
          <div className="col-span-2">
            <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Product</label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value)
                applyClientProductDefaults(clientId, e.target.value)
              }}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-900"
            >
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.productName} ({p.containerSize})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Qty</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Rate (PKR)</label>
            <input
              type="number"
              min="0"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Disc % / Extra %</label>
            <div className="flex gap-1.5">
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                className="w-1/2 rounded-xl border border-slate-300 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-900"
                title="Discount %"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={extraDiscount}
                onChange={(e) => setExtraDiscount(Number(e.target.value) || 0)}
                className="w-1/2 rounded-xl border border-slate-300 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-900"
                title="Extra Discount %"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase text-slate-500">Free Bonus Qty</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={bonusQty}
                onChange={(e) => setBonusQty(Number(e.target.value) || 0)}
                className="w-16 rounded-xl border border-emerald-300 bg-emerald-50 px-2 py-2 text-xs font-bold text-emerald-900"
              />
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Current Invoice Items Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3.5 py-2 text-[11px] font-bold uppercase text-slate-500">Product</th>
                <th className="px-3.5 py-2 text-[11px] font-bold uppercase text-slate-500">Qty</th>
                <th className="px-3.5 py-2 text-[11px] font-bold uppercase text-slate-500">Rate</th>
                <th className="px-3.5 py-2 text-[11px] font-bold uppercase text-slate-500">Disc</th>
                <th className="px-3.5 py-2 text-[11px] font-bold uppercase text-slate-500">Line Total</th>
                <th className="px-3.5 py-2 text-right text-[11px] font-bold uppercase text-slate-500">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {draftItems.map((item) => (
                <tr key={item._id} className={item.isBonus ? "bg-emerald-50/50" : "hover:bg-slate-50"}>
                  <td className="px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.productName}</span>
                      {item.isBonus && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                          BONUS FREE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {item.companyName} · {item.containerSize}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 text-xs font-bold text-slate-800">{item.quantity}</td>
                  <td className="px-3.5 py-2.5 text-xs text-slate-600">
                    {item.isBonus ? "—" : `PKR ${item.rate.toLocaleString()}`}
                  </td>
                  <td className="px-3.5 py-2.5 text-xs text-slate-600">
                    {item.isBonus ? "—" : `${item.discount}%${item.extraDiscount ? ` + ${item.extraDiscount}%` : ""}`}
                  </td>
                  <td className="px-3.5 py-2.5 text-xs font-extrabold text-slate-900">
                    {item.isBonus ? "Free" : `PKR ${item.total.toLocaleString("en-PK", { minimumFractionDigits: 2 })}`}
                  </td>
                  <td className="px-3.5 py-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => setDraftItems((prev) => prev.filter((row) => row._id !== item._id))}
                      className="rounded-lg p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      title="Remove line item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Calculated Invoice Total
            </span>
            <span className="text-2xl font-black text-slate-900">
              PKR {billTotal.toLocaleString("en-PK", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <button
            type="button"
            onClick={handleSaveBill}
            disabled={draftItems.length === 0}
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40"
          >
            Generate Invoice &amp; Open PDF Preview →
          </button>
        </div>
      </div>
    </div>
  )
}

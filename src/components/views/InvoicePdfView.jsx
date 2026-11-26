import { useState } from "react"
import { COMPANY_DEMO, DEMO_FIELD_OFFICERS, DEMO_SALESMEN } from "../../data/showcaseData"

export default function InvoicePdfView({ bills, selectedBillId, onSelectBill }) {
  const [showDiscountAsAmount, setShowDiscountAsAmount] = useState(true)

  const bill = bills.find((b) => b._id === selectedBillId) || bills[0]
  const fieldOfficer = DEMO_FIELD_OFFICERS.find((fo) => fo._id === bill.fieldOfficerId)
  const salesman = DEMO_SALESMEN.find((sm) => sm._id === bill.salesmanId)

  const grossAmount = bill.items.reduce((sum, item) => (!item.isBonus ? sum + item.quantity * item.rate : sum), 0)
  const totalDiscount = grossAmount - Number(bill.totalAmount || 0)

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Select Bill:</span>
          {bills.map((b) => (
            <button
              key={b._id}
              type="button"
              onClick={() => onSelectBill(b._id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                b._id === bill._id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              #{b.billId}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowDiscountAsAmount((prev) => !prev)}
          className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100"
        >
          Discount Display: {showDiscountAsAmount ? "PKR Amount" : "Percentage (%)"}
        </button>
      </div>

      {/* Faithful 15cm x 21cm PDF Sheet Replica (from PdfGenerator.js) */}
      <div className="mx-auto max-w-xl rounded-xl border border-slate-300 bg-white p-6 text-slate-900 shadow-lg">
        {/* Centered Company Header */}
        <div className="border-b-2 border-slate-900 pb-3 text-center">
          <h4 className="text-lg font-black uppercase tracking-tight">{COMPANY_DEMO.companyName}</h4>
          <p className="text-[11px] font-semibold text-slate-700">{COMPANY_DEMO.companyAddress}</p>
        </div>

        {/* Invoice Metadata */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="space-y-0.5">
            <p className="font-bold">Invoice #: {bill.billId}</p>
            <p>
              <span className="font-bold">Name:</span> {bill.clientName}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {bill.clientAddress}
            </p>
          </div>
          <div className="space-y-0.5 text-right">
            <p>
              <span className="font-semibold">Date:</span> {bill.billDate}
            </p>
            <p className="text-slate-600">Field Officer: {fieldOfficer?.name || "N/A"}</p>
            <p className="text-slate-600">Salesman: {salesman?.name || "N/A"}</p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="border-y border-slate-900 bg-slate-100 text-left font-bold">
                <th className="px-1.5 py-1.5">#</th>
                <th className="px-1.5 py-1.5">Description</th>
                <th className="px-1.5 py-1.5 text-right">Qty</th>
                <th className="px-1.5 py-1.5 text-right">Bonus</th>
                <th className="px-1.5 py-1.5 text-right">Rate</th>
                <th className="px-1.5 py-1.5 text-right">Disc</th>
                <th className="px-1.5 py-1.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bill.items.map((item, idx) => {
                const discAmount = item.isBonus
                  ? 0
                  : Math.round(item.quantity * item.rate - Number(item.total || 0))
                return (
                  <tr key={item._id}>
                    <td className="px-1.5 py-1.5 font-bold">{idx + 1}</td>
                    <td className="px-1.5 py-1.5">
                      <span className="block font-bold italic">{item.productName}</span>
                      <span className="block text-[10px] text-slate-500 italic">
                        {item.companyName} - {item.containerSize}
                      </span>
                    </td>
                    <td className="px-1.5 py-1.5 text-right">{item.isBonus ? "-" : item.quantity}</td>
                    <td className="px-1.5 py-1.5 text-right">{item.isBonus ? item.quantity : "-"}</td>
                    <td className="px-1.5 py-1.5 text-right">{Math.round(item.rate)}.00</td>
                    <td className="px-1.5 py-1.5 text-right">
                      {item.isBonus
                        ? "-"
                        : showDiscountAsAmount
                          ? discAmount || "-"
                          : `${item.discount || "-"}%`}
                    </td>
                    <td className="px-1.5 py-1.5 text-right font-bold">
                      {item.isBonus ? "Free" : `${Math.round(item.total)}.00`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Box */}
        <div className="mt-4 flex justify-end border-t border-slate-900 pt-3">
          <div className="w-56 space-y-1 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Gross Amount:</span>
              <span>PKR {Math.round(grossAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total Discount:</span>
              <span>PKR {Math.round(totalDiscount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-slate-300 pt-1 text-sm font-black">
              <span>Net Payable:</span>
              <span>PKR {Math.round(bill.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Warranty Notice Footer */}
        <div className="mt-5 rounded border border-slate-400 bg-slate-50 p-2.5 text-[10px] leading-snug text-slate-700">
          <strong className="block uppercase text-slate-900">Warranty &amp; Invoice Notice:</strong>
          Goods sold on this invoice are covered under manufacturer batch warranty. Format calibrated to compact 15cm × 21cm thermal/laser paper via <code className="font-mono">pdf-lib</code>.
        </div>
      </div>
    </div>
  )
}

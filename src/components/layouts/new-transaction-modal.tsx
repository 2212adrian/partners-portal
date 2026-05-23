import React, { useState } from "react";
import { X, Calendar } from "lucide-react";

// Aligned purpose options with App.tsx Transaction types database
interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    purpose:
      | "Purchase"
      | "Transfer In"
      | "Transfer Out"
      | "Adjustment"
      | "Donation";
    date: string;
    supplier: string;
    invoiceNumber: string;
    notes: string;
  }) => void;
}

function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NewTransactionModal({
  isOpen,
  onClose,
  onCreate,
}: NewTransactionModalProps) {
  // Aligned purpose options with props interface
  const [purpose, setPurpose] = useState<
    "Purchase" | "Transfer In" | "Transfer Out" | "Adjustment" | "Donation"
  >("Purchase");
  const [date, setDate] = useState("23/05/2026");
  const [supplier, setSupplier] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      purpose,
      date,
      supplier: supplier || "—",
      invoiceNumber: invoiceNumber || "—",
      notes: notes || "—",
    });
    setSupplier("");
    setInvoiceNumber("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            New Transaction
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6 space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Purpose
              </label>
              <div className="relative">
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="Purchase">Purchase</option>
                  <option value="Transfer In">Transfer In</option>
                  <option value="Transfer Out">Transfer Out</option>
                  <option value="Adjustment">Adjustment</option>
                  <option value="Donation">Donation</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none border-l pl-2 border-slate-200">
                  <ChevronDown />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Transaction Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Calendar size={15} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Supplier Name{" "}
                <span className="text-slate-400 font-normal lowercase">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                placeholder="Supplier or source"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Invoice #{" "}
                <span className="text-slate-400 font-normal lowercase">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                placeholder="DR / invoice number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Notes{" "}
                <span className="text-slate-400 font-normal lowercase">
                  (optional)
                </span>
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold rounded-lg shadow-sm shadow-indigo-600/10 transition-colors cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { type PageKey, type Transaction } from "../../App"; // Import shared types
import { Box, ArrowLeft, Plus } from "lucide-react";

interface SidebarStockRecordingProps {
  onSelectPage: (page: PageKey) => void;
  selectedTransactionId?: string | null;
  onSelectTransactionId?: (id: string | null) => void;
  transactions?: Transaction[]; // Accepts dynamic state from App.tsx
  onNewTransactionClick?: () => void; // Optional trigger callback on empty states
}

// Mock Transactions database for stock recording (acts as safe fallback)
const mockTransactions: Transaction[] = [
  {
    id: "MIT-20260427-3536",
    type: "Purchase",
    date: "4/27/2026",
    status: "DRAFT",
    supplier: "Zuellig Pharma",
    invoiceNumber: "INV-987654",
    notes: "Direct purchase delivery from regional logistics center.",
    items: [],
  },
  {
    id: "MIT-20260425-1516",
    type: "Purchase",
    date: "4/25/2026",
    status: "DRAFT",
    supplier: "RSG",
    invoiceNumber: "INV-887766",
    notes: "Pending confirmation from receiving officer.",
    items: [],
  },
];

export const SidebarStockRecording: React.FC<SidebarStockRecordingProps> = ({
  onSelectPage,
  selectedTransactionId,
  onSelectTransactionId,
  transactions,
  onNewTransactionClick,
}) => {
  // Defensive Runtime Check: Ensures 'txList' is ALWAYS an array to prevent crash
  const txList = Array.isArray(transactions) ? transactions : mockTransactions;

  return (
    <aside className="w-65 h-full bg-white border-r border-slate-100 flex flex-col justify-between overflow-hidden select-none">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 shrink-0">
          <button
            type="button"
            onClick={() => onSelectPage("Overview")}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-4 group font-semibold cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span className="text-[12px]">Back to Main Menu</span>
          </button>

          {/* Integrated box icon layout to match manual inventory sidebar buttons */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-50 text-orange-400 rounded-lg flex items-center justify-center shrink-0">
              <Box size={18} strokeWidth={2.5} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-700">
                Manual Inventory
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Stock recording
              </p>
            </div>
          </div>
        </div>

        {/* Transactions list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 no-scrollbar">
          {txList.map((tx) => {
            const isSelected = selectedTransactionId === tx.id;
            return (
              <button
                key={tx.id}
                type="button"
                onClick={() =>
                  onSelectTransactionId?.(isSelected ? null : tx.id)
                }
                className={`p-5 flex flex-col items-start transition-all cursor-pointer w-full text-left ${
                  isSelected
                    ? "bg-indigo-50/40 border-l-4 border-[#4f46e5]"
                    : "hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <span
                  className={`text-xs transition-colors ${isSelected ? "font-bold text-indigo-700" : "font-semibold text-slate-800"}`}
                >
                  {tx.id}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1">
                  {tx.type} • {tx.date}
                </span>
                <span
                  className={`mt-2.5 bg-slate-100 text-[9px] tracking-widest px-2.5 py-0.5 rounded uppercase ${
                    isSelected
                      ? "font-bold text-indigo-600/80"
                      : "font-semibold text-slate-500"
                  }`}
                >
                  {tx.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions and Navigation links */}
      <div className="p-4 border-t border-slate-100 space-y-3.5 bg-white shrink-0">
        <button
          type="button"
          onClick={onNewTransactionClick} // Added click handler here to launch the modal
          className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white py-3 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-600/15"
        >
          <Plus size={14} strokeWidth={3} />
          New Transaction
        </button>

        <div className="flex flex-col gap-2 pt-1 pl-1">
          <button
            type="button"
            onClick={() => onSelectPage("MyOrders")}
            className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer text-left w-full"
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            My Orders
          </button>
        </div>
      </div>
    </aside>
  );
};

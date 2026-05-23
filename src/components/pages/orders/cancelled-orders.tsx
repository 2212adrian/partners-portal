import React from "react";
import { XCircle } from "lucide-react";

export const CancelledOrdersPage: React.FC = () => (
  <div className="p-6 space-y-5 h-full overflow-y-auto">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <XCircle size={18} className="text-slate-400" />
        <h1 className="text-xl font-bold text-slate-800">Cancelled Orders</h1>
      </div>
      <p className="text-[13px] text-slate-500">Orders that were cancelled</p>
    </div>

    <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
      <XCircle size={40} className="text-slate-300 mx-auto mb-3" />
      <p className="text-slate-600 font-medium">No cancelled orders</p>
      <p className="text-[12px] text-slate-400 mt-1">Cancelled orders will appear here</p>
    </div>
  </div>
);
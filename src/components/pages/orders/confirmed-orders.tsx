// src/components/pages/orders/confirmed-orders.tsx
import React from "react";
import { ShieldCheck } from "lucide-react";

export const ConfirmedOrdersPage: React.FC = () => (
  <div className="p-6 space-y-5 h-full overflow-y-auto">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <ShieldCheck size={18} className="text-indigo-500" />
        <h1 className="text-xl font-bold text-slate-800">Confirmed Orders</h1>
      </div>
      <p className="text-[13px] text-slate-500">Orders confirmed and ready for processing</p>
    </div>

    <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-200">
      <ShieldCheck size={40} className="text-indigo-400 mx-auto mb-3" />
      <p className="text-slate-600 font-medium">No confirmed orders</p>
      <p className="text-[12px] text-slate-400 mt-1">Confirmed orders will appear here</p>
    </div>
  </div>
);
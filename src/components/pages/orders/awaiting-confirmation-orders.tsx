import React from "react";
import { CheckCircle, Package, MapPin, Clock } from "lucide-react";

export const AwaitingConfirmationOrdersPage: React.FC = () => (
  <div className="p-6 space-y-5 h-full overflow-y-auto">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle size={18} className="text-sky-500" />
        <h1 className="text-xl font-bold text-slate-800">Awaiting Confirmation</h1>
      </div>
      <p className="text-[13px] text-slate-500">Orders pending seller confirmation</p>
    </div>

    <div className="bg-sky-50 rounded-xl p-6 text-center border border-sky-200">
      <CheckCircle size={40} className="text-sky-400 mx-auto mb-3" />
      <p className="text-slate-600 font-medium">No orders awaiting confirmation</p>
      <p className="text-[12px] text-slate-400 mt-1">New orders will appear here</p>
    </div>
  </div>
);
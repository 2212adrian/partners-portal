import React from "react";
import { Wallet, Package, MapPin, AlertCircle } from "lucide-react";

export const AwaitingPaymentOrdersPage: React.FC = () => (
  <div className="p-6 space-y-5 h-full overflow-y-auto">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Wallet size={18} className="text-orange-500" />
        <h1 className="text-xl font-bold text-slate-800">Awaiting Payment</h1>
      </div>
      <p className="text-[13px] text-slate-500">Orders waiting for payment confirmation</p>
    </div>

    <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-200">
      <Wallet size={40} className="text-orange-400 mx-auto mb-3" />
      <p className="text-slate-600 font-medium">No pending payments</p>
      <p className="text-[12px] text-slate-400 mt-1">All payments are up to date</p>
    </div>
  </div>
);
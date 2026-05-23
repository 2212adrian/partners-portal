import React from "react";
import { Truck } from "lucide-react";

export const ShippedOrdersPage: React.FC = () => (
  <div className="p-6 space-y-5 h-full overflow-y-auto">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Truck size={18} className="text-purple-500" />
        <h1 className="text-xl font-bold text-slate-800">Shipped Orders</h1>
      </div>
      <p className="text-[13px] text-slate-500">Orders on the way to customers</p>
    </div>

    <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
      <Truck size={40} className="text-purple-400 mx-auto mb-3" />
      <p className="text-slate-600 font-medium">No shipped orders</p>
      <p className="text-[12px] text-slate-400 mt-1">Shipped orders will appear here</p>
    </div>
  </div>
);
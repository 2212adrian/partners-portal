import React from "react";
import { SlidersHorizontal } from "lucide-react";

export const StoreSetupPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Store Setup</h1>
      <p className="text-sm text-slate-500">
        Configure the product and inventory settings for your store.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <SlidersHorizontal size={20} />
        <span className="font-semibold">Configuration status</span>
      </div>
      <p className="text-slate-600">
        Your store settings are configured and ready for active trade.
      </p>
    </div>
  </div>
);

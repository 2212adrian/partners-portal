import React from "react";
import { Archive } from "lucide-react";

export const ManualInventoryPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Manual Inventory</h1>
      <p className="text-sm text-slate-500">
        Manage items that require manual stock updates.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <Archive size={20} />
        <span className="font-semibold">Inventory actions</span>
      </div>
      <p className="text-slate-600">
        Review and update stock quantities that were entered manually.
      </p>
    </div>
  </div>
);

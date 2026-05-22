import React from "react";
import { Users } from "lucide-react";

export const SuppliersPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Suppliers</h1>
      <p className="text-sm text-slate-500">
        View your approved supplier network and partner details.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 text-sky-500 mb-4">
          <Users size={20} />
          <span className="font-semibold">Active suppliers</span>
        </div>
        <div className="text-3xl font-bold text-slate-800">12</div>
        <p className="text-sm text-slate-600 mt-2">
          Suppliers available for stock replenishment.
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
          Top supplier
        </div>
        <div className="text-slate-800 font-medium">Pacific Pharma Supply</div>
      </div>
    </div>
  </div>
);

import React from "react";
import { Building } from "lucide-react";

export const FacilityPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Facility</h1>
      <p className="text-sm text-slate-500">
        Review your store facility and available service capabilities.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <Building size={20} />
        <span className="font-semibold">Facility details</span>
      </div>
      <ul className="space-y-3 text-slate-600">
        <li>- Pharmacy sales area</li>
        <li>- Delivery packaging station</li>
        <li>- Cold storage for vaccines</li>
      </ul>
    </div>
  </div>
);

import React from "react";
import { MapPin } from "lucide-react";

export const AddressPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Address</h1>
      <p className="text-sm text-slate-500">
        Review and update your store address information.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-2xl">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <MapPin size={20} />
        <span className="font-semibold">Store location</span>
      </div>
      <div className="grid gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Address line
          </div>
          <div className="text-slate-800 font-medium">
            123 Bayoran Street, Barangay Central
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            City
          </div>
          <div className="text-slate-800 font-medium">Cebu City</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              Province
            </div>
            <div className="text-slate-800 font-medium">Cebu</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              Postal Code
            </div>
            <div className="text-slate-800 font-medium">6000</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

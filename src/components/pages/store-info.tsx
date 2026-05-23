import React from "react";
// Removed unused Calendar import to satisfy the compiler
import {
  Store,
  Hash,
  Tag,
  Fingerprint,
  Info,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const StoreInfoPage: React.FC = () => {
  return (
    // Updated background with the canonical color name
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-brand-bg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-100">
            <Store className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Store Info
            </h1>
            <p className="text-[13px] font-medium text-slate-500">
              Managing your official pharmacy profile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl w-fit">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest">
            Status: Draft
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <CheckCircle2 size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Store Identity
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Store Name
                </label>
                <p className="text-2xl font-bold text-slate-800">
                  Markitech Pharma One
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Store Code
                  </label>
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-lg">
                    <Hash size={14} />
                    <span className="font-mono font-bold text-sm">
                      STR-000003
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Store Type
                  </label>
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-lg">
                    <Tag size={14} />
                    <span className="font-bold text-[12px]">PHARMACY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <Fingerprint size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Technical Integration
              </h2>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Partner ID
              </label>
              <p className="font-mono text-[13px] text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 break-all leading-relaxed">
                cd308a75-e7f8-48b7-98ec-49f6f12e005b
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Audit Trail - Lightened Background */}
          <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-emerald-600/50">
              <Clock size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Audit Trail
              </h2>
            </div>

            <div className="space-y-6">
              {/* Updated absolute positioning with canonical spacing scale */}
              <div className="relative pl-6 border-l-2 border-emerald-200">
                <div className="absolute -left-1.25 top-0 w-2 h-2 rounded-full bg-emerald-500" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Created Date
                </label>
                <p className="text-sm font-bold text-slate-700">3/6/2026</p>
              </div>

              {/* Updated absolute positioning with canonical spacing scale */}
              <div className="relative pl-6 border-l-2 border-emerald-200">
                <div className="absolute -left-1.25 top-0 w-2 h-2 rounded-full bg-emerald-400" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Last Updated
                </label>
                <p className="text-sm font-bold text-slate-700">3/6/2026</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="bg-sky-50 p-3 rounded-2xl w-fit mb-4">
              <Info className="text-sky-500" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">
              Need to update info?
            </h3>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              Profile details are currently locked for security. Please submit a
              request to the Partners Helpdesk for any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

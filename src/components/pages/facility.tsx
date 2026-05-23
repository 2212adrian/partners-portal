import React, { useState } from "react";
import { Building2, Ruler, Warehouse, Snowflake, Zap, Info, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const FacilityPage: React.FC = () => {
  const [hasColdChain, setHasColdChain] = useState(false);
  const [hasGenerator, setHasGenerator] = useState(false);

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-brand-bg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-100">
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Facility</h1>
            <p className="text-[13px] font-medium text-slate-500">Physical infrastructure and technical capabilities</p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit">
          <ShieldCheck size={16} className="text-indigo-500" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Facility Audit</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-indigo-500">
              <Ruler size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Dimensions & Capabilities</h2>
            </div>
            
            <div className="space-y-10">
              {/* Floor Area */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-1/3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-0">
                  Floor Area (SQM)
                </label>
                <div className="w-full sm:w-2/3 border-b border-slate-100 pb-2">
                  <span className="text-slate-300 font-bold">---</span>
                </div>
              </div>

              {/* Storage Area */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-1/3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-0">
                  Storage Area (SQM)
                </label>
                <div className="w-full sm:w-2/3 border-b border-slate-100 pb-2">
                  <span className="text-slate-300 font-bold">---</span>
                </div>
              </div>

              {/* Cold Chain Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-1/3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-0">
                  Cold Chain
                </label>
                <div className="w-full sm:w-2/3 flex items-center gap-3">
                  <button 
                    onClick={() => setHasColdChain(!hasColdChain)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer duration-200 focus:outline-none ${hasColdChain ? 'bg-emerald-500' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: hasColdChain ? 22 : 2 }}
                      className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                  <span className={`text-[13px] font-semibold ${hasColdChain ? 'text-slate-700' : 'text-slate-400'}`}>
                    Has cold storage capability
                  </span>
                </div>
              </div>

              {/* Generator Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <label className="w-full sm:w-1/3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-0">
                  Generator
                </label>
                <div className="w-full sm:w-2/3 flex items-center gap-3">
                  <button 
                    onClick={() => setHasGenerator(!hasGenerator)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer duration-200 focus:outline-none ${hasGenerator ? 'bg-emerald-500' : 'bg-slate-200'}`}
                  >
                    <motion.div 
                      animate={{ x: hasGenerator ? 22 : 2 }}
                      className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                  <span className={`text-[13px] font-semibold ${hasGenerator ? 'text-slate-700' : 'text-slate-400'}`}>
                    Has backup generator
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 flex items-center gap-3">
            <Info size={16} className="text-indigo-400 shrink-0" />
            <p className="text-[12px] text-indigo-700 font-medium">
              These details are verified during on-site inspections by our quality assurance team.
            </p>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-slate-400">
              <Warehouse size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Summary</h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Area</label>
                <p className="text-xl font-bold text-slate-300 tracking-tight">Pending Calculation</p>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Snowflake size={14} className={hasColdChain ? "text-blue-500" : "text-slate-300"} />
                    <span className="text-[12px] font-bold text-slate-600">Cold Chain</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${hasColdChain ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    {hasColdChain ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className={hasGenerator ? "text-amber-500" : "text-slate-300"} />
                    <span className="text-[12px] font-bold text-slate-600">Power Backup</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${hasGenerator ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    {hasGenerator ? "ACTIVE" : "INACTIVE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl border border-slate-200 p-6 shadow-sm text-white">
            <h3 className="font-bold text-white text-sm mb-2">Compliance Ready?</h3>
            <p className="text-[12px] text-slate-400 leading-relaxed font-medium">
              Updating your facility details helps us match your store with premium pharmaceutical suppliers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
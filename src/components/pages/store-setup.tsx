import React from "react";
import { 
  Settings2, 
  CheckCircle2, 
  Circle, 
  Layers, 
  Box, 
  Coins, 
  Clock, 
  Info, 
  AlertTriangle,
  Monitor
} from "lucide-react";

export const StoreSetupPage: React.FC = () => {
  const operations = [
    { name: "POS", active: true },
    { name: "Procurement", active: false },
    { name: "Delivery", active: false },
    { name: "Inventory", active: false },
    { name: "E-Commerce", active: false },
    { name: "Prescription Required", active: true },
  ];

  const configData = [
    { label: "Currency", value: "---" },
    { label: "Timezone", value: "---" },
    { label: "Invoice Prefix", value: "---" },
    { label: "Tax Rate", value: "---" },
    { label: "Price Rounding", value: "NONE" },
    { label: "Max Users", value: "---" },
    { label: "Max Terminals", value: "---" },
    { label: "Support Contact", value: "---" },
  ];

  const stockData = [
    { label: "Min Stock Alert", value: "---" },
    { label: "Reorder Point", value: "---" },
    { label: "Allow Negative Stock", value: "No" },
    { label: "Allow Backorder", value: "No" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500 rounded-2xl shadow-lg shadow-purple-100">
            <Settings2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Store Setup</h1>
            <p className="text-[13px] font-medium text-slate-500">Core operational settings and business rules</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit">
          <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">DRAFT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Operations Checklist Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <Layers size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Operations</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {operations.map((op) => (
                <div key={op.name} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  {op.active ? (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  ) : (
                    <Circle size={18} className="text-slate-200 shrink-0" />
                  )}
                  <span className={`text-[12px] font-bold ${op.active ? 'text-slate-700' : 'text-slate-400'}`}>
                    {op.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Grid Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-purple-500">
              <Coins size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">General Configuration</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
              {configData.map((item) => (
                <div key={item.label}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    {item.label}
                  </label>
                  <p className={`text-[15px] font-bold ${item.value === '---' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Settings Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-slate-400">
              <Box size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Stock Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
              {stockData.map((item) => (
                <div key={item.label}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    {item.label}
                  </label>
                  <p className={`text-[15px] font-bold ${item.value === '---' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Setup Summary Card */}
          <div className="bg-purple-50/50 rounded-3xl p-6 sm:p-8 border border-purple-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-purple-600/40">
              <Monitor size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Terminal Readiness</h2>
            </div>

            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-purple-200">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-purple-500" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">POS Module</label>
                <p className="text-sm font-bold text-emerald-600">Enabled</p>
              </div>

              <div className="relative pl-6 border-l-2 border-purple-100">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-200" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">E-Commerce</label>
                <p className="text-sm font-bold text-slate-400 italic">Inactive</p>
              </div>
            </div>
          </div>

          {/* Guidelines Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="bg-amber-50 p-3 rounded-2xl w-fit mb-4">
              <AlertTriangle className="text-amber-500" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">Locked Fields</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              Operational rules like Currency and Max Users are set during the onboarding phase. Contact your account manager to adjust these limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
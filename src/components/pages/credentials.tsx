import React, { useState } from "react";
import { Key, Eye, EyeOff, RefreshCw, Copy, ShieldAlert, Lock, CheckCircle2, Fingerprint } from "lucide-react";

export const CredentialsPage: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  const clientId = "store_fb95bbd0_7da991bc";
  const clientSecret = "••••••••••••••••••••••••••••••••••••••••";
  const actualSecret = "sec_82hJ92nsL01mPX72vBq920XnZ1mO92q"; // Mock secret for "Show"

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-brand-bg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-100">
            <Key className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">POS API Credentials</h1>
            <p className="text-[13px] font-medium text-slate-500">API authentication for third-party POS integrations</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Active Keys</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Credentials Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
            {/* Header of Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                  <Lock size={18} />
                </div>
                <div>
                  <h2 className="text-[14px] font-bold text-slate-700">Store Credentials</h2>
                  <p className="text-[12px] text-slate-400 font-medium">Used by the POS application to authenticate.</p>
                </div>
              </div>
              
              <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 cursor-pointer rounded-xl text-[12px] font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100">
                <RefreshCw size={14} />
                Regenerate
              </button>
            </div>

            {/* Credential Fields */}
            <div className="space-y-8">
              {/* Client ID */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client ID</label>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 hover:text-indigo-600">
                    <Copy size={14} />
                  </button>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[13px] text-slate-600 font-bold">
                  {clientId}
                </div>
              </div>

              {/* Client Secret */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Secret</label>
                  <button 
                    onClick={() => setShowSecret(!showSecret)}
                    className="flex items-center gap-1.5 text-[11px] font-bold cursor-pointer text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showSecret ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[13px] text-slate-600 font-bold overflow-hidden truncate">
                  {showSecret ? actualSecret : clientSecret}
                </div>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="mt-10 pt-6 border-t border-slate-50 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="text-[11px] text-slate-400 font-medium">
                Last generated: <span className="font-bold text-slate-500">3/6/2026, 9:09:44 PM</span>
              </span>
            </div>
          </div>

          {/* Security Alert Note */}
          <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/50 flex items-start gap-3">
            <ShieldAlert size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-800 font-medium leading-relaxed">
              Never share your Client Secret. If you suspect your credentials have been compromised, use the 
              Regenerate button immediately to invalidate the current keys.
            </p>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-slate-400">
              <Fingerprint size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Integration Info</h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Environment</label>
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg w-fit text-[11px] font-bold">PRODUCTION</div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Auth Method</label>
                <p className="text-sm font-bold text-slate-700">OAuth2 Client Credentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
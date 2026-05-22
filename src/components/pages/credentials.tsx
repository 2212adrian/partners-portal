import React from "react";
import { Key } from "lucide-react";

export const CredentialsPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Credentials</h1>
      <p className="text-sm text-slate-500">
        Review your API, payment, and account credentials.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-2xl">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <Key size={20} />
        <span className="font-semibold">Current credentials</span>
      </div>
      <div className="grid gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Store API key
          </div>
          <div className="text-slate-800 font-medium">************1234</div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Payment connector
          </div>
          <div className="text-slate-800 font-medium">JuanPay Gateway</div>
        </div>
      </div>
    </div>
  </div>
);

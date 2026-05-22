import React from "react";
import { FileText } from "lucide-react";

export const DocumentsPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Documents</h1>
      <p className="text-sm text-slate-500">
        Manage your required KYC documents and verification status.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <FileText size={20} />
        <span className="font-semibold">Required documents</span>
      </div>
      <ul className="space-y-3 text-slate-600">
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>Owner GOV
          ID
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>Business
          permit
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>Pharmacy
          license
        </li>
      </ul>
    </div>
  </div>
);

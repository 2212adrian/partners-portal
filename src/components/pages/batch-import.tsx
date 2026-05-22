import React from "react";
import { UploadCloud } from "lucide-react";

export const BatchImportPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Batch Import</h1>
      <p className="text-sm text-slate-500">
        Upload bulk inventory or product data files.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-2xl">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <UploadCloud size={20} />
        <span className="font-semibold">Import files</span>
      </div>
      <p className="text-slate-600">
        Choose a CSV or XLSX file to import your product and stock data.
      </p>
    </div>
  </div>
);

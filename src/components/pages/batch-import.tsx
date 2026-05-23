import React, { useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileUp,
} from "lucide-react";

interface ImportedRecord {
  row: number;
  brandName: string;
  strengthInn: string;
  form: string;
  packSize: string;
  manufacturer: string;
  barcode: string;
  status: "VALID" | "INVALID";
  errorDetails?: string;
}

const mockTemplateData: ImportedRecord[] = [
  {
    row: 1,
    brandName: "Amoxil",
    strengthInn: "Amoxicillin 500mg",
    form: "Capsule",
    packSize: "100s",
    manufacturer: "GSK",
    barcode: "4801234567890",
    status: "VALID",
  },
  {
    row: 2,
    brandName: "Biogesic",
    strengthInn: "Paracetamol 500mg",
    form: "Tablet",
    packSize: "500s",
    manufacturer: "Unilab",
    barcode: "4802345678901",
    status: "VALID",
  },
  {
    row: 3,
    brandName: "Advil",
    strengthInn: "Ibuprofen 400mg",
    form: "Tablet",
    packSize: "100s",
    manufacturer: "Pfizer",
    barcode: "4803456789012",
    status: "VALID",
  },
  {
    row: 4,
    brandName: "Alnix",
    strengthInn: "",
    form: "Tablet",
    packSize: "100s",
    manufacturer: "Unilab",
    barcode: "4804567890234",
    status: "INVALID",
    errorDetails: "Missing critical 'Strength / INN' value.",
  },
  {
    row: 5,
    brandName: "Solmux",
    strengthInn: "Carbocisteine 500mg",
    form: "Capsule",
    packSize: "100s",
    manufacturer: "Unilab",
    barcode: "4806789012345",
    status: "VALID",
  },
];

export const BatchImportPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isImported, setIsImported] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importCompleted, setImportCompleted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startSimulatedUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startSimulatedUpload(e.dataTransfer.files[0]);
    }
  };

  const startSimulatedUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);
    setImportCompleted(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setIsImported(true);
      }
    }, 120);
  };

  const handleProcessImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setImportCompleted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFile(null);
    setIsImported(false);
    setImportCompleted(false);
    setUploadProgress(0);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-brand-bg select-none">
      {/* 1. Header Section */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-2xl shadow-sm">
          <FileUp size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Batch Import
          </h1>
          <p className="text-[13px] font-semibold text-slate-400">
            Import bulk stock items into your active warehouse catalog
          </p>
        </div>
      </div>

      {importCompleted ? (
        /* 2. Success screen card */
        <div className="max-w-2xl bg-white border border-slate-200 p-8 rounded-3xl shadow-sm text-center flex flex-col items-center space-y-6 mx-auto mt-8 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shadow-inner shadow-emerald-500/5">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Bulk Import Complete
            </h2>
            <p className="text-xs font-bold text-slate-400 max-w-sm mx-auto leading-relaxed">
              We have successfully updated your inventory catalogs. 4 rows were
              created. 1 row was skipped.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-black px-6 py-3 rounded-2xl transition-all shadow-md shadow-brand-blue/10 cursor-pointer"
          >
            Upload Another File
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 3. Drag and Drop Uploader Module */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                Spreadsheet Upload
              </h2>

              {!file && !isUploading && (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-200 hover:border-brand-blue/40 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group bg-slate-50/20"
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="p-4 bg-slate-100/60 rounded-2xl text-slate-400 group-hover:text-brand-blue group-hover:bg-brand-blue/10 transition-colors mb-4 flex items-center justify-center">
                    <Upload size={28} />
                  </div>
                  <h3 className="text-sm font-black text-slate-800 mb-1">
                    Drag and drop file here
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    or click to browse local folders
                  </p>
                  <span className="text-[10px] text-slate-300 font-semibold">
                    Supports .xlsx, .xls, and .csv files up to 20MB
                  </span>
                </div>
              )}

              {isUploading && (
                <div className="border border-slate-150 rounded-2xl p-8 flex flex-col space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                    <span className="truncate max-w-[70%]">{file?.name}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-blue h-full transition-all duration-150 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                    Uploading files into secure processing environment...
                  </p>
                </div>
              )}

              {isImported && file && (
                <div className="space-y-6">
                  {/* File Metadata Pill info */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center">
                        <FileSpreadsheet size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-slate-800 leading-tight truncate max-w-sm">
                          {file.name}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">
                          {(file.size / 1024).toFixed(1)} KB • CSV Format
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-black text-rose-500 hover:text-rose-700 cursor-pointer hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  {/* 4. Tabular Spreadsheet Row Preview and Validations */}
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Pre-Import Validation Check
                    </h3>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 max-h-96 overflow-y-auto">
                      <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                          <tr className="border-b border-slate-200 text-[9px] font-black tracking-widest text-slate-400 uppercase bg-slate-50 h-10 select-none">
                            <th className="py-2 pl-4 w-[10%]">Row</th>
                            <th className="px-3 py-2 w-[25%]">Brand Name</th>
                            <th className="px-3 py-2 w-[35%]">
                              INN / Strength
                            </th>
                            <th className="px-3 py-2 w-[15%]">Status</th>
                            <th className="px-3 py-2 pr-4 w-[15%]">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150">
                          {mockTemplateData.map((record) => (
                            <tr
                              key={record.row}
                              className="h-14 hover:bg-slate-50/40"
                            >
                              <td className="py-2 pl-4 text-xs font-bold text-slate-400">
                                #{record.row}
                              </td>
                              <td className="px-3 py-2 text-xs font-extrabold text-slate-800 truncate">
                                {record.brandName}
                              </td>
                              <td className="px-3 py-2 text-xs font-bold text-slate-600 truncate">
                                {record.strengthInn || (
                                  <span className="text-rose-500 font-black italic">
                                    EMPTY
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2">
                                <span
                                  className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase ${
                                    record.status === "VALID"
                                      ? "bg-emerald-50 text-brand-green border border-brand-green/10"
                                      : "bg-rose-50 text-rose-600 border border-rose-100"
                                  }`}
                                >
                                  {record.status}
                                </span>
                              </td>
                              <td className="px-3 py-2 pr-4 text-[10px] font-semibold text-slate-400 truncate">
                                {record.status === "INVALID" ? (
                                  <span className="text-rose-500 font-bold flex items-center gap-1">
                                    <AlertCircle size={11} />
                                    Error
                                  </span>
                                ) : (
                                  <span className="text-emerald-600 flex items-center gap-1">
                                    <CheckCircle2 size={11} />
                                    Ok
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Operational Action Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleProcessImport}
                      disabled={isProcessing}
                      className="bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 text-white text-xs font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-md shadow-brand-blue/15 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Process Batch Import"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs px-6 py-3 rounded-2xl transition-colors cursor-pointer"
                    >
                      Reset Uploader
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar instruction cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-2xl w-fit mb-5">
                <FileSpreadsheet size={20} />
              </div>
              <h3 className="font-black text-slate-800 text-sm mb-2">
                Import Template
              </h3>
              <p className="text-[12px] text-slate-500 leading-relaxed font-semibold mb-6">
                Ensure proper fields configuration before copying stock records.
                You can download the default inventory spreadsheet format using
                the link below.
              </p>

              <button
                type="button"
                className="w-full flex items-center justify-between p-4 bg-brand-bg border border-slate-150 rounded-2xl hover:border-brand-blue/30 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-brand-green shadow-inner">
                    <FileSpreadsheet size={16} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 leading-none">
                      CatalogTemplate.csv
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                      Blank Sample • 12 KB
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-black text-brand-blue hover:underline">
                  Download
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

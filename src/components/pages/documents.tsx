import React, { useState } from "react";
import { FileText, UploadCloud, CheckCircle2, Circle, AlertCircle, Info, ShieldCheck, FileUp } from "lucide-react";

export const DocumentsPage: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState("OWNER GOV ID");

  const checklist = [
    { name: "OWNER GOV ID", status: false },
    { name: "BUSINESS PERMIT", status: false },
    { name: "PHARMACY LICENSE", status: false },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-violet-500 rounded-2xl shadow-lg shadow-violet-100">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Documents</h1>
            <p className="text-[13px] font-medium text-slate-500">Manage your KYC verification files and licenses</p>
          </div>
        </div>

        {/* Verification Status Badge */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit">
          <AlertCircle size={16} className="text-amber-500" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Action Required</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Required Checklist Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <ShieldCheck size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Required Checklist</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {checklist.map((item) => (
                <div key={item.name} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  {item.status ? (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  ) : (
                    <Circle size={18} className="text-slate-300 shrink-0" />
                  )}
                  <span className="text-[11px] font-bold text-slate-600 leading-tight">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Document Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-violet-500">
              <UploadCloud size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Upload Document</h2>
            </div>
            
            <div className="space-y-6">
              {/* Doc Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Document Type</label>
                <select 
                  value={selectedDoc}
                  onChange={(e) => setSelectedDoc(e.target.value)}
                  className="w-full sm:w-2/3 p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-violet-300 transition-colors"
                >
                  <option>OWNER GOV ID</option>
                  <option>BUSINESS PERMIT</option>
                  <option>PHARMACY LICENSE</option>
                </select>
              </div>

              {/* File Input Area */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center justify-between p-2 pl-4 border border-slate-200 rounded-xl bg-white group hover:border-violet-300 transition-colors cursor-pointer">
                  <span className="text-slate-400 text-sm font-medium">Choose File No file chosen</span>
                  <div className="bg-slate-100 px-3 py-2 rounded-lg text-[11px] font-bold text-slate-500 group-hover:bg-violet-50 group-hover:text-violet-600">
                    Browse
                  </div>
                </div>
                <button className="bg-violet-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-violet-100 hover:bg-violet-700 cursor-pointer transition-all flex items-center justify-center gap-2">
                  <FileUp size={18} />
                  Upload
                </button>
              </div>

              <p className="text-[11px] text-slate-400 font-medium italic">
                Accepted: PDF, JPEG, PNG. Max 10 MB.
              </p>
            </div>
          </div>

          {/* Empty State Text */}
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-[2rem]">
            <p className="text-sm font-medium text-slate-400">No documents uploaded yet.</p>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Verification Progress */}
          <div className="bg-violet-50/50 rounded-3xl p-6 sm:p-8 border border-violet-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-violet-600/40">
              <FileText size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">KYC Progress</h2>
            </div>

            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-slate-200">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-300" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Upload Stage</label>
                <p className="text-sm font-bold text-slate-500">0 of 3 files</p>
              </div>

              <div className="relative pl-6 border-l-2 border-slate-200">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-300" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Approval Status</label>
                <p className="text-sm font-bold text-slate-400 italic">Awaiting Submission</p>
              </div>
            </div>
          </div>

          {/* Guidelines Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="bg-blue-50 p-3 rounded-2xl w-fit mb-4">
              <Info className="text-blue-500" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">Upload Guidelines</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              Ensure all documents are clearly legible and not expired. For IDs, please scan both the front and back of the card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
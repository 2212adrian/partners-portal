import React from "react";
import { MapPin, Navigation, Globe, Building2, Map as MapIcon, Landmark } from "lucide-react";

export const AddressPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-500 rounded-2xl shadow-lg shadow-pink-100">
            <MapPin className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Address</h1>
            <p className="text-[13px] font-medium text-slate-500">Physical store location and mailing details</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit">
          <div className="w-2 h-2 rounded-full bg-pink-500" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Verified Location</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-pink-500">
              <Navigation size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Street Details</h2>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Address Line 1</label>
                <p className="text-lg font-bold text-slate-800">42 Scout Bayoran Street</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Barangay</label>
                  <p className="text-[15px] font-semibold text-slate-700">South Triangle</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Address Line 2</label>
                  <p className="text-[13px] italic text-slate-400">Not provided</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-slate-400">
              <Landmark size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Administrative Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">City</label>
                <p className="text-[15px] font-bold text-slate-700">Quezon City</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Province</label>
                <p className="text-[15px] font-bold text-slate-700">Metro Manila</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Region</label>
                <div className="bg-slate-100 w-fit px-3 py-1 rounded-lg">
                  <span className="font-bold text-[12px] text-slate-600">NCR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* International Section - Lightened Background */}
          <div className="bg-pink-50/50 rounded-3xl p-6 sm:p-8 border border-pink-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-pink-600/40">
              <Globe size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">International</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Postal Code</label>
                <p className="text-3xl font-bold text-pink-600">1117</p>
              </div>

              <div className="pt-6 border-t border-pink-200/50">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Country</label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-pink-100 text-pink-600 rounded flex items-center justify-center font-bold text-[10px]">PH</div>
                  <p className="text-sm font-bold text-slate-700">Philippines</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="bg-pink-50 p-3 rounded-2xl w-fit mb-4">
              <Building2 className="text-pink-500" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">Location Sync</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              This address is synced with your Google Maps business profile to ensure accurate delivery routing for your customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
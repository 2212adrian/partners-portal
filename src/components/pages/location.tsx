import React from "react";
import { Compass, MapPin, Crosshair, Map as MapIcon, Info, ShieldAlert } from "lucide-react";

export const LocationPage: React.FC = () => {
  const geoData = [
    { label: "Latitude", value: "---", icon: MapPin },
    { label: "Longitude", value: "---", icon: MapPin },
    { label: "Accuracy (m)", value: "---", icon: Crosshair },
    { label: "Google Place ID", value: "---", icon: MapIcon },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sky-500 rounded-2xl shadow-lg shadow-sky-100">
            <Compass className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Location</h1>
            <p className="text-[13px] font-medium text-slate-500">Geospatial coordinates and map identifiers</p>
          </div>
        </div>

        {/* Setup Status Badge */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pending Configuration</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Geolocation Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-sky-500">
              <Crosshair size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Geolocation Details</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
              {geoData.map((item) => (
                <div key={item.label} className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon size={14} className="text-slate-300" />
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {item.label}
                    </label>
                  </div>
                  <p className="text-xl font-bold text-slate-300 group-hover:text-slate-400 transition-colors">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Note */}
          <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/50 flex items-center gap-3">
            <ShieldAlert size={16} className="text-sky-400 shrink-0" />
            <p className="text-[12px] text-sky-700 font-medium italic">
              Location coordinates are set by the admin during store setup.
            </p>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Service Area Card */}
          <div className="bg-sky-50/30 rounded-3xl p-6 sm:p-8 border border-sky-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-sky-600/40">
              <Compass size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Service Area</h2>
            </div>

            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-sky-200">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-sky-500" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Marketplace Coverage</label>
                <p className="text-sm font-bold text-slate-400 italic">Not yet defined</p>
              </div>

              <div className="relative pl-6 border-l-2 border-sky-100">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-200" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Delivery Radius</label>
                <p className="text-sm font-bold text-slate-400 italic">---</p>
              </div>
            </div>
          </div>

          {/* Information Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="bg-sky-50 p-3 rounded-2xl w-fit mb-4">
              <Info className="text-sky-500" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">Sync Information</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              Geographic markers are validated manually by the operations team to ensure delivery personnel can find your store precisely. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
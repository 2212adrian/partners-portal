import React from "react";
import { Compass } from "lucide-react";

export const LocationPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Location</h1>
      <p className="text-sm text-slate-500">
        Check your store geolocation and marketplace delivery coverage.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <Compass size={20} />
        <span className="font-semibold">Service area</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Latitude
          </div>
          <div className="text-slate-800 font-medium">10.3157° N</div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            Longitude
          </div>
          <div className="text-slate-800 font-medium">123.8854° E</div>
        </div>
      </div>
      <div className="mt-6 text-slate-600">
        Your store is currently set to serve nearby customers within the city
        and approved delivery zones.
      </div>
    </div>
  </div>
);

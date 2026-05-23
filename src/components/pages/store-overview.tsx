import React from "react";
import { MapPin, ChevronRight } from "lucide-react";

interface Store {
  id: string;
  name: string;
  code: string;
  location: string;
  status: "DRAFT" | "SUBMITTED" | "APPROVED";
  kycStep: 1 | 2 | 3;
}

interface StoreOverviewPageProps {
  // Callback to trigger entering "Manage Store" mode
  onManageStore: (storeId: string) => void;
}

export const StoreOverviewPage: React.FC<StoreOverviewPageProps> = ({
  onManageStore,
}) => {
  // Mock stores list (branches)
  const stores: Store[] = [
    {
      id: "STR-000003",
      name: "Pharma One",
      code: "STR-000003",
      location: "Quezon City, Metro Manila",
      status: "DRAFT",
      kycStep: 1,
    },
    {
      id: "STR-000004",
      name: "Pharma Annex",
      code: "STR-000004",
      location: "Pasig City, Metro Manila",
      status: "APPROVED",
      kycStep: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg p-6 md:p-12 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Store Overview
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Manage your stores, track KYC status, and keep your profile up to
            date.
          </p>
        </div>

        {/* Branch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top header & badge */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {store.name}
                    </h2>
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block mt-1">
                      {store.code}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 text-[10px] font-black rounded-full tracking-wider border ${
                      store.status === "APPROVED"
                        ? "bg-brand-green/10 text-brand-green border-brand-green/20"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {store.status}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-slate-400 mb-6">
                  <MapPin size={14} className="shrink-0" />
                  <span className="text-xs font-semibold">
                    {store.location}
                  </span>
                </div>

                {/* Mini Steps timeline matching Image 1 */}
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 mb-6">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${store.kycStep >= 1 ? "bg-brand-blue" : "bg-slate-200"}`}
                    />
                    <span
                      className={store.kycStep >= 1 ? "text-slate-800" : ""}
                    >
                      Profile
                    </span>
                  </div>
                  <div className="h-px flex-1 mx-2 bg-slate-200" />
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${store.kycStep >= 2 ? "bg-brand-blue" : "bg-slate-200"}`}
                    />
                    <span
                      className={store.kycStep >= 2 ? "text-slate-800" : ""}
                    >
                      Submitted
                    </span>
                  </div>
                  <div className="h-px flex-1 mx-2 bg-slate-200" />
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${store.kycStep >= 3 ? "bg-brand-blue" : "bg-slate-200"}`}
                    />
                    <span
                      className={store.kycStep >= 3 ? "text-slate-800" : ""}
                    >
                      Approved
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onManageStore(store.id)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-blue hover:bg-brand-blue/95 text-white text-xs font-black rounded-2xl transition-all shadow-md shadow-brand-blue/10 cursor-pointer"
              >
                Manage Store
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

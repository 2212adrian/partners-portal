import React from "react";
import { Store } from "lucide-react";

export const StoreInfoPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Store Info</h1>
      <p className="text-sm text-slate-500">
        Manage your store details and registration data.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 text-sky-500 mb-4">
          <Store size={20} />
          <span className="font-semibold">Basic store details</span>
        </div>
        <dl className="grid gap-3 text-slate-600">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-slate-400">
              Store Name
            </dt>
            <dd className="font-medium text-slate-800">
              JuanMeds Store Bayoran
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-slate-400">
              Store ID
            </dt>
            <dd className="font-medium text-slate-800">STR-000001</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-slate-400">
              Approval
            </dt>
            <dd className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              Approved
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
          Store description
        </div>
        <p className="text-slate-600">
          Your pharmacy store profile is live and approved. Manage contact
          details, KYC data, and inventory from the menu.
        </p>
      </div>
    </div>
  </div>
);

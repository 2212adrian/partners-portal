import React from "react";
import { ClipboardList } from "lucide-react";

export const MyOrdersPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">My Orders</h1>
      <p className="text-sm text-slate-500">
        Track your recent orders and order progress.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <ClipboardList size={20} />
        <span className="font-semibold">Order summary</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-slate-700">
          Pending
        </div>
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-slate-700">
          Confirmed
        </div>
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 text-slate-700">
          Delivered
        </div>
      </div>
    </div>
  </div>
);

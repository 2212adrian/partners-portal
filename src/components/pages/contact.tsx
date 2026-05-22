import React from "react";
import { Phone, Mail } from "lucide-react";

export const ContactPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Contact</h1>
      <p className="text-sm text-slate-500">
        Update the store contact person and helpdesk details.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 text-sky-500 mb-4">
          <Phone size={20} />
          <span className="font-semibold">Phone</span>
        </div>
        <div className="text-slate-800 font-medium">+63 912 345 6789</div>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 text-sky-500 mb-4">
          <Mail size={20} />
          <span className="font-semibold">Email</span>
        </div>
        <div className="text-slate-800 font-medium">jechaure@juan-pay.com</div>
      </div>
    </div>
  </div>
);

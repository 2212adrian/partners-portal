import React from "react";
import { Phone, Mail, User, Headset, MessageCircle, Info, ShieldCheck, Smartphone } from "lucide-react";

export const ContactPage: React.FC = () => {
  const contactData = [
    { label: "Contact Person", value: "Jechaure Admin", icon: User },
    { label: "Email Address", value: "jechaure@juan-pay.com", icon: Mail },
    { label: "Mobile Number", value: "+63 912 345 6789", icon: Smartphone },
    { label: "Secondary Phone", value: "---", icon: Phone },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-fuchsia-500 rounded-2xl shadow-lg shadow-fuchsia-100">
            <Phone className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contact</h1>
            <p className="text-[13px] font-medium text-slate-500">Store representatives and communication channels</p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Verified Channels</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Contact Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-fuchsia-500">
              <User size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Primary Representative</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
              {contactData.map((item) => (
                <div key={item.label} className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon size={14} className="text-slate-300" />
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {item.label}
                    </label>
                  </div>
                  <p className="text-[15px] font-bold text-slate-700 group-hover:text-fuchsia-600 transition-colors">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Note */}
          <div className="bg-fuchsia-50/50 rounded-2xl p-4 border border-fuchsia-100/50 flex items-center gap-3">
            <MessageCircle size={16} className="text-fuchsia-400 shrink-0" />
            <p className="text-[12px] text-fuchsia-700 font-medium">
              These details are used for official marketplace notifications and order inquiries.
            </p>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Support Section */}
          <div className="bg-fuchsia-50/30 rounded-3xl p-6 sm:p-8 border border-fuchsia-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-fuchsia-600/40">
              <Headset size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Helpdesk Support</h2>
            </div>

            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-fuchsia-200">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-fuchsia-500" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Support Email</label>
                <p className="text-sm font-bold text-slate-700">support@juan-pay.com</p>
              </div>

              <div className="relative pl-6 border-l-2 border-fuchsia-100">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-200" />
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Office Hours</label>
                <p className="text-sm font-bold text-slate-600">Mon - Fri, 9AM - 6PM</p>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="bg-fuchsia-50 p-3 rounded-2xl w-fit mb-4">
              <Info className="text-fuchsia-500" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">Update Request</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              To change your primary contact email or phone number, please submit a verified request through the support portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
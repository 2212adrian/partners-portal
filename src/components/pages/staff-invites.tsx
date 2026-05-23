import React from "react";
import { UserPlus, Mail, Shield, Send, CheckCircle2, Clock, Info, MoreVertical } from "lucide-react";

export const StaffInvitesPage: React.FC = () => {
  const stats = [
    { label: "Total", value: "3", color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { label: "Accepted", value: "3", color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { label: "Pending", value: "0", color: "text-slate-400", bgColor: "bg-slate-50" },
  ];

  const sentInvites = [
    {
      email: "landergallego1625@gmail.com",
      role: "CASHIER",
      date: "4/22/2026",
      name: "Cashier Landers",
      status: "ACCEPTED",
    },
    {
      email: "juanmiguelechaure@gmail.com",
      role: "STORE MANAGER",
      date: "4/22/2026",
      name: "Admin Chico",
      status: "ACCEPTED",
    },
    {
      email: "rhageo586@gmail.com",
      role: "CASHIER",
      date: "3/6/2026",
      name: "Lana Rhoades",
      status: "ACCEPTED",
    },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 overflow-y-auto h-full bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
            <UserPlus className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Staff Invites</h1>
            <p className="text-[13px] font-medium text-slate-500">STR-000003 - Markitech Pharma One</p>
          </div>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Form & List */}
        <div className="lg:col-span-2 space-y-6">

          {/* Invite Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-8 text-indigo-600">
              <Send size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Invite Staff Member</h2>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                  <input type="text" placeholder="Optional" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[14px] focus:outline-none focus:border-indigo-300 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input type="text" placeholder="Optional" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[14px] focus:outline-none focus:border-indigo-300 transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="email" placeholder="staff@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[14px] focus:outline-none focus:border-indigo-300 transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Role</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[14px] font-bold text-slate-700 outline-none focus:border-indigo-300 transition-all appearance-none cursor-pointer">
                    <option>CASHIER</option>
                    <option>STORE MANAGER</option>
                    <option>INVENTORY CLERK</option>
                  </select>
                </div>
              </div>

              <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 cursor-pointer transition-all flex items-center justify-center gap-2">
                <Send size={18} />
                Send Invite
              </button>
            </form>
          </div>

          {/* Sent Invites List Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={18} />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">Sent Invites</h2>
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {sentInvites.map((invite) => (
                <div key={invite.email} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {invite.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-slate-800">{invite.email}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{invite.role}</span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] font-medium text-slate-400">{invite.date}</span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] font-medium text-slate-400">{invite.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 size={12} />
                      {invite.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-500 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="bg-indigo-50 p-3 rounded-2xl w-fit mb-4">
              <Info className="text-indigo-600" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">Manage Access</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
              Inviting staff members allows them to access specific modules based on their role.
              <br /><br />
              <span className="font-bold">Store Managers</span> can manage inventory and view reports.
              <br /><br />
              <span className="font-bold">Cashiers</span> are restricted to the POS and sales modules.
            </p>
          </div>

          <div className="bg-slate-800 rounded-3xl p-6 shadow-xl text-white">
            <p className="text-[11px] font-bold opacity-50 uppercase tracking-widest mb-4">Security Tip</p>
            <p className="text-[12px] font-medium leading-relaxed">
              Always verify the email address before sending an invite. For security, invitation links expire after 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
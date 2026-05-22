import React from "react";
import { UserPlus } from "lucide-react";

export const StaffInvitesPage: React.FC = () => (
  <div className="p-8 space-y-6 overflow-y-auto h-full">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Staff Invites</h1>
      <p className="text-sm text-slate-500">
        Send and manage invite links for new staff members.
      </p>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500 mb-4">
        <UserPlus size={20} />
        <span className="font-semibold">Invite status</span>
      </div>
      <p className="text-slate-600">
        No pending staff invitations at the moment.
      </p>
    </div>
  </div>
);

import React from "react";
import { Menu, LogOut } from "lucide-react";
import Logo from "../../assets/Logo.png";

interface HeaderProps {
  toggleSidebar: () => void;
  isStoreOverview: boolean; // Prop to track if the current view is "StoreOverview"
}

export const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  isStoreOverview,
}) => {
  return (
    <header className="flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="block md:hidden rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="h-9 w-auto" />

          <span className="hidden md:block text-slate-300 font-light">|</span>

          <div className="hidden flex-col md:flex">
            <span className="hidden text-sm font-bold text-slate-500 lg:block">
              jechaure@juan-pay.com
            </span>
          </div>
        </div>
      </div>

      {/* Right container for the Logout button */}
      <div className="flex items-center gap-6">
        {isStoreOverview && (
          <button className="flex items-center gap-2 border border-slate-200/80 hover:border-rose-200/60 bg-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-600 hover:text-rose-600 hover:bg-rose-50/40 transition-all cursor-pointer shadow-sm">
            <LogOut size={14} className="stroke-[2.5]" />
            Logout
          </button>
        )}
      </div>
    </header>
  );
};
  
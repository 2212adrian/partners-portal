import React from "react";
import { Menu, LogOut } from "lucide-react";
import Logo from "../../assets/Logo.png";

export const Header: React.FC<{ toggleSidebar: () => void }> = ({
  toggleSidebar,
}) => {
  return (
    <header className="flex h-20 items-center justify-between gap-4 border-b border-slate-200 shadow-sm bg-white px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="block md:hidden rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
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

      <div className="flex items-center gap-6"></div>
    </header>
  );
};

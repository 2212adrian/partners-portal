import React from "react";
import { type PageKey } from "../../App";
import {
  LayoutGrid,
  Store,
  MapPin,
  Compass,
  Phone,
  Factory,
  FileText,
  Settings2,
  UserPlus,
  Key,
  ShoppingBag,
  Box,
  UploadCloud,
  CornerDownLeft,
  type LucideIcon,
  LogOut,
  Upload,
} from "lucide-react";

// VIVID MULTI-COLOR ICON BOXES
const iconStyles: Record<string, string> = {
  Overview: "bg-emerald-100 text-emerald-600",
  StoreInfo: "bg-rose-100 text-rose-500",
  Address: "bg-pink-100 text-pink-500",
  Location: "bg-sky-100 text-sky-500",
  Contact: "bg-fuchsia-100 text-fuchsia-500",
  Facility: "bg-slate-100 text-slate-600",
  Documents: "bg-violet-100 text-violet-500",
  StoreSetup: "bg-purple-100 text-purple-500",
  StaffInvites: "bg-indigo-200 text-blue-600",
  Credentials: "bg-amber-100 text-amber-500",
  Suppliers: "bg-emerald-100 text-emerald-600",
  MyOrders: "bg-orange-100 text-orange-500",
  ManualInventory: "bg-orange-50 text-orange-400",
  BatchImport: "bg-teal-100 text-teal-600",
  StoreOverview: "bg-blue-100 text-blue-500",
};

interface SidebarProps {
  activePage: PageKey;
  onSelectPage: (page: PageKey) => void;
  selectedTransactionId?: string | null;
  onSelectTransactionId?: (id: string | null) => void;
}

const NavItem = ({
  label,
  icon: Icon,
  active,
  onClick,
  pageKey,
}: {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick: () => void;
  pageKey: PageKey;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex items-center gap-4 px-6 py-2.5 w-full transition-all group ${
      active ? "bg-[#EEF2FF]" : "hover:bg-slate-50"
    }`}
  >
    {/* Icon Container */}
    <div
      className={`p-1.5 rounded-md flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${iconStyles[pageKey]}`}
    >
      <Icon size={18} strokeWidth={2.5} />
    </div>

    {/* Label - Bold if selected, Semibold if unselected */}
    <span
      className={`text-[14px] transition-colors ${
        active
          ? "font-semibold text-slate-900"
          : "font-semibold text-slate-900 group-hover:text-slate-700"
      }`}
    >
      {label}
    </span>

    {/* Right-side Active Line (Emerald) */}
    {active && (
      <div className="absolute right-0 top-0 bottom-0 w-[3.5px] bg-emerald-700" />
    )}
  </button>
);

const SectionLabel = ({ label }: { label: string }) => (
  <div className="px-6 mt-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] select-none">
    {label}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
}) => {
  return (
    <aside className="w-65 h-full bg-white border-r border-slate-100 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. FIXED TOP SECTION */}
      <div className="px-4 pt-4 pb-2 bg-slate-50/60 border-b border-slate-100 shrink-0">
        <button
          type="button"
          onClick={() => onSelectPage("StoreOverview")}
          className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-brand-blue/35 rounded-xl transition-all shadow-sm group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            {/* Dynamic Brand Icon Circle */}
            <div className="p-2 bg-brand-blue/10 text-brand-blue rounded-lg group-hover:scale-110 transition-transform flex items-center justify-center">
              <CornerDownLeft size={14} strokeWidth={3} />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                Back To
              </span>
              <span className="text-xs font-semibold text-slate-800 tracking-tight leading-none group-hover:text-brand-blue transition-colors">
                Store Overview
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* 2. SCROLLABLE NAV ITEMS */}
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <NavItem
          label="Overview"
          icon={LayoutGrid}
          active={activePage === "Overview"}
          onClick={() => onSelectPage("Overview")}
          pageKey="Overview"
        />

        <SectionLabel label="Details" />
        <NavItem
          label="Store Info"
          icon={Store}
          active={activePage === "StoreInfo"}
          onClick={() => onSelectPage("StoreInfo")}
          pageKey="StoreInfo"
        />
        <NavItem
          label="Address"
          icon={MapPin}
          active={activePage === "Address"}
          onClick={() => onSelectPage("Address")}
          pageKey="Address"
        />
        <NavItem
          label="Location"
          icon={Compass}
          active={activePage === "Location"}
          onClick={() => onSelectPage("Location")}
          pageKey="Location"
        />
        <NavItem
          label="Contact"
          icon={Phone}
          active={activePage === "Contact"}
          onClick={() => onSelectPage("Contact")}
          pageKey="Contact"
        />
        <NavItem
          label="Facility"
          icon={Factory}
          active={activePage === "Facility"}
          onClick={() => onSelectPage("Facility")}
          pageKey="Facility"
        />

        <SectionLabel label="KYC" />
        <NavItem
          label="Documents"
          icon={FileText}
          active={activePage === "Documents"}
          onClick={() => onSelectPage("Documents")}
          pageKey="Documents"
        />

        <SectionLabel label="Config" />
        <NavItem
          label="Store Setup"
          icon={Settings2}
          active={activePage === "StoreSetup"}
          onClick={() => onSelectPage("StoreSetup")}
          pageKey="StoreSetup"
        />
        <NavItem
          label="Staff Invites"
          icon={UserPlus}
          active={activePage === "StaffInvites"}
          onClick={() => onSelectPage("StaffInvites")}
          pageKey="StaffInvites"
        />
        <NavItem
          label="Credentials"
          icon={Key}
          active={activePage === "Credentials"}
          onClick={() => onSelectPage("Credentials")}
          pageKey="Credentials"
        />

        <SectionLabel label="Marketplace" />
        <NavItem
          label="Suppliers"
          icon={UploadCloud}
          active={activePage === "Suppliers"}
          onClick={() => onSelectPage("Suppliers")}
          pageKey="Suppliers"
        />
        <NavItem
          label="My Orders"
          icon={ShoppingBag}
          active={activePage === "MyOrders"}
          onClick={() => onSelectPage("MyOrders")}
          pageKey="MyOrders"
        />
        <NavItem
          label="Manual Inventory"
          icon={Box}
          active={false} // Cleanly resolves TypeScript narrowing warning on Standard Menu
          onClick={() => onSelectPage("ManualInventory")}
          pageKey="ManualInventory"
        />
        <NavItem
          label="Batch Import"
          icon={Upload}
          active={activePage === "BatchImport"}
          onClick={() => onSelectPage("BatchImport")}
          pageKey="BatchImport"
        />
      </nav>

      {/* 3. FIXED LOGOUT BUTTON (Not affected by scroll) */}
      <button className="flex items-center gap-2 border-t border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-rose-600 cursor-pointer shrink-0">
        <LogOut size={16} strokeWidth={2.5} />
        Logout
      </button>
    </aside>
  );
};

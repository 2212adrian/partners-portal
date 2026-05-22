import React, { type Dispatch, type SetStateAction } from "react";
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
  Settings,
  CornerDownLeft,
  type LucideIcon,
  LogOut,
} from "lucide-react";

type PageKey =
  | "Overview"
  | "StoreInfo"
  | "Address"
  | "Location"
  | "Contact"
  | "Facility"
  | "Documents"
  | "StoreSetup"
  | "StaffInvites"
  | "Credentials"
  | "Suppliers"
  | "MyOrders"
  | "ManualInventory"
  | "BatchImport";

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
  BatchImport: "bg-blue-100 text-blue-500",
};

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

    {/* Label */}
    <span
      className={`text-[14px] transition-colors ${
        active
          ? "font-bold text-slate-900"
          : "font-semibold text-slate-500 group-hover:text-slate-700"
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
  <div className="px-6 mt-2 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
    {label}
  </div>
);

export const Sidebar: React.FC<{
  activePage: PageKey;
  onSelectPage: Dispatch<SetStateAction<PageKey>>;
}> = ({ activePage, onSelectPage }) => {
  return (
    <aside className="w-65 h-screen bg-white border-r border-slate-100 flex flex-col overflow-hidden select-none">
      {/* Main Nav Scroll Area */}
      <nav className="flex-1 overflow-y-auto no-scrollbar pt-2">
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
          label="My Orders"
          icon={ShoppingBag}
          active={activePage === "MyOrders"}
          onClick={() => onSelectPage("MyOrders")}
          pageKey="MyOrders"
        />
        <NavItem
          label="Manual Inventory"
          icon={Box}
          active={activePage === "ManualInventory"}
          onClick={() => onSelectPage("ManualInventory")}
          pageKey="ManualInventory"
        />
        <NavItem
          label="Batch Import"
          icon={UploadCloud}
          active={activePage === "BatchImport"}
          onClick={() => onSelectPage("BatchImport")}
          pageKey="BatchImport"
        />

        {/* Store Overview Button inside the scrollable nav but at bottom */}
        <div className="mt-8 px-6 mb-2">
          <button className="flex items-center gap-3 text-slate-400 font-black text-[12px] hover:text-emerald-700 transition-colors">
            <CornerDownLeft size={16} strokeWidth={3} />
            STORE OVERVIEW
          </button>
        </div>
      </nav>
      
      {/* Logout Button */}
      <button className="flex items-center gap-2 border-t border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition-all hover:bg-slate-50 hover:text-rose-600">
        <LogOut size={16} />
        Logout
      </button>

      {/* FIXED SETTINGS FOOTER */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
        <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-white hover:text-[#6366f1] transition-all border border-transparent hover:border-slate-200">
          <Settings size={20} strokeWidth={2} />
          <span className="text-sm font-black">Settings</span>
        </button>
      </div>
    </aside>
  );
};
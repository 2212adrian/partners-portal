import React from "react";
// Import PageKey directly from App.tsx instead of redeclaring it locally
import { type PageKey } from "../../App";
import {
  Clock,
  CheckCircle,
  Wallet,
  ShieldCheck,
  Truck,
  Package,
  XCircle,
  ArrowLeft,
  ShoppingBag,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

type OrderTab =
  | "pending"
  | "awaiting-confirmation"
  | "awaiting-payment"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

interface OrderCounts {
  pending: number;
  awaitingConfirmation: number;
  awaitingPayment: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

interface SidebarSupplyHubProps {
  activeTab: OrderTab;
  onSelectTab: (tab: OrderTab) => void;
  onBackToMain: () => void;
  onSuppliersClick: () => void;
  onMyOrdersClick: () => void;
  counts?: OrderCounts;
  activeMainSection?: "suppliers" | "my-orders";
  onSelectPage?: (page: PageKey) => void; // Added onSelectPage to props interface
}

const tabConfig: Record<
  OrderTab,
  {
    label: string;
    icon: typeof Clock;
    color: string;
    bgColor: string;
    countKey: keyof OrderCounts;
  }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    countKey: "pending",
  },
  "awaiting-confirmation": {
    label: "Awaiting Confirmation",
    icon: CheckCircle,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    countKey: "awaitingConfirmation",
  },
  "awaiting-payment": {
    label: "Awaiting Payment",
    icon: Wallet,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    countKey: "awaitingPayment",
  },
  confirmed: {
    label: "Confirmed",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    countKey: "confirmed",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    countKey: "shipped",
  },
  delivered: {
    label: "Delivered",
    icon: Package,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    countKey: "delivered",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-slate-500",
    bgColor: "bg-slate-50",
    countKey: "cancelled",
  },
};

const MainNavItem = ({
  label,
  icon: Icon,
  active,
  onClick,
  isExpanded,
  hasSubItems,
}: {
  label: string;
  icon: typeof Users | typeof ShoppingBag;
  active: boolean;
  onClick: () => void;
  isExpanded?: boolean;
  hasSubItems?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex items-center justify-between w-full px-4 py-3 transition-all group ${
      active
        ? "bg-emerald-50 border-r-4 border-emerald-500"
        : "hover:bg-slate-50"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`p-1.5 rounded-lg ${active ? "bg-emerald-100" : "bg-slate-100"} transition-colors`}
      >
        <Icon
          size={16}
          className={active ? "text-emerald-600" : "text-slate-400"}
        />
      </div>
      {/* Bold if selected, Semibold if unselected */}
      <span
        className={`text-[13px] transition-colors ${
          active
            ? "font-bold text-emerald-700"
            : "font-semibold text-slate-600 group-hover:text-slate-700"
        }`}
      >
        {label}
      </span>
    </div>
    {hasSubItems && (
      <div className="text-slate-400">
        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </div>
    )}
  </button>
);

const StatusTabItem = ({
  label,
  icon: Icon,
  active,
  onClick,
  color,
  bgColor,
  count,
}: {
  label: string;
  icon: typeof Clock;
  active: boolean;
  onClick: () => void;
  color: string;
  bgColor: string;
  count?: number;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex items-center justify-between w-full pl-9 pr-4 py-2 transition-all group ${
      active ? `${bgColor} border-r-4 border-emerald-500` : "hover:bg-slate-50"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`p-1 rounded-lg ${active ? bgColor : "bg-slate-100"} transition-colors`}
      >
        <Icon size={12} className={active ? color : "text-slate-400"} />
      </div>
      {/* Bold if selected, Semibold if unselected */}
      <span
        className={`text-[11px] transition-colors ${
          active
            ? "font-bold text-slate-700"
            : "font-semibold text-slate-500 group-hover:text-slate-600"
        }`}
      >
        {label}
      </span>
    </div>
    {count !== undefined && count > 0 && (
      <span
        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
          active ? `${bgColor} ${color}` : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

export const SidebarSupplyHub: React.FC<SidebarSupplyHubProps> = ({
  activeTab,
  onSelectTab,
  onBackToMain,
  onSuppliersClick,
  onMyOrdersClick,
  activeMainSection = "my-orders",
  onSelectPage,
  counts = {
    pending: 3,
    awaitingConfirmation: 0,
    awaitingPayment: 0,
    confirmed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  },
}) => {
  const [myOrdersExpanded, setMyOrdersExpanded] = React.useState(
    activeMainSection === "my-orders",
  );
  const tabs = Object.entries(tabConfig) as [
    OrderTab,
    (typeof tabConfig)[OrderTab],
  ][];

  // Update expanded state when activeMainSection changes
  React.useEffect(() => {
    if (activeMainSection === "my-orders") {
      setMyOrdersExpanded(true);
    }
  }, [activeMainSection]);

  const handleMyOrdersClick = () => {
    if (activeMainSection === "my-orders" && myOrdersExpanded) {
      setMyOrdersExpanded(!myOrdersExpanded);
    } else {
      onMyOrdersClick();
      setMyOrdersExpanded(true);
    }
  };

  return (
    <aside className="w-72 h-full bg-white border-r border-slate-200 flex flex-col overflow-hidden select-none">
      {/* Header with Back Button */}
      <div className="p-4 border-b border-slate-100 shrink-0">
        <button
          onClick={onBackToMain}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-4 group font-semibold"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span className="text-[12px]">Back to Main Menu</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <ShoppingBag size={18} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-700">SupplyHub</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Marketplace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto py-2 no-scrollbar">
        {/* Suppliers Main Button - No sub-items */}
        <div className="px-2 mb-2">
          <MainNavItem
            label="Suppliers"
            icon={Users}
            active={activeMainSection === "suppliers"}
            onClick={onSuppliersClick}
            hasSubItems={false}
          />
        </div>

        {/* My Orders Section with Accordion */}
        <div>
          <div className="px-2 mb-1">
            <MainNavItem
              label="My Orders"
              icon={ShoppingBag}
              active={activeMainSection === "my-orders"}
              onClick={handleMyOrdersClick}
              isExpanded={myOrdersExpanded}
              hasSubItems={true}
            />
          </div>
          {myOrdersExpanded && activeMainSection === "my-orders" && (
            <div className="mt-1">
              {tabs.map(([tabKey, config]) => (
                <StatusTabItem
                  key={tabKey}
                  label={config.label}
                  icon={config.icon}
                  active={activeTab === tabKey}
                  onClick={() => onSelectTab(tabKey)}
                  color={config.color}
                  bgColor={config.bgColor}
                  count={counts[config.countKey]}
                />
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
        <button
          type="button"
          onClick={() => onSelectPage?.("ManualInventory")}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer text-left w-full"
        >
          <ArrowLeft size={12} strokeWidth={2.5} />
          Manual Inventory
        </button>
      </div>
    </aside>
  );
};

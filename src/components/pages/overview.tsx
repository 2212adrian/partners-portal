import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Check,
  type LucideIcon,
  User,
  FileText,
  Wallet,
  Clock,
  MessageSquare,
  Truck,
  Package,
  XCircle,
} from "lucide-react";

export const OverviewPage: React.FC = () => {
  return (
    // Background should be the light ghost-white from the screenshot
    <div className="p-4 space-y-4 bg-[#F8FAFC] min-h-full">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Overview
        </h1>
        <p className="text-[13px] font-medium text-slate-500">
          Your store dashboard and KYC status summary.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <KYCStatusCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <OrdersCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <RequiredDocumentsCard />
      </motion.div>
    </div>
  );
};

interface StatusTileProps {
  label: string;
  count: number;
  icon: LucideIcon;
  color: string;
  delay: number;
  className?: string;
}

const StatusTile = ({
  label,
  count,
  icon: Icon,
  color,
  delay,
  className = "",
}: StatusTileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`relative overflow-hidden flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-sm ${color} ${className}`}
    >
      <div className="relative z-10 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white/60 shadow-sm border border-white/20">
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <span className="text-[13px] font-bold tracking-tight">{label}</span>
      </div>

      <span className="relative z-10 text-xl sm:text-2xl font-black tracking-tight tabular-nums">
        {count}
      </span>

      {/* Background Watermark - Rotated and offset like the screenshot */}
      <div className="absolute -right-3 -bottom-5 opacity-[0.08] rotate-15 pointer-events-none">
        <Icon size={90} strokeWidth={1} />
      </div>
    </motion.div>
  );
};

export const KYCStatusCard = () => {
  return (
    <div className="relative flex h-1/2 w-full min-w-0 overflow-hidden rounded-4xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
      {/* Decorative Quarter Circle */}
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-100/60 blur-2xl" />

      <div className="relative z-10 flex w-full flex-col gap-2">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              KYC Status
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[13px] font-bold text-emerald-700">
              <ShieldCheck size={16} className="shrink-0" />
              <span className="truncate">Approved</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative px-1 py-6 sm:px-4 sm:py-4">
          {/* Progress Line */}
          <div className="absolute left-6 right-6 top-13 h-1 rounded-full bg-emerald-500 sm:top-11" />

          <div className="relative flex items-end justify-between gap-3">
            <TimelineStep label="Profile Created" icon={<User size={18} />} />

            <TimelineStep
              label="Docs Submitted"
              icon={<FileText size={18} />}
            />

            <TimelineStep
              label="KYC Approved"
              icon={<ShieldCheck size={24} />}
              isLarge
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-start gap-4 rounded-2xl bg-emerald-50 p-4">
          <div className="rounded-full bg-emerald-200/60 p-2 shrink-0">
            <Check className="text-emerald-600" size={16} strokeWidth={3} />
          </div>

          <p className="min-w-0 text-[13px] font-semibold leading-relaxed text-slate-600">
            Your store identity has been verified. You now have full access to
            the marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

const TimelineStep = ({
  label,
  icon,
  isLarge = false,
}: {
  label: string;
  icon: React.ReactNode;
  isLarge?: boolean;
}) => (
  <div className="flex flex-col items-center z-10 w-32">
    {/* 
        CIRCLE WRAPPER: 
        We force this container to be h-14 (the size of the large circle).
        Using items-center ensures the small and large circles share the same center-line.
    */}
    <div className="h-14 flex items-center justify-center">
      <motion.div
        initial={isLarge ? { scale: 1 } : false}
        animate={isLarge ? { scale: [1, 1.05, 1] } : false}
        transition={{ repeat: Infinity, duration: 3 }}
        className={`
          flex items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white shadow-lg
          ${isLarge ? "h-14 w-14 shadow-emerald-200" : "h-10 w-10 shadow-emerald-100"}
        `}
      >
        {icon}
      </motion.div>
    </div>

    {/* Label stays perfectly aligned below the h-14 container */}
    <span
      className={`
        mt-4 text-center text-[11px] sm:text-[13px] font-black tracking-tight truncate leading-tight
        ${isLarge ? "text-slate-900" : "text-slate-500"}
    `}
    >
      {label}
    </span>
  </div>
);

export const OrdersCard = () => {
  return (
    <div className="rounded-4xl max-w-full border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
          Orders
        </div>
        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      </div>

      <div className="h-px w-full bg-slate-100 mb-6" />

      <div className="text-xs sm:text-2xl grid gap-3 flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
        <StatusTile
          label="Pending"
          count={0}
          icon={Clock}
          color="bg-amber-50 text-amber-600 border-amber-100"
          delay={0.1}
        />
        <StatusTile
          label="Awaiting Confirmation"
          count={0}
          icon={MessageSquare}
          color="bg-sky-50 text-sky-600 border-sky-100"
          delay={0.15}
        />
        <StatusTile
          label="Awaiting Payment"
          count={0}
          icon={Wallet}
          color="bg-orange-50 text-orange-600 border-orange-100"
          delay={0.2}
        />
        <StatusTile
          label="Confirmed"
          count={0}
          icon={ShieldCheck}
          color="bg-indigo-50 text-indigo-600 border-indigo-100"
          delay={0.25}
        />
        <StatusTile
          label="Shipped"
          count={0}
          icon={Truck}
          color="bg-purple-50 text-purple-600 border-purple-100"
          delay={0.3}
        />
        <StatusTile
          label="Delivered"
          count={1}
          icon={Package}
          color="bg-emerald-50 text-emerald-600 border-emerald-100"
          delay={0.35}
        />
        <StatusTile
          label="Cancelled"
          count={0}
          icon={XCircle}
          color="bg-slate-50 text-slate-500 border-slate-200"
          delay={0.4}
        />
      </div>

      <button className="mt-6 text-[13px] font-bold text-emerald-700 hover:underline transition-all">
        View detailed order history →
      </button>
    </div>
  );
};

export const RequiredDocumentsCard = () => {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
          Required Documents
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700">
          <ShieldCheck size={12} />
          VERIFIED
        </div>
      </div>

      <div className="h-px w-full bg-slate-100 mb-8" />

      <div className="grid gap-4 md:grid-cols-3">
        {["Owner GOV ID", "Business Permit", "Pharmacy License"].map((doc) => (
          <div
            key={doc}
            className="flex items-center gap-3 p-4 rounded-full bg-emerald-50/40 border border-emerald-100/50"
          >
            <div className="bg-emerald-500 rounded-full p-1 text-white">
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="text-[13px] font-bold text-emerald-900">
              {doc}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
        <div className="h-1 w-1 rounded-full bg-emerald-400" />
        All documents have been manually reviewed and approved by the compliance
        team.
      </div>
    </div>
  );
};

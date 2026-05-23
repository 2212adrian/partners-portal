// src/components/pages/suppliers.tsx - FIXED COLUMN WIDTHS
import React, { useState } from "react";
import { Users, Search, MapPin, CheckCircle, Building2, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SupplierProductsPage } from "./supplier-products";

interface Supplier {
  code: string;
  name: string;
  location: string;
  status: "approved" | "pending" | "verified";
}

const mockSuppliers: Supplier[] = [
  {
    code: "SUP-000006",
    name: "John Canas",
    location: "Manila, Metro Manila",
    status: "approved",
  },
  {
    code: "SUP-000003",
    name: "Juan Medical Supplies",
    location: "Quezon City, Metro Manila",
    status: "approved",
  },
  {
    code: "SUP-000005",
    name: "VIP88 IT Medical Supplies",
    location: "Quezon City, Metro Manila",
    status: "approved",
  },
];

export const SuppliersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleViewStore = (supplier: Supplier) => {
    setSelectedSupplier(supplier.name);
    setShowProducts(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  if (showProducts && selectedSupplier) {
    return (
      <SupplierProductsPage 
        supplierName={selectedSupplier}
        onBack={() => setShowProducts(false)}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-brand-bg">
      <div className="p-4 md:p-6 space-y-4 md:space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <Users size={20} className="text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-700">Suppliers</h1>
                <p className="text-[11px] md:text-[12px] text-slate-500">
                  Browse approved suppliers from the SupplyHub marketplace
                </p>
              </div>
            </div>

            {/* Desktop Active Suppliers Indicator - Moved to Right Side */}
            <div className="hidden md:flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-sm border border-slate-200 w-fit">
              <div className="flex items-center gap-2">
                <div className="relative">
                 
                </div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Suppliers</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-emerald-600">{filteredSuppliers.length}</span>
                <span className="text-[11px] text-slate-400">total</span>
              </div>
              <div className="ml-1">
                <TrendingUp size={14} className="text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Active Suppliers Indicator - Mobile Only */}
          <div className="flex items-center justify-between bg-white rounded-xl px-4 py-2 border border-slate-200 md:hidden">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 animate-ping" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-semibold text-slate-500">Active Suppliers</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-emerald-600">{filteredSuppliers.length}</span>
              <span className="text-[10px] text-slate-400">total</span>
            </div>
            <TrendingUp size={12} className="text-emerald-500" />
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative w-full md:max-w-md"
        >
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, code, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 text-[13px] md:text-[14px] border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>

        {/* Scrollable Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <div className="min-w-200 md:min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-slate-50 border-b border-slate-200">
                <div className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">CODE</div>
                <div className="col-span-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">NAME</div>
                <div className="col-span-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">LOCATION</div>
                <div className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">STATUS</div>
                <div className="col-span-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-right">ACTION</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-100">
                <AnimatePresence>
                  {filteredSuppliers.map((supplier, index) => (
                    <motion.div
                      key={supplier.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="grid grid-cols-12 gap-3 px-5 py-4 items-center hover:bg-slate-50 transition-colors group"
                    >
                      {/* Code */}
                      <div className="col-span-2">
                        <span className="text-[11px] font-mono font-bold text-slate-600">{supplier.code}</span>
                      </div>
                      
                      {/* Name */}
                      <div className="col-span-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-emerald-100 rounded-lg shrink-0">
                            <Building2 size={12} className="text-emerald-600" />
                          </div>
                          <span className="text-[12px] font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors truncate">
                            {supplier.name}
                          </span>
                        </div>
                      </div>
                      
                      {/* Location */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span className="text-[11px] text-slate-500 truncate">{supplier.location}</span>
                        </div>
                      </div>
                      
                      {/* Status */}
                      <div className="col-span-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <CheckCircle size={8} />
                          APPROVED
                        </span>
                      </div>
                      
                      {/* Action */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => handleViewStore(supplier)}
                          className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors whitespace-nowrap"
                        >
                          View Store
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredSuppliers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 md:p-12 text-center"
            >
              <Users size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium text-sm">No suppliers found</p>
              <p className="text-[11px] text-slate-400 mt-1">Try adjusting your search</p>
              <button
                onClick={clearSearch}
                className="mt-4 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Clear search →
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
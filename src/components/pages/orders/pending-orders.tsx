import React, { useState } from "react";
import { Clock, Package, Building2, XCircle, ChevronDown, ChevronRight, Pill, PackageOpen, Hash, RefreshCw, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Order {
  id: string;
  supplier: string;
  items: number;
  date: string;
  time: string;
  status: string;
  total: string;
  reference?: string;
  updatedAt?: string;
}

interface LineItem {
  product: string;
  dosageForm: string;
  quantity: string;
  unitPrice: string;
  subtotal: string;
}

interface PendingOrdersPageProps {
  onNewOrder?: () => void;
}

const mockOrders: Order[] = [
  {
    id: "ORD-0000045",
    supplier: "Juan Medical Supplies",
    items: 1,
    date: "Apr 25, 2026",
    time: "06:31 PM",
    status: "Waiting for supplier to review",
    total: "₱1,000.00",
    reference: "2f35c32d-a663-473b-a934-a386662a7e21",
    updatedAt: "Apr 25, 2026, 06:31 PM",
  },
  {
    id: "ORD-0000043",
    supplier: "Juan Medical Supplies",
    items: 1,
    date: "Apr 25, 2026",
    time: "06:31 PM",
    status: "Waiting for supplier to review",
    total: "₱2,500.00",
    reference: "3f35c32d-a663-473b-a934-a386662a7e22",
    updatedAt: "Apr 25, 2026, 06:31 PM",
  },
  {
    id: "ORD-0000042",
    supplier: "Juan Medical Supplies",
    items: 1,
    date: "Apr 25, 2026",
    time: "06:31 PM",
    status: "Waiting for supplier to review",
    total: "₱1,500.00",
    reference: "4f35c32d-a663-473b-a934-a386662a7e23",
    updatedAt: "Apr 25, 2026, 06:31 PM",
  },
];

const mockLineItems: LineItem[] = [
  {
    product: "Ibuprofen-480",
    dosageForm: "Tablet",
    quantity: "10 packs",
    unitPrice: "₱100.00",
    subtotal: "₱1,000.00",
  },
];

const OrderCard = ({ order, isExpanded, onToggle }: { order: Order; isExpanded: boolean; onToggle: () => void }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Order Header - Always Visible */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                PENDING
              </span>
              <span className="text-[11px] text-slate-400">
                {order.date}, {order.time}
              </span>
            </div>
            <p className="font-bold text-slate-700 text-lg">{order.id}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-slate-400" />
            <span className="text-[13px] font-semibold text-slate-600">{order.supplier}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={14} className="text-slate-400" />
            <span className="text-[13px] text-slate-500 font-medium">{order.items} {order.items === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100">
          <p className="text-[12px] text-amber-700 font-bold">{order.status}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Amount</p>
            <p className="text-xl font-bold text-emerald-600 leading-tight">{order.total}</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-[12px] font-bold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg hover:bg-rose-100 transition-colors">
              <XCircle size={14} />
              <span className="whitespace-nowrap">Cancel Order</span>
            </button>
            <button 
              onClick={onToggle}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-lg transition-colors ${
                isExpanded ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="whitespace-nowrap">{isExpanded ? "Hide" : "Details"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Details Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50/30 p-4 sm:p-5 space-y-4">
              {/* LINE ITEMS Section Header */}
              <div className="flex items-center gap-2">
                <PackageOpen size={16} className="text-emerald-600" />
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Line Items</h3>
              </div>

              {/* Line Items Table with Horizontal Scroll */}
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Product</th>
                        <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Dosage Form</th>
                        <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center">Qty</th>
                        <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockLineItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Pill size={14} className="text-emerald-500" />
                              <span className="text-[13px] font-bold text-slate-700">{item.product}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[12px] text-slate-600 font-medium">{item.dosageForm}</td>
                          <td className="px-4 py-3 text-[12px] text-slate-600 text-center font-bold">{item.quantity}</td>
                          <td className="px-4 py-3 text-[13px] font-bold text-emerald-600 text-right">{item.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Reference & Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2">
                  <Hash size={14} className="text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Reference ID</p>
                    <p className="text-[11px] font-mono text-slate-600 break-all">{order.reference}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCw size={14} className="text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Last Updated</p>
                    <p className="text-[12px] text-slate-600 font-medium">{order.updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PendingOrdersPage: React.FC<PendingOrdersPageProps> = ({ onNewOrder }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 h-full overflow-y-auto bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={20} className="text-amber-500" />
            <h1 className="text-xl font-bold text-slate-800">Pending</h1>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Waiting for supplier review</p>
        </div>
        
        <button 
          onClick={onNewOrder}
          className="flex items-center gap-2 text-[13px] font-bold text-white bg-emerald-600 px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
        >
          <Plus size={16} />
          <span className="xs:inline">New Order</span>
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {mockOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isExpanded={expandedOrderId === order.id}
            onToggle={() => toggleOrder(order.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {mockOrders.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Clock size={48} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-bold">No pending orders</p>
          <p className="text-[12px] text-slate-500 mt-1">Orders waiting review will appear here</p>
          <button 
            onClick={onNewOrder}
            className="mt-4 flex items-center gap-2 text-[13px] font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all mx-auto"
          >
            <Plus size={14} />
            Place New Order
          </button>
        </div>
      )}
    </div>
  );
};
import React, { useState } from "react";
import { Package, CheckCircle, Building2, CreditCard, Calendar, Hash, RefreshCw, Pill, ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface DeliveredOrder {
  id: string;
  supplier: string;
  items: number;
  date: string;
  time: string;
  status: string;
  total: string;
  paymentConfirmed: boolean;
  referenceNo: string;
  amountPaid: string;
  paymentDate: string;
  product: string;
  dosageForm: string;
  quantity: string;
  unitPrice: string;
  subtotal: string;
  orderReference: string;
  updatedAt: string;
}

const mockDeliveredOrders: DeliveredOrder[] = [
  {
    id: "ORD-0000033",
    supplier: "Juan Medical Supplies",
    items: 1,
    date: "Mar 13, 2026",
    time: "05:33 PM",
    status: "Order delivered successfully",
    total: "₱500.00",
    paymentConfirmed: true,
    referenceNo: "13553435435",
    amountPaid: "₱500.00",
    paymentDate: "2026-03-13",
    product: "Ambroxol-144",
    dosageForm: "Capsule",
    quantity: "5 packs",
    unitPrice: "₱100.00",
    subtotal: "₱500.00",
    orderReference: "b4fbec03-7e24-4f8d-b628-69956db84973",
    updatedAt: "Mar 13, 2026, 05:39 PM",
  },
];

const OrderCard = ({ order, isExpanded, onToggle }: { order: DeliveredOrder; isExpanded: boolean; onToggle: () => void }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Order Header - Always Visible */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
                DELIVERED
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {order.date}, {order.time}
              </span>
            </div>
            <p className="font-bold text-slate-800 text-lg tracking-tight">{order.id}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <Building2 size={14} className="text-slate-400" />
            </div>
            <span className="text-[13px] font-semibold text-slate-600">{order.supplier}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <Package size={14} className="text-slate-400" />
            </div>
            <span className="text-[13px] font-medium text-slate-500">{order.items} {order.items === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-emerald-50/50 rounded-2xl p-3 mb-4 border border-emerald-100">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <p className="text-[12px] text-emerald-700 font-bold">{order.status}</p>
          </div>
        </div>

        {/* Payment Confirmation Badge */}
        <div className="mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-wider">Payment confirmed</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Total Amount</p>
            <p className="text-xl font-bold text-emerald-600 leading-none">{order.total}</p>
          </div>
          <button 
            onClick={onToggle}
            className={`flex items-center gap-1.5 text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 ${
              isExpanded 
              ? "bg-slate-100 text-slate-600" 
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            {isExpanded ? "Hide details" : "View details"}
          </button>
        </div>
      </div>

      {/* Expandable Details Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 space-y-6">
              {/* Payment Details Section */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Payment Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Hash size={16} className="text-slate-300 mt-1" />
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Ref No.</p>
                      <p className="text-[12px] font-mono font-medium text-slate-600">{order.referenceNo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard size={16} className="text-slate-300 mt-1" />
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Paid</p>
                      <p className="text-[13px] font-bold text-emerald-600">{order.amountPaid}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-slate-300 mt-1" />
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Date</p>
                      <p className="text-[12px] font-medium text-slate-600">{order.paymentDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LINE ITEMS Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-emerald-600" />
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Order Items</h3>
                </div>

                {/* Line Items Table Wrapper (Horizontal Scroll) */}
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[550px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Product</th>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Form</th>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Qty</th>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Unit Price</th>
                          <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-emerald-50 rounded-lg">
                                <Pill size={14} className="text-emerald-500" />
                              </div>
                              <span className="text-[13px] font-bold text-slate-700">{order.product}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-[12px] text-slate-500 font-medium">{order.dosageForm}</td>
                          <td className="px-4 py-4 text-[12px] text-slate-700 font-bold text-center">{order.quantity}</td>
                          <td className="px-4 py-4 text-[12px] text-slate-500 text-right">{order.unitPrice}</td>
                          <td className="px-4 py-4 text-[13px] font-bold text-emerald-600 text-right">{order.subtotal}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end px-4 py-3 bg-slate-50/80 border-t border-slate-200">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Grand Total</span>
                      <span className="text-base font-bold text-emerald-600">{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Reference & Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-slate-200/60">
                  <Hash size={14} className="text-slate-300 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Reference Number</p>
                    <p className="text-[11px] font-mono text-slate-600 break-all">{order.orderReference}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-slate-200/60">
                  <RefreshCw size={14} className="text-slate-300 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Last Status Update</p>
                    <p className="text-[11px] font-medium text-slate-600">{order.updatedAt}</p>
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

export const DeliveredOrdersPage: React.FC = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 h-full overflow-y-auto bg-[#F8FAFC]">
      {/* Header with Icon */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Package size={20} className="text-emerald-500" />
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Delivered</h1>
        </div>
        <p className="text-[13px] font-medium text-slate-500">Successfully completed orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {mockDeliveredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isExpanded={expandedOrderId === order.id}
            onToggle={() => toggleOrder(order.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {mockDeliveredOrders.length === 0 && (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-slate-200" />
          </div>
          <p className="text-slate-600 font-bold">No delivered orders</p>
          <p className="text-[13px] text-slate-400 mt-1">When orders are fulfilled, they will appear here.</p>
        </div>
      )}
    </div>
  );
};
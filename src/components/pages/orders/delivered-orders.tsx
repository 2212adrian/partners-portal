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
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                DELIVERED
              </span>
              <span className="text-[11px] text-slate-500">
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
            <span className="text-[14px] text-slate-600">{order.supplier}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={14} className="text-slate-400" />
            <span className="text-[13px] text-slate-600">{order.items} item</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-emerald-50 rounded-xl p-3 mb-4 border border-emerald-200">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <p className="text-[12px] text-emerald-700 font-medium">{order.status}</p>
          </div>
        </div>

        {/* Payment Confirmation Badge */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <CreditCard size={14} className="text-emerald-600" />
            <span className="text-[12px] font-semibold text-emerald-700">Payment confirmed</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Total Amount</p>
            <p className="text-xl font-black text-emerald-600">{order.total}</p>
          </div>
          <button 
            onClick={onToggle}
            className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50/30 p-5 space-y-5">
              {/* Payment Details Section */}
              <div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-3">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Hash size={14} className="text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Reference No.</p>
                      <p className="text-[12px] font-mono text-slate-600">{order.referenceNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Amount Paid</p>
                      <p className="text-[13px] font-bold text-emerald-600">{order.amountPaid}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Payment Date</p>
                      <p className="text-[12px] text-slate-600">{order.paymentDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LINE ITEMS Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} className="text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">Line Items</h3>
                </div>

                {/* Line Items Table */}
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-3 px-4 py-2 bg-slate-50 border-b border-slate-200">
                    <div className="col-span-4 text-[10px] font-black uppercase tracking-wider text-slate-500">Product</div>
                    <div className="col-span-2 text-[10px] font-black uppercase tracking-wider text-slate-500">Dosage Form</div>
                    <div className="col-span-2 text-[10px] font-black uppercase tracking-wider text-slate-500 text-center">Qty</div>
                    <div className="col-span-2 text-[10px] font-black uppercase tracking-wider text-slate-500 text-right">Unit Price</div>
                    <div className="col-span-2 text-[10px] font-black uppercase tracking-wider text-slate-500 text-right">Subtotal</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-12 gap-3 px-4 py-3">
                      <div className="col-span-4">
                        <div className="flex items-center gap-2">
                          <Pill size={14} className="text-emerald-500" />
                          <span className="text-[13px] font-semibold text-slate-700">{order.product}</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-[12px] text-slate-600">{order.dosageForm}</div>
                      <div className="col-span-2 text-[12px] text-slate-600 text-center">{order.quantity}</div>
                      <div className="col-span-2 text-[12px] text-slate-600 text-right">{order.unitPrice}</div>
                      <div className="col-span-2 text-[13px] font-bold text-emerald-600 text-right">{order.subtotal}</div>
                    </div>
                  </div>

                  {/* Total Row */}
                  <div className="flex justify-end px-4 py-3 bg-slate-50 border-t border-slate-200">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total</span>
                      <span className="text-base font-black text-emerald-600">{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Reference & Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Hash size={14} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Reference Number</p>
                    <p className="text-[11px] font-mono text-slate-600">{order.orderReference}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw size={14} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Last Updated</p>
                    <p className="text-[12px] text-slate-600">{order.updatedAt}</p>
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
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  return (
    <div className="p-6 space-y-5 h-full overflow-y-auto bg-[#F8FAFC]">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Delivered</h1>
        <p className="text-[13px] text-slate-500">Successfully completed orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
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
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Package size={48} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">No delivered orders</p>
          <p className="text-[12px] text-slate-500 mt-1">Delivered orders will appear here</p>
        </div>
      )}
    </div>
  );
};
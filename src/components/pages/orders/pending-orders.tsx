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
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                PENDING
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
        <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100">
          <p className="text-[12px] text-amber-700 font-medium">{order.status}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Total Amount</p>
            <p className="text-xl font-black text-emerald-600">{order.total}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 text-[12px] font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition">
              <XCircle size={14} />
              Cancel Order
            </button>
            <button 
              onClick={onToggle}
              className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              {isExpanded ? "Hide details" : "View details"}
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
            <div className="border-t border-slate-100 bg-slate-50/30 p-5 space-y-4">
              {/* LINE ITEMS Section Header */}
              <div className="flex items-center gap-2">
                <PackageOpen size={16} className="text-emerald-600" />
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
                  {mockLineItems.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 px-4 py-3">
                      <div className="col-span-4">
                        <div className="flex items-center gap-2">
                          <Pill size={14} className="text-emerald-500" />
                          <span className="text-[13px] font-semibold text-slate-700">{item.product}</span>
                        </div>
                      </div>
                      <div className="col-span-2 text-[12px] text-slate-600">{item.dosageForm}</div>
                      <div className="col-span-2 text-[12px] text-slate-600 text-center">{item.quantity}</div>
                      <div className="col-span-2 text-[12px] text-slate-600 text-right">{item.unitPrice}</div>
                      <div className="col-span-2 text-[13px] font-bold text-emerald-600 text-right">{item.subtotal}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Reference & Meta */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Hash size={14} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Reference Number</p>
                    <p className="text-[11px] font-mono text-slate-600">{order.reference}</p>
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

interface PendingOrdersPageProps {
  onNewOrder?: () => void;
}

export const PendingOrdersPage: React.FC<PendingOrdersPageProps> = ({ onNewOrder }) => {
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
      {/* Header with Pending Badge and New Order Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Pending</h1>
          <p className="text-[13px] text-slate-500">Waiting for supplier to review</p>
        </div>
        
        {/* New Order Button */}
        <button 
          onClick={onNewOrder}
          className="flex items-center gap-2 text-[13px] font-bold text-white bg-emerald-600 px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
        >
          <Plus size={16} />
          New Order
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
          <p className="text-slate-600 font-medium">No pending orders</p>
          <p className="text-[12px] text-slate-500 mt-1">New orders will appear here</p>
          <button 
            onClick={onNewOrder}
            className="mt-4 flex items-center gap-2 text-[13px] font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all mx-auto"
          >
            <Plus size={14} />
            Create New Order
          </button>
        </div>
      )}
    </div>
  );
};
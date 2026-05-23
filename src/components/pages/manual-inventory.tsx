import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  X,
  Trash2,
  Box,
  Plus,
} from "lucide-react";
import { type Transaction } from "../../App"; // Import hoisted structure

interface CatalogItem {
  brandName: string;
  strengthInn: string;
  form: string;
  packSize: string;
  manufacturer: string;
  barcode: string;
}

interface ManualInventoryPageProps {
  transactions?: Transaction[]; // Made optional for robust fallback
  setTransactions?: React.Dispatch<React.SetStateAction<Transaction[]>>; // Made optional for robust fallback
  selectedTransactionId?: string | null;
  onSelectTransactionId?: (id: string | null) => void;
  showCatalog?: boolean;
  onShowCatalogChange?: (show: boolean) => void;
  onNewTransactionClick?: () => void; // Optional trigger callback on empty states
}

// 1. Decalred mockCatalog database safely at module level to resolve ReferenceErrors
export const mockCatalog: CatalogItem[] = [
  {
    brandName: "Amoxil",
    strengthInn: "Amoxicillin 500mg",
    form: "Capsule",
    packSize: "100s",
    manufacturer: "GSK",
    barcode: "4801234567890",
  },
  {
    brandName: "Biogesic",
    strengthInn: "Paracetamol 500mg",
    form: "Tablet",
    packSize: "500s",
    manufacturer: "Unilab",
    barcode: "4802345678901",
  },
  {
    brandName: "Advil",
    strengthInn: "Ibuprofen 400mg",
    form: "Tablet",
    packSize: "100s",
    manufacturer: "Pfizer",
    barcode: "4803456789012",
  },
  {
    brandName: "Alnix",
    strengthInn: "Cetirizine 10mg",
    form: "Tablet",
    packSize: "100s",
    manufacturer: "Unilab",
    barcode: "4804567890234",
  },
  {
    brandName: "Enervon",
    strengthInn: "Multivitamins",
    form: "Tablet",
    packSize: "100s",
    manufacturer: "Unilab",
    barcode: "4805678901234",
  },
  {
    brandName: "Solmux",
    strengthInn: "Carbocisteine 500mg",
    form: "Capsule",
    packSize: "100s",
    manufacturer: "Unilab",
    barcode: "4806789012345",
  },
];

const fallbackTransactions: Transaction[] = [
  {
    id: "MIT-20260427-3536",
    type: "Purchase",
    date: "4/27/2026",
    status: "DRAFT",
    supplier: "Zuellig Pharma",
    invoiceNumber: "INV-987654",
    notes: "Direct purchase delivery from regional logistics center.",
    items: [
      { product: "Amoxicillin 500mg Capsule", quantity: 150, unit: "Boxes" },
      { product: "Paracetamol 500mg Tablet", quantity: 300, unit: "Boxes" },
    ],
  },
  {
    id: "MIT-20260425-1516",
    type: "Purchase",
    date: "4/25/2026",
    status: "DRAFT",
    supplier: "RSG",
    invoiceNumber: "INV-887766",
    notes: "Pending confirmation from receiving officer.",
    items: [{ product: "Ibuprofen 400mg Tablet", quantity: 80, unit: "Boxes" }],
  },
  {
    id: "MIT-20260425-4488",
    type: "Purchase",
    date: "4/25/2026",
    status: "DRAFT",
    supplier: "MedExpress",
    invoiceNumber: "—",
    notes: "Urgent branches adjustment transfer.",
    items: [
      { product: "Cetirizine 10mg Tablet", quantity: 200, unit: "Boxes" },
    ],
  },
  {
    id: "MIT-20260313-5359",
    type: "Transfer In",
    date: "3/13/2026",
    status: "DRAFT",
    supplier: "RSG",
    invoiceNumber: "1234567789",
    notes: "—",
    items: [],
  },
];

export const ManualInventoryPage: React.FC<ManualInventoryPageProps> = ({
  transactions,
  setTransactions,
  selectedTransactionId,
  showCatalog,
  onShowCatalogChange,
  onNewTransactionClick,
}) => {
  // Safe fallback states to make the page completely standalone-compatible
  const [localTransactions, setLocalTransactions] =
    useState<Transaction[]>(fallbackTransactions);

  // Resolves to parent hoisted state if present, otherwise uses local database
  const activeTransactions = Array.isArray(transactions)
    ? transactions
    : localTransactions;
  const updateTransactions = setTransactions || setLocalTransactions;

  const [localShowCatalog, setLocalShowCatalog] = useState(false);
  const activeShowCatalog =
    showCatalog !== undefined ? showCatalog : localShowCatalog;
  const updateShowCatalog = onShowCatalogChange || setLocalShowCatalog;

  const [catalogLoading, setCatalogLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("A-Z");
  const [addedAlert, setAddedAlert] = useState<string | null>(null);

  const [localSelectedTxId] = useState<string | null>(
    "MIT-20260313-5359",
  );
  const activeTxId =
    selectedTransactionId !== undefined
      ? selectedTransactionId
      : localSelectedTxId;

  const selectedTx = activeTransactions.find((tx) => tx.id === activeTxId);

  const handleOpenCatalog = () => {
    updateShowCatalog(true);
    setCatalogLoading(true);
  };

  useEffect(() => {
    if (catalogLoading) {
      const timer = setTimeout(() => {
        setCatalogLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [catalogLoading]);

  const handleUpdateStatus = (
    id: string,
    newStatus: "COMPLETED" | "VOIDED",
  ) => {
    updateTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: newStatus } : tx)),
    );
  };

  const handleAddProduct = (product: CatalogItem) => {
    if (!activeTxId) return;

    updateTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === activeTxId) {
          const productLabel = `${product.brandName} (${product.strengthInn})`;
          const existingItemIndex = tx.items.findIndex(
            (item) => item.product === productLabel,
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...tx.items];
            updatedItems[existingItemIndex].quantity += 100;
            return { ...tx, items: updatedItems };
          } else {
            return {
              ...tx,
              items: [
                ...tx.items,
                { product: productLabel, quantity: 100, unit: "Boxes" },
              ],
            };
          }
        }
        return tx;
      }),
    );

    setAddedAlert(`Added ${product.brandName} successfully!`);
    setTimeout(() => setAddedAlert(null), 1800);
  };

  const handleUpdateItemQuantity = (index: number, value: number) => {
    if (!activeTxId) return;
    updateTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === activeTxId) {
          const updatedItems = [...tx.items];
          updatedItems[index].quantity = Math.max(0, value);
          return { ...tx, items: updatedItems };
        }
        return tx;
      }),
    );
  };

  const handleRemoveItem = (index: number) => {
    if (!activeTxId) return;
    updateTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === activeTxId) {
          const updatedItems = tx.items.filter((_, idx) => idx !== index);
          return { ...tx, items: updatedItems };
        }
        return tx;
      }),
    );
  };

  const filteredCatalog = mockCatalog
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.brandName.toLowerCase().includes(query) ||
        item.strengthInn.toLowerCase().includes(query) ||
        item.manufacturer.toLowerCase().includes(query) ||
        item.barcode.includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "A-Z") return a.brandName.localeCompare(b.brandName);
      return b.brandName.localeCompare(a.brandName);
    });

  return (
    <div className="relative h-full w-full bg-[#F5FAF5] overflow-hidden select-none">
      <div className="h-full flex flex-col p-8 overflow-y-auto">
        {selectedTx ? (
          <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Action Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  {selectedTx.id}
                </h1>
                <p className="text-xs font-bold text-slate-400">
                  {selectedTx.type} • {selectedTx.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="border border-slate-200 bg-white text-slate-500 text-[10px] font-black tracking-widest px-2.5 py-1 rounded uppercase select-none">
                  {selectedTx.status}
                </span>

                {selectedTx.status === "DRAFT" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(selectedTx.id, "COMPLETED")
                      }
                      className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-sm shadow-emerald-500/10 cursor-pointer"
                    >
                      Complete
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(selectedTx.id, "VOIDED")
                      }
                      className="border border-rose-200 hover:border-rose-300 text-rose-500 hover:bg-rose-50/50 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Void
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Metadata cards */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-sm">
              <div className="flex items-center px-6 py-4">
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase w-1/4">
                  Supplier
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {selectedTx.supplier}
                </span>
              </div>
              <div className="flex items-center px-6 py-4">
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase w-1/4">
                  Invoice #
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {selectedTx.invoiceNumber}
                </span>
              </div>
              <div className="flex items-center px-6 py-4">
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase w-1/4">
                  Notes
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {selectedTx.notes}
                </span>
              </div>
            </div>

            {/* Items Panel */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800">
                  Items ({selectedTx.items.length})
                </h3>

                <button
                  type="button"
                  onClick={handleOpenCatalog}
                  className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-sm cursor-pointer shadow-indigo-600/10"
                >
                  <Plus size={13} strokeWidth={3} />
                  Add Catalog
                </button>
              </div>

              {selectedTx.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                  <p className="text-slate-400 font-semibold text-xs">
                    No items yet. Click "Add Catalog" to add products.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black tracking-widest text-slate-400 uppercase bg-slate-50/50 h-10">
                        <th className="py-2 pl-6">Product</th>
                        <th className="px-3 py-2">Quantity</th>
                        <th className="px-3 py-2 text-right pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedTx.items.map((item, index) => (
                        <tr key={index} className="h-14 hover:bg-slate-50/40">
                          <td className="py-2 pl-6 text-xs font-bold text-slate-800">
                            {item.product}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateItemQuantity(
                                    index,
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                className="w-16 px-2 py-1 text-xs border border-slate-200 rounded-md font-bold text-slate-700 outline-none focus:border-indigo-500"
                              />
                              <span className="text-xs font-semibold text-slate-400">
                                {item.unit}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right pr-6">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty state view triggering the hoisted New Transaction modal */
          <div className="text-center max-w-sm mx-auto flex flex-col items-center space-y-4 py-20">
            <Box size={40} className="text-slate-300 animate-pulse" />
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              No stock record active. Click below or use the sidebar options to
              create a transaction.
            </p>
            <button
              type="button"
              onClick={onNewTransactionClick}
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/10"
            >
              + New Transaction
            </button>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* 2. BROWSE CATALOG OVERLAY VIEW */}
      {/* ========================================== */}
      {activeShowCatalog && (
        <div className="absolute inset-0 z-50 bg-slate-100 flex flex-col h-full w-full select-none animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0">
            <div className="flex items-center gap-6">
              <span className="text-base font-black text-slate-800 tracking-tight">
                Browse Catalog
              </span>

              <div className="relative w-96">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search brand name, INN, barcode, SKU"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs border border-indigo-500 rounded-lg outline-none ring-1 ring-indigo-500/20 text-slate-700 placeholder-slate-400 font-semibold"
                  autoFocus
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs font-extrabold text-slate-600 outline-none cursor-pointer hover:border-slate-300"
                >
                  <option value="A-Z">Brand A-Z</option>
                  <option value="Z-A">Brand Z-A</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => updateShowCatalog(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1 rounded-md hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {addedAlert && (
            <div className="absolute top-18 right-6 z-50 bg-indigo-600 text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-600/15 animate-in slide-in-from-top-2 duration-200">
              {addedAlert}
            </div>
          )}

          <div className="flex flex-1 overflow-hidden h-full">
            <div className="w-52 border-r border-slate-200 bg-[#F8FAFC] p-6 shrink-0 h-full overflow-y-auto">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                Filters
              </h3>
              <div className="space-y-5">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                    Category Type
                  </span>
                  <div className="space-y-2">
                    {[
                      "All Categories",
                      "Prescription",
                      "OTC Medicines",
                      "Medical Supplies",
                    ].map((cat, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer hover:text-slate-800"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={idx === 0}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white h-full relative">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-black tracking-widest text-slate-400 uppercase bg-slate-50 h-11 select-none sticky top-0 z-10">
                    <th className="py-2 pl-6 pr-3 w-[15%]">Brand Name</th>
                    <th className="px-3 py-2 w-[25%]">Strength / INN</th>
                    <th className="px-3 py-2 w-[12%]">Form</th>
                    <th className="px-3 py-2 w-[10%]">Pack Size</th>
                    <th className="px-3 py-2 w-[18%]">Manufacturer</th>
                    <th className="px-3 py-2 pr-6 w-[20%]">Barcode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {catalogLoading ? (
                    Array.from({ length: 11 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse h-13">
                        <td className="py-3 pl-6 pr-3">
                          <div
                            className={`h-4 bg-slate-100 rounded-md ${idx % 2 === 0 ? "w-20" : "w-16"}`}
                          />
                        </td>
                        <td className="px-3 py-3">
                          <div
                            className={`h-4 bg-slate-100 rounded-md ${idx % 3 === 0 ? "w-40" : "w-32"}`}
                          />
                        </td>
                        <td className="px-3 py-3">
                          <div className="h-4 bg-slate-100 rounded-md w-12" />
                        </td>
                        <td className="px-3 py-3">
                          <div className="h-4 bg-slate-100 rounded-md w-8" />
                        </td>
                        <td className="px-3 py-3">
                          <div
                            className={`h-4 bg-slate-100 rounded-md ${idx % 2 === 0 ? "w-24" : "w-16"}`}
                          />
                        </td>
                        <td className="px-3 py-3 pr-6">
                          <div className="h-4 bg-slate-100 rounded-md w-28" />
                        </td>
                      </tr>
                    ))
                  ) : filteredCatalog.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-20 text-xs font-bold text-slate-400"
                      >
                        No products match your search query.
                      </td>
                    </tr>
                  ) : (
                    filteredCatalog.map((product, idx) => (
                      <tr
                        key={idx}
                        onClick={() => handleAddProduct(product)}
                        className="h-13 hover:bg-slate-50/80 cursor-pointer transition-colors"
                      >
                        <td className="py-2 pl-6 pr-3 text-xs font-black text-slate-800 tracking-tight">
                          {product.brandName}
                        </td>
                        <td className="px-3 py-2 text-xs font-bold text-slate-700">
                          {product.strengthInn}
                        </td>
                        <td className="px-3 py-2 text-xs font-semibold text-slate-500">
                          {product.form}
                        </td>
                        <td className="px-3 py-2 text-xs font-semibold text-slate-500">
                          {product.packSize}
                        </td>
                        <td className="px-3 py-2 text-xs font-bold text-slate-600">
                          {product.manufacturer}
                        </td>
                        <td className="px-3 py-2 pr-6 font-mono text-xs text-slate-400">
                          {product.barcode}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

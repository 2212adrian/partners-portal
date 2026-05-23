import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/layouts/header";
import { Sidebar } from "./components/layouts/sidebar";
import { SidebarSupplyHub } from "./components/layouts/sidebar-supply-hub";
import { SidebarStockRecording } from "./components/layouts/sidebar-stock-recording";
import { OverviewPage } from "./components/pages/overview";
import { StoreInfoPage } from "./components/pages/store-info";
import { AddressPage } from "./components/pages/address";
import { LocationPage } from "./components/pages/location";
import { ContactPage } from "./components/pages/contact";
import { FacilityPage } from "./components/pages/facility";
import { DocumentsPage } from "./components/pages/documents";
import { StoreSetupPage } from "./components/pages/store-setup";
import { StaffInvitesPage } from "./components/pages/staff-invites";
import { CredentialsPage } from "./components/pages/credentials";
import { SuppliersPage } from "./components/pages/suppliers";
import { MyOrdersPage } from "./components/pages/my-orders";
import { ManualInventoryPage } from "./components/pages/manual-inventory";
import { StoreOverviewPage } from "./components/pages/store-overview";
import { BatchImportPage } from "./components/pages/batch-import";
import NewTransactionModal from "./components/layouts/new-transaction-modal";
import "./App.css";

export type PageKey =
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
  | "StoreOverview"
  | "BatchImport";

type OrderTab =
  | "pending"
  | "awaiting-confirmation"
  | "awaiting-payment"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

// Shared unified transaction definition interface
export interface Transaction {
  id: string;
  type: "Purchase" | "Transfer In" | "Transfer Out" | "Adjustment" | "Donation";
  date: string;
  status: "DRAFT" | "COMPLETED" | "VOIDED";
  supplier: string;
  invoiceNumber: string;
  notes: string;
  items: { product: string; quantity: number; unit: string }[];
}

const storeNamesLookup: Record<string, string> = {
  "STR-000003": "Pharma One",
  "STR-000004": "Pharma Annex",
};

const pageLabelsLookup: Record<PageKey, string> = {
  Overview: "Overview",
  StoreInfo: "Store Info",
  Address: "Address",
  Location: "Location",
  Contact: "Contact",
  Facility: "Facility",
  Documents: "Documents",
  StoreSetup: "Store Setup",
  StaffInvites: "Staff Invites",
  Credentials: "Credentials",
  Suppliers: "Suppliers",
  MyOrders: "My Orders",
  ManualInventory: "Manual Inventory",
  StoreOverview: "Store Overview",
  BatchImport: "Batch Import",
};

function App() {
  const [selectedTxId, setSelectedTxId] = useState<string | null>(
    "MIT-20260313-5359",
  );
  const [activePage, setActivePage] = useState<PageKey>("StoreOverview");
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [isAddingCatalog, setIsAddingCatalog] = useState(false);
  const [isNewTxModalOpen, setIsNewTxModalOpen] = useState(false); // Modal visibility controller

  // Hoisted live global Transactions Database State
  const [manualTransactions, setManualTransactions] = useState<Transaction[]>([
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
      items: [
        { product: "Ibuprofen 400mg Tablet", quantity: 80, unit: "Boxes" },
      ],
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
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isInSupplyHub, setIsInSupplyHub] = useState(false);
  const [supplyHubActiveSection, setSupplyHubActiveSection] = useState<
    "suppliers" | "my-orders"
  >("my-orders");
  const [ordersActiveTab, setOrdersActiveTab] = useState<OrderTab>("pending");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleBackToMainMenu = () => {
    setIsInSupplyHub(false);
    setActivePage("Overview");
  };

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setSidebarOpen(desktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageSelect = (page: PageKey) => {
    setActivePage(page);
    if (page !== "ManualInventory") {
      setSelectedTxId(null);
      setIsAddingCatalog(false);
    }
    if (page === "MyOrders") {
      setIsInSupplyHub(true);
      setSupplyHubActiveSection("my-orders");
    } else if (page === "Suppliers") {
      setIsInSupplyHub(true);
      setSupplyHubActiveSection("suppliers");
    } else {
      setIsInSupplyHub(false);
    }
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  };

  // Create a brand new transaction record and select it instantly
  const handleCreateTransaction = (data: {
    purpose:
      | "Purchase"
      | "Transfer In"
      | "Transfer Out"
      | "Adjustment"
      | "Donation";
    date: string;
    supplier: string;
    invoiceNumber: string;
    notes: string;
  }) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = data.date.replace(/\//g, ""); // strip slashes for code ID
    const newId = `MIT-${dateFormatted}-${randomDigits}`;

    const newTx: Transaction = {
      id: newId,
      type: data.purpose,
      date: data.date,
      status: "DRAFT",
      supplier: data.supplier,
      invoiceNumber: data.invoiceNumber,
      notes: data.notes,
      items: [],
    };

    setManualTransactions((prev) => [newTx, ...prev]);
    setSelectedTxId(newId); // select the newly created item instantly
  };

  const renderPage = () => {
    switch (activePage) {
      case "StoreInfo":
        return <StoreInfoPage />;
      case "Address":
        return <AddressPage />;
      case "Location":
        return <LocationPage />;
      case "Contact":
        return <ContactPage />;
      case "Facility":
        return <FacilityPage />;
      case "Documents":
        return <DocumentsPage />;
      case "StoreSetup":
        return <StoreSetupPage />;
      case "StaffInvites":
        return <StaffInvitesPage />;
      case "Credentials":
        return <CredentialsPage />;
      case "Suppliers":
        return <SuppliersPage />;
      case "MyOrders":
        return (
          <MyOrdersPage
            activeTab={ordersActiveTab}
            onNewOrder={() => {
              handlePageSelect("Suppliers");
            }}
          />
        );
      case "ManualInventory":
        return (
          <ManualInventoryPage
            transactions={manualTransactions}
            setTransactions={setManualTransactions}
            selectedTransactionId={selectedTxId}
            onSelectTransactionId={setSelectedTxId}
            showCatalog={isAddingCatalog}
            onShowCatalogChange={setIsAddingCatalog}
            onNewTransactionClick={() => setIsNewTxModalOpen(true)}
          />
        );
      case "StoreOverview":
        return (
          <StoreOverviewPage
            onManageStore={(storeId) => {
              setSelectedStoreId(storeId);
              handlePageSelect("Overview");
            }}
          />
        );
      case "BatchImport":
        return <BatchImportPage />;
      default:
        return <OverviewPage />;
    }
  };

  const isStoreOverview = activePage === "StoreOverview";
  const actualSidebarOpen = sidebarOpen && !isStoreOverview && !isAddingCatalog;
  const showHeader = !isAddingCatalog;

  const shouldShowSupplyHub =
    isInSupplyHub && (activePage === "MyOrders" || activePage === "Suppliers");
  const sidebarWidth = shouldShowSupplyHub ? "288px" : "260px";

  const currentStoreName = selectedStoreId
    ? storeNamesLookup[selectedStoreId] || "Pharma One"
    : "Pharma One";

  return (
    <div className="flex flex-col h-screen">
      {showHeader && (
        <Header
          toggleSidebar={toggleSidebar}
          isStoreOverview={isStoreOverview}
        />
      )}

      <div className="relative flex-1 overflow-hidden bg-[#F5FAF5]">
        <main
          className="h-full overflow-y-auto transition-all duration-300 flex flex-col"
          style={{
            paddingLeft: actualSidebarOpen && isDesktop ? sidebarWidth : "0px",
          }}
        >
          {!isStoreOverview && (
            <div className="px-8 pt-6 pb-2 flex items-center gap-2 text-xs font-semibold text-slate-500 bg-transparent select-none">
              <button
                onClick={() => {
                  handlePageSelect("StoreOverview");
                }}
                className="hover:text-emerald-700 hover:underline cursor-pointer transition-colors"
              >
                Store Overview
              </button>

              <span className="text-slate-300 font-light">/</span>

              <button
                onClick={() => {
                  handlePageSelect("Overview");
                }}
                className={`hover:text-emerald-700 hover:underline cursor-pointer transition-colors ${
                  activePage === "Overview" ? "text-slate-800 font-bold" : ""
                }`}
              >
                Store - {currentStoreName}
              </button>

              {activePage !== "Overview" && (
                <>
                  <span className="text-slate-300 font-light">/</span>
                  {activePage === "ManualInventory" ? (
                    <>
                      {selectedTxId ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsAddingCatalog(false)}
                            disabled={!isAddingCatalog}
                            className={`transition-colors ${
                              isAddingCatalog
                                ? "hover:text-emerald-700 hover:underline cursor-pointer text-slate-500 font-semibold"
                                : "text-slate-800 font-bold pointer-events-none"
                            }`}
                          >
                            Manual Inventory - {selectedTxId}
                          </button>

                          {isAddingCatalog && (
                            <>
                              <span className="text-slate-300 font-light">
                                /
                              </span>
                              <span className="text-slate-800 font-bold">
                                Add Catalog
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-800 font-bold">
                          Manual Inventory
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-slate-800 font-bold">
                      {pageLabelsLookup[activePage] || activePage}
                    </span>
                  )}
                </>
              )}
            </div>
          )}

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <AnimatePresence>
          {actualSidebarOpen && (
            <motion.div
              initial={{ x: isDesktop ? 0 : -sidebarWidth }}
              animate={{ x: 0 }}
              exit={{ x: isDesktop ? 0 : -sidebarWidth }}
              transition={{ duration: 0.3 }}
              className={`
                absolute left-0 top-0 h-full 
                bg-white shadow-lg 
                z-20
                ${shouldShowSupplyHub ? "w-72" : "w-65"}
              `}
            >
              {shouldShowSupplyHub ? (
                <SidebarSupplyHub
                  activeTab={ordersActiveTab}
                  onSelectTab={setOrdersActiveTab}
                  onBackToMain={handleBackToMainMenu}
                  onSuppliersClick={() => {
                    handlePageSelect("Suppliers");
                  }}
                  onMyOrdersClick={() => {
                    handlePageSelect("MyOrders");
                  }}
                  activeMainSection={supplyHubActiveSection}
                  onSelectPage={handlePageSelect}
                />
              ) : activePage === "ManualInventory" ? (
                <SidebarStockRecording
                  onSelectPage={handlePageSelect}
                  selectedTransactionId={selectedTxId}
                  onSelectTransactionId={setSelectedTxId}
                  transactions={manualTransactions} // Pass the live transactions array
                  onNewTransactionClick={() => setIsNewTxModalOpen(true)} // Passed to sidebar
                />
              ) : (
                <Sidebar
                  activePage={activePage}
                  onSelectPage={handlePageSelect}
                  selectedTransactionId={selectedTxId}
                  onSelectTransactionId={setSelectedTxId}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!isDesktop && actualSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/40 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {/* Renders New Transaction modal overlay */}
      <NewTransactionModal
        isOpen={isNewTxModalOpen}
        onClose={() => setIsNewTxModalOpen(false)}
        onCreate={handleCreateTransaction}
      />
    </div>
  );
}

export default App;

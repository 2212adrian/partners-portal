import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/layouts/header";
import { Sidebar } from "./components/layouts/sidebar";
import { SidebarSupplyHub } from "./components/layouts/sidebar-supply-hub";
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
import { BatchImportPage } from "./components/pages/batch-import";
import "./App.css";

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

type OrderTab = "pending" | "awaiting-confirmation" | "awaiting-payment" | "confirmed" | "shipped" | "delivered" | "cancelled";

function App() {
  const [activePage, setActivePage] = useState<PageKey>("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isInSupplyHub, setIsInSupplyHub] = useState(false);
  const [supplyHubActiveSection, setSupplyHubActiveSection] = useState<"suppliers" | "my-orders">("my-orders");
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
              setActivePage("Suppliers");
              setSupplyHubActiveSection("suppliers");
            }}
          />
        );
      case "ManualInventory":
        return <ManualInventoryPage />;
      case "BatchImport":
        return <BatchImportPage />;
      default:
        return <OverviewPage />;
    }
  };

  // Determine which sidebar to show
  const shouldShowSupplyHub = isInSupplyHub && (activePage === "MyOrders" || activePage === "Suppliers");
  // Calculate the correct padding based on which sidebar is showing
  const sidebarWidth = shouldShowSupplyHub ? "288px" : "260px"; // w-72 = 288px, w-65 = 260px

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />

      <div className="relative flex-1 overflow-hidden bg-[#F5FAF5]">
        {/* Content area with dynamic padding based on sidebar visibility */}
        <main
          className="h-full overflow-y-auto transition-all duration-300"
          style={{
            paddingLeft: sidebarOpen && isDesktop ? sidebarWidth : "0px"
          }}
        >
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
        </main>

        {/* Sidebar overlay (absolute, on top of content) */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: isDesktop ? 0 : -sidebarWidth }}
              animate={{ x: 0 }}
              exit={{ x: isDesktop ? 0 : -sidebarWidth }}
              transition={{ duration: 0.3 }}
              className={`
                absolute left-0 top-0 h-full 
                bg-white shadow-lg 
                z-20
                ${shouldShowSupplyHub ? "w-72" : "w-[260px]"}
              `}
            >
              {shouldShowSupplyHub ? (
                <SidebarSupplyHub
                  activeTab={ordersActiveTab}
                  onSelectTab={setOrdersActiveTab}
                  onBackToMain={handleBackToMainMenu}
                  onSuppliersClick={() => {
                    setActivePage("Suppliers");
                    setSupplyHubActiveSection("suppliers");
                  }}
                  onMyOrdersClick={() => {
                    setActivePage("MyOrders");
                    setSupplyHubActiveSection("my-orders");
                  }}
                  activeMainSection={supplyHubActiveSection}
                />
              ) : (
                <Sidebar
                  activePage={activePage}
                  onSelectPage={(page) => {
                    setActivePage(page);
                    if (page === "MyOrders") {
                      setIsInSupplyHub(true);
                      setSupplyHubActiveSection("my-orders");
                    } else if (page === "Suppliers") {
                      setIsInSupplyHub(true);
                      setSupplyHubActiveSection("suppliers");
                    } else {
                      setIsInSupplyHub(false);
                    }
                    // On mobile, close sidebar when selecting a page
                    if (!isDesktop) setSidebarOpen(false);
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Optional dim background when sidebar is open on mobile */}
        {!isDesktop && sidebarOpen && (
          <div
            className="absolute inset-0 bg-black/40 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/layouts/header";
import { Sidebar } from "./components/layouts/sidebar";
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

function App() {
  const [activePage, setActivePage] = useState<PageKey>("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      // On desktop, keep sidebar open; on mobile, start closed
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
        return <MyOrdersPage />;
      case "ManualInventory":
        return <ManualInventoryPage />;
      case "BatchImport":
        return <BatchImportPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />

      {/* Main area is relative so sidebar can overlay it */}
      <div className="relative flex-1 overflow-hidden bg-[#F5FAF5]">
        {/* Content always full area */}
        <main className="lg:pl-[260px] h-full overflow-y-auto">
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
              // On desktop: static at left; on mobile: slide-in overlay
              initial={{ x: isDesktop ? 0 : -260 }}
              animate={{ x: 0 }}
              exit={{ x: isDesktop ? 0 : -260 }}
              transition={{ duration: 0.3 }}
              className="
                absolute left-0 top-0 h-full 
                bg-white shadow-lg 
                z-20
                w-[260px]
              "
            >
              <Sidebar
                activePage={activePage}
                onSelectPage={(page) => {
                  setActivePage(page);
                  // On mobile, close sidebar when selecting a page
                  if (!isDesktop) setSidebarOpen(false);
                }}
              />
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

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PendingOrdersPage } from "./orders/pending-orders";
import { AwaitingConfirmationOrdersPage } from "./orders/awaiting-confirmation-orders";
import { AwaitingPaymentOrdersPage } from "./orders/awaiting-payment-orders";
import { ConfirmedOrdersPage } from "./orders/confirmed-orders";
import { ShippedOrdersPage } from "./orders/shipped-orders";
import { DeliveredOrdersPage } from "./orders/delivered-orders";
import { CancelledOrdersPage } from "./orders/cancelled-orders";

type OrderTab = "pending" | "awaiting-confirmation" | "awaiting-payment" | "confirmed" | "shipped" | "delivered" | "cancelled";

interface MyOrdersPageProps {
  activeTab: OrderTab;
  onNewOrder?: () => void;
}

export const MyOrdersPage: React.FC<MyOrdersPageProps> = ({ activeTab, onNewOrder }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "pending":
        return <PendingOrdersPage onNewOrder={onNewOrder} />;
      case "awaiting-confirmation":
        return <AwaitingConfirmationOrdersPage />;
      case "awaiting-payment":
        return <AwaitingPaymentOrdersPage />;
      case "confirmed":
        return <ConfirmedOrdersPage />;
      case "shipped":
        return <ShippedOrdersPage />;
      case "delivered":
        return <DeliveredOrdersPage />;
      case "cancelled":
        return <CancelledOrdersPage />;
      default:
        return <PendingOrdersPage onNewOrder={onNewOrder} />;
    }
  };

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
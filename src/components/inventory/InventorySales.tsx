
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SalesCustomers from "@/components/inventory/sales/SalesCustomers";
import SalesOrders from "@/components/inventory/sales/SalesOrders";
import SalesInvoices from "@/components/inventory/sales/SalesInvoices";
import SalesPaymentsIn from "@/components/inventory/sales/SalesPaymentsIn";
import SalesReturns from "@/components/inventory/sales/SalesReturns";
import SalesCreditNote from "@/components/inventory/sales/SalesCreditNote";

const InventorySales = () => {
  const [activeSalesTab, setActiveSalesTab] = useState("customers");

  const salesSubTabs = [
    { id: "customers", label: "Customers" },
    { id: "sales_orders", label: "Sales Orders" },
    { id: "invoices", label: "Invoices" },
    { id: "payments_in", label: "Payments IN" },
    { id: "sales_returns", label: "Sales Returns" },
    { id: "credit_note", label: "Credit Note" },
  ];

  const renderSalesContent = () => {
    switch (activeSalesTab) {
      case "customers":
        return <SalesCustomers />;
      case "sales_orders":
        return <SalesOrders />;
      case "invoices":
        return <SalesInvoices />;
      case "payments_in":
        return <SalesPaymentsIn />;
      case "sales_returns":
        return <SalesReturns />;
      case "credit_note":
        return <SalesCreditNote />;
      default:
        return <SalesCustomers />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b pb-4">
        {salesSubTabs.map((subTab) => (
          <Button
            key={subTab.id}
            variant={activeSalesTab === subTab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSalesTab(subTab.id)}
            className={cn(
              "transition-all",
              activeSalesTab === subTab.id 
                ? "bg-blue-600 text-white shadow-lg" 
                : "hover:bg-blue-50 hover:text-blue-600"
            )}
          >
            {subTab.label}
          </Button>
        ))}
      </div>
      {renderSalesContent()}
    </div>
  );
};

export default InventorySales;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  Package, 
  Receipt, 
  ArrowUp, 
  RotateCcw, 
  CreditCard,
  FileCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InventoryPurchase = () => {
  const navigate = useNavigate();
  
  const purchaseMenuItems = [
    { id: "suppliers", label: "Suppliers", icon: Users, url: "/inventory/purchase/suppliers" },
    { id: "purchase_orders", label: "Purchase Orders", icon: FileText, url: "/inventory/purchase/orders" },
    { id: "purchase_receives", label: "Purchase Receives", icon: Package, url: "/inventory/purchase/receives" },
    { id: "bills", label: "Bills", icon: Receipt, url: "/inventory/purchase/bills" },
    { id: "payments_out", label: "Payments OUT", icon: ArrowUp, url: "/inventory/purchase/payments-out" },
    { id: "purchase_returns", label: "Purchase Returns", icon: RotateCcw, url: "/inventory/purchase/returns" },
    { id: "expenses", label: "Expenses", icon: CreditCard, url: "/inventory/purchase/expenses" },
    { id: "credit_note", label: "Credit Note", icon: FileCheck, url: "/inventory/purchase/credit-notes" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {purchaseMenuItems.map((item) => (
          <Card 
            key={item.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(item.url)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <span className="text-blue-600 hover:underline text-sm">
                View {item.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Purchase Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { supplier: "Reliance Distributors", date: "14 May 2025", amount: "₹35,600.00" },
                  { supplier: "Tata Electronics", date: "12 May 2025", amount: "₹24,850.00" },
                  { supplier: "Infosys Tech Supplies", date: "10 May 2025", amount: "₹18,200.00" },
                  { supplier: "Mahindra Goods", date: "09 May 2025", amount: "₹9,750.00" },
                  { supplier: "Bajaj Components", date: "08 May 2025", amount: "₹12,450.00" }
                ].map((purchase, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{purchase.supplier}</p>
                      <p className="text-xs text-muted-foreground">{purchase.date}</p>
                    </div>
                    <p className="text-sm font-medium">{purchase.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Purchase Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { po: "PO-2025-028", supplier: "Jio Technologies", amount: "₹48,500.00", deliveryDate: "22 May 2025" },
                  { po: "PO-2025-027", supplier: "Wipro Solutions", amount: "₹36,750.00", deliveryDate: "21 May 2025" },
                  { po: "PO-2025-026", supplier: "Godrej Manufacturers", amount: "₹28,000.00", deliveryDate: "19 May 2025" },
                  { po: "PO-2025-025", supplier: "Maruti Components", amount: "₹17,200.00", deliveryDate: "18 May 2025" }
                ].map((order, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{order.po} - {order.supplier}</p>
                      <p className="text-xs text-muted-foreground">Delivery: {order.deliveryDate}</p>
                    </div>
                    <p className="text-sm font-medium">{order.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InventoryPurchase;

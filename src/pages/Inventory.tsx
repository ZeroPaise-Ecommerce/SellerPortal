import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Package,
  CreditCard,
  FileText,
  Plus,
  ChevronDown,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import InventoryOverview from "@/components/inventory/InventoryOverview";
import InventorySales from "@/components/inventory/InventorySales";
import InventoryItems from "@/components/inventory/InventoryItems";
import InventoryCategories from "@/components/inventory/InventoryCategories";
import InventoryBanking from "@/components/inventory/InventoryBanking";
import InventoryReports from "@/components/inventory/InventoryReports";
import PurchaseSuppliers from "@/components/inventory/purchase/PurchaseSuppliers";
import PurchaseOrdersTable from "@/components/inventory/purchase/PurchaseOrdersTable";
import CreatePurchaseOrder from "@/components/inventory/purchase/CreatePurchaseOrder";
import PurchaseOrderView from "@/components/inventory/purchase/PurchaseOrderView";
import PurchaseReceives from "@/components/inventory/purchase/PurchaseReceives";
import PurchaseBills from "@/components/inventory/purchase/PurchaseBills";
import PurchasePaymentsOut from "@/components/inventory/purchase/PurchasePaymentsOut";
import PurchaseReturns from "@/components/inventory/purchase/PurchaseReturns";
import PurchaseExpenses from "@/components/inventory/purchase/PurchaseExpenses";
import PurchaseCreditNote from "@/components/inventory/purchase/PurchaseCreditNote";
import AddInventoryForm from "@/components/inventory/forms/AddInventoryForm";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

interface InventoryOption {
  id: string;
  name: string;
}

type PurchaseViewMode = 'table' | 'create' | 'edit' | 'view';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activePurchaseTab, setActivePurchaseTab] = useState("suppliers");
  const [purchaseViewMode, setPurchaseViewMode] = useState<PurchaseViewMode>('table');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false);

  const tabsList = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "purchase", label: "Purchase", icon: ShoppingBag },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "items", label: "Items", icon: Package },
    { id: "categories", label: "Categories", icon: Tag },
    { id: "banking", label: "Banking", icon: CreditCard },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  const purchaseSubTabs = [
    { id: "suppliers", label: "Suppliers" },
    { id: "purchase_orders", label: "Purchase Orders" },
    { id: "purchase_receives", label: "Purchase Receives" },
    { id: "bills", label: "Bills" },
    { id: "payments_out", label: "Payments OUT" },
    { id: "purchase_returns", label: "Purchase Returns" },
    { id: "expenses", label: "Expenses" },
    { id: "credit_note", label: "Credit Note" },
  ];
  
  const inventoryOptions: InventoryOption[] = [
    { id: "inventory1", name: "Main Warehouse" },
    { id: "inventory2", name: "Retail Store 1" },
    { id: "inventory3", name: "Retail Store 2" },
    { id: "inventory4", name: "Distribution Center" },
  ];

  const handleCreatePO = () => {
    setPurchaseViewMode('create');
  };

  const handleEditPO = (orderId: string) => {
    setSelectedOrderId(orderId);
    setPurchaseViewMode('edit');
  };

  const handleViewPO = (orderId: string) => {
    setSelectedOrderId(orderId);
    setPurchaseViewMode('view');
  };

  const handleClosePO = () => {
    setPurchaseViewMode('table');
    setSelectedOrderId('');
  };

  const handleEditFromView = () => {
    setPurchaseViewMode('edit');
  };

  const handleAddNewInventory = () => {
    setShowAddInventoryForm(true);
  };

  const renderPurchaseContent = () => {
    if (activePurchaseTab === "purchase_orders") {
      if (purchaseViewMode === 'create') {
        return <CreatePurchaseOrder onClose={handleClosePO} />;
      }
      
      if (purchaseViewMode === 'edit') {
        return <CreatePurchaseOrder onClose={handleClosePO} isEdit={true} orderId={selectedOrderId} />;
      }
      
      if (purchaseViewMode === 'view') {
        return <PurchaseOrderView orderId={selectedOrderId} onClose={handleClosePO} onEdit={handleEditFromView} />;
      }
      
      return (
        <PurchaseOrdersTable 
          onCreatePO={handleCreatePO}
          onViewPO={handleViewPO}
          onEditPO={handleEditPO}
        />
      );
    }

    switch (activePurchaseTab) {
      case "suppliers":
        return <PurchaseSuppliers />;
      case "purchase_receives":
        return <PurchaseReceives />;
      case "bills":
        return <PurchaseBills />;
      case "payments_out":
        return <PurchasePaymentsOut />;
      case "purchase_returns":
        return <PurchaseReturns />;
      case "expenses":
        return <PurchaseExpenses />;
      case "credit_note":
        return <PurchaseCreditNote />;
      default:
        return <PurchaseSuppliers />;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Inventory</h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search Inventory" className="pl-9" />
            </div>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-blue-600 text-white hover:bg-blue-700 px-4">
                    <span className="flex items-center gap-2">
                      Select Inventory
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[220px] bg-white p-2">
                    <ul className="grid gap-1">
                      {inventoryOptions.map((option) => (
                        <li key={option.id}>
                          <NavigationMenuLink asChild>
                            <a 
                              href="#" 
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <div className="text-sm font-medium">{option.name}</div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                      <li className="border-t my-1 pt-1">
                        <NavigationMenuLink asChild>
                          <button 
                            onClick={handleAddNewInventory}
                            className="w-full text-left block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground flex items-center gap-2 text-blue-600"
                          >
                            <Plus className="h-4 w-4" />
                            Add New Inventory
                          </button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full border-b justify-start gap-2 rounded-none bg-transparent p-0 h-auto">
            {tabsList.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-none data-[state=active]:border-b-2 border-transparent data-[state=active]:border-blue-600 text-gray-700 data-[state=active]:text-blue-600 font-medium transition-all bg-transparent",
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">
              <InventoryOverview />
            </TabsContent>
            <TabsContent value="sales">
              <InventorySales />
            </TabsContent>
            <TabsContent value="purchase">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 border-b pb-4">
                  {purchaseSubTabs.map((subTab) => (
                    <Button
                      key={subTab.id}
                      variant={activePurchaseTab === subTab.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActivePurchaseTab(subTab.id)}
                      className={cn(
                        "transition-all",
                        activePurchaseTab === subTab.id 
                          ? "bg-blue-600 text-white shadow-lg" 
                          : "hover:bg-blue-50 hover:text-blue-600"
                      )}
                    >
                      {subTab.label}
                    </Button>
                  ))}
                </div>
                {renderPurchaseContent()}
              </div>
            </TabsContent>
            <TabsContent value="items">
              <InventoryItems />
            </TabsContent>
            <TabsContent value="categories">
              <InventoryCategories />
            </TabsContent>
            <TabsContent value="banking">
              <InventoryBanking />
            </TabsContent>
            <TabsContent value="reports">
              <InventoryReports />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <AddInventoryForm 
        open={showAddInventoryForm} 
        onClose={() => setShowAddInventoryForm(false)} 
      />
    </DashboardLayout>
  );
};

export default Inventory;

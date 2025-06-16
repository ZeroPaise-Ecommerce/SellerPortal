
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
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import InventoryOverview from "@/components/inventory/InventoryOverview";
import InventorySales from "@/components/inventory/InventorySales";
import InventoryPurchase from "@/components/inventory/InventoryPurchase";
import InventoryItems from "@/components/inventory/InventoryItems";
import InventoryBanking from "@/components/inventory/InventoryBanking";
import InventoryReports from "@/components/inventory/InventoryReports";
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

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabsList = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "purchase", label: "Purchase", icon: ShoppingBag },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "items", label: "Inventory", icon: Package },
    { id: "banking", label: "Banking", icon: CreditCard },
    { id: "reports", label: "Reports", icon: FileText },
  ];
  
  const inventoryOptions: InventoryOption[] = [
    { id: "inventory1", name: "Main Warehouse" },
    { id: "inventory2", name: "Retail Store 1" },
    { id: "inventory3", name: "Retail Store 2" },
    { id: "inventory4", name: "Distribution Center" },
  ];
  
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
                          <a 
                            href="#" 
                            className="block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground flex items-center gap-2 text-blue-600"
                          >
                            <Plus className="h-4 w-4" />
                            Add New Inventory
                          </a>
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
              <InventoryPurchase />
            </TabsContent>
            <TabsContent value="items">
              <InventoryItems />
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
    </DashboardLayout>
  );
};

export default Inventory;

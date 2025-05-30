
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Settings as SettingsIcon, 
  CreditCard, 
  Users, 
  Package, 
  Gift, 
  Globe, 
  Bell, 
  MessageSquare,
  Truck 
} from "lucide-react";

const SettingsMenu = [
  {
    id: "general",
    label: "General",
    icon: <SettingsIcon className="h-5 w-5 mr-2" />,
    path: "/settings/general"
  },
  {
    id: "plans",
    label: "Plans",
    icon: <CreditCard className="h-5 w-5 mr-2" />,
    path: "/settings/plans"
  },
  {
    id: "user-roles",
    label: "User Roles",
    icon: <Users className="h-5 w-5 mr-2" />,
    path: "/settings/user-roles"
  },
  {
    id: "payment-integration",
    label: "Payment Integration",
    icon: <CreditCard className="h-5 w-5 mr-2" />,
    path: "/settings/payment-integration"
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <MessageSquare className="h-5 w-5 mr-2" />,
    path: "/settings/integrations"
  },
  {
    id: "shipping-control",
    label: "Shipping Control",
    icon: <Truck className="h-5 w-5 mr-2" />,
    path: "/settings/shipping-control"
  },
  {
    id: "rewards-control",
    label: "Rewards Control",
    icon: <Gift className="h-5 w-5 mr-2" />,
    path: "/settings/rewards-control"
  },
  {
    id: "tracking",
    label: "Tracking",
    icon: <Globe className="h-5 w-5 mr-2" />,
    path: "/settings/tracking"
  },
  {
    id: "sales-channels",
    label: "Sales Channels",
    icon: <Package className="h-5 w-5 mr-2" />,
    path: "/settings/sales-channels"
  },
  {
    id: "domains",
    label: "Domains",
    icon: <Globe className="h-5 w-5 mr-2" />,
    path: "/settings/domains"
  },
  {
    id: "notification",
    label: "Notification",
    icon: <Bell className="h-5 w-5 mr-2" />,
    path: "/settings/notification"
  },
];

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(SettingsMenu[0].id);

  // Navigate to first menu item by default
  React.useEffect(() => {
    if (location.pathname === "/settings") {
      navigate(SettingsMenu[0].path);
    } else {
      const currentPath = location.pathname;
      const menuItem = SettingsMenu.find((item) => item.path === currentPath);
      if (menuItem) {
        setActiveTab(menuItem.id);
      }
    }
  }, [location.pathname, navigate]);

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <SettingsIcon className="mr-2 h-6 w-6 text-brand-blue" />
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <Card className="p-2">
            <nav className="flex flex-col space-y-1">
              {SettingsMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    navigate(item.path);
                  }}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors",
                    activeTab === item.id
                      ? "bg-gray-100 text-brand-blue font-medium"
                      : "text-gray-600"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="p-6">
            <Outlet />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

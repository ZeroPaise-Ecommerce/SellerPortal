
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  PackageOpen,
  Gift,
  Ticket,
  Globe,
  Star,
  Megaphone,
  Layers,
  BarChart2,
  FileText,
  Settings,
  LogOut,
  Smartphone,
  Zap,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarItemProps {
  title: string;
  icon: React.ElementType;
  path: string;
  children?: { title: string; path: string }[];
  isActive?: boolean;
  depth?: number;
}

const SidebarItem = ({ title, icon: Icon, path, children, depth = 0 }: SidebarItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === path;
  const hasChildren = children && children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  return (
    <div className={cn("sidebar-item", depth > 0 && "ml-4")}>
      <Link
        to={hasChildren ? "#" : path}
        onClick={handleToggle}
        className={cn(
          "flex items-center py-2 px-3 rounded-md my-1 hover:bg-brand-blue/10 transition-colors text-sm",
          isActive && !hasChildren && "sidebar-active"
        )}
      >
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        <span className="flex-1">{title}</span>
        {hasChildren && (
          <span className="ml-auto">
            {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </span>
        )}
      </Link>
      {hasChildren && expanded && (
        <div className="pl-4 border-l border-gray-200 ml-3 mt-1">
          {children.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-xs hover:bg-brand-blue/10",
                location.pathname === item.path && "sidebar-active"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardSidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r shadow-sm transition-transform duration-300 lg:translate-x-0 lg:static",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-brand-blue text-white p-1 rounded">
                <PackageOpen className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl">SaasShop</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-2">
            <SidebarItem
              title="Overview"
              icon={LayoutDashboard}
              path="/"
            />
            <SidebarItem
              title="Products"
              icon={Package}
              path="/products"
            />
            <SidebarItem
              title="Orders"
              icon={ShoppingCart}
              path="/orders"
            />
            <SidebarItem
              title="Customers"
              icon={Users}
              path="/customers"
            />
            <SidebarItem
              title="Messages"
              icon={MessageSquare}
              path="/messages"
            />
            <SidebarItem
              title="Inventory"
              icon={PackageOpen}
              path="/inventory"
            />
            <SidebarItem
              title="Gift Cards"
              icon={Gift}
              path="/gift-cards"
            />
            <SidebarItem
              title="Coupons"
              icon={Ticket}
              path="/coupons"
            />
            <SidebarItem
              title="Multi-Platform"
              icon={Globe}
              path="/multi-platform"
            />
            <SidebarItem
              title="Product Reviews"
              icon={Star}
              path="/product-reviews"
            />
            <SidebarItem
              title="Store POS"
              icon={ShoppingCart}
              path="/storename/pos"
            />
            <SidebarItem
              title="Marketing"
              icon={Megaphone}
              path="/marketing"
              children={[
                { title: "Campaign", path: "/marketing/campaign" },
                { title: "Automation", path: "/marketing/automation" },
                { title: "Sales Funnel", path: "/marketing/sales-funnel" },
                { title: "Affiliation", path: "/marketing/affiliation" }
              ]}
            />
            <SidebarItem
              title="Platform Control"
              icon={Settings}
              path="/platform-control"
              children={[
                { title: "Website Design", path: "/platform-control/website-design" },
                { title: "Android App", path: "/platform-control/android-app" },
                { title: "iOS App", path: "/platform-control/ios-app" }
              ]}
            />
            <SidebarItem
              title="Analytics"
              icon={BarChart2}
              path="/analytics"
            />
            <SidebarItem
              title="Reports"
              icon={FileText}
              path="/reports"
            />
            <SidebarItem
              title="Settings"
              icon={Settings}
              path="/settings"
            />
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;

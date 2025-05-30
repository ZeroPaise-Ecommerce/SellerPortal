
import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Search,
  Bell,
  HelpCircle,
  Settings,
  User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white border-b flex items-center h-16 px-4 shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Search Bar */}
          <div className="relative hidden md:block max-w-md w-full mr-auto ml-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              placeholder="Search..."
              className="pl-10 h-9 w-full lg:w-64 text-xs"
            />
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="md:hidden mr-auto">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Right side items */}
          <div className="flex items-center space-x-2">
            {/* Notification Bell */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-3">
                <div className="font-semibold text-sm mb-2 pb-2 border-b">Notifications</div>
                <div className="text-xs text-center py-6 text-gray-500">
                  No new notifications
                </div>
              </PopoverContent>
            </Popover>

            {/* Help Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-3">
                <div className="font-semibold text-sm mb-2 pb-2 border-b">Help Center</div>
                <div className="text-xs space-y-2 mb-2">
                  <p>Need assistance with your dashboard?</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Documentation
                  </Button>
                  <Button className="w-full bg-brand-blue hover:bg-brand-dark-blue text-xs">
                    Contact Support
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-9 flex items-center gap-2">
                  <div className="bg-brand-blue text-white rounded-full h-7 w-7 flex items-center justify-center text-xs font-semibold">
                    AS
                  </div>
                  <span className="hidden lg:inline text-xs">Admin User</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 p-2">
                <div className="font-semibold text-sm mb-4 pb-2 border-b flex items-center gap-2">
                  <div className="bg-brand-blue text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold">
                    AS
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Admin Store</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <div className="pt-2 mt-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 text-xs">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 text-base">
          <div className="dashboard-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface POSLayoutProps {
  children: React.ReactNode;
  cart: React.ReactNode;
  totalItems: number;
}

const POSLayout = ({ children, cart, totalItems }: POSLayoutProps) => {
  const isMobile = useIsMobile();
  const [showCart, setShowCart] = useState(!isMobile);
  
  // Toggle cart visibility on mobile
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* POS Header */}
      <header className="bg-white shadow-sm border-b h-14 md:h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg">Store POS</h1>
        </div>
        
        {isMobile && (
          <Button 
            onClick={toggleCart}
            variant="ghost" 
            size="icon" 
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        )}
      </header>
      
      {/* POS Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main POS Area */}
        <div className={cn(
          "flex-1 overflow-y-auto transition-all",
          isMobile && showCart ? "hidden" : "block"
        )}>
          {children}
        </div>
        
        {/* Cart Sidebar */}
        <div className={cn(
          "border-l bg-white overflow-hidden transition-all",
          isMobile ? (showCart ? "block w-full" : "hidden") : "block w-1/3 min-w-80 max-w-md"
        )}>
          {cart}
        </div>
      </div>
    </div>
  );
};

export default POSLayout;

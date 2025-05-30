
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard } from "lucide-react";

interface PlansLayoutProps {
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
}

const PlansLayout = ({ 
  children, 
  title = "Plans & Billing",
  isLoading = false 
}: PlansLayoutProps) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <CreditCard className="mr-2 h-6 w-6 text-brand-blue" />
        {isLoading ? (
          <Skeleton className="h-7 w-48" />
        ) : (
          <h1 className="text-xl font-semibold">{title}</h1>
        )}
      </div>
      
      <div className="space-y-8">
        {isLoading ? (
          // Layout skeleton when loading
          <div className="space-y-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default PlansLayout;

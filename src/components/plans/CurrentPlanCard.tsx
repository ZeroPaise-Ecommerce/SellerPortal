
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentPlanCardProps {
  renewalDate: string;
  features: string[];
  isLoading?: boolean;
}

const CurrentPlanCard = ({ renewalDate, features, isLoading = false }: CurrentPlanCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-5 w-64 mt-2" />
            </div>
            <Skeleton className="h-9 w-40" />
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid gap-2 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Pro Plan</h3>
              <Badge className="bg-blue-500">Current</Badge>
            </div>
            <p className="text-gray-500">$49.99/month • Renews on {renewalDate}</p>
          </div>
          <Button variant="outline">Manage Subscription</Button>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Current Plan Includes:</h4>
          <ul className="grid gap-2 md:grid-cols-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPlanCard;

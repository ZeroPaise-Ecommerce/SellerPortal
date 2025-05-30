
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { WalletActivity } from "@/types/plans";

interface WalletSectionProps {
  balance: string;
  activities: WalletActivity[];
  isLoading?: boolean;
}

const WalletSection = ({ balance, activities, isLoading = false }: WalletSectionProps) => {
  if (isLoading) {
    return (
      <section>
        <h2 className="text-lg font-medium mb-4">Wallet</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-10 w-24 mt-1" />
                <Skeleton className="h-5 w-64 mt-1" />
              </div>
              <div className="space-y-2 md:space-y-0 md:space-x-2">
                <Skeleton className="h-10 w-24 inline-block" />
                <Skeleton className="h-10 w-24 inline-block md:ml-2" />
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex justify-between items-center">
                    <div>
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-24 mt-1" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-6 w-40 mt-4" />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }
  
  return (
    <section>
      <h2 className="text-lg font-medium mb-4">Wallet</h2>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Current Balance</h3>
              <p className="text-3xl font-bold mt-1">{balance}</p>
              <p className="text-gray-500 mt-1">Available for future purchases or subscriptions</p>
            </div>
            <div className="space-y-2 md:space-y-0 md:space-x-2">
              <Button>Add Funds</Button>
              <Button variant="outline">Withdraw</Button>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium mb-4">Recent Wallet Activities</h4>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-sm">{activity.date}</p>
                  </div>
                  <span className={activity.isIncome ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {activity.isIncome ? '+' : '-'}{activity.amount}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 p-0">
              View All Transactions <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default WalletSection;


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PlanType } from "@/types/plans";

interface PlanCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  currentPlan: PlanType;
  planType: PlanType;
  isPopular?: boolean;
  isLoading?: boolean;
  onUpgrade: (plan: PlanType) => void;
}

const PlanCard = ({ 
  title, 
  description, 
  price, 
  features, 
  currentPlan, 
  planType, 
  isPopular = false,
  isLoading = false,
  onUpgrade 
}: PlanCardProps) => {
  const isCurrentPlan = currentPlan === planType;
  const isUpgrade = 
    (currentPlan === "basic" && (planType === "pro" || planType === "enterprise")) || 
    (currentPlan === "pro" && planType === "enterprise");

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-24" />
            {isPopular && <Skeleton className="h-5 w-16" />}
          </div>
          <Skeleton className="h-5 w-48 mt-1" />
          <div className="mt-2">
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={isCurrentPlan ? "border-blue-500" : ""}>
      <CardHeader>
        <div className={isPopular ? "flex justify-between items-center" : ""}>
          <CardTitle>{title}</CardTitle>
          {isPopular && <Badge>Popular</Badge>}
        </div>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <span className="text-2xl font-bold">{price}</span>
          <span className="text-gray-500">/month</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isCurrentPlan ? (
          <Button disabled className="w-full">Current Plan</Button>
        ) : (
          <Button 
            variant={isUpgrade ? "default" : "outline"} 
            className="w-full" 
            onClick={() => onUpgrade(planType)}
          >
            {isUpgrade ? "Upgrade" : "Downgrade"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanCard;

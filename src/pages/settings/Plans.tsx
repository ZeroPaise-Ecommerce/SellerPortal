
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PlanType } from "@/types/plans";
import CurrentPlanCard from "@/components/plans/CurrentPlanCard";
import PlanCard from "@/components/plans/PlanCard";
import TransactionHistory from "@/components/plans/TransactionHistory";
import WalletSection from "@/components/plans/WalletSection";
import PlansLayout from "@/components/plans/PlansLayout";

const Plans = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Specify the type of currentPlan
  const currentPlan: PlanType = "pro";
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleUpgrade = (plan: PlanType) => {
    toast({
      title: "Plan upgrade initiated",
      description: `You're upgrading to the ${plan} plan. Follow the payment steps to complete.`,
    });
  };

  const currentPlanFeatures = [
    "Unlimited products",
    "Up to 5 staff accounts",
    "Advanced reporting",
    "Multi-channel selling",
    "Custom domain",
    "24/7 support",
  ];

  const plans = [
    {
      type: "basic" as PlanType,
      title: "Basic",
      description: "For small businesses just getting started",
      price: "$19.99",
      features: [
        "Up to 100 products",
        "2 staff accounts",
        "Basic reporting",
        "Online store",
      ],
    },
    {
      type: "pro" as PlanType,
      title: "Pro",
      description: "For growing businesses with increased needs",
      price: "$49.99",
      features: [
        "Unlimited products",
        "Up to 5 staff accounts",
        "Advanced reporting",
        "Multi-channel selling",
        "Custom domain",
      ],
      isPopular: true,
    },
    {
      type: "enterprise" as PlanType,
      title: "Enterprise",
      description: "For large businesses with complex requirements",
      price: "$149.99",
      features: [
        "Unlimited everything",
        "Unlimited staff accounts",
        "Custom reporting",
        "API access",
        "Dedicated account manager",
        "Priority 24/7 support",
      ],
    },
  ];

  const transactions = [
    {
      date: "May 15, 2025",
      description: "Pro Plan - Monthly Subscription",
      amount: "$49.99",
      status: "Paid" as const,
    },
    {
      date: "Apr 15, 2025",
      description: "Pro Plan - Monthly Subscription",
      amount: "$49.99",
      status: "Paid" as const,
    },
    {
      date: "Mar 15, 2025",
      description: "Pro Plan - Monthly Subscription",
      amount: "$49.99",
      status: "Paid" as const,
    },
  ];

  const walletActivities = [
    {
      title: "Refund - Order #38291",
      date: "May 3, 2025",
      amount: "$25.00",
      isIncome: true,
    },
    {
      title: "Added Funds",
      date: "Apr 22, 2025",
      amount: "$100.00",
      isIncome: true,
    },
    {
      title: "Platform Fee",
      date: "Apr 10, 2025",
      amount: "$3.50",
      isIncome: false,
    },
    {
      title: "Partial Payment - Invoice #8372",
      date: "Mar 28, 2025",
      amount: "$18.00",
      isIncome: false,
    },
  ];

  return (
    <PlansLayout isLoading={isLoading}>
      <section>
        <h2 className="text-lg font-medium mb-4">Current Plan</h2>
        <CurrentPlanCard 
          renewalDate="June 15, 2025"
          features={currentPlanFeatures}
          isLoading={isLoading}
        />
      </section>
      
      <section>
        <h2 className="text-lg font-medium mb-4">Available Plans</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.type}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              currentPlan={currentPlan}
              planType={plan.type}
              isPopular={plan.isPopular}
              isLoading={isLoading}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>
      </section>
      
      <TransactionHistory 
        transactions={transactions} 
        isLoading={isLoading}
      />
      
      <WalletSection 
        balance="$128.50" 
        activities={walletActivities}
        isLoading={isLoading}
      />
    </PlansLayout>
  );
};

export default Plans;

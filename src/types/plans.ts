
export type PlanType = "basic" | "pro" | "enterprise";

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  type: PlanType;
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface WalletActivity {
  title: string;
  date: string;
  amount: string;
  isIncome: boolean;
}

export interface Transaction {
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

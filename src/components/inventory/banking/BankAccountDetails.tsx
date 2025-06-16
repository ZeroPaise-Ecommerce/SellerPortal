
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, CreditCard, Calendar, MapPin } from "lucide-react";

interface BankAccountDetailsProps {
  account: any;
  onBack: () => void;
  onViewTransactions: () => void;
}

const BankAccountDetails: React.FC<BankAccountDetailsProps> = ({ account, onBack, onViewTransactions }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-semibold">Account Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Account Name</label>
              <p className="text-lg font-semibold">{account.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Account Number</label>
              <p className="text-lg">{account.number}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Account Type</label>
              <p className="text-lg capitalize">{account.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Current Balance</label>
              <p className="text-2xl font-bold text-green-600">{account.balance}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Bank Name</label>
              <p className="text-lg">{account.bankName || "HDFC Bank"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">IFSC Code</label>
              <p className="text-lg">{account.ifscCode || "HDFC0001234"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Branch</label>
              <p className="text-lg">{account.branchName || "Mumbai Main Branch"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Currency</label>
              <p className="text-lg">{account.currency || "INR"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={onViewTransactions}>
              <CreditCard className="h-4 w-4 mr-2" />
              View Transactions
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Statement
            </Button>
            <Button variant="outline">Edit Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankAccountDetails;

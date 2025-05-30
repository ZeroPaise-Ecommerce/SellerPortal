
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types/plans";

interface TransactionHistoryProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionHistory = ({ transactions, isLoading = false }: TransactionHistoryProps) => {
  return (
    <section>
      <h2 className="text-lg font-medium mb-4">Transaction History</h2>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Loading state rows
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
                    <td className="p-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-5 w-40" /></td>
                    <td className="p-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="p-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="p-4 text-right"><Skeleton className="h-5 w-32 ml-auto" /></td>
                  </tr>
                ))
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{transaction.date}</td>
                    <td className="p-4">{transaction.description}</td>
                    <td className="p-4">{transaction.amount}</td>
                    <td className="p-4">
                      <Badge className={`bg-${transaction.status === 'Paid' ? 'green' : transaction.status === 'Pending' ? 'yellow' : 'red'}-500`}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="link" className="p-0">Download Invoice</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
};

export default TransactionHistory;

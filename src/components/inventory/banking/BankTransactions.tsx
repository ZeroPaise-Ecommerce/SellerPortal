
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import AddTransactionForm from "./AddTransactionForm";

interface BankTransactionsProps {
  account: any;
  onBack: () => void;
}

const BankTransactions: React.FC<BankTransactionsProps> = ({ account, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-01-15", description: "Payment from Customer A", type: "credit", amount: 15000, balance: 140000 },
    { id: 2, date: "2025-01-14", description: "Office Rent Payment", type: "debit", amount: 25000, balance: 125000 },
    { id: 3, date: "2025-01-13", description: "Supplier Payment", type: "debit", amount: 30000, balance: 150000 },
    { id: 4, date: "2025-01-12", description: "Sales Revenue", type: "credit", amount: 45000, balance: 180000 },
    { id: 5, date: "2025-01-11", description: "Utility Bills", type: "debit", amount: 5000, balance: 135000 },
    { id: 6, date: "2025-01-10", description: "Bank Charges", type: "debit", amount: 500, balance: 140000 },
    { id: 7, date: "2025-01-09", description: "Customer Payment", type: "credit", amount: 20000, balance: 140500 },
    { id: 8, date: "2025-01-08", description: "Equipment Purchase", type: "debit", amount: 75000, balance: 120500 },
  ]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleAddTransaction = (transaction: any) => {
    const newTransaction = {
      id: transactions.length + 1,
      ...transaction,
      balance: transactions[0]?.balance + (transaction.type === 'credit' ? transaction.amount : -transaction.amount) || transaction.amount,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">Transactions - {account.name}</h2>
        </div>
        <Button onClick={() => setShowAddTransaction(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Manual Entry
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{transaction.balance.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, transactions.length)} of {transactions.length} transactions
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">Page {currentPage} of {totalPages}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddTransactionForm 
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        onSave={handleAddTransaction}
        account={account}
      />
    </div>
  );
};

export default BankTransactions;

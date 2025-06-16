
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Building
} from "lucide-react";
import AddBankAccountForm from "./forms/AddBankAccountForm";
import AddCreditCardForm from "./forms/AddCreditCardForm";
import BankAccountDetails from "./banking/BankAccountDetails";
import BankTransactions from "./banking/BankTransactions";

const InventoryBanking = () => {
  const [activeTab, setActiveTab] = useState("banks");
  const [showAddBankForm, setShowAddBankForm] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [currentView, setCurrentView] = useState("main"); // main, details, transactions
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [bankAccounts, setBankAccounts] = useState([
    { id: "acc1", name: "HDFC Business Account", number: "HDFC •••• 4587", balance: "₹1,24,850.00", type: "current", logo: "/hdfc-logo.svg" },
    { id: "acc2", name: "SBI Corporate Account", number: "SBI •••• 7891", balance: "₹75,240.00", type: "current", logo: "/sbi-logo.svg" },
    { id: "acc3", name: "ICICI Business Account", number: "ICICI •••• 2354", balance: "₹42,650.00", type: "current", logo: "/icici-logo.svg" },
    { id: "acc4", name: "Axis Corporate Account", number: "AXIS •••• 6789", balance: "₹86,450.00", type: "current", logo: "/axis-logo.svg" },
  ]);

  const [creditCards, setCreditCards] = useState([
    { id: "card1", name: "HDFC Corporate Card", number: "•••• •••• •••• 4587", balance: "₹85,000.00", available: "₹15,000.00", dueDate: "28 May 2025", logo: "/hdfc-logo.svg" },
    { id: "card2", name: "SBI Business Card", number: "•••• •••• •••• 7891", balance: "₹50,000.00", available: "₹10,000.00", dueDate: "15 May 2025", logo: "/sbi-logo.svg" },
    { id: "card3", name: "ICICI Corporate Card", number: "•••• •••• •••• 2354", balance: "₹25,000.00", available: "₹5,000.00", dueDate: "22 May 2025", logo: "/icici-logo.svg" },
  ]);

  const handleAddBankAccount = (account: any) => {
    setBankAccounts(prev => [...prev, account]);
  };

  const handleAddCreditCard = (card: any) => {
    setCreditCards(prev => [...prev, card]);
  };

  const handleViewDetails = (account: any) => {
    setSelectedAccount(account);
    setCurrentView("details");
  };

  const handleViewTransactions = (account?: any) => {
    if (account) setSelectedAccount(account);
    setCurrentView("transactions");
  };

  const handleBackToMain = () => {
    setCurrentView("main");
    setSelectedAccount(null);
  };

  if (currentView === "details") {
    return (
      <BankAccountDetails 
        account={selectedAccount}
        onBack={handleBackToMain}
        onViewTransactions={() => handleViewTransactions()}
      />
    );
  }

  if (currentView === "transactions") {
    return (
      <BankTransactions 
        account={selectedAccount}
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Banking</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="banks" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Bank Accounts
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Credit Cards
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="banks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {bankAccounts.map((account) => (
              <Card key={account.id} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>{account.number}</CardDescription>
                    </div>
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{account.balance}</div>
                  <p className="text-xs text-muted-foreground mt-1">Current Balance</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(account)}>
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleViewTransactions(account)}>
                    Transactions
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center h-[180px] border-dashed cursor-pointer hover:bg-gray-50" onClick={() => setShowAddBankForm(true)}>
              <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Add New Bank Account</p>
              <p className="text-xs text-muted-foreground">Connect your business accounts</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {creditCards.map((card) => (
              <Card key={card.id} className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{card.name}</CardTitle>
                      <CardDescription className="text-blue-100">{card.number}</CardDescription>
                    </div>
                    <CreditCard className="h-6 w-6 text-blue-100" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-blue-100">Credit Limit</p>
                      <div className="text-lg font-bold">{card.balance}</div>
                    </div>
                    <div>
                      <p className="text-xs text-blue-100">Available Credit</p>
                      <div className="text-lg font-bold">{card.available}</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-100 mt-3">Due Date: {card.dueDate}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button size="sm" variant="secondary" onClick={() => handleViewDetails(card)}>
                    View Details
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleViewTransactions(card)}>
                    Transactions
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center h-[180px] border-dashed cursor-pointer hover:bg-gray-50" onClick={() => setShowAddCardForm(true)}>
              <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Add New Credit Card</p>
              <p className="text-xs text-muted-foreground">Connect your business credit cards</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AddBankAccountForm 
        isOpen={showAddBankForm}
        onClose={() => setShowAddBankForm(false)}
        onSave={handleAddBankAccount}
      />

      <AddCreditCardForm 
        isOpen={showAddCardForm}
        onClose={() => setShowAddCardForm(false)}
        onSave={handleAddCreditCard}
      />
    </div>
  );
};

export default InventoryBanking;

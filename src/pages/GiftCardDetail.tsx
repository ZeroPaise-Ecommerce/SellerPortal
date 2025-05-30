import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Gift } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/api";

const GiftCardDetail = () => {
  const { giftCardId } = useParams();
  const navigate = useNavigate();
  const [giftCard, setGiftCard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGiftCard = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/GiftCards/${giftCardId}`);
        setGiftCard(res.data);
        // Fetch transactions
        const txRes = await api.get(`/GiftCards/${giftCardId}/transactions`);
        setTransactions(txRes.data);
      } catch (error) {
        console.error("Gift card not found");
        navigate("/gift-cards");
      } finally {
        setLoading(false);
      }
    };
    fetchGiftCard();
  }, [giftCardId, navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading gift card details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!giftCard) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Gift card not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="pl-0 mb-2"
          onClick={() => navigate("/gift-cards")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Gift Cards
        </Button>
        
        <div className="flex items-center">
          <div className="mr-3">
            <Gift size={24} className="text-brand-blue" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Gift Card {giftCard.code}</h1>
            <p className="text-sm text-gray-500">View gift card details and transaction history</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Gift Card Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Status</dt>
                <dd>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      giftCard.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : giftCard.status === "Redeemed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {giftCard.status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">ID</dt>
                <dd>{giftCard.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Current Balance</dt>
                <dd className="font-semibold">₹{giftCard.balance.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Initial Value</dt>
                <dd>₹{giftCard.initialValue.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Issue Date</dt>
                <dd>{giftCard.issuedDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Expiry Date</dt>
                <dd>{giftCard.expiryDate}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recipient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Name</dt>
                <dd>{giftCard.recipientName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Email</dt>
                <dd>{giftCard.recipientEmail}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Phone</dt>
                <dd>{giftCard.recipientPhone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Usage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Transactions</dt>
                <dd>{transactions.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Amount Used</dt>
                <dd>₹{(giftCard.initialValue - giftCard.balance).toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Percent Used</dt>
                <dd>
                  {giftCard.initialValue > 0
                    ? Math.round(((giftCard.initialValue - giftCard.balance) / giftCard.initialValue) * 100)
                    : 0}%
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">Transaction ID</TableHead>
                  <TableHead className="text-xs font-semibold">Date</TableHead>
                  <TableHead className="text-xs font-semibold">Description</TableHead>
                  <TableHead className="text-xs font-semibold">Amount</TableHead>
                  <TableHead className="text-xs font-semibold">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-xs">{transaction.id}</TableCell>
                    <TableCell className="text-xs">{transaction.date}</TableCell>
                    <TableCell className="text-xs">{transaction.description}</TableCell>
                    <TableCell className="text-xs text-red-500">-${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-xs">₹{transaction.balance.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions have been recorded for this gift card yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default GiftCardDetail;

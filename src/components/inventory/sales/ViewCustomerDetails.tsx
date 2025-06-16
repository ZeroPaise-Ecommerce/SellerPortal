
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ViewCustomerDetailsProps {
  customer: any;
  onClose: () => void;
  onEdit: () => void;
}

const formatIndianCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const ViewCustomerDetails = ({ customer, onClose, onEdit }: ViewCustomerDetailsProps) => {
  const orderHistory = [
    {
      id: "SO-1001",
      date: "15-Jun-2023",
      amount: 24599,
      status: "Completed",
      items: 3
    },
    {
      id: "SO-1002",
      date: "10-Jun-2023",
      amount: 18450,
      status: "Processing",
      items: 2
    },
    {
      id: "SO-1003",
      date: "05-Jun-2023",
      amount: 9275,
      status: "Completed",
      items: 1
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">General Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-base">{customer.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-base">{customer.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-base">{customer.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Company</label>
              <p className="text-base">{customer.company}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Statistics</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Total Orders</label>
              <p className="text-base font-semibold">{customer.totalOrders}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Total Spent</label>
              <p className="text-base font-semibold">{formatIndianCurrency(customer.totalSpent)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Last Order</label>
              <p className="text-base">{customer.lastOrder}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                customer.status === "Active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {customer.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              123 Business Park<br />
              Sector 15, Noida<br />
              Uttar Pradesh - 201301<br />
              India
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Same as billing address
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Order History</h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Items</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderHistory.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatIndianCurrency(order.amount)}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={onEdit}>Edit Customer</Button>
      </div>
    </div>
  );
};

export default ViewCustomerDetails;

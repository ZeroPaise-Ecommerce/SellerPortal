
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, CheckCircle2, AlertCircle, Play } from "lucide-react";

interface ViewReturnDetailsProps {
  returnItem: any;
  onClose: () => void;
  onEdit: () => void;
}

const ViewReturnDetails = ({ returnItem, onClose, onEdit }: ViewReturnDetailsProps) => {
  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</span>;
      case "Pending":
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"><Play className="h-3 w-3 mr-1" /> Pending</span>;
      case "Rejected":
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"><AlertCircle className="h-3 w-3 mr-1" /> Rejected</span>;
      case "Processing":
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"><Play className="h-3 w-3 mr-1" /> Processing</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
    }
  };

  const returnItems = [
    { id: 1, name: "Product A", description: "High quality product", returnQty: 1, rate: 1000, amount: 1000 },
    { id: 2, name: "Product B", description: "Premium product", returnQty: 1, rate: 1500, amount: 1500 },
  ];

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === "Approved") {
      alert("Return approved. Processing refund...");
    } else if (newStatus === "Rejected") {
      alert("Return rejected.");
    } else if (newStatus === "Processing") {
      alert("Return moved to processing.");
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Sales Return Details</DialogTitle>
      </DialogHeader>

      {/* Return Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">SALES RETURN</h1>
            <p className="text-red-100 mt-1">{returnItem.id}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatIndianCurrency(returnItem.amount)}</div>
            <div className="mt-2">{getStatusBadge(returnItem.status)}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          {returnItem.status === "Pending" && (
            <Button variant="outline" size="sm" onClick={() => handleStatusChange("Processing")}>
              <Play className="h-4 w-4 mr-2" />
              Move to Processing
            </Button>
          )}
          {returnItem.status === "Processing" && (
            <>
              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50" onClick={() => handleStatusChange("Approved")}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleStatusChange("Rejected")}>
                <AlertCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Return Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Return Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Return ID:</span>
              <span className="font-medium font-mono">{returnItem.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium font-mono">{returnItem.orderID}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{returnItem.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Return Date:</span>
              <span className="font-medium">{returnItem.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reason:</span>
              <span className="font-medium">{returnItem.reason}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Refund Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Items Returned:</span>
              <span className="font-medium">{returnItem.items}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Refund Amount:</span>
              <span className="font-medium text-red-600">{formatIndianCurrency(returnItem.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <div>{getStatusBadge(returnItem.status)}</div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-medium">{formatIndianCurrency(0)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Net Refund:</span>
              <span className="text-red-600">{formatIndianCurrency(returnItem.amount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Return Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Returned Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Return Qty</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Refund Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.returnQty}</TableCell>
                  <TableCell className="text-right">{formatIndianCurrency(item.rate)}</TableCell>
                  <TableCell className="text-right font-medium">{formatIndianCurrency(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity & Comments History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Return Created</p>
                  <p className="text-sm text-gray-600">Return request created by {returnItem.customerName}</p>
                </div>
                <span className="text-xs text-gray-500">{returnItem.date}</span>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order Delivered</p>
                  <p className="text-sm text-gray-600">Order {returnItem.orderID} was successfully delivered</p>
                </div>
                <span className="text-xs text-gray-500">05-Jun-2023</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onEdit}>
          Edit Return
        </Button>
      </div>
    </div>
  );
};

export default ViewReturnDetails;

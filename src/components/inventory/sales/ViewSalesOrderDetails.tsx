
import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Send, Printer, XCircle, FileText, MessageSquare, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ViewSalesOrderDetailsProps {
  order: any;
  onClose: () => void;
  onEdit: () => void;
}

const ViewSalesOrderDetails = ({ order, onClose, onEdit }: ViewSalesOrderDetailsProps) => {
  const [newComment, setNewComment] = useState("");
  
  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const orderItems = order.items || [];

  const activities = [
    { id: 1, action: "Order Created", user: "Admin", date: "15-Jun-2023 10:30 AM", description: "Sales order was created" },
    { id: 2, action: "Status Updated", user: "Manager", date: "15-Jun-2023 02:15 PM", description: "Status changed to Processing" },
    { id: 3, action: "Payment Received", user: "Accounts", date: "16-Jun-2023 11:45 AM", description: "Partial payment received" },
  ];

  const comments = [
    { id: 1, user: "Sales Team", date: "15-Jun-2023", comment: "Customer requested expedited delivery" },
    { id: 2, user: "Warehouse", date: "16-Jun-2023", comment: "Items picked and ready for dispatch" },
  ];

  const subtotal = orderItems?.reduce((sum, item) => sum + (item.amount || 0), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleCreateInvoice = () => {
    alert("Creating invoice...");
  };

  const handleSendOrder = () => {
    alert("Sending order to customer...");
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleCancelOrder = () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      alert("Order cancelled");
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      alert("Comment added successfully");
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{order.id}</h3>
          <p className="text-gray-600">Customer: {order.customerName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendOrder}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrintOrder}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleCancelOrder}>
            <XCircle className="h-4 w-4 mr-2" />
            Cancel Order
          </Button>
          <Button size="sm" onClick={handleCreateInvoice}>
            <FileText className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      <Separator />

      {/* Order Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reference</p>
              <p className="font-medium">REF-{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Policy</p>
              <p className="font-medium">Net 30 Days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">customer@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">+91 98765 43210</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Order Status</p>
              <Badge variant={order.status === "Completed" ? "default" : "secondary"}>
                {order.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <Badge variant={order.paymentStatus === "Paid" ? "default" : "destructive"}>
                {order.paymentStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Amount Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Subtotal</p>
              <p className="font-medium">{formatIndianCurrency(subtotal)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tax</p>
              <p className="font-medium">{formatIndianCurrency(tax)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-bold text-lg">{formatIndianCurrency(total)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems.map((item: any, idx: number) => (
                <TableRow key={item.id || idx}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.description || ''}</TableCell>
                  <TableCell className="text-right">{item.quantity || 0}</TableCell>
                  <TableCell className="text-right">{formatIndianCurrency(item.rate || item.price || 0)}</TableCell>
                  <TableCell className="text-right">{formatIndianCurrency(item.amount || 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Activity History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activity History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="border-l-2 border-blue-200 pl-4 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.user}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.comment}</p>
                </div>
              ))}
              
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button size="sm" onClick={addComment}>
                  Add Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewSalesOrderDetails;

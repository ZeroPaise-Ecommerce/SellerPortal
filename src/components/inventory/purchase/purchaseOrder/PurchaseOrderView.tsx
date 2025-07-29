
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Edit, Send, Printer, FileText, MessageSquare } from "lucide-react";

const PurchaseOrderView = ({ orderId, onClose, onEdit }: { 
  orderId: string; 
  onClose: () => void;
  onEdit: () => void;
}) => {
  const orderData = {
    id: orderId,
    date: "15-Jun-2023",
    expectedDelivery: "25-Jun-2023",
    supplier: {
      name: "Tata Steel Limited",
      address: "Mumbai, Maharashtra",
      email: "contact@tatasteel.com",
      phone: "+91 98765 43210"
    },
    items: [
      { name: "Steel Rods - 12mm", quantity: 100, rate: 450, amount: 45000 },
      { name: "Steel Plates - 5mm", quantity: 50, rate: 850, amount: 42500 }
    ],
    subtotal: 87500,
    tax: 15750,
    total: 103250,
    status: "Sent",
    paymentPolicy: "Net 30"
  };

  const activities = [
    { date: "15-Jun-2023 10:30 AM", activity: "Purchase order created", user: "Admin" },
    { date: "15-Jun-2023 02:15 PM", activity: "Purchase order sent to supplier", user: "Admin" },
    { date: "16-Jun-2023 09:45 AM", activity: "Supplier acknowledged receipt", user: "System" }
  ];

  const comments = [
    { date: "15-Jun-2023", user: "Admin", comment: "Urgent delivery required for project deadline" },
    { date: "16-Jun-2023", user: "Supplier", comment: "Order confirmed. Will deliver as per schedule" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Purchase Order {orderId}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{orderData.status}</Badge>
                <span className="text-sm text-gray-600">Created on {orderData.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Create Purchase Bill
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Invoice Header */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">From:</h3>
              <div className="text-sm">
                <p className="font-medium">Your Company Name</p>
                <p>123 Business Street</p>
                <p>Mumbai, Maharashtra 400001</p>
                <p>contact@yourcompany.com</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">To:</h3>
              <div className="text-sm">
                <p className="font-medium">{orderData.supplier.name}</p>
                <p>{orderData.supplier.address}</p>
                <p>{orderData.supplier.email}</p>
                <p>{orderData.supplier.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-sm font-medium text-gray-600">Order Date</p>
              <p className="text-sm">{orderData.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Expected Delivery</p>
              <p className="text-sm">{orderData.expectedDelivery}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Terms</p>
              <p className="text-sm">{orderData.paymentPolicy}</p>
            </div>
          </div>

          {/* Items Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Item Description</th>
                      <th className="text-right py-2">Quantity</th>
                      <th className="text-right py-2">Rate</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="text-right py-2">{item.quantity}</td>
                        <td className="text-right py-2">₹{item.rate.toFixed(2)}</td>
                        <td className="text-right py-2">₹{item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-b">
                      <td colSpan={3} className="text-right py-2 font-medium">Subtotal:</td>
                      <td className="text-right py-2">₹{orderData.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={3} className="text-right py-2 font-medium">Tax (18%):</td>
                      <td className="text-right py-2">₹{orderData.tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right py-2 font-bold text-lg">Total:</td>
                      <td className="text-right py-2 font-bold text-lg">₹{orderData.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Activities and Comments */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={index} className="pb-3 border-b last:border-b-0">
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <p className="text-xs text-gray-600">{activity.date} by {activity.user}</p>
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
                <div className="space-y-3">
                  {comments.map((comment, index) => (
                    <div key={index} className="pb-3 border-b last:border-b-0">
                      <p className="text-sm">{comment.comment}</p>
                      <p className="text-xs text-gray-600">{comment.date} by {comment.user}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderView;

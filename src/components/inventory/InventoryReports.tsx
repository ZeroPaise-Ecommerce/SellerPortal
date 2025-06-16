
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  Package,
  ShoppingCart,
  ReceiptIcon as Receipt,
  Truck,
  TrendingUp,
  FileBarChart,
  CreditCard,
  AlertTriangle,
  CreditCard as CreditCardIcon,
  BarChart,
  FileSpreadsheet,
} from "lucide-react";

interface ReportCategory {
  title: string;
  icon: React.ElementType;
  reports: {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
}

const InventoryReports = () => {
  const reportCategories: ReportCategory[] = [
    {
      title: "Stock",
      icon: Package,
      reports: [
        {
          id: "stock-summary",
          title: "Stock Summary",
          description: "Comprehensive overview of current inventory levels",
          icon: FileText,
        },
        {
          id: "stock-valuation",
          title: "Stock Valuation Report",
          description: "Detailed report on the value of your inventory",
          icon: FileBarChart,
        },
        {
          id: "low-stock",
          title: "Low Stock Report",
          description: "Items that are running low and need reordering",
          icon: AlertTriangle,
        },
      ],
    },
    {
      title: "Purchase Reports",
      icon: ShoppingCart,
      reports: [
        {
          id: "purchase-summary",
          title: "Purchase Summary",
          description: "Overview of all purchase activities",
          icon: FileText,
        },
        {
          id: "purchase-vendor",
          title: "Purchase by Vendor Report",
          description: "Analysis of purchases grouped by vendors",
          icon: FileBarChart,
        },
        {
          id: "purchase-return",
          title: "Purchase Return Report",
          description: "Details of items returned to suppliers",
          icon: FileBarChart,
        },
      ],
    },
    {
      title: "Compliance",
      icon: Receipt,
      reports: [
        {
          id: "gst-summary",
          title: "GST Summary",
          description: "GST details for tax filing purposes",
          icon: FileText,
        },
        {
          id: "eway-bill",
          title: "E-Way Bill",
          description: "E-Way bill generation and history",
          icon: FileBarChart,
        },
      ],
    },
    {
      title: "Sales and Distribution",
      icon: TrendingUp,
      reports: [
        {
          id: "sales-summary",
          title: "Sales Summary",
          description: "Overview of all sales activities",
          icon: FileText,
        },
        {
          id: "sales-customer",
          title: "Sales by Customer Report",
          description: "Analysis of sales grouped by customers",
          icon: FileBarChart,
        },
        {
          id: "returns-refunds",
          title: "Return / Refund",
          description: "Details of items returned by customers and refunds issued",
          icon: FileSpreadsheet,
        },
      ],
    },
    {
      title: "Shipping",
      icon: Truck,
      reports: [
        {
          id: "shipping-summary",
          title: "Shipping Summary Report",
          description: "Overview of shipping activities",
          icon: FileText,
        },
        {
          id: "shipment-tracking",
          title: "Shipment Tracking Report",
          description: "Track status of all shipments",
          icon: FileBarChart,
        },
        {
          id: "shipping-cost",
          title: "Shipping Cost Report",
          description: "Analysis of shipping costs",
          icon: CreditCardIcon,
        },
      ],
    },
    {
      title: "Financial Reports",
      icon: BarChart,
      reports: [
        {
          id: "bank-transaction",
          title: "Bank Transaction Report",
          description: "Summary of all bank transactions",
          icon: CreditCard,
        },
        {
          id: "cashflow",
          title: "Cashflow Report",
          description: "Analysis of cash inflow and outflow",
          icon: FileBarChart,
        },
        {
          id: "payables-receivables",
          title: "Payables and Receivables",
          description: "Summary of all pending payments and receipts",
          icon: FileSpreadsheet,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Reports</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {reportCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-blue-600" />
                <CardTitle>{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.reports.map((report) => (
                  <Card key={report.id} className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-sm">{report.title}</CardTitle>
                          <CardDescription className="text-xs mt-1">{report.description}</CardDescription>
                        </div>
                        <report.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <Button
                        variant="outline" 
                        size="sm" 
                        className="w-full flex items-center gap-2 text-blue-600"
                      >
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryReports;

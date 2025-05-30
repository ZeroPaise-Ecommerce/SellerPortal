
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, ChevronRight } from "lucide-react";

const reportsData = [
  {
    title: "Sales Report",
    description: "Detailed breakdown of all sales by product, category, and date.",
    updatedAt: "Updated 3 hours ago",
    type: "Excel",
  },
  {
    title: "Inventory Status",
    description: "Current inventory levels with stock alerts and reorder suggestions.",
    updatedAt: "Updated 12 hours ago",
    type: "Excel",
  },
  {
    title: "Customer Activity",
    description: "Customer purchases, browsing behavior, and engagement metrics.",
    updatedAt: "Updated 1 day ago",
    type: "PDF",
  },
  {
    title: "Marketing Performance",
    description: "ROI of marketing campaigns across all channels.",
    updatedAt: "Updated 2 days ago",
    type: "PDF",
  },
  {
    title: "Product Performance",
    description: "Analytics on top and underperforming products.",
    updatedAt: "Updated 3 days ago",
    type: "Excel",
  },
  {
    title: "Financial Statement",
    description: "Revenue, expenses, profit margins, and tax calculations.",
    updatedAt: "Updated 1 week ago",
    type: "PDF",
  },
];

const scheduledReports = [
  {
    title: "Weekly Sales Summary",
    schedule: "Every Monday at 8:00 AM",
    recipients: "sales@example.com, admin@example.com",
    nextRun: "May 15, 2023",
  },
  {
    title: "Monthly Financial Report",
    schedule: "1st of each month at 9:00 AM",
    recipients: "finance@example.com, ceo@example.com",
    nextRun: "June 1, 2023",
  },
  {
    title: "Quarterly Performance Review",
    schedule: "Every 3 months",
    recipients: "management@example.com",
    nextRun: "July 1, 2023",
  },
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <FileText size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Reports</h1>
          <p className="text-sm text-gray-500">Generate and schedule business reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Available Reports</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-semibold">24</p>
            <p className="text-xs text-gray-500">Total reports available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Downloads</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-semibold">18</p>
            <p className="text-xs text-gray-500">Reports downloaded this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-semibold">3</p>
            <p className="text-xs text-gray-500">Active report schedules</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Available Reports</CardTitle>
          <CardDescription className="text-xs">
            Generate reports or download previously generated reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportsData.map((report, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold mb-1">{report.title}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{report.description}</p>
                    <p className="text-xs text-gray-400">{report.updatedAt}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {report.type}
                  </span>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    <Calendar className="h-3 w-3 mr-1" /> Generate New
                  </Button>
                  <Button size="sm" className="text-xs h-8 bg-brand-blue hover:bg-brand-dark-blue">
                    <Download className="h-3 w-3 mr-1" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Scheduled Reports</CardTitle>
          <CardDescription className="text-xs">
            Reports automatically generated and emailed on schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map((scheduledReport, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold">{scheduledReport.title}</h3>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500">Schedule</p>
                    <p className="font-medium">{scheduledReport.schedule}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Recipients</p>
                    <p className="font-medium truncate">{scheduledReport.recipients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Next Run</p>
                    <p className="font-medium">{scheduledReport.nextRun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Reports;

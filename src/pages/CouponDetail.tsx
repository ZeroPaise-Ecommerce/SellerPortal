import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Ticket } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import api from "@/api"; // Make sure this is your axios instance

const CouponDetail = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const res = await api.get(`/coupons/${couponId}`);
        setCoupon(res.data);
      } catch (error) {
        console.error("Coupon not found");
        navigate("/coupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [couponId, navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading coupon details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!coupon) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Coupon not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const usageArray = Array.isArray(coupon?.usage) ? coupon.usage : [];
  const totalUsage = usageArray.reduce((sum, u) => sum + (u.discountAmount || 0), 0);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="pl-0 mb-2"
          onClick={() => navigate("/coupons")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Coupons
        </Button>
        
        <div className="flex items-center">
          <div className="mr-3">
            <Ticket size={24} className="text-brand-blue" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">{coupon.name}</h1>
              <Badge className={
                coupon.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                coupon.status === "Expired" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" :
                "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }>{coupon.status}</Badge>
            </div>
            <p className="text-sm text-gray-500">Coupon Code: {coupon.code}</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Coupon Details</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">ID</dt>
                    <dd>{coupon.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Coupon Name</dt>
                    <dd>{coupon.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Coupon Code</dt>
                    <dd className="font-mono bg-gray-100 px-2 py-0.5 rounded">{coupon.code}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Status</dt>
                    <dd>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        coupon.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : coupon.status === "Expired"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {coupon.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Discount Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Type</dt>
                    <dd>{coupon.type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Discount Value</dt>
                    <dd>
                      {coupon.type === "Percentage"
                        ? `${coupon.discount}%`
                        : coupon.type === "Fixed Amount"
                        ? `$${coupon.discount}`
                        : "Free Shipping"}
                    </dd>
                  </div>
                  
                  {coupon.type === "Percentage" && coupon.maxDiscount && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">Max Discount</dt>
                      <dd>${coupon.maxDiscount}</dd>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Min Order Value</dt>
                    <dd>${coupon.minOrderValue}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Validity Period</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Start Date</dt>
                    <dd>{coupon.startDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">End Date</dt>
                    <dd>{coupon.endDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Duration</dt>
                    <dd>
                      {calculateDaysBetween(coupon.startDate, coupon.endDate)} days
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Usage Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Total Usage</dt>
                    <dd>{coupon.usageCount}/{coupon.usageLimit === 0 ? "∞" : coupon.usageLimit}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Usage Per Customer</dt>
                    <dd>{coupon.usagePerCustomer}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Products</dt>
                    <dd>{coupon.products}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Customers</dt>
                    <dd>{coupon.customers}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Total Redemptions</dt>
                    <dd>{coupon.usageCount}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Total Savings</dt>
                    <dd>
                      ${totalUsage.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Average Savings</dt>
                    <dd>
                      ${usageArray.length > 0 
                        ? (totalUsage / usageArray.length).toFixed(2)
                        : "0.00"}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Redemption History</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {usageArray.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">This coupon has not been used yet</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-semibold">Date</TableHead>
                      <TableHead className="text-xs font-semibold">Customer</TableHead>
                      <TableHead className="text-xs font-semibold">Order ID</TableHead>
                      <TableHead className="text-xs font-semibold">Order Value</TableHead>
                      <TableHead className="text-xs font-semibold">Discount</TableHead>
                      <TableHead className="text-xs font-semibold">Products</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageArray.map((use) => (
                      <TableRow key={use.id} className="hover:bg-gray-50">
                        <TableCell className="text-xs">{use.date}</TableCell>
                        <TableCell className="text-xs">
                          <div>
                            <div className="font-medium">{use.customer}</div>
                            <div className="text-gray-500">{use.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{use.orderId}</TableCell>
                        <TableCell className="text-xs">${use.orderAmount.toFixed(2)}</TableCell>
                        <TableCell className="text-xs">
                          <div>
                            <div>${use.discountAmount.toFixed(2)}</div>
                            <div className="text-gray-500">
                              ({Math.round((use.discountAmount / use.orderAmount) * 100)}%)
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div>
                            {use.products && use.products.map((product, index) => (
                              <div key={index}>
                                {product.name} x {product.quantity}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

// Helper function to calculate days between two dates
function calculateDaysBetween(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default CouponDetail;

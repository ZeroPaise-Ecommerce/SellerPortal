
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Search, ChevronDown, MessageSquare } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const reviewsData = [
  {
    id: "REV-5001",
    product: "Wireless Headphones",
    customer: "John Smith",
    rating: 5,
    comment: "These are the best headphones I've ever owned! The sound quality is amazing.",
    date: "2023-05-06",
    status: "Published",
  },
  {
    id: "REV-5002",
    product: "Smart Watch Series 5",
    customer: "Emily Johnson",
    rating: 4,
    comment: "Great watch with lots of features. Battery life could be better.",
    date: "2023-05-06",
    status: "Published",
  },
  {
    id: "REV-5003",
    product: "Organic Cotton T-shirt",
    customer: "Michael Brown",
    rating: 2,
    comment: "The material is nice but it shrunk after the first wash.",
    date: "2023-05-05",
    status: "Published",
  },
  {
    id: "REV-5004",
    product: "Stainless Steel Water Bottle",
    customer: "Sarah Wilson",
    rating: 5,
    comment: "Keeps water cold for hours! Exactly as described.",
    date: "2023-05-05",
    status: "Published",
  },
  {
    id: "REV-5005",
    product: "Running Shoes",
    customer: "David Taylor",
    rating: 3,
    comment: "Comfortable but not as durable as I expected for the price.",
    date: "2023-05-04",
    status: "Pending",
  },
  {
    id: "REV-5006",
    product: "Bluetooth Speaker",
    customer: "Jennifer Davis",
    rating: 1,
    comment: "Very disappointed with this purchase. The speaker stopped working after two days.",
    date: "2023-05-04",
    status: "Pending",
  },
  {
    id: "REV-5007",
    product: "Yoga Mat",
    customer: "Robert Johnson",
    rating: 5,
    comment: "Perfect thickness and grip. Would definitely recommend!",
    date: "2023-05-03",
    status: "Published",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

const ProductReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = reviewsData.filter(
    (review) =>
      review.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate average rating
  const averageRating =
    reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;

  // Count reviews by rating
  const ratingCounts = [0, 0, 0, 0, 0];
  reviewsData.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <Star size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Product Reviews</h1>
          <p className="text-sm text-gray-500">Manage customer feedback</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Review Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white p-4 rounded-md border">
              <div className="text-center">
                <p className="text-sm text-gray-500">Overall Rating</p>
                <p className="text-3xl font-bold mt-2">{averageRating.toFixed(1)}</p>
                <div className="flex justify-center mt-2">
                  <StarRating rating={Math.round(averageRating)} />
                </div>
                <p className="text-xs text-gray-500 mt-2">Based on {reviewsData.length} reviews</p>
              </div>
            </div>
            
            <div className="col-span-2 bg-white p-4 rounded-md border">
              <p className="text-sm text-gray-500 mb-3">Rating Distribution</p>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-2">
                  <div className="flex items-center w-16">
                    <span className="text-xs font-medium mr-1">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{
                        width: `${(ratingCounts[rating - 1] / reviewsData.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium ml-2 w-8">
                    {ratingCounts[rating - 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3">
          <CardTitle className="text-base font-semibold">Customer Reviews</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
            <div className="relative flex-1 sm:flex-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reviews..."
                className="pl-8 text-sm h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              Filter <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">Product</TableHead>
                  <TableHead className="text-xs font-semibold">Rating</TableHead>
                  <TableHead className="text-xs font-semibold">Review</TableHead>
                  <TableHead className="text-xs font-semibold">Customer</TableHead>
                  <TableHead className="text-xs font-semibold">Date</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id} className="hover:bg-gray-50">
                    <TableCell className="text-xs font-medium">{review.product}</TableCell>
                    <TableCell className="text-xs">
                      <StarRating rating={review.rating} />
                    </TableCell>
                    <TableCell className="text-xs max-w-xs truncate">
                      {review.comment}
                    </TableCell>
                    <TableCell className="text-xs">{review.customer}</TableCell>
                    <TableCell className="text-xs">{review.date}</TableCell>
                    <TableCell className="text-xs">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          review.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {review.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">
                      <Button size="sm" variant="ghost" className="h-8 px-2">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ProductReviews;

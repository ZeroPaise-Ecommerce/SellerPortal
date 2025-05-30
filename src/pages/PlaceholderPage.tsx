
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const PlaceholderPage = ({ title, description, icon }: PlaceholderPageProps) => {
  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center">
        {icon && <div className="mr-3">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Future {title} Content</CardTitle>
          <CardDescription>
            This page will contain {title.toLowerCase()} management features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="bg-brand-blue/10 rounded-full p-4 mb-4">
              {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-gray-500 max-w-md">
              This {title.toLowerCase()} feature is currently under development and will be available soon. 
              Check back later for updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PlaceholderPage;

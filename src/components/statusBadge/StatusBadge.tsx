import React from "react";
import { Badge } from "@/components/ui/badge"; // StatusBadge.tsx
import { cn } from "@/lib/utils";

type StatusConfig = {
  label?: string;
  icon?: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline"; // supports Badge variants
  className?: string; // for optional custom styling
};

type StatusBadgeProps = {
  status: string;
  config?: Record<string, StatusConfig>;
  showIcon?: boolean;
  defaultConfig?: StatusConfig;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  config = {},
  showIcon = false,
  defaultConfig = {
    label: status,
    variant: "secondary",
  },
}) => {
  const { label, icon, variant, className } = {
    ...defaultConfig,
    ...config[status],
  };

  return (
    <Badge variant={variant} className={cn("gap-1", className)}>
      {showIcon && icon}
      {label ?? status}
    </Badge>
  );
};

export default StatusBadge;

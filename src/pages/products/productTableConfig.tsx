import { Switch } from "@/components/ui/switch";
import { Edit, Trash2 } from "lucide-react";
import StatusBadge from "@/components/statusBadge/StatusBadge";

export const statusConfig = {
  "In Stock": {
    label: "In Stock",
    icon: '<span className="text-green-800">●</span>',
    className: "bg-green-100 text-green-800",
  },
  "Out of Stock": {
    label: "Out of Stock",
    icon: '<span className="text-red-800">●</span>',
    className: "bg-red-100 text-red-800",
  },
  "Low Stock": {
    label: "Low Stock",
    icon: '<span className="text-yellow-800">●</span>',
    className: "bg-yellow-100 text-yellow-800",
  },
};

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  className?: string;
  align?: "left" | "center" | "right";
  render?: (item: T) => React.ReactNode;
};

export const getProductTableColumns = (
  activeStatus: Record<string, boolean>,
  toggleStatus: (id: string) => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
) => [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name", className: "font-medium" },
  { header: "Category", accessor: "category" },
  {
    header: "Price",
    accessor: "price",
    render: (p: any) => `$${p.price.toFixed(2)}`,
  },
  { header: "Stock", accessor: "stock" },
  {
    header: "Status",
    accessor: "status",
    render: (p: any) => {
      <StatusBadge status={p.status} config={statusConfig} showIcon />
    },
  },
  {
    header: "Active",
    accessor: "active",
    className: "text-center",
    render: (p: any) => (
      <Switch
        checked={!!activeStatus[p.id]}
        onCheckedChange={() => toggleStatus(p.id)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-right",
    render: (p: any) => (
      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(p.id)}>
          <Edit className="h-4 w-4" />
        </button>
        <button onClick={() => onDelete(p.id)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
    ),
  },
];

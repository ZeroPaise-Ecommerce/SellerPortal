import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // adjust path if needed

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  className?: string;
  align?: "left" | "center" | "right";
  render?: (item: T) => React.ReactNode;
};

type ConfigurableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
};

function ConfigurableTable<T>({
  data,
  columns,
  rowKey,
  onRowClick,
}: ConfigurableTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={rowKey(row)}
            onClick={() => onRowClick?.(row)}
            className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
          >
            {columns.map((col, idx) => (
              <TableCell
                key={idx}
                className={col.className}
                style={{ textAlign: col.align || "left" }}
              >
                {col.render ? col.render(row) : (row as any)[col.accessor]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ConfigurableTable;
export type { ConfigurableTableProps, Column };

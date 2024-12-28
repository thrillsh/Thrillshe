import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download, Trash2, RefreshCw } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  type: string;
  status: "paid" | "cancelled" | "refunded";
  product: string;
  total: number;
  date: string;
}

interface OrderListProps {
  orders?: Order[];
  onSort?: (column: keyof Order) => void;
  onBulkAction?: (action: string, selectedIds: string[]) => void;
  onViewDetails?: (orderId: string) => void;
}

const defaultOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    type: "Standard",
    status: "paid",
    product: "Product A",
    total: 99.99,
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    type: "Express",
    status: "cancelled",
    product: "Product B",
    total: 149.99,
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    type: "Standard",
    status: "refunded",
    product: "Product C",
    total: 79.99,
    date: "2024-01-13",
  },
];

const OrderList = ({
  orders = defaultOrders,
  onSort = () => {},
  onBulkAction = () => {},
  onViewDetails = () => {},
}: OrderListProps) => {
  const [selectedOrders, setSelectedOrders] = React.useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "bg-primary/10 text-primary";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      case "refunded":
        return "bg-chart-1/10 text-chart-1";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="w-full bg-background rounded-lg shadow-sm border border-border">
      {/* Bulk Actions */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("export", selectedOrders)}
            disabled={selectedOrders.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("delete", selectedOrders)}
            disabled={selectedOrders.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("status", selectedOrders)}
            disabled={selectedOrders.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Status
          </Button>
        </div>
      </div>

      {/* Order Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onCheckedChange={(checked) =>
                  handleSelectAll(checked as boolean)
                }
              />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort("id")}>
              ID <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("customer")}
            >
              Customer <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("type")}
            >
              Type <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("status")}
            >
              Status <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("product")}
            >
              Product <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => onSort("total")}
            >
              Total <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("date")}
            >
              Date <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onViewDetails(order.id)}
            >
              <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={(checked) =>
                    handleSelectOrder(order.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell className="text-right">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;

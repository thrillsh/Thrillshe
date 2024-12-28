import React from "react";
import { useSearchParams } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Download, Mail, RefreshCw } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "blocked";
  orders: number;
  totalSpend: number;
  lastOrder: string;
  registrationDate: string;
}

interface CustomerListProps {
  customers?: Customer[];
  onSort?: (column: keyof Customer) => void;
  onBulkAction?: (action: string, selectedIds: string[]) => void;
  onViewDetails?: (customerId: string) => void;
}

const defaultCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    orders: 15,
    totalSpend: 2499.99,
    lastOrder: "2024-01-15",
    registrationDate: "2023-06-01",
  },
  {
    id: "CUS-002",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive",
    orders: 8,
    totalSpend: 1299.99,
    lastOrder: "2023-12-20",
    registrationDate: "2023-08-15",
  },
  {
    id: "CUS-003",
    name: "Bob Wilson",
    email: "bob@example.com",
    status: "blocked",
    orders: 3,
    totalSpend: 499.99,
    lastOrder: "2023-11-30",
    registrationDate: "2023-10-01",
  },
];

const CustomerList = ({
  customers = defaultCustomers,
  onSort = () => {},
  onBulkAction = () => {},
  onViewDetails = () => {},
}: CustomerListProps) => {
  const [selectedCustomers, setSelectedCustomers] = React.useState<string[]>(
    [],
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 10;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(customers.map((customer) => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary";
      case "inactive":
        return "bg-muted text-muted-foreground";
      case "blocked":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCustomers = customers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  return (
    <div className="w-full bg-background rounded-lg shadow-sm border border-border">
      {/* Bulk Actions */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("export", selectedCustomers)}
            disabled={selectedCustomers.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("email", selectedCustomers)}
            disabled={selectedCustomers.length === 0}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction("status", selectedCustomers)}
            disabled={selectedCustomers.length === 0}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Status
          </Button>
        </div>
      </div>

      {/* Customer Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCustomers.length === displayedCustomers.length}
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
              onClick={() => onSort("name")}
            >
              Name <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("email")}
            >
              Email <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("status")}
            >
              Status <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => onSort("orders")}
            >
              Orders <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => onSort("totalSpend")}
            >
              Total Spend <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort("lastOrder")}
            >
              Last Order <ArrowUpDown className="h-4 w-4 inline-block ml-2" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onViewDetails(customer.id)}
            >
              <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={(checked) =>
                    handleSelectCustomer(customer.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{customer.orders}</TableCell>
              <TableCell className="text-right">
                ${customer.totalSpend.toFixed(2)}
              </TableCell>
              <TableCell>
                {new Date(customer.lastOrder).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show first page, last page, and pages around current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= page - 1 && pageNumber <= page + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={page === pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (pageNumber === page - 2 || pageNumber === page + 2) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CustomerList;

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface CustomerFilterPanelProps {
  onClose?: () => void;
  onApplyFilters?: (filters: FilterValues) => void;
  isOpen?: boolean;
}

interface FilterValues {
  status: string;
  customerName: string;
  registrationDate: { from: Date | undefined; to: Date | undefined };
  minOrders: string;
  maxOrders: string;
  minSpend: string;
  maxSpend: string;
}

const CustomerFilterPanel = ({
  onClose = () => {},
  onApplyFilters = () => {},
  isOpen = true,
}: CustomerFilterPanelProps) => {
  const [filters, setFilters] = React.useState<FilterValues>({
    status: "",
    customerName: "",
    registrationDate: { from: undefined, to: undefined },
    minOrders: "",
    maxOrders: "",
    minSpend: "",
    maxSpend: "",
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  if (!isOpen) return null;

  return (
    <Card className="w-80 p-4 fixed right-0 top-0 h-screen bg-background shadow-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Filter Customers
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Customer Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Customer Name</Label>
          <Input
            placeholder="Search by name"
            value={filters.customerName}
            onChange={(e) =>
              setFilters({ ...filters, customerName: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Registration Date</Label>
          <DatePickerWithRange
            date={filters.registrationDate}
            onDateChange={(newDate) =>
              setFilters({ ...filters, registrationDate: newDate })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Number of Orders</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minOrders}
              onChange={(e) =>
                setFilters({ ...filters, minOrders: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxOrders}
              onChange={(e) =>
                setFilters({ ...filters, maxOrders: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Total Spend</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minSpend}
              onChange={(e) =>
                setFilters({ ...filters, minSpend: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxSpend}
              onChange={(e) =>
                setFilters({ ...filters, maxSpend: e.target.value })
              }
            />
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CustomerFilterPanel;

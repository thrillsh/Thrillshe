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

interface FilterPanelProps {
  onClose?: () => void;
  onApplyFilters?: (filters: FilterValues) => void;
  isOpen?: boolean;
}

interface FilterValues {
  orderStatus: string;
  customerName: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
  minAmount: string;
  maxAmount: string;
}

const FilterPanel = ({
  onClose = () => {},
  onApplyFilters = () => {},
  isOpen = true,
}: FilterPanelProps) => {
  const [filters, setFilters] = React.useState<FilterValues>({
    orderStatus: "",
    customerName: "",
    dateRange: { from: undefined, to: undefined },
    minAmount: "",
    maxAmount: "",
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  if (!isOpen) return null;

  return (
    <Card className="w-80 p-4 fixed right-0 top-0 h-screen bg-background shadow-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filter Orders</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Order Status</Label>
          <Select
            value={filters.orderStatus}
            onValueChange={(value) =>
              setFilters({ ...filters, orderStatus: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Customer Name</Label>
          <Input
            placeholder="Search by customer name"
            value={filters.customerName}
            onChange={(e) =>
              setFilters({ ...filters, customerName: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Date Range</Label>
          <DatePickerWithRange
            date={filters.dateRange}
            onDateChange={(newDate) =>
              setFilters({ ...filters, dateRange: newDate })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Amount Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters({ ...filters, minAmount: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters({ ...filters, maxAmount: e.target.value })
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

export default FilterPanel;

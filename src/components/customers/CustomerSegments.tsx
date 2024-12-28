import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerSegmentsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSaveSegment?: (segment: CustomerSegment) => void;
}

interface CustomerSegment {
  name: string;
  description: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
}

const CustomerSegments = ({
  open = false,
  onOpenChange,
  onSaveSegment = () => {},
}: CustomerSegmentsProps) => {
  const [segment, setSegment] = React.useState<CustomerSegment>({
    name: "",
    description: "",
    conditions: [
      {
        field: "totalSpend",
        operator: "greaterThan",
        value: "",
      },
    ],
  });

  const fields = [
    { label: "Total Spend", value: "totalSpend" },
    { label: "Order Count", value: "orderCount" },
    { label: "Last Order Date", value: "lastOrderDate" },
    { label: "Registration Date", value: "registrationDate" },
    { label: "Customer Status", value: "status" },
  ];

  const operators = [
    { label: "Greater than", value: "greaterThan" },
    { label: "Less than", value: "lessThan" },
    { label: "Equals", value: "equals" },
    { label: "Not equals", value: "notEquals" },
    { label: "Contains", value: "contains" },
  ];

  const addCondition = () => {
    setSegment({
      ...segment,
      conditions: [
        ...segment.conditions,
        { field: "totalSpend", operator: "greaterThan", value: "" },
      ],
    });
  };

  const removeCondition = (index: number) => {
    setSegment({
      ...segment,
      conditions: segment.conditions.filter((_, i) => i !== index),
    });
  };

  const updateCondition = (index: number, field: string, value: string) => {
    const newConditions = [...segment.conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setSegment({ ...segment, conditions: newConditions });
  };

  const handleSave = () => {
    onSaveSegment(segment);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Customer Segment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Segment Name</Label>
            <Input
              placeholder="e.g., High Value Customers"
              value={segment.name}
              onChange={(e) => setSegment({ ...segment, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="Describe this segment"
              value={segment.description}
              onChange={(e) =>
                setSegment({ ...segment, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Conditions</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCondition}
              >
                Add Condition
              </Button>
            </div>

            {segment.conditions.map((condition, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg"
              >
                <Select
                  value={condition.field}
                  onValueChange={(value) =>
                    updateCondition(index, "field", value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map((field) => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={condition.operator}
                  onValueChange={(value) =>
                    updateCondition(index, "operator", value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((operator) => (
                      <SelectItem key={operator.value} value={operator.value}>
                        {operator.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Value"
                  value={condition.value}
                  onChange={(e) =>
                    updateCondition(index, "value", e.target.value)
                  }
                  className="flex-1"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCondition(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Segment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerSegments;

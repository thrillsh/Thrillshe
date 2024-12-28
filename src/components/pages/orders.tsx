import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import OrderList from "@/components/orders/OrderList";
import OrderDetailsModal from "@/components/orders/OrderDetailsModal";
import FilterPanel from "@/components/orders/FilterPanel";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const Orders = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(
    null,
  );

  const handleSort = (column: string) => {
    console.log(`Sorting by: ${column}`);
  };

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    console.log(`Bulk action: ${action}`, selectedIds);
  };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Order List */}
          <OrderList
            onSort={handleSort}
            onBulkAction={handleBulkAction}
            onViewDetails={(orderId) => setSelectedOrderId(orderId)}
          />

          {/* Filter Panel */}
          <FilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
          />

          {/* Order Details Modal */}
          <OrderDetailsModal
            open={!!selectedOrderId}
            onOpenChange={(open) => {
              if (!open) setSelectedOrderId(null);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Orders;

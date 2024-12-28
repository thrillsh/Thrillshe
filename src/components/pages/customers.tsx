import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import CustomerList from "@/components/customers/CustomerList";
import CustomerDetailsModal from "@/components/customers/CustomerDetailsModal";
import CustomerFilterPanel from "@/components/customers/CustomerFilterPanel";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const Customers = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<
    string | null
  >(null);

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
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Customer List */}
          <CustomerList
            onSort={handleSort}
            onBulkAction={handleBulkAction}
            onViewDetails={(customerId) => setSelectedCustomerId(customerId)}
          />

          {/* Filter Panel */}
          <CustomerFilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
          />

          {/* Customer Details Modal */}
          <CustomerDetailsModal
            open={!!selectedCustomerId}
            onOpenChange={(open) => {
              if (!open) setSelectedCustomerId(null);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Customers;

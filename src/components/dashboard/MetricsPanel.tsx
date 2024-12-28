import React from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  AlertCircle,
  Star,
  BarChart2,
  RefreshCw,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MetricsPanelProps {
  salesMetrics?: {
    totalRevenue: {
      current: number;
      previous: number;
      yearToDate: number;
    };
    salesByChannel: {
      online: number;
      retail: number;
      wholesale: number;
    };
    averageOrderValue: number;
    conversionRate: number;
  };
  inventoryMetrics?: {
    lowStockItems: number;
    topSellingProducts: Array<{ name: string; sales: number }>;
    totalValue: number;
  };
  customerMetrics?: {
    newCustomers: number;
    returningCustomers: number;
    customerLifetimeValue: number;
  };
  websiteMetrics?: {
    visitors: number;
    bounceRate: number;
  };
}

const defaultData: MetricsPanelProps = {
  salesMetrics: {
    totalRevenue: {
      current: 124500,
      previous: 115000,
      yearToDate: 1450000,
    },
    salesByChannel: {
      online: 45,
      retail: 35,
      wholesale: 20,
    },
    averageOrderValue: 85,
    conversionRate: 2.8,
  },
  inventoryMetrics: {
    lowStockItems: 12,
    topSellingProducts: [
      { name: "Product A", sales: 150 },
      { name: "Product B", sales: 120 },
      { name: "Product C", sales: 90 },
    ],
    totalValue: 275000,
  },
  customerMetrics: {
    newCustomers: 245,
    returningCustomers: 1850,
    customerLifetimeValue: 440,
  },
  websiteMetrics: {
    visitors: 12500,
    bounceRate: 35.5,
  },
};

const MetricsPanel = ({
  salesMetrics = defaultData.salesMetrics,
  inventoryMetrics = defaultData.inventoryMetrics,
  customerMetrics = defaultData.customerMetrics,
  websiteMetrics = defaultData.websiteMetrics,
}: MetricsPanelProps) => {
  const revenueGrowth =
    ((salesMetrics.totalRevenue.current - salesMetrics.totalRevenue.previous) /
      salesMetrics.totalRevenue.previous) *
    100;

  return (
    <div className="space-y-6">
      {/* Sales Performance */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Sales Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <span
                className={`text-xs font-medium ${revenueGrowth >= 0 ? "text-primary" : "text-destructive"}`}
              >
                {revenueGrowth >= 0 ? "+" : ""}
                {revenueGrowth.toFixed(1)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold text-foreground">
                ${salesMetrics.totalRevenue.current.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                YTD: ${salesMetrics.totalRevenue.yearToDate.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-chart-2/10 rounded-full">
                <ShoppingBag className="h-4 w-4 text-chart-2" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales by Channel</p>
              <div className="space-y-2 mt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Online</span>
                    <span>{salesMetrics.salesByChannel.online}%</span>
                  </div>
                  <Progress
                    value={salesMetrics.salesByChannel.online}
                    className="h-1"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Retail</span>
                    <span>{salesMetrics.salesByChannel.retail}%</span>
                  </div>
                  <Progress
                    value={salesMetrics.salesByChannel.retail}
                    className="h-1"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Wholesale</span>
                    <span>{salesMetrics.salesByChannel.wholesale}%</span>
                  </div>
                  <Progress
                    value={salesMetrics.salesByChannel.wholesale}
                    className="h-1"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-chart-3/10 rounded-full">
                <TrendingUp className="h-4 w-4 text-chart-3" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Average Order Value
              </p>
              <p className="text-2xl font-bold text-foreground">
                ${salesMetrics.averageOrderValue}
              </p>
              <p className="text-xs text-primary mt-1">+5.2% from last month</p>
            </div>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-chart-4/10 rounded-full">
                <BarChart2 className="h-4 w-4 text-chart-4" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {salesMetrics.conversionRate}%
              </p>
              <p className="text-xs text-destructive mt-1">
                -0.8% from last month
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Inventory & Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inventory Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Inventory Status
          </h2>
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">
                  {inventoryMetrics.lowStockItems} items low in stock
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Total Value: ${inventoryMetrics.totalValue.toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Top Selling Products</p>
              {inventoryMetrics.topSellingProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {product.sales} units
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Customer Overview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Customer Overview
          </h2>
          <Card className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">New Customers</p>
                <p className="text-2xl font-bold text-foreground">
                  {customerMetrics.newCustomers}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Returning Customers
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {customerMetrics.returningCustomers}
                </p>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                Avg. Customer Lifetime Value
              </p>
              <p className="text-2xl font-bold text-foreground">
                ${customerMetrics.customerLifetimeValue}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Website Performance */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Website Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold text-foreground">
                  {websiteMetrics.visitors.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-chart-5/10 rounded-full">
                <Users className="h-4 w-4 text-chart-5" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold text-foreground">
                  {websiteMetrics.bounceRate}%
                </p>
              </div>
              <div className="p-2 bg-chart-1/10 rounded-full">
                <RefreshCw className="h-4 w-4 text-chart-1" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;

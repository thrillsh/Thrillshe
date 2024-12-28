import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderInvoice from "./OrderInvoice";
import {
  Printer,
  Copy,
  Download,
  Clock,
  CreditCard,
  Truck,
  MapPin,
  History,
} from "lucide-react";

interface OrderDetailsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  orderData?: {
    id: string;
    orderDate: string;
    status: string;
    customer: {
      name: string;
      email: string;
      phone: string;
      shippingAddress: string;
      billingAddress: string;
    };
    payment: {
      method: string;
      transactionId: string;
      status: string;
    };
    shipping: {
      method: string;
      trackingNumber?: string;
      estimatedDelivery?: string;
      cost: number;
    };
    items: Array<{
      id: string;
      image: string;
      name: string;
      sku: string;
      quantity: number;
      size?: string;
      color?: string;
      price: number;
    }>;
    timeline: Array<{
      date: string;
      action: string;
      user: string;
    }>;
    subtotal: number;
    tax: number;
    total: number;
  };
}

const defaultOrder = {
  id: "ORD-123456",
  orderDate: "2024-01-15T10:30:00Z",
  status: "Processing",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
    billingAddress: "123 Main St, Apt 4B, New York, NY 10001",
  },
  payment: {
    method: "Credit Card - Visa ending in 4242",
    transactionId: "txn_1234567890",
    status: "Paid",
  },
  shipping: {
    method: "Express Shipping",
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "2024-01-18",
    cost: 15.99,
  },
  items: [
    {
      id: "1",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=product1",
      name: "Premium T-Shirt",
      sku: "TS-001",
      quantity: 2,
      size: "L",
      color: "Navy Blue",
      price: 29.99,
    },
    {
      id: "2",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=product2",
      name: "Classic Jeans",
      sku: "JN-101",
      quantity: 1,
      size: "32",
      color: "Dark Blue",
      price: 49.99,
    },
  ],
  timeline: [
    {
      date: "2024-01-15T10:30:00Z",
      action: "Order Placed",
      user: "Customer",
    },
    {
      date: "2024-01-15T10:35:00Z",
      action: "Payment Confirmed",
      user: "System",
    },
    {
      date: "2024-01-15T11:00:00Z",
      action: "Processing Started",
      user: "Jane Smith (Staff)",
    },
  ],
  subtotal: 109.97,
  tax: 9.99,
  total: 135.95,
};

const OrderDetailsModal = ({
  open = false,
  onOpenChange,
  orderData = defaultOrder,
}: OrderDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      Pending: "bg-yellow-500/10 text-yellow-500",
      Processing: "bg-blue-500/10 text-blue-500",
      Shipped: "bg-primary/10 text-primary",
      Delivered: "bg-green-500/10 text-green-500",
      Cancelled: "bg-destructive/10 text-destructive",
      Refunded: "bg-orange-500/10 text-orange-500",
      "On Hold": "bg-gray-500/10 text-gray-500",
      Paid: "bg-primary/10 text-primary",
      Failed: "bg-destructive/10 text-destructive",
    };
    return statusMap[status] || "bg-secondary text-secondary-foreground";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDuplicateOrder = (order: typeof orderData) => {
    // Create a new order with the same items but a new ID
    const newOrder = {
      ...order,
      id: `ORD-${Math.random().toString(36).substr(2, 9)}`,
      orderDate: new Date().toISOString(),
      status: "Pending",
      timeline: [
        {
          date: new Date().toISOString(),
          action: "Order Duplicated",
          user: "System",
        },
      ],
    };
    console.log("Duplicated order:", newOrder);
    // Here you would typically save the new order to your backend
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-semibold text-foreground">
                Order #{orderData.id}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(orderData.orderDate).toLocaleString()}
              </p>
            </div>
            <Badge className={getStatusColor(orderData.status)}>
              {orderData.status}
            </Badge>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <PDFDownloadLink
              document={<OrderInvoice orderData={orderData} />}
              fileName={`invoice-${orderData.id}.pdf`}
            >
              {({ loading }) => (
                <Button variant="outline" size="sm" disabled={loading}>
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? "Generating..." : "Download Invoice"}
                </Button>
              )}
            </PDFDownloadLink>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDuplicateOrder(orderData)}
            >
              <Copy className="h-4 w-4 mr-2" /> Duplicate
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg bg-secondary"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              SKU: {item.sku}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Qty: {item.quantity}</p>
                          {item.size && <p>Size: {item.size}</p>}
                          {item.color && <p>Color: {item.color}</p>}
                          <p>Price: ${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${orderData.shipping.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${orderData.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <History className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Order Timeline</h3>
                </div>
                <div className="space-y-4">
                  {orderData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-4 h-4 mt-1 rounded-full bg-primary/20 border-2 border-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">{event.action}</p>
                        <p className="text-muted-foreground">
                          {new Date(event.date).toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">{event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Customer Information</h3>
                <div className="space-y-2">
                  <p className="font-medium">{orderData.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.customer.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.customer.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Shipping Details</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Shipping Address</p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.customer.shippingAddress}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Method:</span>{" "}
                      {orderData.shipping.method}
                    </p>
                    {orderData.shipping.trackingNumber && (
                      <p>
                        <span className="font-medium">Tracking:</span>{" "}
                        {orderData.shipping.trackingNumber}
                      </p>
                    )}
                    {orderData.shipping.estimatedDelivery && (
                      <p>
                        <span className="font-medium">Est. Delivery:</span>{" "}
                        {new Date(
                          orderData.shipping.estimatedDelivery,
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Payment Details</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{orderData.payment.method}</p>
                    <Badge className={getStatusColor(orderData.payment.status)}>
                      {orderData.payment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Transaction ID: {orderData.payment.transactionId}
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Billing Address</p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.customer.billingAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;

import React from "react";
import CustomerNotes from "./CustomerNotes";
import CustomerMessage from "./CustomerMessage";
import CustomerSegments from "./CustomerSegments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Bell,
  Download,
  Edit,
  UserX,
  Send,
  Tags,
  FileText,
} from "lucide-react";

interface CustomerDetailsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  customerData?: {
    id: string;
    basicInfo: {
      name: string;
      email: string;
      phone: string;
      dateOfBirth?: string;
      gender?: string;
      registrationDate: string;
      status: string;
    };
    addresses: {
      billing: string;
      shipping: string[];
    };
    orderHistory: Array<{
      id: string;
      date: string;
      total: number;
      status: string;
      items: number;
    }>;
    analytics: {
      totalSpend: number;
      averageOrderValue: number;
      ordersCount: number;
      lastOrderDate: string;
      favoriteCategories: string[];
      returnsCount: number;
    };
    marketing: {
      emailSubscribed: boolean;
      smsSubscribed: boolean;
      segments: string[];
      lastCampaign?: string;
    };
    communications: Array<{
      date: string;
      type: string;
      subject: string;
      content: string;
    }>;
  };
}

const defaultCustomer = {
  id: "CUS-001",
  basicInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    registrationDate: "2023-06-01",
    status: "active",
  },
  addresses: {
    billing: "123 Main St, Apt 4B, New York, NY 10001",
    shipping: [
      "123 Main St, Apt 4B, New York, NY 10001",
      "456 Work Ave, Suite 100, New York, NY 10002",
    ],
  },
  orderHistory: [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 299.99,
      status: "delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2023-12-20",
      total: 199.99,
      status: "processing",
      items: 2,
    },
  ],
  analytics: {
    totalSpend: 2499.99,
    averageOrderValue: 166.67,
    ordersCount: 15,
    lastOrderDate: "2024-01-15",
    favoriteCategories: ["Shirts", "Jeans", "Accessories"],
    returnsCount: 1,
  },
  marketing: {
    emailSubscribed: true,
    smsSubscribed: false,
    segments: ["High Value", "Regular Customer"],
    lastCampaign: "Holiday Sale 2023",
  },
  communications: [
    {
      date: "2024-01-15",
      type: "email",
      subject: "Order Confirmation",
      content: "Thank you for your order #ORD-001",
    },
    {
      date: "2024-01-10",
      type: "support",
      subject: "Size Exchange Request",
      content: "Customer requested size exchange for order #ORD-002",
    },
  ],
};

const CustomerDetailsModal = ({
  open = false,
  onOpenChange,
  customerData = defaultCustomer,
}: CustomerDetailsModalProps) => {
  const [showNotes, setShowNotes] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [showSegments, setShowSegments] = React.useState(false);

  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      active: "bg-primary/10 text-primary",
      inactive: "bg-muted text-muted-foreground",
      blocked: "bg-destructive/10 text-destructive",
    };
    return statusMap[status] || "bg-secondary text-secondary-foreground";
  };

  const handleSendMessage = (message: {
    type: string;
    subject: string;
    content: string;
  }) => {
    console.log("Sending message:", message);
    // Implement message sending logic here
  };

  const handleAddNote = (note: string) => {
    console.log("Adding note:", note);
    // Implement note adding logic here
  };

  const handleSaveSegment = (segment: any) => {
    console.log("Saving segment:", segment);
    // Implement segment saving logic here
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-semibold text-foreground">
                {customerData.basicInfo.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Customer ID: {customerData.id}
              </p>
            </div>
            <Badge className={getStatusColor(customerData.basicInfo.status)}>
              {customerData.basicInfo.status}
            </Badge>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotes(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Notes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMessage(true)}
            >
              <Send className="h-4 w-4 mr-2" /> Send Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSegments(true)}
            >
              <Tags className="h-4 w-4 mr-2" /> Segments
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button variant="destructive" size="sm">
              <UserX className="h-4 w-4 mr-2" /> Block
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{customerData.basicInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{customerData.basicInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Registered on{" "}
                          {new Date(
                            customerData.basicInfo.registrationDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Addresses</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Billing Address</p>
                        <p className="text-sm text-muted-foreground">
                          {customerData.addresses.billing}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Shipping Addresses</p>
                        {customerData.addresses.shipping.map(
                          (address, index) => (
                            <p
                              key={index}
                              className="text-sm text-muted-foreground mt-1"
                            >
                              {address}
                            </p>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order History</h3>
                <div className="space-y-4">
                  {customerData.orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} items
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Customer Analytics
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Spend
                      </p>
                      <p className="text-2xl font-bold">
                        ${customerData.analytics.totalSpend.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Average Order Value
                      </p>
                      <p className="text-2xl font-bold">
                        ${customerData.analytics.averageOrderValue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Orders
                      </p>
                      <p className="text-2xl font-bold">
                        {customerData.analytics.ordersCount}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Favorite Categories</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {customerData.analytics.favoriteCategories.map(
                          (category) => (
                            <Badge
                              key={category}
                              variant="secondary"
                              className="text-xs"
                            >
                              {category}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Returns</p>
                      <p className="text-sm text-muted-foreground">
                        {customerData.analytics.returnsCount} returns processed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-semibold">
                    Communication History
                  </h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowNotes(true)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {customerData.communications.map((comm, index) => (
                    <div
                      key={index}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{comm.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(comm.date).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {comm.type}
                        </Badge>
                      </div>
                      <p className="text-sm">{comm.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>

      {/* Notes Dialog */}
      <CustomerNotes
        open={showNotes}
        onOpenChange={setShowNotes}
        customerId={customerData.id}
        onAddNote={handleAddNote}
      />

      {/* Message Dialog */}
      <CustomerMessage
        open={showMessage}
        onOpenChange={setShowMessage}
        customerData={customerData.basicInfo}
        onSendMessage={handleSendMessage}
      />

      {/* Segments Dialog */}
      <CustomerSegments
        open={showSegments}
        onOpenChange={setShowSegments}
        onSaveSegment={handleSaveSegment}
      />
    </Dialog>
  );
};

export default CustomerDetailsModal;

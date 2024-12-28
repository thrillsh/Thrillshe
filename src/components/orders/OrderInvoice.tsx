import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  companyInfo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: "#F3F4F6",
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});

interface OrderInvoiceProps {
  orderData: {
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
    items: Array<{
      name: string;
      sku: string;
      quantity: number;
      price: number;
    }>;
    subtotal: number;
    tax: number;
    shipping: {
      cost: number;
    };
    total: number;
  };
}

const OrderInvoice = ({ orderData }: OrderInvoiceProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text>Your Company Name</Text>
          <Text>123 Business Street</Text>
          <Text>City, State 12345</Text>
          <Text>Phone: (555) 123-4567</Text>
        </View>
        <View>
          <Text style={styles.title}>INVOICE</Text>
          <Text>Invoice #: {orderData.id}</Text>
          <Text>
            Date: {new Date(orderData.orderDate).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill To:</Text>
        <Text>{orderData.customer.name}</Text>
        <Text>{orderData.customer.email}</Text>
        <Text>{orderData.customer.phone}</Text>
        <Text>{orderData.customer.billingAddress}</Text>
      </View>

      {/* Order Items */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Item</Text>
          <Text style={styles.tableCell}>SKU</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Price</Text>
          <Text style={styles.tableCell}>Total</Text>
        </View>

        {orderData.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.sku}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
            <Text style={styles.tableCell}>
              ${(item.quantity * item.price).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={{ marginLeft: "auto", width: "50%" }}>
        <View style={styles.totalRow}>
          <Text style={[styles.tableCell, styles.bold]}>Subtotal:</Text>
          <Text style={styles.tableCell}>${orderData.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.tableCell, styles.bold]}>Shipping:</Text>
          <Text style={styles.tableCell}>
            ${orderData.shipping.cost.toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.tableCell, styles.bold]}>Tax:</Text>
          <Text style={styles.tableCell}>${orderData.tax.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.tableCell, styles.bold]}>Total:</Text>
          <Text style={[styles.tableCell, styles.bold]}>
            ${orderData.total.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.section, { marginTop: 50 }]}>
        <Text>Thank you for your business!</Text>
        <Text style={{ marginTop: 10, color: "#666" }}>
          For any questions about this invoice, please contact our customer
          service team.
        </Text>
      </View>
    </Page>
  </Document>
);

export default OrderInvoice;

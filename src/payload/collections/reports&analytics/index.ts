// collections/ReportsAnalyticsCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const ReportsAnalyticsCollection: CollectionConfig = {
  slug: "reports-analytics-collection",
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "salesReports",
      type: "array",
      label: "Sales Reports",
      fields: [
        {
          name: "reportName",
          type: "text",
          label: "Report Name",
        },
        {
          name: "reportType",
          type: "select",
          label: "Report Type",
          options: ["Daily", "Weekly", "Monthly"],
        },
        {
          name: "salesTotal",
          type: "number",
          label: "Total Sales",
        },
        {
          name: "revenue",
          type: "number",
          label: "Revenue",
        },
        {
          name: "profit",
          type: "number",
          label: "Profit",
        },
      ],
    },
    {
      name: "productPerformance",
      type: "array",
      label: "Product Performance",
      fields: [
        {
          name: "productName",
          type: "text",
          label: "Product Name",
        },
        {
          name: "unitsSold",
          type: "number",
          label: "Units Sold",
        },
        {
          name: "totalRevenue",
          type: "number",
          label: "Total Revenue",
        },
        {
          name: "topSeller",
          type: "checkbox",
          label: "Top Seller",
        },
      ],
    },
    {
      name: "customerBehavior",
      type: "array",
      label: "Customer Behavior",
      fields: [
        {
          name: "customerName",
          type: "text",
          label: "Customer Name",
        },
        {
          name: "lastPurchaseDate",
          type: "date",
          label: "Last Purchase Date",
        },
        {
          name: "averageOrderValue",
          type: "number",
          label: "Average Order Value",
        },
        {
          name: "shoppingTrends",
          type: "textarea",
          label: "Shopping Trends",
        },
      ],
    },tenant
  ],
};

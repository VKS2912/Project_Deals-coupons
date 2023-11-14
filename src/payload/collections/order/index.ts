// collections/OrderCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const OrderCollection: CollectionConfig = {
  slug: "order-collection",
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "orderNumber",
      type: "text",
      label: "Order Number",
      unique: true,
    },
    {
      name: "customer",
      type: "relationship",
      relationTo: "customer-collection",
      label: "Customer",
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "product-collection",
      label: "Products",
      hasMany: true,
    },
    {
      name: "status",
      type: "select",
      label: "Status",options: ["Processing", "Shipped", "Delivered", "Cancelled" ],

      defaultValue: "Processing",
    },
    {
      name: "totalAmount",
      type: "number",
      label: "Total Amount",
      min: 0,
    },
    {
      name: "shippingAddress",
      type: "group",
      label: "Shipping Address",
      fields: [
        {
          name: "addressLine1",
          type: "text",
          label: "Address Line 1",
        },
        {
          name: "addressLine2",
          type: "text",
          label: "Address Line 2",
        },
        {
          name: "city",
          type: "text",
          label: "City",
        },
        {
          name: "state",
          type: "text",
          label: "State",
        },
        {
          name: "zipCode",
          type: "text",
          label: "Zip Code",
        },
        {
          name: "country",
          type: "text",
          label: "Country",
        },
      ],
    },
    {
      name: "notes",
      type: "textarea",
      label: "Order Notes",
    },
    {
      name: "packingSlip",
      type: "upload",
      relationTo: "media",
      label: "Packing Slip",
    },
    {
      name: "invoice",
      type: "upload",
      relationTo: "media",
      label: "Invoice",
    },tenant
  ],
};

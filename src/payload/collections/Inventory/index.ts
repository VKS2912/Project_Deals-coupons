// collections/InventoryCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const InventoryCollection: CollectionConfig = {
  slug: "inventory-collection",access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "product",
      type: "relationship",
      relationTo: "product-collection", // Reference to the Product collection
      label: "Product",
    },
    {
      name: "stockLevel",
      type: "number",
      label: "Stock Level",
      defaultValue: 0, // Set the initial stock level to 0
    },
    {
      name: "threshold",
      type: "number",
      label: "Threshold",
      defaultValue: 10, // Set a default threshold value
    },
    {
      name: "alertsEnabled",
      type: "checkbox",
      label: "Alerts Enabled",
      defaultValue: true, // Enable alerts by default
    },tenant
  ],
};

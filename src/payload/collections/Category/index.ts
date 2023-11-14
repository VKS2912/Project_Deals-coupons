// collections/CategoryCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const Category: CollectionConfig = {
  slug: "category",access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  labels: {
    singular: "Category",
    plural: "Categories",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },tenant
    // Add more fields as needed for category information
  ],
};

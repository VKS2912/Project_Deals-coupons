// collections/AttributeCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const Attribute: CollectionConfig = {
  slug: "attribute",
   access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  labels: {
    singular: "Attribute",
    plural: "Attributes",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Attribute Name",
      required: true,
    },
    {
      name: "values",
      type: "text",
      label: "Attribute Values",
      required: true,
      localized: true, // If you want localized values
    },tenant
    // Add more fields as needed for attribute information
  ],
};

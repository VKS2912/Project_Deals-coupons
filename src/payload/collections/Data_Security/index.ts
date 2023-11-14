// collections/DataSecurityCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const DataSecurityCollection: CollectionConfig = {
  slug: "data-security-collection",access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "customerDataProtection",
      type: "array",
      label: "Customer Data Protection",
      fields: [
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
      ],
    },
    {
      name: "privacyRegulations",
      type: "array",
      label: "Privacy Regulations",
      fields: [
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
      ],
    },
    {
      name: "secureCheckout",
      type: "array",
      label: "Secure Checkout",
      fields: [
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
      ],
    },
    {
      name: "paymentProcessing",
      type: "array",
      label: "Payment Processing",
      fields: [
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
      ],
    },tenant
  ],
};

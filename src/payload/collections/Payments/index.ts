// collections/PaymentGatewayIntegrationCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const PaymentGatewayIntegrationCollection: CollectionConfig = {
  slug: "payment-gateway-integration-collection",
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "gatewayName",
      type: "text",
      label: "Gateway Name",
    },
    {
      name: "paymentMethods",
      type: "array",
      label: "Payment Methods",
      fields: [
        {
          name: "method",
          type: "text",
          label: "Payment Method",
        },
        {
          name: "supportedCurrencies",
          type: "array",
          label: "Supported Currencies",
          fields: [
            {
              name: "currency",
              type: "text",
              label: "Currency",
            },
          ],
        },
      ],
    },
    {
      name: "security",
      type: "group",
      label: "Security",
      fields: [
        {
          name: "pciCompliance",
          type: "text",
          label: "PCI Compliance",
        },
        {
          name: "encryption",
          type: "text",
          label: "Encryption",
        },
      ],
    },tenant
  ],
};

// collections/ReturnsRefundsCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const ReturnsRefundsCollection: CollectionConfig = {
  slug: "returns-refunds-collection",
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "policies",
      type: "array",
      label: "Return Policies",
      fields: [
        {
          name: "policyName",
          type: "text",
          label: "Policy Name",
        },
        {
          name: "policyDescription",
          type: "textarea",
          label: "Policy Description",
        },
      ],
    },
    {
      name: "returnsExchanges",
      type: "array",
      label: "Returns and Exchanges",
      fields: [
        {
          name: "orderNumber",
          type: "text",
          label: "Order Number",
        },
        {
          name: "returnType",
          type: "select",
          label: "Return Type",
          options: ["Return", "Exchange"],
        },
        {
          name: "returnReason",
          type: "text",
          label: "Return Reason",
        },
        {
          name: "returnStatus",
          type: "select",
          label: "Return Status",
          options: ["Initiated", "Received", "Refunded"],
        },
        {
          name: "returnInstructions",
          type: "textarea",
          label: "Return Instructions",
        },
      ],
    },
    {
      name: "refundsCredits",
      type: "array",
      label: "Refunds and Credits",
      fields: [
        {
          name: "orderNumber",
          type: "text",
          label: "Order Number",
        },
        {
          name: "refundAmount",
          type: "number",
          label: "Refund Amount",
        },
        {
          name: "refundStatus",
          type: "select",
          label: "Refund Status",
          options: ["Pending", "Processed"],
        },
        {
          name: "creditIssued",
          type: "checkbox",
          label: "Credit Issued",
        },
      ],
    },tenant
  ],
};

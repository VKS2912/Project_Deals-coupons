// collections/CustomerServiceCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const CustomerServiceCollection: CollectionConfig = {
  slug: "customer-service-collection",access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "inquiries",
      type: "array",
      label: "Inquiries",
      fields: [
        {
          name: "subject",
          type: "text",
          label: "Subject",
        },
        {
          name: "message",
          type: "textarea",
          label: "Message",
        },
        {
          name: "status",
          type: "select",
          label: "Status",
          options: ["Open", "Pending", "Resolved"],
          defaultValue: "Open",
        },
      ],
    },
    {
      name: "orderUpdates",
      type: "array",
      label: "Order Updates",
      fields: [
        {
          name: "orderNumber",
          type: "text",
          label: "Order Number",
        },
        {
          name: "status",
          type: "select",
          label: "Status",
          options: ["Processing", "Shipped", "Delivered", "Canceled"],
        },
        {
          name: "updateMessage",
          type: "textarea",
          label: "Update Message",
        },
      ],
    },
    {
      name: "supportChannels",
      type: "array",
      label: "Support Channels",
      fields: [
        {
          name: "channel",
          type: "text",
          label: "Channel",
        },
        {
          name: "details",
          type: "textarea",
          label: "Details",
        },
      ],
    },
    {
      name: "knowledgeBase",
      type: "textarea",
      label: "Knowledge Base",
    },tenant
  ],
};

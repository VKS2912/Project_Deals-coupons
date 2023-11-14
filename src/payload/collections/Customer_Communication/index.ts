// collections/CustomerCommunicationCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const CustomerCommunicationCollection: CollectionConfig = {
  slug: "customer-communication-collection",access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "orderConfirmationEmails",
      type: "array",
      label: "Order Confirmation Emails",
      fields: [
        {
          name: "emailSubject",
          type: "text",
          label: "Email Subject",
        },
        {
          name: "emailContent",
          type: "richText",
          label: "Email Content",
        },
      ],
    },
    {
      name: "shippingNotifications",
      type: "array",
      label: "Shipping Notifications",
      fields: [
        {
          name: "notificationType",
          type: "select",
          label: "Notification Type",
          options: ["ShippingConfirmation", "TrackingUpdate"],
        },
        {
          name: "notificationContent",
          type: "richText",
          label: "Notification Content",
        },
      ],
    },
    {
      name: "marketingEmails",
      type: "array",
      label: "Marketing Emails",
      fields: [
        {
          name: "campaignName",
          type: "text",
          label: "Campaign Name",
        },
        {
          name: "emailSubject",
          type: "text",
          label: "Email Subject",
        },
        {
          name: "emailContent",
          type: "richText",
          label: "Email Content",
        },
        {
          name: "userConsent",
          type: "checkbox",
          label: "User Consent",
        },
      ],
    },tenant
  ],
};

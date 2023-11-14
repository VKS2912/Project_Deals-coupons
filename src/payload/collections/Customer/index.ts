// collections/CustomerCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const CustomerCollection: CollectionConfig = {
  slug: "customer-collection",
   access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      unique: true,
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "Phone Number",
    },
    {
      name: "address",
      type: "group",
      label: "Address",
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
    },tenant
  ],
};

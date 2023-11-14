// collections/SEOCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const SEOCollection: CollectionConfig = {
  slug: "seo-collection",
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "pageName",
      type: "array",
      label: "Page Name",
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
        },
      ],
    },
    {
      name: "pageTitle",
      type: "array",
      label: "Page Title",
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
        },
      ],
    },
    {
      name: "metaDescription",
      type: "array",
      label: "Meta Description",
      fields: [
        {
          name: "value",
          type: "textarea",
          label: "Value",
        },
      ],
    },
    {
      name: "metaKeywords",
      type: "array",
      label: "Meta Keywords",
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
        },
      ],
    },
    {
      name: "openGraphTitle",
      type: "array",
      label: "Open Graph Title",
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
        },
      ],
    },
    {
      name: "openGraphDescription",
      type: "array",
      label: "Open Graph Description",
      fields: [
        {
          name: "value",
          type: "textarea",
          label: "Value",
        },
      ],
    },
    {
      name: "openGraphImage",
      type: "array",
      label: "Open Graph Image",
      fields: [
        {
          name: "value",
          type: "upload",
          relationTo: "media",
          label: "Value",
        },
      ],
    },tenant
  ],
};

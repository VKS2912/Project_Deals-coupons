// collections/MediaCollection.ts

import { CollectionConfig } from "payload/types";
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const Media: CollectionConfig = {
  slug: "media", // Use the slug "media" for the collection
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },labels: {
    singular: "Media",
    plural: "Media",
  },
  fields: [
    {
      name: "file", // This field represents the uploaded file
      type: "upload", // Use the upload field type
      required: true,
      relationTo: "media", // Make sure the relationTo points to the collection itself
    },
    {
      name: "caption", // Add additional fields as needed (e.g., caption)
      type: "text",
      label: "Caption",
    },tenant
  ],
};

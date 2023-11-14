import type { CollectionConfig } from 'payload/types'

import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'


export const Products: CollectionConfig = {
  slug: "product-collection",
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: "products",
      type: "array",
      label: "Products",
      fields: [
        {
          name: "productGroup",
          type: "group",
          label: "Product Group",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Title",
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
            },
            {
              name: "price",
              type: "number",
              label: "Price",
            },
            {
  name: "images",
  type: "array",
  label: "Images",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image",
    },
  ],
},
            {
              name: "categories",
              type: "relationship",
              relationTo: "category",
              label: "Categories",
              hasMany: true,
            },
            {
              name: "attributes",
              type: "relationship",
              relationTo: "attribute",
              label: "Attributes",
              hasMany: true,
            },
            {
              name: "variants",
              type: "array",
              label: "Variants",
              fields: [
                {
                  name: "variantGroup",
                  type: "group",
                  label: "Variant Group",
                  fields: [
                    {
                      name: "size",
                      type: "text",
                      label: "Size",
                    },
                    {
                      name: "color",
                      type: "text",
                      label: "Color",
                    },
                    // ... other variant fields
                  ],
                },
              ],
            },
            {
              name: "availability",
              type: "select",
              label: "Availability",
              options: ["InStock", "OutOfStock"]
            },
            {
              name: "inventory",
              type: "number",
              label: "Inventory",
            },
            {
              name: "regularPrice",
              type: "number",
              label: "Regular Price",
            },
            {
              name: "salePrice",
              type: "number",
              label: "Sale Price",
            },
            {
              name: "discountCodes",
              type: "array",
              label: "Discount Codes",
              fields: [
                {
                  name: "code",
                  type: "text",
                  label: "Code",
                },
                {
                  name: "percentageOff",
                  type: "number",
                  label: "Percentage Off",
                },
                // ... other discount fields
              ],
            },
            {
              name: "bulkPricing",
              type: "array",
              label: "Bulk Pricing",
              fields: [
                {
                  name: "bulkPricingGroup",
                  type: "group",
                  label: "Bulk Pricing Group",
                  fields: [
                    {
                      name: "minQuantity",
                      type: "number",
                      label: "Minimum Quantity",
                    },
                    {
                      name: "price",
                      type: "number",
                      label: "Price",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },tenant
  ],
};


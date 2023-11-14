// collections/StorefrontCustomizationCollection.ts
import { CollectionConfig } from 'payload/types';
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const StorefrontCustomizationCollection: CollectionConfig = {
  slug: 'storefront-customization',
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      options: ['Light', 'Dark', 'Custom'],
    },
    {
      name: 'layout',
      type: 'text',
      label: 'Layout',
    },
    {
      name: 'colors',
      type: 'textarea',
      label: 'Colors',
    },
    {
      name: 'fonts',
      type: 'array',
      label: 'Fonts',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Font Name',
        },
        {
          name: 'style',
          type: 'text',
          label: 'Font Style',
        },
      ],
    },
   {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      admin: {
        elements: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'blockquote',
          'link',
          'ol',
          'ul',
          'indent',
          'upload',
        ],
        leaves: ['bold', 'italic', 'underline', 'strikethrough', 'code'],
        placeholder: 'Write your blog content here...',
        upload: {
          collections: {
            media: {
              fields: [
                {
                  name: 'caption',
                  label: 'Caption',
                  type: 'text',
                },
                {
                  name: 'altText',
                  label: 'Alt Text',
                  type: 'text',
                },
              ],
            },
          },
        },
        link: {
          fields: [
            {
              name: 'rel',
              label: 'Rel Attribute',
              type: 'select',
              hasMany: true,
              options: ['noopener', 'noreferrer', 'nofollow'],
            },
          ],
        },
      },
    },tenant
  ],
};

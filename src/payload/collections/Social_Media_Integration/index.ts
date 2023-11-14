import { CollectionConfig } from 'payload/types';
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const SocialMediaIntegrationCollection: CollectionConfig = {
  slug: 'social-media-integration',
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: 'shareButtons',
      type: 'array',
      label: 'Social Media Share Buttons',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Social Media Platform',
          options: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Pinterest', 'Other'],
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Button Icon',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Share Link',
          required: true,
        },
      ],
    },
    {
      name: 'userPromotion',
      type: 'group',
      label: 'User Promotion on Social Media',
      fields: [
        {
          name: 'promotionMessage',
          type: 'richText',
          label: 'Promotion Message',
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
        leaves: ['bold', 'italic', 'strikethrough', 'underline', 'code'],
          },
        },
        {
          name: 'promotionImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Promotion Image',
        },
        {
          name: 'hashtags',
          type: 'text',
          label: 'Hashtags (comma-separated)',
        },
      ],
    },tenant
  ],
};

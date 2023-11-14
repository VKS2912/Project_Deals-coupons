import { CollectionConfig } from 'payload/types';
import { tenant } from '../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const ThirdPartyIntegrationCollection: CollectionConfig = {
  slug: 'third-party-integration',
  access: { read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics Integration',
      fields: [
        {
          name: 'googleAnalytics',
          type: 'text',
          label: 'Google Analytics ID',
        },
        {
          name: 'facebookPixel',
          type: 'text',
          label: 'Facebook Pixel ID',
        },
      ],
    },
    {
      name: 'emailMarketing',
      type: 'group',
      label: 'Email Marketing Integration',
      fields: [
        {
          name: 'mailchimp',
          type: 'text',
          label: 'Mailchimp API Key',
        },
        {
          name: 'sendGrid',
          type: 'text',
          label: 'SendGrid API Key',
        },
      ],
    },
    {
      name: 'inventoryManagement',
      type: 'group',
      label: 'Inventory Management Integration',
      fields: [
        {
          name: 'shopify',
          type: 'text',
          label: 'Shopify API Key',
        },
        {
          name: 'woocommerce',
          type: 'text',
          label: 'WooCommerce API Key',
        },
      ],
    },tenant
    // Add more integration groups as needed
  ],
};

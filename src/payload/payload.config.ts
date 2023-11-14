import { payloadCloud } from '@payloadcms/plugin-cloud'
// import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import stripePlugin from '@payloadcms/plugin-stripe'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import { Pages } from './collections/Pages'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { Products } from './collections/Products/index'
import { Media } from './collections/media/index'
import {Attribute} from './collections/Attributes/index'
import {Category } from './collections/Category/index'
import { CustomerCollection } from './collections/Customer/index'
import { CustomerCommunicationCollection } from './collections/Customer_Communication/index'
import { CustomerServiceCollection } from './collections/Customerservice/index'
import { DataSecurityCollection } from './collections/Data_Security/index'
import { InventoryCollection } from './collections/Inventory/index'
import { PaymentGatewayIntegrationCollection } from './collections/Payments/index'
import { ReturnsRefundsCollection } from './collections/Returns&Refunds/index'
import { SEOCollection } from './collections/SEO_optimization/index'
import { SocialMediaIntegrationCollection } from './collections/Social_Media_Integration/index'
import { StorefrontCustomizationCollection } from './collections/Store_Front_Customization/index'

import { ThirdPartyIntegrationCollection } from './collections/Third_party_services/index'
import { ReportsAnalyticsCollection } from './collections/reports&analytics/index'
import { OrderCollection } from './collections/order/index'

import BeforeDashboard from './components/BeforeDashboard'
import BeforeLogin from './components/BeforeLogin'
import { createPaymentIntent } from './endpoints/create-payment-intent'
import { customersProxy } from './endpoints/customers'
import { productsProxy } from './endpoints/products'
import { seed } from './endpoints/seed'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { priceUpdated } from './stripe/webhooks/priceUpdated'
import { productUpdated } from './stripe/webhooks/productUpdated'
// import { Companies } from './collections/Company/company'



const generateTitle: GenerateTitle = () => {
  return 'My Store'
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: [BeforeDashboard],
    },
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          [path.resolve(__dirname, 'collections/Products/hooks/beforeChange')]: mockModulePath,
          [path.resolve(__dirname, 'collections/Users/hooks/createStripeCustomer')]: mockModulePath,
          [path.resolve(__dirname, 'collections/Users/endpoints/customer')]: mockModulePath,
          [path.resolve(__dirname, 'endpoints/create-payment-intent')]: mockModulePath,
          [path.resolve(__dirname, 'endpoints/customers')]: mockModulePath,
          [path.resolve(__dirname, 'endpoints/products')]: mockModulePath,
          stripe: mockModulePath,
          express: mockModulePath,
        },
      },
    }),
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Users,Pages, Tenants, Products, Media, Category,OrderCollection, Attribute, ReportsAnalyticsCollection,ThirdPartyIntegrationCollection, StorefrontCustomizationCollection, SocialMediaIntegrationCollection, SEOCollection, ReturnsRefundsCollection, PaymentGatewayIntegrationCollection, InventoryCollection, DataSecurityCollection, CustomerServiceCollection, CustomerCommunicationCollection , CustomerCollection],
  globals: [Settings, Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  csrf: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  endpoints: [
    {
      path: '/create-payment-intent',
      method: 'post',
      handler: createPaymentIntent,
    },
    {
      path: '/stripe/customers',
      method: 'get',
      handler: customersProxy,
    },
    {
      path: '/stripe/products',
      method: 'get',
      handler: productsProxy,
    },
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      path: '/seed',
      method: 'get',
      handler: seed,
    },
  ],
  plugins: [
    // formBuilder({}),
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
      rest: false,
      webhooks: {
        'product.created': productUpdated,
        'product.updated': productUpdated,
        'price.updated': priceUpdated,
      },
    }),
    redirects({
      collections: ['pages', 'products'],
    }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'products'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
  ],
})

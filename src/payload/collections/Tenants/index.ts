import type { CollectionConfig } from 'payload/types'

import { superAdmins } from '../access/superAdmins'
import { tenantAdmins } from './access/tenantAdmins'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: superAdmins,
    read: tenantAdmins,
    update: tenantAdmins,
    delete: superAdmins,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'storename',
      type: 'text',
      required: true,
    },
    {
      name: 'domains',
      type: 'array',
      index: true,
      fields: [
        {
          name: 'domain',
          type: 'text',
          required: true,
        },
      ],
    },{
      name:"aboutus",
      type:"textarea"
    },{
      name: "contactInfo", // The property name used for the group
      type: "group",
      label: "Contact Information", // Heading in the admin panel
      fields: [
        {
          name: "addresses",
          type: "array", // Use an array for multiple addresses
          label: "Addresses",
          fields: [
            // Fields for each address

            { name: "addressGroup",
              type: "group", // Use a group for a set of related fields
              fields: [
                 { // Row for city, state, and pincode
                  type: "row",
                  fields: [
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
                      name: "pincode",
                      type: "text",
                      label: "Pincode",
                    },
                      {
                      name: "postoffice",
                      type: "text",
                      label: "Post office",
                    },
              ],
                 },
            { name: "addressGroup",
              type: "group", // Another group for address line
              fields: [
                {
                  name: "addressLine",
                  type: "text",
                  label: "Address Line",
                },
              ],
            },
          ],
        },

      ],
    },
      {
          name: "email",
          type: "text",
          label: "Email",
        },
         {
                  name: "phoneNumbers", // Add a group for dynamic phone numbers
                  type: "array",
                  label: "Phone Numbers",
                  fields: [
                    {
                      name: "phoneNumber",
                      type: "text",
                      label: "Phone Number",
                    },
                  ],
                },
        {
          name: "socialMedia",
          type: "group",
          label: "Social Media",
          fields: [
            {
              name: "instagram",
              type: "text",
              label: "Instagram",
            },
            {
              name: "facebook",
              type: "text",
              label: "Facebook",
            },
            {
              name: "twitter",
              type: "text",
              label: "Twitter",
            },
          ],
        },
  ],
}
, {
      name: "storePolicies",
      type: "group",
      label: "Store Policies",
      fields: [
       {
      name: "returnsRefunds",
      type: "array",
      label: "Returns and Refunds",
      fields: [
        {
          name: "policyText",
          type: "text",
          label: "Policy Text",
        },
      ],
    },
    {
      name: "shippingDelivery",
      type: "array",
      label: "Shipping and Delivery",
      fields: [
        {
          name: "policyText",
          type: "text",
          label: "Policy Text",
        },
      ],
    },
    {
      name: "privacyPolicy",
      type: "array",
      label: "Privacy Policy",
      fields: [
        {
          name: "policyText",
          type: "text",
          label: "Policy Text",
        },
      ],
    },
    {
      name: "termsConditions",
      type: "array",
      label: "Terms and Conditions",
      fields: [
        {
          name: "policyText",
          type: "text",
          label: "Policy Text",
        },
      ],
    },
      ],
    }, {
      name: "faqItems",
      type: "array",
      label: "FAQ Items",
      fields: [
        {
          name: "faqGroup",
          type: "group",
          label: "FAQ Group",
          fields: [
            {
              name: "question",
              type: "text",
              label: "Question",
            },
            {
              name: "answers",
              type: "array",
              label: "Answers",
              fields: [
                {
                  name: "answer",
                  type: "text",
                  label: "Answer",
                },
              ],
            },
          ],
        },
      ],
    },{
      name: "customerReviews",
      type: "array",
      label: "Customer Reviews",
      fields: [
        {
          name: "reviewGroup",
          type: "group",
          label: "Review Group",
          fields: [
            {
              
              type: "row", // Row field for Name and Username
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Name",
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "username",
                  type: "text",
                  label: "Username",
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
            {
              name: "reviews",
              type: "array",
              label: "Reviews",
              fields: [
                {
                  name: "reviewText",
                  type: "textarea",
                  label: "Review Text",
                },
              ],
            },
          ],
        },
      ],
    },{
      name:"opening",
      type:"array",
      label:"Opening Hours",
      fields:[
        {
           name: "openingHoursGroup",
          type: "group",
          label: "Opening Hours Group",
          fields: [
             {
              type: "row", // Row field for Name and City
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Store Name",
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "city",
                  type: "text",
                  label: "City",
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },{
              type: "row", // Row field for Name and City
              fields: [
                {
                  name: "opening",
                  type: "date",
                  label: "Opening Hour",
                   admin: {
                     width: "50%",
                date: {
                  pickerAppearance: "timeOnly",
                  displayFormat: "h:mm a",
                },
              },
                },
                {
                  name: "closing",
                  type: "date",
                  label: "Closing Hour",
                   admin: {
                     width: "50%",
                date: {
                  pickerAppearance: "timeOnly",
                  displayFormat: "h:mm a",
                },
                }},
                 {
                  name: "openingday",
                  type: "date",
                  label: "Opening Day",
                   admin: {
                     width: "50%",
                date: {
                  pickerAppearance: "dayOnly",
                  displayFormat: "h:mm a",
                },
                }},
                 {
                  name: "closingday",
                  type: "date",
                  label: "Closing Day",
                   admin: {
                     width: "50%",
                date: {
                  pickerAppearance: "dayOnly",
                  displayFormat: "h:mm a",
                },
                }}
              ],
            },
          ]
        }
      ]
    }, {
      name: "events",
      type: "array",
      label: "Events",
      fields: [
        {
          name: "eventGroup",
          type: "group",
          label: "Event Group",
          fields: [
            {
              name: "eventName",
              type: "text",
              label: "Event Name",
            },
            {
              name: "eventDescription",
              type: "textarea",
              label: "Event Description",
            },
          ],
        },
      ],
    },{
      name: "paymentOptions",
      type: "array",
      label: "Payment Options",
      fields: [
        {
          
              name: "optionName",
              type: "text",
              label: "Option Name",
            },
      ],
    }, {
      name: "specialNotices",
      type: "array",
      label: "Special Notices",
      fields: [
        {
          name: "noticeGroup",
          type: "group",
          label: "Notice Group",
          fields: [
            {
              name: "noticeTitle",
              type: "text",
              label: "Notice Title",
            },
            {
              name: "noticeDetails",
              type: "textarea",
              label: "Notice Details",
            },
          ],
        },
      ],
    },
]}

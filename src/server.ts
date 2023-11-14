import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'
import mongoose from 'mongoose'
import { seed } from './payload/seed'


const userSchema = new mongoose.Schema({
 email:{
  type: String,
  required: true
 },password:{
  type: String,
  required: true
 },loginAttempts: {
    type: Number,
    default: 0, 
  },
})
const User = mongoose.model('Users',userSchema)

mongoose.connect('mongodb+srv://vkshastri6929:UheYyrBtVBM9d09t@cluster0.bfjzxys.mongodb.net/',).then(() => {
  console.log("Connected to MongoDB lalalalalaaaaaaaa");
}).catch((err) => {
  console.log("Failed to connect to MongoDB", err);
});

const app = express()
const PORT = process.env.PORT || 3000
console.log("server", PORT)
app.use(express.json());

const stripe = require('stripe')('sk_test_51N106OSFEqc2OutF2n7VWzZG8lmbiLuysPrbMiWjQa4U0SdviR0yv4lEBzxqlIJP9EXrheUimyUMovFViaDhE3wi00AaqVxpvk');

app.post('/create/service', async (req,res)=>{
  const product = await stripe.products.create({
  name: 'Gold Special',
});
})

app.put('/update/product',async (req,res) => {
  const product = await stripe.products.update(
  'prod_OnVlqc812SrHat',
  {metadata: {order_id: '6735'}});
})

app.get('/get/products', async (req,res) => {
  const products = await stripe.products.list({
  limit: 3,
});
})

app.delete('/delete/product',async (req,res)=>{
  
const deleted = await stripe.products.del(
  'prod_OnVlqc812SrHat'
);
})

app.get('/get/searchedProducts', async (req,res)=>{
  const product = await stripe.products.search({
  query: 'active:\'true\' AND metadata[\'order_id\']:\'6735\'',
});
})

app.get('/get/prices/:id', async (req,res) => {
  const price = await stripe.prices.retrieve(
  'price_1NzteR2eZvKYlo2CSf6bQkr8'
);
})

app.post('/create/prices', async (req,res) =>{
  const { unit_amount, currency, recurring, product } = req.body;
const price = await stripe.prices.create({
  unit_amount: unit_amount,
  currency: currency,
  recurring: {interval: recurring},
  product: product,
});
})

app.post('/update/price/:price_id', async (req,res) =>{
  const {price_id} = req.params;
  const price = await stripe.prices.update(
    price_id
  ,
  {metadata: {order_id: '6735'}}
);
})

app.get('/getallprices', async (req,res)=>{
  const prices = await stripe.prices.list({
  limit: 3,
});
})

app.get('/prices/search', async (req,res)=>{
  const price = await stripe.prices.search({
  query: 'active:\'true\' AND metadata[\'order_id\']:\'6735\'',
});
})

app.get('/create/coupons', async (req,res) =>{

  const coupon = await stripe.coupons.create({
  percent_off: 25.5,
  duration: 'repeating',
  duration_in_months: 3,
});
})

app.get('/retrive/coupons/:coupons_id', async (req,res)=>{
  const { coupons_id } = req.params;
const coupon = await stripe.coupons.retrieve(coupons_id);
})

app.post('/update/coupons/:coupons_id', async (req,res)=>{
   const { coupons_id } = req.params;
  const coupon = await stripe.coupons.update(
  'Z4OV52SU',
  {metadata: {order_id: '6735'}}
);
})

app.delete('/delete/coupons/:coupons_id', async (req,res) => {
   const { coupons_id } = req.params;
   const deleted = await stripe.coupons.del(coupons_id);
})

app.get('/all_coupons', async (req,res)=>{
  const coupons = await stripe.coupons.list({
  limit: 3,
});
})

//Promotion Codes
app.post('/create/promotion_codes', async (req,res)=>{
  const { coupon_code } = req.body;
  const promotionCode = await stripe.promotionCodes.create({
  coupon: coupon_code,
});
})

app.post('/update/promotion_codes', async (req,res)=>{
  const { promotion_code_id, updatedData} = req.body
  const promotionCode = await stripe.promotionCodes.update(
  promotion_code_id,
  {metadata: {order_id: '6735'}}
);
})

app.get('/retrive/promotion_code', async (req,res)=>{
  const { promotion_code_id } = req.body;
  const promotionCode = await stripe.promotionCodes.retrieve(
  promotion_code_id
);
})

app.get('/all_promotion_code', async (req,res)=>{
  const promotionCodes = await stripe.promotionCodes.list({
  limit: 3,
});
})

//Customers
app.post('/create/customers', async (req,res)=>{
const customer = await stripe.customers.create({
  description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
});
})

app.get('/retrieve/customers/:customer_id', async (req,res)=>{
  const { customer_id} = req.params;
  const customer = await stripe.customers.retrieve(
  customer_id
);
})

app.post('/update/customers/:customer_id', async (req,res)=>{
  const { customer_id} = req.params;
  const customer = await stripe.customers.update(
   customer_id,
  {metadata: {order_id: '6735'}}
);
})

app.delete('/delete/customers/:customer_id', async (req,res)=>{
  const { customer_id} = req.params;
  const deleted = await stripe.customers.del(
  customer_id
);
})

app.get('/getallcustomers', async (req,res)=>{
  const customers = await stripe.customers.list({
  limit: 3,
});
})

app.get('/get/searched_customers', async (req,res) =>{
  const customer = await stripe.customers.search({
  query: 'name:\'fakename\' AND metadata[\'foo\']:\'bar\'',
});
})
//Delete customers discount
app.delete('/delete/customers/:customer_id/discount', async (req,res)=>{
  const customer_id = req.params;
  stripe.customers.deleteDiscount(
  customer_id,
  function(err, confirmation) {
    // asynchronously called
  }
);
})

//Delete customers subscriptions account
app.delete('/delete/customers/:customer_id/discount', async (req,res)=>{
  const customer_id = req.params;
  stripe.subscriptions.deleteDiscount(
  customer_id,
  function(err, confirmation) {
    // asynchronously called
  }
);
})

//Tax codes
app.get('/getAll/taxcodes', async (req,res)=>{
  const taxCodes = await stripe.taxCodes.list({
  limit: 3,
});
})
//Get a Tax Code
app.get('/get/taxcode/taxcode_id', async (req,res)=>{
   const taxcode_id = req.params;
  const taxCode = await stripe.taxCodes.retrieve(
    taxcode_id
);
}) 

// Tax rates
app.post('/create/taxrates', async (req,res)=>{
  const { display_name,
  description,
  jurisdiction } = req.body;
  const taxRate = await stripe.taxRates.create({
  display_name: display_name,
  description: description,
  jurisdiction: jurisdiction,
  percentage: 16,
  inclusive: false,
});
})

//Retrive Tax Rates
app.get('/retrive/tax_rates/:tax_rate_id', async (req,res)=>{
  const { tax_rate_id } = req.body;
  const taxRate = await stripe.taxRates.retrieve(
  tax_rate_id
);
})

//Update Tax Rates
app.post('/update/tax_rates/:tax_rate_id', async (req,res)=>{
  const { tax_rate_id } = req.body;
  const taxRate = await stripe.taxRates.update(
  tax_rate_id,
  {active: false}
);
})

//List all Taxes
app.get('/getall/tax_rates', async (req,res)=>{
  
  const taxRates = await stripe.taxRates.list({
  limit: 3,
});
})

//payment methods
// Creating Payment Intent
app.post('/create/payment_intent', async (req,res)=>{
  const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  automatic_payment_methods: {enabled: true},
});
})

//retrive a payment intent
app.get('/retrive/payment_intent/:payment_intent_id',async (req,res)=>{
  const {payment_intent_id} = req.params;
 const paymentIntent = await stripe.paymentIntents.retrieve(
  payment_intent_id
);
}
)

//update payment intent
app.get('/retrive/payment_intent/:payment_intent_id',async (req,res)=>{
  const {payment_intent_id} = req.params;
 const paymentIntent = await stripe.paymentIntents.retrieve(
  payment_intent_id
);
}
)

//confirm payment intent
app.get('/confirm/payment_intent/:payment_intent_id',async (req,res)=>{
  const {payment_intent_id} = req.params;
 const paymentIntent = await stripe.paymentIntents.confirm(
   payment_intent_id,
  {payment_method: 'pm_card_visa'}
);

}
)

// Capture Payment Intent
app.get('/capture/payment_intent/:payment_intent_id',async (req,res)=>{
  const {payment_intent_id} = req.params;
 const paymentIntent = await stripe.paymentIntents.capture(
  payment_intent_id
);
}
)

// Cancel Payment Intent
app.get('/capture/payment_intent/:payment_intent_id',async (req,res)=>{
  const {payment_intent_id} = req.params;
 const paymentIntent = await stripe.paymentIntents.cancel(
  payment_intent_id
);
}
)

//List all payment Intents
app.get('/capture/payment_intent/:payment_intent_id',async (req,res)=>{
  const {payment_intent_id} = req.params;
 const paymentIntents = await stripe.paymentIntents.list({
  limit: 3,
});}
)

//Increment an Authorization
app.post('/increment_authorization/payment_intents/:payment_intents', async (req,res)=>{
const paymentIntent = await stripe.paymentIntents.incrementAuthorization(
  'pi_1Gt06o2eZvKYlo2CL4fRoQfX',
  {amount: 2099}
);
})

// Search Payment Intents
app.get('/payment_intents/search', async (req,res)=>{
  const paymentIntent = await stripe.paymentIntents.search({
  query: 'status:\'succeeded\' AND metadata[\'order_id\']:\'6735\'',
});
})

// Verify Microdeposits on a PaymentIntent
app.post('/payment_intent/verify_microdeposits/:payment_intent_id', async (req,res)=>{
  const {payment_intent_id} = req.params;
  const paymentIntent = await stripe.paymentIntents.verifyMicrodeposits(
  payment_intent_id,
  {amounts: [32, 45]}
);
})

// Reconcile a customer_balance
app.post('/payment_intent/apply_customer_balance/:payment_intent_id', async (req,res)=>{
  const {payment_intent_id} = req.params;
  const paymentIntent = await stripe.paymentIntents.applyCustomerBalance(
  payment_intent_id
);
})

//setup intents 

// Create Setup Intents
app.post('/create/setup_intent', async (req,res)=>{
 const setupIntent = await stripe.setupIntents.create({
  automatic_payment_methods: {enabled: true},
});}
 )

// Retrive a Setup Intent
app.post('/retrieve/setup_intent/:setup_intent_id', async (req,res)=>{
  const { setup_intent_id } = req.params;
 const setupIntent = await stripe.setupIntents.retrieve(
  setup_intent_id
);}
 )

 // Update a Setup Intent
 app.post('/update/setup_intent/:setup_intent_id', async (req,res)=>{
  const { setup_intent_id } = req.params;
  const setupIntent = await stripe.setupIntents.update(
  setup_intent_id,
  {metadata: {user_id: '3435453'}}
);
 })

 // Confirm Setup Intent
 app.post('/confirm/setup_intent/:setup_intent_id', async (req,res)=>{
  const { setup_intent_id } = req.params;
  const setupIntent = await stripe.setupIntents.confirm(
  setup_intent_id,
  {payment_method: 'pm_card_visa'}
);
 })

 // Cancel a Setup Intent
 app.post('/cancel/setup_intents/:setup_intent_id', async (req,res)=>{
  const { setup_intent_id } = req.params;
  const setupIntent = await stripe.setupIntents.cancel(
  setup_intent_id
);
 })

 app.get('/listAllSetupIntents', async (req,res)=>{
  const setupIntents = await stripe.setupIntents.list({
  limit: 3,
   });
 })

 // Verify Microdeposits on a setup intents

 app.post('/verify_microdeposits/setup_intents/:setup_intent_id',async (req,res) => {
  const { setup_intent_id } = req.params;
  const setupIntent = await stripe.setupIntents.verifyMicrodeposits(
  setup_intent_id,
  {amounts: [32, 45]}
);
 })

 //Get all setup intents SetupAttempt

 app.post('/verify_microdeposits/setup_intents/:setup_intent_id',async (req,res) => {
  const { setup_intent_id } = req.params;
  const setupAttempts = await stripe.setupAttempts.list({
  setup_intent:setup_intent_id ,
});
 })

 //Refund 
  // Create Refund
 app.post('/refunds/create',async (req,res) => {
  const refund = await stripe.refunds.create({
  charge: 'ch_1O02gO2eZvKYlo2CKeHczQvB',
});
  
 })

 // Retrive a refund
 app.get('/refunds/create/:refund_id',async (req,res) => {
   const refund_id = req.params
   const refund = await stripe.refunds.retrieve(
  refund_id
);
 })

 //update a refund
 app.post('/update/refund/:refund_id',async (req,res)=>{
  const refund_id = req.params
  const refund = await stripe.refunds.update(
  refund_id,
  {metadata: {order_id: '6735'}}
);
 })

 //Cancel a refund
 app.post('/cancel/refund/:refund_id',async (req,res)=>{
  const refund_id = req.params
  const refund = await stripe.refunds.cancel(
  refund_id
);
 })

 //Get All refunds
 app.post('/list_all_refunds',async (req,res)=>{
  const refunds = await stripe.refunds.list({
  limit: 3,
});
 })

 // Tokenization of customers information

 // payment method

 // Create Payment method
app.post('/create/payment_method',async (req,res)=>{
  const paymentMethod = await stripe.paymentMethods.create({
  type: 'card',
  card: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2034,
    cvc: '314',
  },
});
 })

 app.post('/retrive/payment_method/:payment_method_id',async (req,res)=>{
  const payment_method_id = req.params
  const paymentMethod = await stripe.paymentMethods.retrieve(
  payment_method_id
);
 })
 
 app.post('/retrive/payment_method/:payment_method_id/customers/:customers_id', async (req,res)=>{
  const {payment_method_id,customers_id } = req.params
  const paymentMethod = await stripe.customers.retrievePaymentMethod(
  payment_method_id,customers_id
);
 })

 app.post('/update/payment_method/:payment_method_id',async (req,res) =>{
  const payment_method_id = req.params;
  const paymentMethod = await stripe.paymentMethods.update(
  payment_method_id,
  {metadata: {order_id: '6735'}}
);
 })

 app.get('/get_All_payments_methods/customers/:customer_id', async (req,res)=>{
  const customer_id = req.params;
  const paymentMethods = await stripe.paymentMethods.list({
  customer: customer_id,
  type: 'card',
});
 })

 // Checkout Session
 app.post('/create/checkout_session', async (req,res) => {

  const session = await stripe.checkout.sessions.create({
  success_url: 'https://example.com/success',
  line_items: [
    {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
  ],
  mode: 'payment',
});
 })

 // Expire a checkout Session
 app.post('/expire/checkout_session/:checkout_session_id', async (req,res) =>{
  const checkout_session_id = req.params;
  const session = await stripe.checkout.sessions.expire(
  checkout_session_id
);
 })
 
 //Get a Checkout Session
 app.get('/retrive/checkout_session/:checkout_session_id', async (req,res)=>{
    const checkout_session_id = req.params;
    const session = await stripe.checkout.sessions.retrieve(
    checkout_session_id
);
 })

 //Get all Checkout Session
 app.get('/get_all_checkout_session', async (req,res)=>{
    const sessions = await stripe.checkout.sessions.list({
  limit: 3,
});
 })
 
// Create credit note
app.post('/create/credit_notes', async (req,res)=>{
  const { invoice_id, invoice_line_item_id } = req.body
const creditNote = await stripe.creditNotes.create({
  invoice: invoice_id ,
  lines: [
    {
      type: 'invoice_line_item',
      invoice_line_item: invoice_line_item_id,
      quantity: 1,
    },
  ],
});})

// Retrive credit Note
app.get('/retrive/credit_notes/:credit_notes_id', async (req,res)=>{
  const { credit_notes_id } = req.params
  const creditNote = await stripe.creditNotes.retrieve(
  credit_notes_id
);
})

// Update credit Note
app.post('/update/credit_notes/:credit_notes_id', async (req,res)=>{
   const { credit_notes_id } = req.params
  const creditNote = await stripe.creditNotes.update(
  credit_notes_id,
  {metadata: {order_id: '6735'}}
);})

//Retrive credit note's line item
app.get('/retrive/credit_notes_line_item/:credit_notes_line_item_id', async (req,res)=>{
   const { credit_notes_line_item_id } = req.params
 const lineItems = await stripe.creditNotes.listLineItems(
  credit_notes_line_item_id,
  {limit: 3}
);})

//Retrieve a credit note previews line items
app.get('/retrive/preview/credit_notes_line_item', async (req,res)=>{
   const { invoice_id, invoice_line_item_id } = req.body
stripe.creditNotes.listPreviewLineItems(
  {
    invoice: invoice_id,
    lines: [
      {
        type: 'invoice_line_item',
        invoice_line_item: invoice_line_item_id,
        quantity: '1',
      },
    ],
  },
  function(err, lineItems) {
    // asynchronously called
  }
);});

//void a credit note
app.post('/void/credit_note/:credit_note_id', async (req,res)=>{
  const credit_note_id = req.params
  const creditNote = await stripe.creditNotes.voidCreditNote(
  credit_note_id
);
})

// List all credit notes
app.get("/list_all_credit_notes",async (req,res)=>{
  const creditNotes = await stripe.creditNotes.list({
  limit: 3,
});
})

// Create Balance Transactions
app.post("/create/customers/balance_transaction/:customers_id", async (req,res) => {
  const customers_id = req.params;
  const balanceTransaction = await stripe.customers.createBalanceTransaction(
  customers_id,
  {amount: -500, currency: 'usd'}
);
})

// Retrive Balance Transactions
app.get("/retrive/customers/balance_transaction/:customer_id/:balance_transaction_id",async (req,res)=>{
const {customer_id, balance_transaction_id} = req.params;
const balanceTransaction = await stripe.customers.retrieveBalanceTransaction(
  customer_id, balance_transaction_id
);
})

// Update balance Transactions
app.get('/update/customers/balance_transaction_data/:customer_id/:balance_transaction_id', async (req,res) =>{
  const {customer_id, balance_transaction_id} = req.params;
  const balanceTransaction = await stripe.customers.updateBalanceTransaction(
  customer_id, balance_transaction_id,
  {metadata: {order_id: '6735'}}
);
})

// List all customer balance transaction
app.get("/list_all_customers_balance_transaction/:customer_id", async (req,res)=>{
  const customer_id = req.params
  const balanceTransactions = await stripe.customers.listBalanceTransactions(
  customer_id,
  {limit: 3}
);
})

// Create a Portal Session
app.post("/create/portal_session/:customer_id", async (req,res) =>{
  const customer_id = req.params;
  const session = await stripe.billingPortal.sessions.create({
  customer: customer_id,
  return_url: 'https://example.com/account',
});
})

// Create a Portal Configuration
app.post("/billing_portal/configuration", async (req,res) => {
 const configuration = await stripe.billingPortal.configurations.create({
  features: {
    customer_update: {
      allowed_updates: ['email', 'tax_id'],
      enabled: true,
    },
    invoice_history: {enabled: true},
  },
  business_profile: {
    privacy_policy_url: 'https://example.com/privacy',
    terms_of_service_url: 'https://example.com/terms',
  },
});
})

// update a portal configuration
app.post('/update/billing_portal/configurations/:id', async (req,res) =>{
  const { id }= req.params;
  const configuration = await stripe.billingPortal.configurations.update(
  id,
  {
    business_profile: {
      privacy_policy_url: 'https://example.com/privacy',
      terms_of_service_url: 'https://example.com/terms',
    },
  }
);
})

// Retrive a Portal Configuration
app.get("/retrive/billing_portal/configurations/:id", async (req,res) =>{
  const { id }= req.params;
const configuration = await stripe.billingPortal.configurations.retrieve(
  id
);
})

// List Portal Configurations
app.get('/get_all_portal_configurations', async (req,res)=>{
  const configurations = await stripe.billingPortal.configurations.list({
  limit: 3,
});
})

// Invoices

// Create an Invoice
app.post("/create/invoice/:customer_id", async (req,res)=>{
  const {customer_id}= req.params
  const invoice = await stripe.invoices.create({
  customer: customer_id,
});
})

// Retrive an Invoice
app.get("/retrive/invoice/:invoice_id", async (req,res) => {
  const { invoice_id } = req.params;
  const invoice = await stripe.invoices.retrieve(
  invoice_id
);
})

// Update an Invoice
app.post("/update/invoice/:invoice_id", async (req,res)=>{
  const { invoice_id } = req.params;
  const invoice = await stripe.invoices.update(
  invoice_id,
  {metadata: {order_id: '6735'}}
);
})

// Delete an Invoice
app.delete("/delete/invoice/:invoice_id", async (req,res)=>{
  const { invoice_id } = req.params;
  const deleted = await stripe.invoices.del(
  invoice_id
);
})

// Finalize an Invoice
app.post("/invoices/finalize/:invoice_id", async (req,res) =>{
  const { invoice_id } = req.params
  const invoice = await stripe.invoices.finalizeInvoice(
  invoice_id
);
})

// Pay an Invoice
app.post("/invoices/pay/:invoice_id", async (req,res)=>{
   const { invoice_id } = req.params
  const invoice = await stripe.invoices.pay(
  invoice_id
);
})

// Send Invoice For Manual Payment
app.post("/invoices/send/manually/:invoice_id", async (req,res)=>{
  const { invoice_id } = req.params
  const invoice = await stripe.invoices.sendInvoice(
  invoice_id
);
})

// Void an Invoice
app.post("/invoices/void/:invoice_id", async (req,res)=>{
  const { invoice_id } = req.params
  const invoice = await stripe.invoices.voidInvoice(
  invoice_id
);
})

// Retrive an Invoice Line
app.get("/retrive/invoice/line_items/:invoice_line_items_id", async (req,res) =>{
  const invoice_line_items_id = req.params
  stripe.invoices.listLineItems(
  invoice_line_items_id,
  { limit: 5 },
  function(err, lines) {
    // asynchronously called
  }
);
})

// Retrive an upcoming Invoice
app.get("/retrive/upcoming/invoice/:customer_id", async (req,res) => {
  const customer_id = req.params;
  const invoice = await stripe.invoices.retrieveUpcoming({
  customer: customer_id,
});
})

// Retrive an upcoming Invoice Line Items
app.get("/retrive/upcoming/invoice/line_items/:customer_id", async (req,res)=>{
   const customer_id = req.params;
  const lines = await stripe.invoices.listUpcomingLines({
  customer: customer_id,
  limit: 5,
});
})

// List all invoices
app.get("/retrive/Invoice", async (req,res)=>{
  const invoices = await stripe.invoices.list({
  limit: 3,
});
})

// Search Invoices
app.get("/search/invoices",async (req,res)=>{
  const invoice = await stripe.invoices.search({
  query: 'total>999 AND metadata[\'order_id\']:\'6735\'',
});
})

// Create Invoice Item
app.post("/create/invoice_item/:customer_id",async (req,res)=>{
  const customer_id = req.params;
  const invoiceItem = await stripe.invoiceItems.create({
  customer: customer_id ,
  price: 'price_1O1lln2eZvKYlo2Cg0l1oIfo',
});
})

// Retrive an Invoice
app.get("/retrive/invoice_item/:invoice_item_id", async (req,res)=>{ 
  const invoice_item_id = req.params;
  const invoiceItem = await stripe.invoiceItems.retrieve(
  invoice_item_id
);
})

// Update an Invoice
app.post("/update/invoice_item/:invoice_item_id",
async (req,res) =>{
   const invoice_item_id = req.params;
  const invoiceItem = await stripe.invoiceItems.update(
  invoice_item_id,
  {metadata: {order_id: '6735'}}
);
})

// Delete an Invoice
app.delete("/delete/invoice_item/:invoice_item_id", async (req,res)=>{
  const invoice_item_id = req.params;
  const deleted = await stripe.invoiceItems.del(
  invoice_item_id
);
})

// List all Invoice Items
app.get("/list_all_invoice_items", async (req,res)=>{
const invoiceItems = await stripe.invoiceItems.list({
  limit: 3,
});
})

// Create Plan
app.post("/create/plans", async (req,res)=>{
  const { product_id, currency, interval, amount} = req.body;
  const plan = await stripe.plans.create({
  amount: amount,
  currency: currency,
  interval: interval,
  product: product_id,
});
})

// Retrive a plan
app.get("/retrive/plans/:plans_id",async (req,res)=>{
  const plans_id = req.params;
  const plan = await stripe.plans.retrieve(
  plans_id
);
})

// Update a Plan
app.post("/update/plans/:plans_id",async (req,res)=>{
  const plans_id = req.params;
  const plan = await stripe.plans.update(
  plans_id,
  {metadata: {order_id: '6735'}}
);
})

// Delete a Plan
app.delete("/delete/plans/:plans_id", async (req,res)=>{[]})
//Optimizing cards for future payments

// Billing History
app.post('billingHistory/:id', async (req,res) => {
  const balanceTransaction = await stripe.balanceTransactions.retrieve(
  'txn_1Nzn642eZvKYlo2CCvk5biuQ'
);
})

app.post('/retriveBalance', async (req,res)=>{
  const balance = await stripe.balance.retrieve();
} )


app.get('/getCompaniesCollectio',async (req,res) =>{
 try{
  const email = req.body.email
  const roles = req.body.roles
  const companyName = req.body.companyName
    const companiesRegistered = await payload.find({
  collection: "companies", // required
  depth: 2,
  page: 1,
  limit: 10,
  where: {}, // where email is x and company name is x
  sort: "-title",
  locale: "en",
});
 res.send(companiesRegistered)

 }
 catch(err){

 }
})

app.get('/getcompaniesRegistered',async (req,res) =>{
 try{
    const companiesRegistered = await payload.find({
  collection: "users", // required
  depth: 2,
  page: 1,
  limit: 10,
  where: {}, // where email is x and company name is x
  sort: "-title",
  locale: "en",
});
 res.send(companiesRegistered)

 }
 catch(err){

 }
})
var Details = [{}];


app.post('/login', async (req,res) =>{
  const {email,password} = req.body;
  const result = await payload.login({
  collection: "users", // required
  data: {
    // required
    email: email,
    password: password,
  }
});
  if(Details.length==0){
  Details.push(result);
  }
  else{
    Details.splice(0);
    Details.push(result);
  }
  
})


app.post('/me',async (req,res) => {
  res.send(Details)
})

app.post('/createaccount', async (req,res) => {
  console.log("increateacc")
  try{console.log(req.body.email)
  const email = req.body.email;
  const password = req.body.password;
  const companyName = req.body.companyName;
  const roles = req.body.roles;
  console.log(email, password, companyName, roles)
  const user = await payload.create({
  collection: "users", // required
  data: {
    // required
    email: email,
    password: password,
    companyName: companyName,
    roles: roles
  },
  locale: "en",
});
  console.log(user)
  res.send(user)}
  catch(err){
     console.log(err);
      res.status(500).send('error adding user') 
  }
})


const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    mongoURL: process.env.MONGODB_URI || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
    })
  })
}

start()

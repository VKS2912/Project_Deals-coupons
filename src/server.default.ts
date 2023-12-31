import dotenv from 'dotenv'
import path from 'path'

// This file is used to replace `server.ts` when ejecting i.e. `yarn eject`
// See `../eject.ts` for exact details on how this file is used
// See `./README.md#eject` for more information

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'

import { seed } from './payload/seed'

const app = express()
const PORT = process.env.PORT || 3000

// Redirect root to the admin panel
app.get('/', (_, res) => {
  console.log("inget")
  res.redirect('/admin')
})

app.post('/createaccount', async (req,res) => {
  console.log("increateacc")
  const { email, password, companyName, roles} = req.body;
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
  res.send(user)
})

app.post('/resetpassword', (req,res) => {
    
})

app.post('/forgotpassword', (req,res) => {
    
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

  app.listen(PORT, async () => {
    payload.logger.info(`App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
  })
}

start()

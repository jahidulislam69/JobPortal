import './config/instrument.js'
import express from 'express'
import * as Sentry from "@sentry/node"
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webHooks.js'


// initialize Express
const app = express()

//middleware
app.use(cors())
app.use(express.json())

// Connect to Database
await connectDB()

///routes

app.get('/',(req,res)=> res.send("Api Working"))
app.post('/webhook', clerkWebhooks)


// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Port 
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is runnig on ${PORT}`);    
})
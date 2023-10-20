require('dotenv').config()
const express = require('express');
const cors = require('cors')
const authRoute = require('./route/auth-router')
const notFoundMiddleware = require('./middlewares/not-founded')
const addressRoute = require('./route/address-router')
const productRoute = require('./route/Cart-router')
const orderRoute = require('./route/Order-router')

const app = express();


app.use(cors())
app.use(express.json())


app.use('/auth',authRoute)
app.use('/me',addressRoute)
app.use('/item',productRoute)
app.use('/payment',orderRoute)
app.use(notFoundMiddleware)




const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
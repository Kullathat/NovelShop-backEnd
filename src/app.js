require('dotenv').config()

const express = require('express');
const cors = require('cors')

const authRoute = require('./route/auth-router')
const notFoundMiddleware = require('./middlewares/not-founded')

const app = express();


app.use(cors())
app.use(express.json())

app.use('/auth',authRoute)
app.use(notFoundMiddleware)




const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
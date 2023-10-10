require('dotenv').config
const express = require('express');

const app = express()
app.use(express.json())
app.use(express.static('public'))


const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
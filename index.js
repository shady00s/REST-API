const express = require("express")
const productRoutes = require('./routes/productRoutes');
const app = express()
require('dotenv').config()
const mongoose = require("mongoose");
const e = require("express");
const bodyParser = require("body-parser");



app.use(express.json())
app.use('/', productRoutes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true }).then(() => console.log('connected To db'), app.listen(3000, () => console.log("started server")))



const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

var serviceAccount = require("../ecommerce-eed77-firebase-adminsdk-dikkn-01149939c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-eed77.firebaseio.com"
});

const categoryRoutes =  require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes =  require('./routes/productRoutes');


app.use('/category', categoryRoutes);
app.use('/subCategory', subCategoryRoutes);
app.use('/product', productRoutes);
app.use('/test', (req, res) => {

    res.send("Server is running....");
});

exports.api = functions.https.onRequest(app);
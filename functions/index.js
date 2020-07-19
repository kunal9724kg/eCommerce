const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({ origin: true }));

const serviceAccount = 
{
  //firebase credentials
}


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
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
  "type": "service_account",
  "project_id": "ecommerce-eed77",
  "private_key_id": "2e23e076ea79e61d69cbf7eb5147f1727060a801",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCc9/tB7rlA1pAc\nEQVR6ZVXf9PZMWg2O1kefkoscRK/NsZYIIdZTqWgr1W0hOAVk5rlCdeZfberdjHN\ni+wr3RJ7SMY2xMMjpg8Cvh2EWFFobOnyARlRrCqNePuUix58hq7D2tP1EImen3Bo\nJYs1eR8d36COpFP6u8dCWbrN27c6VrSAwkBLZktIVE00zGNGoWhJ22dinBEX1cYc\nCjpoeIP/MmnvkUNRJJWzzEhdj/QX5/G87eBmK8esELo9on4CqWAFzVEVVwdqBxwM\nWvo7XoEvCQtAyBuToRnBCKsAWffTKulOaVAnPnymOa+LVdQIjQaT9x/g9oIg2Ard\nePoExLxpAgMBAAECggEAJyMrih5wIUr+Rok15t0TR+xO0X4gqjj0+QXrD5an4nZR\nUQLXTHywDlb5SxfAWZDik433LEWsyHshYssq+SrXY1bbWSeJMjfC0V++s1NkBOH3\nGMiOXA9N0tViAQEI+mqIY7wJkjZr4dmGKOmHgq8vA39RJI+zgrZUMeZ2jcJlNo2o\nn+djNv8uUTk9P4hQgTZUpYS0/sPdP+XhAysNrw3J4Iq7Kzg1J8TZBN5zLR77+5ed\nZUFX0Bl/cwx35Jw/mnH+x8f1nn8rL13BhzAH+Q0+awQShFw1S9eYnCv71tQWs3ks\n54E+l0OArDbievluaWd538IJwlxdV5jXZv//1NLYcwKBgQDXLeoAZ47pNZvMFgKK\nTOSLVM/8BD5JfOOr0/HV0+1ed//e9YDaqWQ0wTtYfb6ienxqmPvSl8tj5b37LdgM\n188NcCGbElVLakD9dcn/S/7l4VEJbBh+sJTAdZ5C5oJiIMSbh5fSrANSedlmtPkh\nE1VqbE4Kc9WoTnJRwI4mHy5LIwKBgQC6vxfGl9woD6w03+DWc+qQlb06Kwl0OzqH\n3mRIwTOcTpulklZmuokiPxURgGPQxYpoLWuKGxdJ5Iud8vhJeRkcW7Va90ygLLjo\nB7WlNsdF4p9A385FGS2SEO5HsJBRI421DEodFa3EUkfRbcP1mSt+zscFtNkaPlZa\nq1wJhL3pAwKBgAq3frAGeFelE91WO0ooCjnmP3WNwIxoa+5i3+iGZYwO7e9syr4Z\nMaRu+0Ws/ZGaCBhHBkO2y6puBsg7wEbjeKxyqTnP7++RmysEcssEPe21CxQtDgtB\nQCdVtEwgrt20RBZ66lTTvFafOvSijsXW8KocOsbKfhmjzo3DyVCcvPGBAoGAJcaL\n/68uaKgq9JMo/xh5pX+0xHR6OBnXEC7raFA0qXS5RXfhpGwtW1EZaO3oww2Cnuo5\nK7mpL1hc6bmBghNOAg+HEvydcnU5fi45D0+SZc+e2VeseQvLzRVBrhzIRLGFc88l\nmtaMzP676mBi2GaAhuk7FytrE0Ty4Opy9rX0WJMCgYEAuIMi7zSa2av+WUkERhRX\nfd9TNfDamSl646Z1FElm5uCCwDydkBvLij1P0fLspHy6zaZmItSQ/Jx+bxhJSHbA\n6i11QVWiTTKvAe/M3+EkHHwBTqNLvp2R3QzXwBBkQWZ+xMvCzb19dwX3qa0b8/jd\nmChPzDoDrl+nuF8U6/+iSoo=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-dikkn@ecommerce-eed77.iam.gserviceaccount.com",
  "client_id": "105612556288277050055",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dikkn%40ecommerce-eed77.iam.gserviceaccount.com"
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
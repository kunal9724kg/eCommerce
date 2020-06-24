const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.use('/test', (req, res) => {

    res.send("Server is running....");
});

exports.api = functions.https.onRequest(app);
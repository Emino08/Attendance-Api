const functions = require("firebase-functions");

const express = require("express");
const app = express();

app.get("/",(req, res) => {
  res.send("Hello World");
});


// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app)
     
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NfDcrSJoDbqUVUvKUWnvfQSNPj280bvxBPuXxLzaYsWnyE9Y2WoTbeDZGcse9hsHFVyGVjqbtQKvtrZN7m8rEyL00uKxcfLJs"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

exports.api = functions.https.onRequest(app);

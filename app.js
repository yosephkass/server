require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.SKEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => response.send("hello world"));

// Create a PaymentIntent with the order amount and currency

app.post("/payments/create", async (request, response) => {
  try {
    const total = request.query.total;
    console.log("Payment Request Recieved for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send("server error");
  }
});

app.listen(8990, "0.0.0.0", () => {
  console.log("Server is running on port 8990");
});

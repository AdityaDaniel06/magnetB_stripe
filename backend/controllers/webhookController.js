const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ordersModel = require("../models/ordersModel");

// for upadting order status
const webhookCheckout = async (req, res) => {
  const signature = req.headers["stripe-signature"]; // getting stripe signature as stream
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook err", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`); // send err to stripe
  }
  // console.log("event", JSON.stringify(event));

  const session = event.data?.object;
  // console.log("session", session);

  let paymentStatus;
  console.log("EVENt TYpe", event.type);
  if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
    paymentStatus = "succeeded";
  } if (event.type === "payment_intent.payment_failed" || event.type === "invoice.payment_failed") {
    paymentStatus = "failed";
  }

  try {
    const updateOrder = await ordersModel.findOneAndUpdate(
      { transaction_id: session.id },
      {
        payment_status: paymentStatus,
      },
      { new: true }
    );
  } catch (err) {
    console.error("Error updating order:", err);
  }

  // try {
  //   // Get the payment intent status
  //   const paymentIntent = await stripe.paymentIntents.retrieve(
  //     session.payment_intent
  //   );
  //   const paymentStatus = paymentIntent.status; // succeeded or failed
  //   // console.log("Payment status:", paymentStatus);
  // } catch (err) {
  //   console.error("Error saving order:", err);
  // }

  res.status(200).send("Webhook received!");
};

module.exports = { webhookCheckout };

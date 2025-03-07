const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const orderModel = require("../models/ordersModel");

const createPaymentSession = async (req, res) => {
  const { userData, productCart } = req.body;
  const origin = req.headers.origin;
  //   console.log("Origin", origin);
  //   console.log("userData", userData);
  //   console.log("productCart", productCart);

  const lineItems = productCart.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        // description: "Sample Product",
        images: [item.thumbnail],
      },
      unit_amount: Math.round(item.price * 100),
    },
  }));
  //   console.log("lineItems", lineItems);

  // creating a session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${origin}/payment_success`,
      cancel_url: `${origin}/payment_cancel`,
      customer_email: userData.email,
      line_items: lineItems,
      mode: "payment",
    });

    // Saving the order in database
    const order = new orderModel({
      customer_email: userData.email,
      payment_status: "pending", // Saving status as pending, will update using webhook
      purchased_items: productCart.map((item) => ({
        product_name: item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.thumbnail,
      })),
      transaction_id: session.id, // find and update status
    });
    await order.save();
    console.log("Order Saved");

    // console.log("session", session);
    // console.log("SessionID", session.id);
    //session res back to client
    res.status(200).json({ session });
    // res.redirect(session.url);
  } catch (err) {
    console.error("Error creating payment session: ", err);
    res.status(500).json({ message: "Error creating payment session", err });
  }
};

module.exports = {
  createPaymentSession,
};

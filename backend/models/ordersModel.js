const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_email: {
    type: String,
    required: true,
  },
  purchased_items: [
    {
      product_name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  transaction_id: {
    type: String,
    // required: true,
  },
  payment_status: {
    type: String,
    default: "pending",
    // required: true,
  },
});

module.exports = mongoose.model("order", orderSchema);

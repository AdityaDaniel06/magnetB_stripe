const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.post("/create-checkout-session", ordersController.createPaymentSession);

module.exports = router;

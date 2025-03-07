const express = require("express");
const router = express.Router();

const webhookController = require("../controllers/webhookController");

router.post("/update-payment-status", webhookController.webhookCheckout);

module.exports = router;

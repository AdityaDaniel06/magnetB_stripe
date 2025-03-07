const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// raw body parser for stripe signature verification
const webHookRoute = require("./routes/webHookRoute");
app.use("/webhook", express.raw({ type: "application/json" }), webHookRoute);

// BODY-PARSER, reading data from body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const port = process.env.PORT || 3000;
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("MongoDB Connect");
});

// Import routes
const productRoutes = require("./routes/ordersRoute");
app.use("/api/v1/products", productRoutes);

app.listen(port, () => {
  console.log("Server running on port 8000");
});

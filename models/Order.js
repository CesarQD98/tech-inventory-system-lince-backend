const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    deliveryTime: String,
    deliveryLoc: String,
    proveedor: String,
    procedencia: String,
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;

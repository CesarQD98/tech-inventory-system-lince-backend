const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: String,
    codigo: String,
    marca: String,
  },
  { timestamps: true }
);

const Item = model("Item", itemSchema);

module.exports = Item;

const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: String,
    codigo: String,
    marca: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryTime: String,
    deliveryLoc: String,
    proveedor: String,
    procedencia: {
      type: String,
      enum: ["C", "A", "ND", "N", "E", "O"],
      default: "O",
    },
  },
  { timestamps: true }
);

itemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Item = model("Item", itemSchema);

module.exports = Item;

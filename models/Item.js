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
  },
  { timestamps: true }
);

itemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    // delete returnedObject.createdBy.id;
  },
});

const Item = model("Item", itemSchema);

module.exports = Item;

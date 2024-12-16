const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  checked: { type: Boolean, default: false },
});

const listSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    host: { type: String, required: true },
    guests: { type: [String], default: [] },
    items: { type: [itemSchema], default: [] },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);

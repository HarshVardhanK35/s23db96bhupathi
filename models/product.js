const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  product_type: String,
  size: String,
  cost: Number,
});

module.exports = mongoose.model("Product", productSchema);
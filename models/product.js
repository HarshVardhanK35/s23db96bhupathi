// const mongoose = require("mongoose");
// const productSchema = mongoose.Schema({
//   product_name: String,
//   feature: String,
//   cost: Number,
// });

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product_name: String,
  feature: String,
  cost: {
    type: Number,
    required: true,
    min: 0,
    max: 10000
  },
});

module.exports = mongoose.model("Product", productSchema);
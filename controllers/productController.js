var Product = require("../models/product");

// List of all products
exports.product_list = async function (req, res) {
  try {
    theProducts = await Product.find();
    res.send(theProducts);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.product_view_all_Page = async function (req, res) {
  try {
    theProducts = await Product.find();
    // console.log(theProducts); // Add this line for debugging
    res.render("products", {
      title: "Product Search Results",
      results: theProducts,
    });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific product.
exports.product_detail = async function (req, res) {
  console.log("detail" + req.params.id);
  try {
    result = await Product.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

// Handle product create on POST.
exports.product_create_post = async function (req, res) {
  console.log(req.body);
  let document = new Product();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"product_type":"goat", "cost":12, "size":"large"}
  document.product_type = req.body.product_type;
  document.cost = req.body.cost;
  document.size = req.body.size;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle product delete form on DELETE.
exports.product_delete = async function (req, res) {
  console.log("delete " + req.params.id);
  try {
    result = await Product.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": Error deleting ${err}}`);
  }
};

// Handle product update form on PUT.
exports.product_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Product.findById(req.params.id);
    // Do updates of properties
    if (req.body.product_type) toUpdate.product_type = req.body.product_type;
    if (req.body.cost) toUpdate.cost = req.body.cost;
    if (req.body.size) toUpdate.size = req.body.size;
    let result = await toUpdate.save();
    console.log("Success " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
  }
};

// Handle a show one view with id specified by query
exports.product_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id);
  try {
    result = await Product.findById(req.query.id);
    res.render("productdetail", { title: "Product Detail", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

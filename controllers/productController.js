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
  document.product_name = req.body.product_name;
  document.feature = req.body.feature;
  document.cost = req.body.cost;
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
    if (req.body.product_name) toUpdate.product_name = req.body.product_name;
    if (req.body.cost) toUpdate.cost = req.body.cost;
    if (req.body.feature) toUpdate.feature = req.body.feature;
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

// Handle building the view for creating a product.
// No body, no in path parameter, no query.
// Does not need to be async
exports.product_create_Page = function (req, res) {
  console.log("create view");
  try {
    res.render("productcreate", { title: "Product Create" });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a product.
// query provides the id
exports.product_update_Page = async function (req, res) {
  console.log("update view for item " + req.query.id);
  try {
    let result = await Product.findById(req.query.id);
    res.render("productupdate", { title: "Product Update", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle a delete one view with id from query
exports.product_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id);
  try {
    result = await Product.findById(req.query.id);
    res.render("productdelete", { title: "Product Delete", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

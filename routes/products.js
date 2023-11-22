var express = require("express");
const product_controllers = require("../controllers/productController");
var passport = require("passport");
var router = express.Router();

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect("/login");
};

// GET products
router.get("/", secured, product_controllers.product_view_all_Page);

// GET request for one product.
router.get("/products/:id", secured, product_controllers.product_detail);

/* GET detail product page */
router.get("/detail", secured, product_controllers.product_view_one_Page);

/* GET create product page */
router.get("/create", secured, product_controllers.product_create_Page);

/* GET create update page */
router.get("/update", secured, product_controllers.product_update_Page);

/* GET delete product page */
router.get("/delete", secured, product_controllers.product_delete_Page);

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.redirect("/");
});

module.exports = router;
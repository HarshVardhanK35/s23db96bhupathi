var express = require("express");
const product_controllers = require("../controllers/productController");
var router = express.Router();

// GET products
router.get("/", product_controllers.product_view_all_Page);

// GET request for one product.
router.get('/product/:id', product_controllers.product_detail);

/* GET detail costume page */
router.get('/detail/', product_controllers.product_view_one_Page);

module.exports = router;
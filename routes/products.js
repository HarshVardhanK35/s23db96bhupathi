var express = require("express");
const product_controllers = require("../controllers/productController");
var router = express.Router();

// GET products
router.get("/", product_controllers.product_view_all_Page);

// GET request for one product.
router.get('/product/:id', product_controllers.product_detail);

/* GET detail product page */
router.get('/detail', product_controllers.product_view_one_Page);

/* GET create product page */
router.get('/create', product_controllers.product_create_Page);

/* GET create update page */
router.get('/update', product_controllers.product_update_Page);

/* GET delete product page */
router.get('/delete', product_controllers.product_delete_Page);

module.exports = router;
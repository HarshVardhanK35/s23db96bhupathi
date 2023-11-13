var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/apiController');
var product_controller = require('../controllers/productController');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);

/// product ROUTES ///
// POST request for creating a product.
router.post('/products', product_controller.product_create_post);

// DELETE request to delete product.
router.delete('/products/:id', product_controller.product_delete);

// PUT request to update product.
router.put('/products/:id', product_controller.product_update_put);

// GET request for one product.
router.get('/products/:id', product_controller.product_detail);

// GET request for list of all product items.
router.get('/products', product_controller.product_list);

module.exports = router;
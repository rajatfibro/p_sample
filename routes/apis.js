var express = require('express');
var router = express.Router();

var apiController = require('../controllers/api')

/* GET All products */

// http://localhost:3004/api/v1/fetchAllproducts

router.get('/fetchAllproducts',apiController.fetchAllproducts);


/* GET All products */
router.post('/addproductToCart',apiController.AddproductToCart);


// /* GET All products */
// http://localhost:3004/api/v1/fetchCartByUser
router.get('/fetchCartByUser',apiController.fetchCartByUser);

module.exports = router;

const express = require('express');

const adminControllers = require('../controller/admin');

const router = express.Router();

router.get('/products', adminControllers.getProducts);

router.get('/product/:productId', adminControllers.getProduct);

router.post('/product', adminControllers.postProduct);

router.put('/editProduct', adminControllers.putEditProduct);

module.exports = router;
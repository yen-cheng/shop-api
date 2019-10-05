const express = require('express');

const adminControllers = require('../controller/admin');

const router = express.Router();

router.get('/products', adminControllers.getProducts);

router.post('/product', adminControllers.postProduct);

module.exports = router;
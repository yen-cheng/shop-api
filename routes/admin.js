const express = require('express');

const adminProductControllers = require('../controller/admin/product');
const adminTodolistControllers = require('../controller/admin/todolist');

const router = express.Router();

router.get('/products', adminProductControllers.getProducts);
router.get('/product/:productId', adminProductControllers.getProduct);
router.post('/product', adminProductControllers.postProduct);
router.put('/product/:productId', adminProductControllers.editProduct);

router.get('/todolists',adminTodolistControllers.getTodoLists);
router.post('/todolist',adminTodolistControllers.postTodoList);
router.delete('/todolist/:id',adminTodolistControllers.deleteTodoList);

module.exports = router;
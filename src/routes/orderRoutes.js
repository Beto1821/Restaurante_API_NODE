const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder} = require('../controllers/orderController');


router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:numeroPedido', getOrderById);
router.put('/:numeroPedido', updateOrder);
router.delete('/:numeroPedido', deleteOrder);


module.exports = router;

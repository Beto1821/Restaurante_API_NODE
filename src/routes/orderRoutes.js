const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const { validateOrderCreation, validateOrderUpdate } = require('../middlewares/validationMiddleware');
const protect = require('../middlewares/authMiddleware');

// Protege todas as rotas abaixo
router.use(protect);

router.post('/', validateOrderCreation, createOrder);
router.get('/', getAllOrders);
router.get('/:numeroPedido', getOrderById);
router.put('/:numeroPedido', validateOrderUpdate, updateOrder);
router.delete('/:numeroPedido', deleteOrder);


module.exports = router;

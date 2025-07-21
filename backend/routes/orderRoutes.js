const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} = require('../controllers/orderController');

// POST /api/orders - Create new order
router.post('/', createOrder);

// GET /api/orders - Get all orders with optional filters and pagination
router.get('/', getAllOrders);

// GET /api/orders/stats - Get order statistics
router.get('/stats', getOrderStats);

// GET /api/orders/:id - Get order by ID
router.get('/:id', getOrderById);

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', updateOrderStatus);

// DELETE /api/orders/:id - Delete order
router.delete('/:id', deleteOrder);

module.exports = router;

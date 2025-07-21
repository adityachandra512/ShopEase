const Order = require('../models/Order');

// In-memory storage for orders (in production, use a database)
let orders = [];

// Create new order
const createOrder = (req, res) => {
  try {
    const { items, customerInfo, paymentMethod } = req.body;
    
    // Calculate total amount
    const totalAmount = Order.calculateTotal(items);
    
    // Validate order data
    const validationErrors = Order.validate({ items, customerInfo, paymentMethod, totalAmount });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        messages: validationErrors 
      });
    }

    const newOrder = new Order({ items, customerInfo, paymentMethod, totalAmount });
    orders.push(newOrder);
    
    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', message: error.message });
  }
};

// Get all orders
const getAllOrders = (req, res) => {
  try {
    const { status, customerEmail, page = 1, limit = 10 } = req.query;
    
    let filteredOrders = [...orders];

    // Filter by status
    if (status) {
      filteredOrders = filteredOrders.filter(order => 
        order.Status.toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by customer email
    if (customerEmail) {
      filteredOrders = filteredOrders.filter(order => 
        order.CustomerInfo.email.toLowerCase().includes(customerEmail.toLowerCase())
      );
    }

    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    res.json({
      orders: paginatedOrders,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredOrders.length / limitNum),
        totalOrders: filteredOrders.length,
        hasNext: endIndex < filteredOrders.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
  }
};

// Get order by ID
const getOrderById = (req, res) => {
  try {
    const { id } = req.params;
    const order = orders.find(o => o.ID === id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order', message: error.message });
  }
};

// Update order status
const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = orders.find(o => o.ID === id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const updated = order.updateStatus(status);
    if (!updated) {
      return res.status(400).json({ 
        error: 'Invalid status', 
        message: 'Valid statuses are: Pending, Processing, Shipped, Delivered, Cancelled' 
      });
    }
    
    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status', message: error.message });
  }
};

// Delete order
const deleteOrder = (req, res) => {
  try {
    const { id } = req.params;
    const orderIndex = orders.findIndex(o => o.ID === id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const deletedOrder = orders.splice(orderIndex, 1)[0];
    res.json({ 
      message: 'Order deleted successfully', 
      order: deletedOrder 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order', message: error.message });
  }
};

// Get order statistics
const getOrderStats = (req, res) => {
  try {
    const stats = {
      totalOrders: orders.length,
      ordersByStatus: {},
      totalRevenue: 0,
      averageOrderValue: 0
    };

    // Calculate statistics
    orders.forEach(order => {
      // Count by status
      stats.ordersByStatus[order.Status] = (stats.ordersByStatus[order.Status] || 0) + 1;
      
      // Calculate revenue
      stats.totalRevenue += order.TotalAmount;
    });

    // Calculate average order value
    if (orders.length > 0) {
      stats.averageOrderValue = stats.totalRevenue / orders.length;
    }

    // Round values
    stats.totalRevenue = parseFloat(stats.totalRevenue.toFixed(2));
    stats.averageOrderValue = parseFloat(stats.averageOrderValue.toFixed(2));

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order statistics', message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
};

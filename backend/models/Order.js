const { v4: uuidv4 } = require('uuid');

class Order {
  constructor({ items, customerInfo, paymentMethod, totalAmount }) {
    this.ID = uuidv4();
    this.Items = items; // Array of { productId, productName, quantity, price }
    this.CustomerInfo = customerInfo; // { name, email, phone, address }
    this.PaymentMethod = paymentMethod; // 'Credit Card', 'Debit Card', 'Net Banking'
    this.TotalAmount = parseFloat(totalAmount);
    this.Status = 'Pending'; // Pending, Processing, Shipped, Delivered, Cancelled
    this.CreatedAt = new Date().toISOString();
    this.UpdatedAt = new Date().toISOString();
  }

  // Update order status
  updateStatus(newStatus) {
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (validStatuses.includes(newStatus)) {
      this.Status = newStatus;
      this.UpdatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  // Calculate total amount from items
  static calculateTotal(items) {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  // Validate order data
  static validate({ items, customerInfo, paymentMethod, totalAmount }) {
    const errors = [];

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      errors.push('Order must contain at least one item');
    } else {
      items.forEach((item, index) => {
        if (!item.productId) {
          errors.push(`Item ${index + 1}: Product ID is required`);
        }
        if (!item.productName) {
          errors.push(`Item ${index + 1}: Product name is required`);
        }
        if (!item.quantity || item.quantity <= 0) {
          errors.push(`Item ${index + 1}: Valid quantity is required`);
        }
        if (item.price === undefined || item.price < 0) {
          errors.push(`Item ${index + 1}: Valid price is required`);
        }
      });
    }

    // Validate customer info
    if (!customerInfo) {
      errors.push('Customer information is required');
    } else {
      if (!customerInfo.name || customerInfo.name.trim().length === 0) {
        errors.push('Customer name is required');
      }
      if (!customerInfo.email || !/\S+@\S+\.\S+/.test(customerInfo.email)) {
        errors.push('Valid customer email is required');
      }
      if (!customerInfo.phone || customerInfo.phone.trim().length === 0) {
        errors.push('Customer phone is required');
      }
      if (!customerInfo.address || customerInfo.address.trim().length === 0) {
        errors.push('Customer address is required');
      }
    }

    // Validate payment method
    const validPaymentMethods = ['Credit Card', 'Debit Card', 'Net Banking'];
    if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
      errors.push('Valid payment method is required');
    }

    // Validate total amount
    if (totalAmount === undefined || totalAmount <= 0) {
      errors.push('Valid total amount is required');
    }

    return errors;
  }
}

module.exports = Order;

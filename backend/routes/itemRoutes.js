const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  checkStock,
  getCategories,
  getBrands,
  getTags,
  getFeaturedProducts,
  getProductsOnSale,
  getBestSellingProducts,
  getRelatedProducts,
  addProductReview
} = require('../controllers/itemController');

// GET /api/items - Get all products with optional filters
router.get('/', getAllProducts);

// GET /api/items/categories - Get all product categories
router.get('/categories', getCategories);

// GET /api/items/brands - Get all product brands
router.get('/brands', getBrands);

// GET /api/items/tags - Get all product tags
router.get('/tags', getTags);

// GET /api/items/featured - Get featured products
router.get('/featured', getFeaturedProducts);

// GET /api/items/sale - Get products on sale
router.get('/sale', getProductsOnSale);

// GET /api/items/bestsellers - Get best selling products
router.get('/bestsellers', getBestSellingProducts);

// POST /api/items - Create new product
router.post('/', createProduct);

// GET /api/items/:id - Get product by ID
router.get('/:id', getProductById);

// GET /api/items/:id/related - Get related products
router.get('/:id/related', getRelatedProducts);

// GET /api/items/:id/stock - Check stock availability
router.get('/:id/stock', checkStock);

// PUT /api/items/:id - Update product
router.put('/:id', updateProduct);

// POST /api/items/:id/review - Add product review
router.post('/:id/review', addProductReview);

// DELETE /api/items/:id - Delete product
router.delete('/:id', deleteProduct);

module.exports = router;

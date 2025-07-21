const Product = require('../models/Product');

// In-memory storage for products (in production, use a database)
let products = [];

// Initialize with sample products
const initializeSampleProducts = () => {
  const sampleProducts = [
    {
      name: "Wireless Bluetooth Headphones",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      price: 79.99,
      stock: 25,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "SoundMax",
      features: ["Noise Cancellation", "30-hour Battery", "Touch Controls", "Voice Assistant Support"],
      ratings: { average: 4.7, count: 125 },
      discount: 10,
      tags: ["bluetooth", "wireless", "headphones", "audio"],
      featured: true
    },
    {
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and eco-friendly cotton t-shirt available in multiple colors.",
      price: 24.99,
      stock: 50,
      category: "Clothing",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "EcoWear",
      features: ["100% Organic", "Eco-friendly", "Multiple Colors", "Sustainable Production"],
      ratings: { average: 4.5, count: 89 },
      discount: 0,
      tags: ["organic", "t-shirt", "cotton", "eco-friendly", "sustainable"],
      featured: false
    },
    {
      name: "Stainless Steel Water Bottle",
      description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
      price: 19.99,
      stock: 40,
      category: "Home & Kitchen",
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "HydroKeep",
      features: ["24hr Cold / 12hr Hot", "BPA-Free", "Leak-proof", "Vacuum Insulated"],
      ratings: { average: 4.8, count: 203 },
      discount: 15,
      tags: ["water bottle", "insulated", "stainless steel", "hydration"],
      featured: true
    },
    {
      name: "Yoga Mat Premium",
      description: "Non-slip, eco-friendly yoga mat perfect for all types of workouts.",
      price: 49.99,
      stock: 30,
      category: "Sports & Fitness",
      imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "ZenFlex",
      features: ["Non-slip Surface", "6mm Thickness", "Eco-friendly Materials", "Includes Carry Strap"],
      ratings: { average: 4.6, count: 158 },
      discount: 0,
      tags: ["yoga", "fitness", "exercise", "mat", "eco-friendly"],
      featured: false
    },
    {
      name: "Coffee Maker Deluxe",
      description: "Programmable coffee maker with built-in grinder and thermal carafe.",
      price: 129.99,
      stock: 15,
      category: "Home & Kitchen",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1525088068592-2f4f0cce2a94?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "BrewMaster",
      features: ["Built-in Grinder", "Programmable Timer", "Thermal Carafe", "10 Cup Capacity"],
      ratings: { average: 4.4, count: 87 },
      discount: 20,
      tags: ["coffee", "appliance", "grinder", "thermal", "kitchen"],
      featured: true
    },
    {
      name: "Smartphone Case",
      description: "Protective case with drop protection and wireless charging compatibility.",
      price: 15.99,
      stock: 75,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1522125123931-9304a1449f98?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "TechArmor",
      features: ["10-foot Drop Protection", "Wireless Charging Compatible", "Anti-Microbial Coating", "Slim Design"],
      ratings: { average: 4.3, count: 312 },
      discount: 0,
      tags: ["phone", "case", "smartphone", "protective", "accessories"],
      featured: false
    },
    {
      name: "Running Shoes",
      description: "Lightweight running shoes with advanced cushioning technology.",
      price: 89.99,
      stock: 35,
      category: "Sports & Fitness",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "StrideFlex",
      features: ["Advanced Cushioning", "Breathable Mesh", "Ergonomic Design", "Anti-slip Sole"],
      ratings: { average: 4.6, count: 179 },
      discount: 10,
      tags: ["shoes", "running", "fitness", "footwear", "athletic"],
      featured: true
    },
    {
      name: "Desk Lamp LED",
      description: "Adjustable LED desk lamp with USB charging port and touch controls.",
      price: 39.99,
      stock: 20,
      category: "Home & Kitchen",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "LightTech",
      features: ["USB Charging Port", "Touch Controls", "Adjustable Brightness", "Flexible Arm"],
      ratings: { average: 4.2, count: 68 },
      discount: 0,
      tags: ["lamp", "lighting", "desk", "led", "usb"],
      featured: false
    },
    {
      name: "Backpack Travel",
      description: "Durable travel backpack with multiple compartments and laptop sleeve.",
      price: 69.99,
      stock: 28,
      category: "Travel",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "TrekGear",
      features: ["Laptop Compartment", "Water-resistant", "Multiple Pockets", "Ergonomic Design"],
      ratings: { average: 4.7, count: 153 },
      discount: 15,
      tags: ["backpack", "travel", "laptop", "bag", "luggage"],
      featured: true
    },
    {
      name: "Protein Powder",
      description: "High-quality whey protein powder with various flavors available.",
      price: 34.99,
      stock: 45,
      category: "Health & Nutrition",
      imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1579722820025-35a4420f29f1?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "PureFuel",
      features: ["25g Protein Per Serving", "Low Sugar", "Multiple Flavors", "Easy Mixing"],
      ratings: { average: 4.4, count: 208 },
      discount: 5,
      tags: ["protein", "fitness", "supplement", "nutrition", "workout"],
      featured: false
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable bluetooth speaker with 360-degree sound and waterproof design.",
      price: 59.99,
      stock: 32,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "SoundWave",
      features: ["Waterproof IPX7", "20-hour Battery", "360° Sound", "Built-in Microphone"],
      ratings: { average: 4.5, count: 176 },
      discount: 10,
      tags: ["speaker", "bluetooth", "wireless", "audio", "portable", "waterproof"],
      featured: true
    },
    {
      name: "Kitchen Knife Set",
      description: "Professional-grade kitchen knife set with wooden block storage.",
      price: 99.99,
      stock: 18,
      category: "Home & Kitchen",
      imageUrl: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1566454825481-9c31a3a35237?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "ChefPro",
      features: ["High-Carbon Steel", "Ergonomic Handles", "8-piece Set", "Wooden Storage Block"],
      ratings: { average: 4.8, count: 92 },
      discount: 0,
      tags: ["kitchen", "knives", "cooking", "culinary", "chef"],
      featured: false
    },
    {
      name: "Smart Watch Fitness Tracker",
      description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone notifications.",
      price: 129.99,
      stock: 40,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&auto=format&fit=crop&q=60",
      images: [
        "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60"
      ],
      brand: "FitTech",
      features: ["Heart Rate Monitor", "GPS Tracking", "Sleep Analysis", "Water Resistant", "7-Day Battery"],
      ratings: { average: 4.6, count: 243 },
      discount: 20,
      tags: ["smartwatch", "fitness", "tracker", "wearable", "tech", "health"],
      featured: true
    }
  ];

  products = sampleProducts.map(productData => new Product(productData));
};

// Initialize sample data
initializeSampleProducts();

// Get all products
const getAllProducts = (req, res) => {
  try {
    const { 
      category,
      search,
      minPrice,
      maxPrice,
      inStock,
      sort,
      brand,
      discount,
      rating,
      featured,
      tag,
      limit,
      page
    } = req.query;
    
    let filteredProducts = [...products];

    // Filter by category
    if (category) {
      const categories = category.split(',');
      filteredProducts = filteredProducts.filter(product => 
        categories.some(cat => 
          product.Category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Filter by search query (name, description, category, tags)
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.Name.toLowerCase().includes(searchLower) ||
        product.Description.toLowerCase().includes(searchLower) ||
        product.Category.toLowerCase().includes(searchLower) ||
        product.Brand.toLowerCase().includes(searchLower) ||
        product.Tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.SalePrice !== null 
          ? product.SalePrice >= parseFloat(minPrice)
          : product.Price >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.SalePrice !== null 
          ? product.SalePrice <= parseFloat(maxPrice)
          : product.Price <= parseFloat(maxPrice)
      );
    }

    // Filter by stock availability
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(product => product.Stock > 0);
    }
    
    // Filter by brand
    if (brand) {
      const brands = brand.split(',');
      filteredProducts = filteredProducts.filter(product => 
        brands.some(b => 
          product.Brand.toLowerCase().includes(b.toLowerCase())
        )
      );
    }
    
    // Filter by discount (on sale)
    if (discount === 'true') {
      filteredProducts = filteredProducts.filter(product => product.Discount > 0);
    } else if (discount === 'false') {
      filteredProducts = filteredProducts.filter(product => product.Discount === 0);
    } else if (discount) {
      // Filter by minimum discount percentage
      filteredProducts = filteredProducts.filter(product => 
        product.Discount >= parseFloat(discount)
      );
    }
    
    // Filter by minimum rating
    if (rating) {
      filteredProducts = filteredProducts.filter(product => 
        product.Ratings.average >= parseFloat(rating)
      );
    }
    
    // Filter featured products
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.Featured);
    }
    
    // Filter by tag
    if (tag) {
      const tags = tag.split(',');
      filteredProducts = filteredProducts.filter(product => 
        tags.some(t => 
          product.Tags.some(productTag => productTag.toLowerCase().includes(t.toLowerCase()))
        )
      );
    }
    
    // Sort products
    if (sort) {
      switch(sort) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.getFinalPrice() - b.getFinalPrice());
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.getFinalPrice() - a.getFinalPrice());
          break;
        case 'name_asc':
          filteredProducts.sort((a, b) => a.Name.localeCompare(b.Name));
          break;
        case 'name_desc':
          filteredProducts.sort((a, b) => b.Name.localeCompare(a.Name));
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.Ratings.average - a.Ratings.average);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
          break;
        case 'popularity':
          filteredProducts.sort((a, b) => b.Ratings.count - a.Ratings.count);
          break;
        case 'discount':
          filteredProducts.sort((a, b) => b.Discount - a.Discount);
          break;
        default:
          // Default sort by ID
          break;
      }
    }
    
    // Get total count before pagination
    const totalProducts = filteredProducts.length;
    
    // Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || totalProducts;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Return products with pagination metadata
    res.json({
      products: paginatedProducts,
      pagination: {
        total: totalProducts,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalProducts / pageSize)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', message: error.message });
  }
};

// Get product by ID
const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.ID === id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product', message: error.message });
  }
};

// Create new product
const createProduct = (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;
    
    // Validate input
    const validationErrors = Product.validate({ name, description, price, stock, category });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        messages: validationErrors 
      });
    }

    const newProduct = new Product({ name, description, price, stock, category, imageUrl });
    products.push(newProduct);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', message: error.message });
  }
};

// Update product
const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;
    
    const productIndex = products.findIndex(p => p.ID === id);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Validate input
    const validationErrors = Product.validate({ name, description, price, stock, category });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        messages: validationErrors 
      });
    }

    products[productIndex].update({ name, description, price, stock, category, imageUrl });
    
    res.json(products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', message: error.message });
  }
};

// Delete product
const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.ID === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', message: error.message });
  }
};

// Check stock availability
const checkStock = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity = 1 } = req.query;
    
    const product = products.find(p => p.ID === id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const available = product.isInStock(parseInt(quantity));
    res.json({ 
      productId: id,
      productName: product.Name,
      requestedQuantity: parseInt(quantity),
      currentStock: product.Stock,
      available 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check stock', message: error.message });
  }
};

// Get product categories
const getCategories = (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.Category))].sort();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', message: error.message });
  }
};

// Get product brands
const getBrands = (req, res) => {
  try {
    const brands = [...new Set(products.map(p => p.Brand).filter(brand => brand))].sort();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brands', message: error.message });
  }
};

// Get product tags
const getTags = (req, res) => {
  try {
    const allTags = products.flatMap(p => p.Tags || []);
    const uniqueTags = [...new Set(allTags)].sort();
    res.json(uniqueTags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags', message: error.message });
  }
};

// Get featured products
const getFeaturedProducts = (req, res) => {
  try {
    const featuredProducts = products.filter(p => p.Featured).slice(0, 6);
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products', message: error.message });
  }
};

// Get products on sale
const getProductsOnSale = (req, res) => {
  try {
    const saleProducts = products
      .filter(p => p.Discount > 0)
      .sort((a, b) => b.Discount - a.Discount)
      .slice(0, 6);
    res.json(saleProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sale products', message: error.message });
  }
};

// Get best selling products
const getBestSellingProducts = (req, res) => {
  try {
    const bestSellers = products
      .sort((a, b) => b.Ratings.count - a.Ratings.count)
      .slice(0, 6);
    res.json(bestSellers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch best selling products', message: error.message });
  }
};

// Get related products based on category and tags
const getRelatedProducts = (req, res) => {
  try {
    const { id } = req.params;
    const currentProduct = products.find(p => p.ID === id);
    
    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Find products in the same category or with similar tags
    const relatedProducts = products
      .filter(p => p.ID !== id) // Exclude the current product
      .filter(p => 
        p.Category === currentProduct.Category || 
        p.Tags.some(tag => currentProduct.Tags.includes(tag))
      )
      .slice(0, 4);
    
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch related products', message: error.message });
  }
};

// Add a product review (rating)
const addProductReview = (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Invalid rating', 
        message: 'Rating must be between 1 and 5' 
      });
    }
    
    const product = products.find(p => p.ID === id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    product.addRating(rating);
    
    res.json({ 
      message: 'Rating added successfully',
      ratings: product.Ratings
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product review', message: error.message });
  }
};

module.exports = {
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
};

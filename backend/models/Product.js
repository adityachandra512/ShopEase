const { v4: uuidv4 } = require('uuid');

class Product {
  constructor({ 
    name, 
    description, 
    price, 
    stock, 
    category, 
    imageUrl = null,
    images = [],
    brand = '',
    features = [],
    ratings = { average: 0, count: 0 },
    discount = 0,
    tags = [],
    featured = false
  }) {
    this.ID = uuidv4();
    this.Name = name;
    this.Description = description;
    this.Price = parseFloat(price);
    this.Stock = parseInt(stock);
    this.Category = category;
    // Main product image
    this.ImageUrl = imageUrl;
    // Additional product images
    this.Images = images;
    // Brand information
    this.Brand = brand;
    // Product features as array of strings
    this.Features = features;
    // Product ratings
    this.Ratings = ratings;
    // Discount percentage (0-100)
    this.Discount = parseFloat(discount);
    // Tags for improved filtering
    this.Tags = tags;
    // Whether product is featured
    this.Featured = featured;
    // Calculate sale price if discount exists
    this.SalePrice = this.Discount > 0 
      ? parseFloat((this.Price * (1 - this.Discount / 100)).toFixed(2)) 
      : null;
    // Timestamps
    this.CreatedAt = new Date().toISOString();
    this.UpdatedAt = new Date().toISOString();
  }

  // Update product properties
  update({ 
    name, 
    description, 
    price, 
    stock, 
    category, 
    imageUrl,
    images,
    brand,
    features,
    ratings,
    discount,
    tags,
    featured
  }) {
    if (name !== undefined) this.Name = name;
    if (description !== undefined) this.Description = description;
    if (price !== undefined) {
      this.Price = parseFloat(price);
      // Recalculate sale price if discount exists
      if (this.Discount > 0) {
        this.SalePrice = parseFloat((this.Price * (1 - this.Discount / 100)).toFixed(2));
      }
    }
    if (stock !== undefined) this.Stock = parseInt(stock);
    if (category !== undefined) this.Category = category;
    if (imageUrl !== undefined) this.ImageUrl = imageUrl;
    if (images !== undefined) this.Images = images;
    if (brand !== undefined) this.Brand = brand;
    if (features !== undefined) this.Features = features;
    if (ratings !== undefined) this.Ratings = ratings;
    if (discount !== undefined) {
      this.Discount = parseFloat(discount);
      // Update sale price when discount changes
      this.SalePrice = this.Discount > 0 
        ? parseFloat((this.Price * (1 - this.Discount / 100)).toFixed(2)) 
        : null;
    }
    if (tags !== undefined) this.Tags = tags;
    if (featured !== undefined) this.Featured = featured;
    
    this.UpdatedAt = new Date().toISOString();
  }

  // Check if product is in stock
  isInStock(quantity = 1) {
    return this.Stock >= quantity;
  }

  // Reduce stock when product is purchased
  reduceStock(quantity) {
    if (this.isInStock(quantity)) {
      this.Stock -= quantity;
      this.UpdatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  // Validate product data
  static validate({ 
    name, 
    description, 
    price, 
    stock, 
    category,
    discount,
    images
  }) {
    const errors = [];

    if (!name || name.trim().length === 0) {
      errors.push('Product name is required');
    }

    if (!description || description.trim().length === 0) {
      errors.push('Product description is required');
    }

    if (price === undefined || price === null || isNaN(price) || price < 0) {
      errors.push('Valid product price is required');
    }

    if (stock === undefined || stock === null || isNaN(stock) || stock < 0) {
      errors.push('Valid stock quantity is required');
    }

    if (!category || category.trim().length === 0) {
      errors.push('Product category is required');
    }

    if (discount !== undefined && (isNaN(discount) || discount < 0 || discount > 100)) {
      errors.push('Discount must be a number between 0 and 100');
    }

    if (images && !Array.isArray(images)) {
      errors.push('Images must be an array');
    }

    return errors;
  }
  
  // Method to add a tag
  addTag(tag) {
    if (!this.Tags.includes(tag)) {
      this.Tags.push(tag);
    }
    return this.Tags;
  }

  // Method to remove a tag
  removeTag(tag) {
    this.Tags = this.Tags.filter(t => t !== tag);
    return this.Tags;
  }

  // Method to add a feature
  addFeature(feature) {
    if (!this.Features.includes(feature)) {
      this.Features.push(feature);
    }
    return this.Features;
  }

  // Method to add rating
  addRating(rating) {
    if (rating >= 1 && rating <= 5) {
      const totalRatings = this.Ratings.count + 1;
      const newAverage = ((this.Ratings.average * this.Ratings.count) + rating) / totalRatings;
      this.Ratings = {
        average: parseFloat(newAverage.toFixed(1)),
        count: totalRatings
      };
    }
    return this.Ratings;
  }
  
  // Check if product is on sale
  isOnSale() {
    return this.Discount > 0;
  }
  
  // Get final price (considering discounts)
  getFinalPrice() {
    return this.SalePrice !== null ? this.SalePrice : this.Price;
  }
}

module.exports = Product;

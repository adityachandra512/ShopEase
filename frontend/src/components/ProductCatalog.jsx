import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from './Cart';
import { 
  FiStar, 
  FiShoppingCart, 
  FiFilter, 
  FiHeart, 
  FiX, 
  FiSliders, 
  FiArrowDown, 
  FiArrowUp, 
  FiCheck, 
  FiGrid, 
  FiList, 
  FiChevronDown, 
  FiChevronUp 
} from 'react-icons/fi';

const ProductCatalog = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [pagination, setPagination] = useState({ 
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  });
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price: { min: '', max: '' },
    rating: 0,
    inStock: true,
    onSale: false,
  });
  const { addToCart, cart } = useCart(); // Use the addToCart from context

  // Function to build API query with filters
  const buildApiQuery = () => {
    const queryParams = new URLSearchParams();
    
    // Add search query
    if (searchQuery) queryParams.append('search', searchQuery);
    
    // Add categories
    if (filters.category.length > 0) queryParams.append('category', filters.category.join(','));
    
    // Add brands
    if (filters.brand.length > 0) queryParams.append('brand', filters.brand.join(','));
    
    // Add price range
    if (filters.price.min) queryParams.append('minPrice', filters.price.min);
    if (filters.price.max) queryParams.append('maxPrice', filters.price.max);
    
    // Add rating filter
    if (filters.rating > 0) queryParams.append('rating', filters.rating);
    
    // Add stock filter
    if (filters.inStock) queryParams.append('inStock', 'true');
    
    // Add sale filter
    if (filters.onSale) queryParams.append('discount', 'true');
    
    // Add sorting
    if (sortBy) queryParams.append('sort', sortBy);
    
    // Add pagination
    queryParams.append('page', pagination.page);
    queryParams.append('limit', pagination.limit);
    
    return queryParams.toString();
  };

  // Fetch products based on filters
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Build query string for backend API
      const queryString = buildApiQuery();
      const response = await axios.get(`http://localhost:5000/api/items?${queryString}`);
      setProducts(response.data.products || []);
      setPagination(response.data.pagination || {
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 1
      });
      setError(null);
    } catch (err) {
      setError('Error fetching products. Please try again later.');
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const [categoriesResponse, brandsResponse, tagsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/items/categories'),
        axios.get('http://localhost:5000/api/items/brands'),
        axios.get('http://localhost:5000/api/items/tags')
      ]);
      setCategories(categoriesResponse.data || []);
      setBrands(brandsResponse.data || []);
      setTags(tagsResponse.data || []);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  // Update filters
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      switch (filterType) {
        case 'category':
        case 'brand':
          if (newFilters[filterType].includes(value)) {
            newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
          } else {
            newFilters[filterType] = [...newFilters[filterType], value];
          }
          break;
          
        case 'price_min':
          newFilters.price.min = value;
          break;
          
        case 'price_max':
          newFilters.price.max = value;
          break;
          
        case 'rating':
          newFilters.rating = value;
          break;
          
        case 'inStock':
          newFilters.inStock = value;
          break;
          
        case 'onSale':
          newFilters.onSale = value;
          break;
          
        default:
          break;
      }
      
      return newFilters;
    });
    
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: [],
      brand: [],
      price: { min: '', max: '' },
      rating: 0,
      inStock: true,
      onSale: false,
    });
    setSortBy('featured');
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  // Change page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  // Fetch products and filter options on initial load
  useEffect(() => {
    fetchFilterOptions();
  }, []);
  
  // Fetch products when filters, search query, or pagination change
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, filters, sortBy, pagination.page, pagination.limit]);

  // Function to render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) 
              ? 'text-yellow-400 fill-yellow-400' 
              : i < rating 
                ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };
  
  // Function to check if product is in cart
  const isInCart = (productId) => {
    return cart.some(item => item.ID === productId);
  };

  // Function to render filter badges
  const renderFilterBadges = () => {
    const activeBadges = [];
    
    filters.category.forEach(cat => {
      activeBadges.push(
        <span key={`cat-${cat}`} className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
          {cat}
          <button onClick={() => handleFilterChange('category', cat)} className="ml-1 focus:outline-none">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      );
    });
    
    filters.brand.forEach(b => {
      activeBadges.push(
        <span key={`brand-${b}`} className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
          {b}
          <button onClick={() => handleFilterChange('brand', b)} className="ml-1 focus:outline-none">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      );
    });
    
    if (filters.price.min) {
      activeBadges.push(
        <span key="price-min" className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
          Min: ${filters.price.min}
          <button onClick={() => handleFilterChange('price_min', '')} className="ml-1 focus:outline-none">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      );
    }
    
    if (filters.price.max) {
      activeBadges.push(
        <span key="price-max" className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
          Max: ${filters.price.max}
          <button onClick={() => handleFilterChange('price_max', '')} className="ml-1 focus:outline-none">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      );
    }
    
    if (filters.rating > 0) {
      activeBadges.push(
        <span key="rating" className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
          Rating: {filters.rating}+
          <button onClick={() => handleFilterChange('rating', 0)} className="ml-1 focus:outline-none">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      );
    }
    
    if (filters.onSale) {
      activeBadges.push(
        <span key="sale" className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
          On Sale
          <button onClick={() => handleFilterChange('onSale', false)} className="ml-1 focus:outline-none">
            <FiX className="w-3 h-3" />
          </button>
        </span>
      );
    }
    
    return activeBadges;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Filter and Sort Controls */}
        <div className="mb-6 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              <FiFilter className="mr-2" /> 
              Filters
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {Object.values(filters).flat().filter(Boolean).length}
              </span>
            </button>
            
            <div className="hidden md:flex">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
              >
                <FiGrid />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
              >
                <FiList />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest First</option>
              <option value="popularity">Most Popular</option>
              <option value="discount">Biggest Discount</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {/* Active Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center">
            {renderFilterBadges()}
            
            {Object.values(filters).flat().filter(Boolean).length > 0 && (
              <button 
                onClick={resetFilters} 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {products.length} of {pagination.total} products
          </p>
          <p className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </p>
        </div>
        
        {/* Filters Panel (Expandable) */}
        {filtersOpen && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Categories Filter */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <span>Categories</span>
                </h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => handleFilterChange('category', cat)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Brands Filter */}
              <div>
                <h4 className="font-medium mb-3">Brands</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={filters.brand.includes(brand)}
                        onChange={() => handleFilterChange('brand', brand)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="flex space-x-2">
                  <div>
                    <label htmlFor="min-price" className="sr-only">Minimum Price</label>
                    <input
                      type="number"
                      id="min-price"
                      placeholder="Min"
                      value={filters.price.min}
                      onChange={(e) => handleFilterChange('price_min', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="sr-only">Maximum Price</label>
                    <input
                      type="number"
                      id="max-price"
                      placeholder="Max"
                      value={filters.price.max}
                      onChange={(e) => handleFilterChange('price_max', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div>
                <h4 className="font-medium mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={`rating-${rating}`} className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      {rating}+ Stars
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Additional Filters */}
              <div className="md:col-span-3 lg:col-span-4">
                <h4 className="font-medium mb-3">Additional Filters</h4>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={() => handleFilterChange('inStock', !filters.inStock)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    In Stock Only
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.onSale}
                      onChange={() => handleFilterChange('onSale', !filters.onSale)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    On Sale
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 mr-2"
              >
                Reset All
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Products Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-6"}>
            {products.map((product) => (
              viewMode === 'grid' ? (
                // Grid View
                <div
                  key={product.ID}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.ImageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
                      alt={product.Name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                    
                    {/* Discount Badge */}
                    {product.Discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.Discount}%
                      </div>
                    )}
                    
                    {/* Wishlist Button */}
                    <button className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors duration-200">
                      <FiHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-blue-600">{product.Category}</span>
                        <span className="text-xs text-gray-500">{product.Brand}</span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
                        {product.Name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.Description}
                      </p>
                      
                      <div className="mb-2">
                        {renderStars(product.Ratings?.average || 0)}
                        <span className="text-xs text-gray-500 ml-1">({product.Ratings?.count || 0} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      {/* Price */}
                      <div className="flex items-center mb-3">
                        {product.Discount > 0 ? (
                          <>
                            <span className="text-lg font-bold text-blue-600">${product.SalePrice.toFixed(2)}</span>
                            <span className="ml-2 text-sm text-gray-400 line-through">${product.Price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-blue-600">${product.Price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {/* Stock Status */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium ${product.Stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.Stock > 0 ? `In Stock (${product.Stock})` : 'Out of Stock'}
                        </span>
                        
                        {product.Featured && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.Stock <= 0}
                        className={`w-full flex items-center justify-center py-2 rounded-lg transition duration-200 ${
                          product.Stock <= 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : isInCart(product.ID)
                              ? 'bg-green-100 text-green-700 border border-green-600'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {product.Stock <= 0 ? (
                          'Out of Stock'
                        ) : isInCart(product.ID) ? (
                          <>
                            <FiCheck className="mr-1" />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <FiShoppingCart className="mr-1" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div
                  key={product.ID}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="relative h-48 sm:w-48 sm:h-auto overflow-hidden">
                      <img
                        src={product.ImageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
                        alt={product.Name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      />
                      
                      {/* Discount Badge */}
                      {product.Discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{product.Discount}%
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="text-xs font-medium text-blue-600 mr-2">{product.Category}</span>
                            <span className="text-xs text-gray-500">{product.Brand}</span>
                          </div>
                          
                          <h3 className="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                            {product.Name}
                          </h3>
                          
                          <div className="mb-3">
                            {renderStars(product.Ratings?.average || 0)}
                            <span className="text-xs text-gray-500 ml-1">({product.Ratings?.count || 0} reviews)</span>
                          </div>
                        </div>
                        
                        <div>
                          {/* Wishlist Button */}
                          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <FiHeart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.Description}
                      </p>
                      
                      <div className="mt-auto flex flex-wrap justify-between items-end">
                        <div>
                          {/* Price */}
                          <div className="flex items-center mb-1">
                            {product.Discount > 0 ? (
                              <>
                                <span className="text-lg font-bold text-blue-600">${product.SalePrice.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-gray-400 line-through">${product.Price.toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-blue-600">${product.Price.toFixed(2)}</span>
                            )}
                          </div>
                          
                          {/* Stock Status */}
                          <span className={`text-xs font-medium ${product.Stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.Stock > 0 ? `In Stock (${product.Stock})` : 'Out of Stock'}
                          </span>
                          
                          {product.Features && product.Features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {product.Features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.Stock <= 0}
                          className={`flex items-center justify-center px-6 py-2 rounded-lg transition duration-200 ${
                            product.Stock <= 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : isInCart(product.ID)
                                ? 'bg-green-100 text-green-700 border border-green-600'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {product.Stock <= 0 ? (
                            'Out of Stock'
                          ) : isInCart(product.ID) ? (
                            <>
                              <FiCheck className="mr-1" />
                              Added
                            </>
                          ) : (
                            <>
                              <FiShoppingCart className="mr-1" />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FiFilter className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button onClick={resetFilters} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Reset filters
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {products.length > 0 && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className={`px-3 py-1 rounded ${
                  pagination.page <= 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-500 hover:bg-blue-50'
                }`}
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              {[...Array(pagination.totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Only show current page, first and last pages, and pages close to current
                if (
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  Math.abs(pageNum - pagination.page) <= 1
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 rounded ${
                        pageNum === pagination.page
                          ? 'bg-blue-500 text-white'
                          : 'text-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && pagination.page > 3) ||
                  (pageNum === pagination.totalPages - 1 && pagination.page < pagination.totalPages - 2)
                ) {
                  // Show ellipsis
                  return <span key={pageNum}>...</span>;
                } else {
                  return null;
                }
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className={`px-3 py-1 rounded ${
                  pagination.page >= pagination.totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-500 hover:bg-blue-50'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
        
        {/* Add some custom animation for the loader */}
        <style jsx="true">{`
          .loader {
            border-top-color: #3498db;
            -webkit-animation: spinner 1.5s linear infinite;
            animation: spinner 1.5s linear infinite;
          }
          
          @-webkit-keyframes spinner {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          
          @keyframes spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProductCatalog;
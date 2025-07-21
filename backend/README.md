# Shopping Mart Backend API

A robust Node.js/Express backend API for the Shopping Mart e-commerce application.

## Features

- **Product Management**: CRUD operations for products with filtering and search
- **Order Management**: Complete order processing system
- **Security**: Rate limiting, CORS, Helmet security headers
- **Error Handling**: Comprehensive error handling and validation
- **Logging**: Request logging with Morgan
- **Pagination**: Support for paginated responses

## API Endpoints

### Products (`/api/items`)

- `GET /api/items` - Get all products
  - Query parameters: `category`, `search`, `minPrice`, `maxPrice`, `inStock`
- `GET /api/items/categories` - Get all product categories
- `GET /api/items/:id` - Get product by ID
- `GET /api/items/:id/stock` - Check stock availability
- `POST /api/items` - Create new product
- `PUT /api/items/:id` - Update product
- `DELETE /api/items/:id` - Delete product

### Orders (`/api/orders`)

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (with pagination)
  - Query parameters: `status`, `customerEmail`, `page`, `limit`
- `GET /api/orders/stats` - Get order statistics
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Health Check

- `GET /health` - Health check endpoint

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on port 5000 (or the port specified in the PORT environment variable).

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## Sample Data

The API comes pre-loaded with sample products across various categories:
- Electronics
- Clothing
- Home & Kitchen
- Sports & Fitness
- Travel
- Health & Nutrition

## Response Formats

### Success Response
```json
{
  "data": "...",
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error type",
  "message": "Error description"
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origins
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Secure error responses

## Development

The backend uses in-memory storage for simplicity. In production, you should:

1. Replace in-memory storage with a proper database (MongoDB, PostgreSQL, etc.)
2. Add authentication and authorization
3. Implement proper logging and monitoring
4. Add database migrations and seeders
5. Set up proper environment configuration

## Testing

Use tools like Postman or curl to test the API endpoints:

```bash
# Get all products
curl http://localhost:5000/api/items

# Create a new product
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","description":"A test product","price":29.99,"stock":10,"category":"Test"}'

# Create an order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items":[{"productId":"123","productName":"Test Product","quantity":2,"price":29.99}],
    "customerInfo":{"name":"John Doe","email":"john@example.com","phone":"123-456-7890","address":"123 Main St"},
    "paymentMethod":"Credit Card"
  }'
```

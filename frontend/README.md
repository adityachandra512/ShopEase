---


# 🛒 **ShopEase**

ShopEase is a modern e-commerce web application where users can browse products, filter and search, add items to their cart, and complete a multi-step checkout process. The app features a beautiful UI, responsive design, and a robust backend with in-memory data (no database required for demo/testing).

---

## **Tech Stack**
- **Frontend:** React.js, Vite, Tailwind CSS, React Icons
- **Backend:** Node.js, Express.js
- **State Management:** React Context API
- **API Calls:** Axios

---

---


## **Features**
- **Product Catalog:** Browse, search, and filter products by category, brand, price, and more.
- **Shopping Cart:** Add, remove, and update items; view total prices; persistent cart with localStorage.
- **Multi-Step Checkout:** Modern billing page with customer info, order summary, and payment steps.
- **Order & Billing:** Simulated payment and order confirmation with animated UI.
- **Responsive Design:** Fully responsive for mobile, tablet, and desktop.
- **Modern UI:** Beautiful, animated, and user-friendly interface.

---

---


## **Getting Started**

Follow these steps to run ShopEase locally.

### **Prerequisites**
- [Node.js](https://nodejs.org/)

### **Installation & Running**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/shopease.git
   cd shopease
   ```

2. **Install & Start Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Install & Start Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the App**
   - Open your browser and go to: [http://localhost:5173](http://localhost:5173)

---

---


## **Folder Structure**
```
shopping-mart-master/
├── backend/           # Node.js/Express backend
│   ├── server.js      # Main server file
│   ├── controllers/   # Route controllers
│   ├── models/        # Data models (in-memory)
│   ├── routes/        # API route definitions
│   └── package.json
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx
│   │   └── ...
│   └── package.json
└── README.md
```

---

---


## **API Endpoints**
| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/api/items`              | Get all products (with filters)    |
| GET    | `/api/items/:id`          | Get product by ID                  |
| GET    | `/api/items/categories`   | Get all product categories         |
| GET    | `/api/items/brands`       | Get all product brands             |
| GET    | `/api/items/tags`         | Get all product tags               |
| POST   | `/api/orders`             | Place a new order                  |
| GET    | `/api/orders`             | Get all orders                     |

---

---


## **Screenshots**

### Product Catalog
![Product Catalog](public/Screenshot%202024-12-05%20175309.png)

### Shopping Cart
![Shopping Cart](public/Screenshot%202024-12-05%20175348.png)

### Billing Page
![Billing Page](public/Screenshot%202024-12-05%20175404.png)

---


## **Contributing**
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---


## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---


## **Contact**
For questions or feedback, feel free to reach out:
**Aditya Chandra**  
- Email: adityachandra419@gmail.com  
- GitHub: [adityachandra512](https://github.com/adityachandra512)

---


---

### **Additional Notes**
- Product data is stored in-memory on the backend for demo/testing (no database required).
- All data is handled and shown dynamically through the frontend React components.

---

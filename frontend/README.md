---

# **Shopease**

An e-commerce web application that allows users to browse products, add items to their cart, and complete the checkout process. All data, including products and pricing, is taken from a CSV file and is stored in MongoDB Compass locally.

## **Tech Stack**
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Flask
- **Database**: MongoDB Compass (local setup)
- **State Management**: React Context API
- **API Calls**: Axios

---

## **Features**
- **Product Catalog**: Displays products that are loaded from a CSV file.
- **Shopping Cart**: Add, remove items, view total prices, and proceed to checkout.
- **Billing System**: Secure payment options with a success message upon transaction.
- **Responsive Design**: Ensure a smooth experience on all devices.

---

## **Getting Started**

Follow these steps to get the project running on your local machine.

### **Prerequisites**
Ensure the following are installed:
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/) (for Flask backend)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (for local database)

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/shopease.git
   cd shopease
   ```

2. **Frontend Setup**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

3. **Backend Setup**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install backend dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the Flask backend server:
     ```bash
     python app.py
     ```

4. **MongoDB Compass Setup**
   - MongoDB Compass will be used for local data storage. The database will be automatically created when you run the backend server.
   - Make sure MongoDB Compass is running locally, and the Flask app will handle the creation of the database and collections.

5. **Data Source**
   - The product data is loaded dynamically from a CSV file, which is parsed and inserted into MongoDB Compass.
   - The CSV file is located in the backend directory, and the data is automatically fed into the database when the server starts.

---

## **Folder Structure**
```
shopease/
├── backend/           # Flask backend code
│   ├── app.py         # Main application file
│   ├── routes/        # API endpoints
│   ├── models/        # Database models
│   ├── data/          # CSV file for product data
│   └── requirements.txt
├── frontend/          # React frontend code
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## **Usage**

1. **Run the Backend**
   - Start the backend server:
     ```bash
     cd backend
     python app.py
     ```

2. **Run the Frontend**
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```

3. **Access the App**
   - Open your browser and navigate to:
     ```
     http://localhost:5173
     ```

---

## **API Endpoints**
| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/api/products`     | Fetch all products from the database |
| POST   | `/api/cart`         | Add items to cart              |
| POST   | `/api/checkout`     | Process billing and payment    |

---

## **Screenshots**

### **Product Catalog**
![Product Catalog](public/Screenshot%202024-12-05%20175309.png)

### **Shopping Cart**
![Shopping Cart](public/Screenshot%202024-12-05%20175348.png)

### **Billing Page**
![Billing Page](public/Screenshot%202024-12-05%20175404.png)

---

## **Contributing**
Contributions are welcome! Follow the steps below to contribute:
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
**Your Name**  
- Email: adityachandra419@gmail.com  
- GitHub: [aditya](https://github.com/adityachandra512)

---

### **Additional Notes**
- The product data is stored and displayed by fetching from a CSV file, which is processed and inserted into MongoDB Compass.
- All data is handled and shown dynamically through the frontend React components.

---

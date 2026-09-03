# 🛒 Mini E-Commerce Application

A full-stack e-commerce web application built using **Spring Boot** for the backend and **React.js** with **Vite** for the frontend.

The application provides a foundation for an online shopping platform with user authentication, product management, shopping cart functionality, and an admin interface.

---

## 🚀 Features

### 👤 User Features
- User registration
- User login
- Browse products
- View product details
- Add products to cart
- Manage cart items
- Remove products from cart

### 🔐 Authentication
- User registration and login
- Backend-based user management
- Secure database interaction

### 👨‍💼 Admin Features
- Admin panel
- Product management
- Manage application data

### 🛍️ E-Commerce Features
- Product listing
- Product cards
- Shopping cart drawer
- Responsive user interface

---

## 🛠️ Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Development Tools
- Spring Tool Suite (STS)
- Visual Studio Code
- Git
- GitHub

---

## 📁 Project Structure

```text
ECommerceApplication/
│
├── src/
│   └── main/
│       └── java/
│           └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── pom.xml
├── .gitignore
└── README.md
# Shopping Cart Application

A full-stack e-commerce application featuring a dynamic product management system and a functional shopping cart. This project utilizes a **React** and **TypeScript** frontend with a **Node.js/Express** backend and **MongoDB** for persistent storage.

## 🚀 Features

* **Product Management**: View a comprehensive list of products, add new items, edit existing product details, and remove products from the inventory.
* **Shopping Cart**: Add products to the cart with real-time inventory updates—adding an item to the cart automatically reduces its shop quantity.
* **Checkout Workflow**: Review carted items and perform a checkout to clear the cart.
* **Responsive UI**: A clean, component-based interface built with React.
* **Persistent Data**: All products and cart items are stored and managed via a MongoDB database.
* **Robust Testing**: Comprehensive test suite using Vitest and React Testing Library for frontend components.

## 🛠️ Tech Stack

### Frontend
* **Framework**: React 19
* **Language**: TypeScript
* **Build Tool**: Vite
* **Data Validation**: Zod
* **HTTP Client**: Axios
* **Testing**: Vitest, React Testing Library, JSDOM

### Backend
* **Runtime**: Node.js
* **Framework**: Express
* **Database**: MongoDB with Mongoose ODM
* **Environment Management**: Dotenv

---

## ⚙️ Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/download/) installed.
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account for database hosting.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd shopping_cart
    ```

2.  **Server Setup**:
    ```bash
    cd server
    npm install
    ```
    * Create a `.env` file in the `/server` directory.
    * Add your MongoDB connection string: `DB=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shopping_cart?retryWrites=true&w=majority`.

3.  **Client Setup**:
    ```bash
    cd ../client
    npm install
    ```

---

## 🏃 Usage

### Running the Backend
From the `/server` directory:
* Standard start: `npm start`
* Development mode with auto-reload: `npm run start-watch`
The server will run on `http://localhost:5001`.

### Running the Frontend
From the `/client` directory:
```bash
npm run dev
```
The application will be accessible via the URL provided by Vite (typically http://localhost:5173).

## 📡 API Endpoints

The backend provides a RESTful API for managing products and the shopping cart.

| Method | Endpoint            | Description                                       |
| ------ | ------------------- | ------------------------------------------------- |
| GET    | `/api/products`     | Retrieve all products from the database           |
| POST   | `/api/products`     | Create a new product                              |
| PUT    | `/api/products/:id` | Update an existing product's details              |
| DELETE | `/api/products/:id` | Delete a product from the inventory               |
| GET    | `/api/cart`         | Retrieve all items currently in the cart          |
| POST   | `/api/add-to-cart`  | Add a product to the cart (reduces shop quantity) |
| POST   | `/api/checkout`     | Process checkout and clear the shopping cart      |

---

## 🧪 Testing

The frontend utilizes **Vitest** for unit and component testing.

To run tests in the `/client` directory, use the following commands:

* **Run tests once**:

  ```bash
  npm test
  ```

* **Run tests in watch mode**:

  ```bash
  npm run test:watch
  ```

---

## 📂 Project Structure

```
/client              # React + TypeScript frontend application
/server              # Express backend and MongoDB models
/docs                # Detailed API documentation
/server/public/ui    # Static HTML templates used as references for the dynamic UI
```

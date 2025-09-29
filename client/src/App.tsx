import React from "react";
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import ProductList from "./components/ProductList";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm";
import { getCartItems, getProducts } from "./services/cart";
import cartReducer from "./reducers/cartReducer";
import productListReducer from "./reducers/productListReducer";

function App() {
  const [cart, dispatchCart] = React.useReducer(cartReducer, []);
  const [productList, dispatchProductList] = React.useReducer(productListReducer, []);

  React.useEffect(() => {
    fetchProductList();
    fetchCartItems();
  }, [])

  const fetchProductList = async (): Promise<void> => {
    try {
      const productList = await getProducts();
      dispatchProductList({
        type: "fetch product list",
        productList: productList
      });
    } catch (error: unknown) {
      console.log(error);
    }
  }

  const fetchCartItems = async (): Promise<void> => {
    try {
      const cartItems = await getCartItems();
      dispatchCart({
        type: "fetch cart",
        cartItems: cartItems
      });
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <div id="app">
      <header>
        <h1>The Shop!</h1>
        <ShoppingCart cartItems={cart} dispatchCart={dispatchCart}/>
      </header>

      <main>
        <ProductList products={productList} dispatchProductList={dispatchProductList} dispatchCart={dispatchCart}/>
        <ToggleableAddProductForm dispatchProductList={dispatchProductList}/>
      </main>
    </div>
  )
}

export default App
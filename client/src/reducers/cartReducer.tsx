import type { CartItem } from "../types";

const cartReducer = (currentState: CartItem[], action: {
  type: string,
  cartItem?: CartItem,
  cartItems?: CartItem[]
}) => {
  switch (action.type) {
    case "fetch cart":
      const newCartItems = action.cartItems;
      if (newCartItems === undefined) {
        throw new Error("Missing cartItems in action");
      }
      return newCartItems;
    case "checkout":
      return [];
    case "add to cart":
      const newCartItem = action.cartItem;
      if (newCartItem === undefined) {
        throw new Error("Missing cartItem in action");
      }
      if (currentState.find(curCartItem => curCartItem.productId === newCartItem.productId)) {
        return currentState.map(curCartItem => {
          return curCartItem.productId === newCartItem.productId
          ? newCartItem
          : curCartItem;
        });
      } else {
        return currentState.concat(newCartItem);
      }
    default:
      throw new Error("Unknown cart action type");
  }
}

export default cartReducer;
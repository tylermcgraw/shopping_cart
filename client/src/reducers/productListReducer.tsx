import type { Product } from "../types";

const productListReducer = (currentState: Product[], action: {
  type: string,
  product?: Product,
  productList?: Product[],
  deletedId?: string
}) => {
  const newProduct = action.product;
  switch (action.type) {
    case "fetch product list":
      const newProductList = action.productList;
      if (newProductList === undefined) {
        throw new Error("Missing productList in action");
      }
      return newProductList;
    case "add to cart":
      if (newProduct === undefined) {
        throw new Error("Missing product in action");
      }
      return currentState.map(curProduct => {
        return curProduct._id === newProduct._id
        ? newProduct
        : curProduct;
      });
    case "edit product":
      const updatedProduct = action.product;
      if (updatedProduct === undefined) {
        throw new Error("Missing product in action");
      }
      return currentState.map(curProduct => {
          return curProduct._id === updatedProduct._id
          ? updatedProduct
          : curProduct
        });
    case "delete product":
      const deletedId = action.deletedId;
      if (deletedId === undefined) {
        throw new Error("Missing deleted product id in action");
      }
      return currentState.filter(curProduct => curProduct._id !== deletedId);
    case "add product":
      if (newProduct === undefined) {
        throw new Error("Missing product in action");
      }
      return currentState.concat(newProduct);
    default:
      throw new Error("Unknown productList action type");
  }
}

export default productListReducer;
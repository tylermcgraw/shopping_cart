import type { Product, SortBy } from "../types";

const productListReducer = (currentState: Product[], action: {
  type: string,
  product?: Product,
  productList?: Product[],
  deletedId?: string,
  sortBy?: SortBy
}) => {
  const sortBy = action.sortBy ?? {
    category: "name",
    descending: false
  }
  const newProduct = action.product;
  switch (action.type) {
    case "fetch product list":
      const newProductList = action.productList;
      if (newProductList === undefined) {
        throw new Error("Missing productList in action");
      }
      return newProductList.sort(byCategory(sortBy));
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
        }).sort(byCategory(sortBy));;
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
      return currentState.concat(newProduct).sort(byCategory(sortBy));
    case "sort":
      return currentState.sort(byCategory(sortBy));
    default:
      throw new Error("Unknown productList action type");
  }
}

const byCategory = (sortBy: SortBy) => {
  const { category, descending } = sortBy;
  switch (category) {
    case "name":
      return descending
        ? (a: Product, b: Product) => (a.title > b.title ? -1 : 1)
        : (a: Product, b: Product) => (a.title > b.title ? 1 : -1);
    case "price":
      return descending
        ? (a: Product, b: Product) => b.price - a.price
        : (a: Product, b: Product) => a.price - b.price;
    case "quantity":
      return descending
        ? (a: Product, b: Product) => b.quantity - a.quantity
        : (a: Product, b: Product) => a.quantity - b.quantity;
  }
}

export default productListReducer;
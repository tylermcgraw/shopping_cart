import React from "react";
import type {Product as ProductType, CartItem, SortBy} from "../types";
import EditableProduct from "./EditableProduct";

interface ProductsProps {
  products: ProductType[];
  dispatchProductList: React.ActionDispatch<[action: { type: string; product?: ProductType, productList?: ProductType[], deletedId?: string, sortBy?: SortBy}]>;
  dispatchCart: React.ActionDispatch<[action: { type: string; cartItem?: CartItem}]>;
}

const ProductList = ({products, dispatchProductList, dispatchCart}: ProductsProps) => {
  const [sortBy, setSortBy] = React.useState<SortBy>({
    category: "name",
    descending: false
  });

  const handleClick = (newCategory: "name" | "price" | "quantity") => {
    const newDescendingState = (
      sortBy.category === newCategory 
        ? !sortBy.descending 
        : false
    );
    
    const newSortBy = {
      category: newCategory,
      descending: newDescendingState
    };
    
    setSortBy(newSortBy);
    dispatchProductList({ type: "sort", sortBy: newSortBy });
  };

  return (  
    <div className="product-listing">
      <div className="product-listing-header">
        <h2>Products</h2>
        <div className="sort-by">
          <span>Sort by:</span>
          <button
            className={sortBy.category === "name" ? "sort-button active" : "sort-button"}
            onClick={() => handleClick("name")}
            id="sort-name"
          >
            Name
            {sortBy.category === "name" && <span className={sortBy.descending ? "arrow desc" : "arrow"}></span>}
          </button>
          <button
            className={sortBy.category === "price" ? "sort-button active" : "sort-button"}
            onClick={() => handleClick("price")}
            id="sort-price"
          >
            Price
            {sortBy.category === "price" && <span className={sortBy.descending ? "arrow desc" : "arrow"}></span>}
          </button>
          <button
            className={sortBy.category === "quantity" ? "sort-button active" : "sort-button"}
            onClick={() => handleClick("quantity")}
            id="sort-quantity"
          >
            Quantity
            {sortBy.category === "quantity" && <span className={sortBy.descending ? "arrow desc" : "arrow"}></span>}
          </button>
        </div>
      </div>
      <ul className="product-list">
        {products.map(product => (
          <li key={product._id} className="product">
            <EditableProduct product={product} dispatchProductList={dispatchProductList} dispatchCart={dispatchCart}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
import type {Product as ProductType, CartItem} from "../types";
import EditableProduct from "./EditableProduct";

interface ProductsProps {
  products: ProductType[];
  dispatchProductList: React.ActionDispatch<[action: { type: string; product?: ProductType, productList?: ProductType[], deletedId?: string}]>;
  dispatchCart: React.ActionDispatch<[action: { type: string; cartItem?: CartItem}]>;
}

const ProductList = ({products, dispatchProductList, dispatchCart}: ProductsProps) => {
  return (  
    <div className="product-listing">
      <h2>Products</h2>
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
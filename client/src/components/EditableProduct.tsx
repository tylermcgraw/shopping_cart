import Product from "./Product";
import type {Product as ProductType, CartItem} from "../types";
import ToggleableEditForm from "./ToggleableEditForm";
import AddToCartButton from "./AddToCartButton";
import DeleteButton from "./DeleteButton";

interface ProductsProps {
  product: ProductType;
  dispatchProductList: React.ActionDispatch<[action: { type: string; product?: ProductType, productList?: ProductType[], deletedId?: string}]>;
  dispatchCart: React.ActionDispatch<[action: { type: string; cartItem?: CartItem}]>;
}

const EditableProduct = ({product, dispatchProductList, dispatchCart}: ProductsProps) => {
  return (
    <div className="product-details">
      <Product product={product}/>
      <div className="actions product-actions">
        <AddToCartButton newProduct={product} dispatchProductList={dispatchProductList} dispatchCart={dispatchCart}/>
        <ToggleableEditForm product={product} dispatchProductList={dispatchProductList}/>
      </div>
      <DeleteButton id={product._id} dispatchProductList={dispatchProductList}/>
    </div>
  );
}

export default EditableProduct;
import { addCartItem } from "../services/cart";
import type {Product, CartItem} from "../types";

interface AddToCartButtonProps {
  newProduct: Product;
  dispatchProductList: React.ActionDispatch<[action: { type: string; product?: Product, productList?: Product[], deletedId?: string}]>;
  dispatchCart: React.ActionDispatch<[action: { type: string; cartItem?: CartItem}]>;
}

const AddToCartButton = ({newProduct, dispatchProductList, dispatchCart}: AddToCartButtonProps) => {
  const handleClick = async () => {
    try {
      const {product, item} = await addCartItem({productId: newProduct._id});
      dispatchProductList({
        type: "add to cart",
        product: product
      });
      dispatchCart({
        type: "add to cart",
        cartItem: item
      });
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <button className="add-to-cart" disabled={newProduct.quantity === 0} onClick={handleClick}>Add to Cart</button>
  );
}

export default AddToCartButton;
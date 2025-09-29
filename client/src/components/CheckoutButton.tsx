import { checkout } from "../services/cart";
import type {CartItem} from "../types";

interface CheckoutButtonProps {
  cartItemsLength: number;
  dispatchCart: React.ActionDispatch<[action: { type: string; cartItem?: CartItem}]>;
}

const CheckoutButton = ({cartItemsLength, dispatchCart}: CheckoutButtonProps) => {
  const handleClick = async () => {
    try {
      await checkout();
      dispatchCart({ type: "checkout" });
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <div className="checkout-button">
      <button className="checkout" disabled={cartItemsLength === 0} onClick={handleClick}>Checkout</button>
    </div>
  );
}

export default CheckoutButton;
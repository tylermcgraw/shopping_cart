import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutButton from "./CheckoutButton";
import { checkout } from "../services/cart";

vi.mock("../services/cart", () => ({
  checkout: vi.fn().mockResolvedValue(undefined)
}));

it("show empty cart message when checkout button is clicked", async () => {
  const initialItemsInCartCount = 3;
  const finalItemsInCartCount = 0;
  const setCartMock = vi.fn();
  const user = userEvent.setup();
  const { rerender } = render(<CheckoutButton cartItemsLength={initialItemsInCartCount} setCart={setCartMock} />);
  const checkoutButton = screen.getByRole("button", { name: /checkout/i });
  
  // Checkout button is initially enabled with 3 items in cart
  expect(checkoutButton).toBeEnabled();
  await user.click(checkoutButton);
  
  // Expected function calls after checkout button is clicked
  expect(checkout).toHaveBeenCalledTimes(1);
  expect(setCartMock).toHaveBeenCalledWith([]);
  
  // Rerender with 0 items - checkout button should be disabled
  rerender(<CheckoutButton cartItemsLength={finalItemsInCartCount} setCart={setCartMock} />);
  expect(checkoutButton).toBeDisabled();
});
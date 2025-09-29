import { render, screen } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";

it("displays cart item on initial render (when items are present)", () => {
  const mockCartItems = [
    {
      _id: "a1",
      productId: "1",
      title: "Amazon Kindle E-reader",
      quantity: 1,
      price: 79.99,
    },
    {
      _id: "a2",
      productId: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 3,
      price: 649.99,
    },
  ];

  render(<ShoppingCart cartItems={mockCartItems} setCart={vi.fn()} />);
  const amazonKindle = screen.getByRole("row", { name: new RegExp(mockCartItems[0].title) });
  expect(amazonKindle).toBeInTheDocument();
});

it("displays an empty cart message on initial render (when no items are present)", () => {
  render(<ShoppingCart cartItems={[]} setCart={vi.fn()} />);
  const message = screen.getByText(/your cart is empty/i);
  expect(message).toBeInTheDocument();
});
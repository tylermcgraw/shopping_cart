import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleableAddProductForm from "./ToggleableAddProductForm";

it("shows add product form when add button is clicked", async () => {
  const user = userEvent.setup();
  render(<ToggleableAddProductForm setProductList={vi.fn()} />);
  const addButton = screen.getByRole("button", { name: /add a product/i });
  await user.click(addButton);
  const formInput = screen.getByRole("textbox", { name: /product name:/i });  
  expect(formInput).toBeInTheDocument();
});
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { getCartItems, getProducts, addCartItem, addProduct, updateProduct } from "./services/cart";
import type { Product, CartItem } from "./types";

vi.mock("./services/cart.ts");

const mockedGetCartItems = vi.mocked(getCartItems);
const mockedGetProducts = vi.mocked(getProducts);
const mockedAddCartItem = vi.mocked(addCartItem);
const mockedAddProduct = vi.mocked(addProduct);
const mockedUpdateProduct = vi.mocked(updateProduct);

afterEach(() => {
  vi.resetAllMocks();
});

it("removes product from product list when product is deleted", async () => {
  const mockProducts: Product[] = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,  
      price: 79.99,
    }
  ];
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue([]);
  const user = userEvent.setup();
  render(<App />);
  const deleteButton = await screen.findByRole("button", { name: /x/i });
  await user.click(deleteButton);
  const deletedProduct = screen.queryByRole("header", { name: mockProducts[0].title });  
  expect(deletedProduct).not.toBeInTheDocument();
});

it("displays product in cart when product is added to cart", async () => {
  const mockProducts: Product[] = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,  
      price: 79.99,
    }
  ];
  const mockItem: CartItem = {
    ...mockProducts[0],
    productId: "7"
  }
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue([]);
  mockedAddCartItem.mockResolvedValue({
    product: mockProducts[0],
    item: mockItem
  });
  const user = userEvent.setup();
  render(<App />);
  const addToCartButton = await screen.findByRole("button", { name: /add to cart/i });
  await user.click(addToCartButton);
  const cartItem = screen.getByRole("row", { name: new RegExp(mockProducts[0].title) });  
  expect(cartItem).toBeInTheDocument();
});

it("displays product in product list when new product is added", async () => {
  const mockProducts: Product[] = [];
  const mockProduct: Product = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,  
    price: 79.99,
  }
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue([]);
  mockedAddProduct.mockResolvedValue(mockProduct);
  const user = userEvent.setup();
  render(<App />);
  const addProductButton = await screen.findByRole("button", { name: /add a product/i });
  await user.click(addProductButton);
  const titleInput = screen.getByLabelText(/product name/i);
  const priceInput = screen.getByLabelText(/price/i);
  const quantityInput = screen.getByLabelText(/quantity/i);
  fireEvent.change(titleInput, { target: { value: mockProduct.title } });
  fireEvent.change(priceInput, { target: { value: mockProduct.price } });
  fireEvent.change(quantityInput, { target: { value: mockProduct.quantity } });

  const addButton = screen.getByRole("button", { name: "Add" });
  await user.click(addButton);

  const newProduct = screen.getByRole("heading", { 
    level: 3,
    name: new RegExp(mockProduct.title) 
  });  
  expect(newProduct).toBeInTheDocument();
});

it("removes add form when new product is added", async () => {
  const mockProducts: Product[] = [];
  const mockProduct: Product = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,  
    price: 79.99,
  }
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue([]);
  mockedAddProduct.mockResolvedValue(mockProduct);
  const user = userEvent.setup();
  render(<App />);
  const addProductButton = await screen.findByRole("button", { name: /add a product/i });
  await user.click(addProductButton);
  const titleInput = screen.getByLabelText(/product name/i);
  const priceInput = screen.getByLabelText(/price/i);
  const quantityInput = screen.getByLabelText(/quantity/i);
  fireEvent.change(titleInput, { target: { value: mockProduct.title } });
  fireEvent.change(priceInput, { target: { value: mockProduct.price } });
  fireEvent.change(quantityInput, { target: { value: mockProduct.quantity } });

  const addButton = screen.getByRole("button", { name: "Add" });
  await user.click(addButton);
 
  expect(addButton).not.toBeInTheDocument();
});

it("removes edit form when product is edited", async () => {
  const mockProducts: Product[] = [{
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,  
    price: 79.99,
  }];
  const mockEditedProduct: Product = {
    _id: "1",
    title: "Apple iPad",
    quantity: 5,  
    price: 459.99,
  }
  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCartItems.mockResolvedValue([]);
  mockedUpdateProduct.mockResolvedValue(mockEditedProduct);
  const user = userEvent.setup();
  render(<App />);
  const editProductButton = await screen.findByRole("button", { name: /edit a product/i });
  await user.click(editProductButton);
  const titleInput = screen.getByLabelText(/product name/i);
  const priceInput = screen.getByLabelText(/price/i);
  const quantityInput = screen.getByLabelText(/quantity/i);
  fireEvent.change(titleInput, { target: { value: mockEditedProduct.title } });
  fireEvent.change(priceInput, { target: { value: mockEditedProduct.price } });
  fireEvent.change(quantityInput, { target: { value: mockEditedProduct.quantity } });

  const updateButton = screen.getByRole("button", { name: /update/i });
  await user.click(updateButton);

  expect(updateButton).not.toBeInTheDocument();
});
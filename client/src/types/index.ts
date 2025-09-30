import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const cartItemSchema = productSchema.extend({
  productId: z.string(),
});

const newProductSchema = productSchema.omit({
  _id: true
});

const sortBySchema = z.object({
  category: z.enum(["name", "price", "quantity"]),
  descending: z.boolean()
});

export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type NewProduct = z.infer<typeof newProductSchema>;
export type SortBy = z.infer<typeof sortBySchema>;
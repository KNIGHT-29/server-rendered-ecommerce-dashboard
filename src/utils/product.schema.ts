import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  sku: z.string().min(2, "SKU is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  category: z.string().min(2, "Category is required"),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;

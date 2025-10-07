import { z } from 'zod';

// ✅ Sign In Schema
export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// ✅ Sign Up Schema
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// ✅ Cart Item Schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  qty: z.number().int().nonnegative('Quantity must be positive'),
  image: z.string().min(1, 'Image is required'),
  price: z.number().nonnegative('Price must be positive'),
});

// ✅ Insert Cart Schema
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.number().nonnegative('Items price must be positive'),
  totalPrice: z.number().nonnegative('Total price must be positive'),
  shippingPrice: z.number().nonnegative('Shipping price must be positive'),
  taxPrice: z.number().nonnegative('Tax price must be positive'),
  sessionCartId: z.string().min(1, 'Session cart ID is required'),
  userId: z.string().optional().nullable(),
});

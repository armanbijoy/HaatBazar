import { z } from "zod";
import { insertCartSchema, cartItemScema } from "@/lib/validators";

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemScema>;
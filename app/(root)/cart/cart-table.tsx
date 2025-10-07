'use client'

import { useEffect, useState } from "react"
import nookies from "nookies"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Minus, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

type CartItem = {
  productId: string
  name: string
  image: string
  price: number
  qty?: number
  quantity: number
  slug: string
}

const CartTable = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
const router = useRouter()

  // ✅ Load cart from cookies on mount
  useEffect(() => {
    const cookies = nookies.get()
    const cart = cookies.cart ? JSON.parse(cookies.cart) : []
    setCartItems(cart)
  }, [])

  // ✅ Save updated cart to cookies
  const updateCartCookies = (updatedCart: CartItem[]) => {
    nookies.set(null, "cart", JSON.stringify(updatedCart), {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })
  }

  // ✅ Increase quantity
  const handleIncrease = (productId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )

    setCartItems(updatedCart)
    updateCartCookies(updatedCart)
  }

  // ✅ Decrease quantity (remove if 0)
  const handleDecrease = (productId: string) => {
    const updatedCart = cartItems
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)

    setCartItems(updatedCart)
    updateCartCookies(updatedCart)
  }

  // ✅ Remove item function
  const handleRemove = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId)
    setCartItems(updatedCart)
    updateCartCookies(updatedCart)
    toast.success("Item removed from cart.")
  }

  // ✅ Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const taxRate = 0.08 // 8%
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>

      <div className="grid md:grid-cols-4 md:gap-5">
        {/* 🛒 Cart Table */}
        <div className="overflow-x-auto md:col-span-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span>{item.name}</span>
                    </TableCell>

                    {/* ✅ Quantity Controls */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDecrease(item.productId)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="w-6 text-center">
                          {item.quantity ?? item.qty}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleIncrease(item.productId)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => router.push("/shipping-adress")}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Your cart is empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* 💳 Cart Summary Card */}
        <Card className="md:col-span-1 h-fit">
          <CardContent className="p-4 space-y-3">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>

            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              className="w-full mt-4"
              disabled={cartItems.length === 0}
              onClick={() => {
                toast.success("Proceeding to checkout...")
                router.push('/shipping-adress')

              }}
            >
              Process to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default CartTable

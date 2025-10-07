'use client'

import { CartItem } from "@/types"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import nookies from "nookies"

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter()

  const handleAddToCart = async () => {
    try {
      // ✅ Get existing cart from cookies
      const cookies = nookies.get()
      const cartCookie = cookies.cart ? JSON.parse(cookies.cart) : []

      // ✅ Find existing item by productId (not id)
      const existingItemIndex = cartCookie.findIndex(
        (i: CartItem) => i.productId === item.productId
      )

      if (existingItemIndex !== -1) {
        // Increase quantity if it already exists
        cartCookie[existingItemIndex].quantity += item.quantity || 1
      } else {
        // Otherwise, add new item
        cartCookie.push({ ...item, quantity: item.quantity || 1 })
      }

      // ✅ Save updated array back to cookies
      nookies.set(null, 'cart', JSON.stringify(cartCookie), {
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })

      toast.success(`${item.name} added to cart!`)

      // Redirect after toast
      setTimeout(() => router.push('/cart'), 1200)

    } catch (err) {
      console.error("❌ Add to cart error:", err)
      toast.error("Failed to add item to cart.")
    }
  }

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to Cart
    </Button>
  )
}

export default AddToCart

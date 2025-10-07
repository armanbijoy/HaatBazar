"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

// Define the Address interface
interface Address {
  name: string;
  address: string;
  city: string;
  postalCode: string;
}

// Define interfaces for other data (optional, for better type safety)
interface PaymentMethod {
  method: string;
}

interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const PlaceOrderPage = () => {
    const router = useRouter()
  // State with explicit types
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from cookies on component mount
  useEffect(() => {
    const cookies = parseCookies();

    // Parse addresses
    const addresses: Address[] = cookies.addresses
      ? JSON.parse(cookies.addresses)
      : [];
    setAddress(addresses[0] || null);

    // Parse payment method
    const payment: PaymentMethod[] = cookies.paymentMethod
      ? JSON.parse(cookies.paymentMethod)
      : [];
    setPaymentMethod(payment[0] || null);

    // Parse cart items
    const cart: CartItem[] = cookies.cart ? JSON.parse(cookies.cart) : [];
    setCartItems(cart || []);

    setLoading(false);
  }, []);

  // Calculate summary totals
  const calculateSummary = () => {
    const itemsTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = itemsTotal * 0.15; // Assuming 15% tax rate
    const shipping = 0; // Free shipping
    const total = itemsTotal + tax + shipping;

    return {
      itemsTotal: itemsTotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const summary = calculateSummary();

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Place Order</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-2">
          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            {address ? (
              <>
                <p className="mb-1">{address.name}</p>
                <p className="mb-1">{`${address.address}, ${address.city} ${address.postalCode}, USA`}</p>
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
                  Edit
                </button>
              </>
            ) : (
              <p>No shipping address available</p>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            {paymentMethod ? (
              <>
                <p className="mb-1">{paymentMethod.method}</p>
                
              </>
            ) : (
              <p>No payment method available</p>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            {cartItems.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left pb-2">Item</th>
                    <th className="text-left pb-2">Quantity</th>
                    <th className="text-left pb-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId}>
                      <td className="py-2 flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 mr-2"
                          onError={(e) =>
                            ((e.target as HTMLImageElement).src =
                              "/images/fallback.jpg")
                          }
                        />
                        {item.name}
                      </td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No items in cart</p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="mb-1">Items: ${summary.itemsTotal}</p>
            <p className="mb-1">Tax: ${summary.tax}</p>
            <p className="mb-1">Shipping: ${summary.shipping}</p>
            <p className="mb-1 font-bold">
              Total: <span className="text-lg">${summary.total}</span>
            </p>
            <Button onClick={()=>{
                
            }}>Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;

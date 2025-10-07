'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

const PaymentMethodForm = () => {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState("PayPal");

  const paymentMethods = [
    { id: "PayPal", label: "PayPal" },
    { id: "Stripe", label: "Stripe" },
    { id: "CashOnDelivery", label: "CashOnDelivery" },
  ];

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Selected Payment Method:", selectedMethod);
    // Store payment method in a cookie using nookies
    setCookie(null, 'paymentMethod', JSON.stringify([{ method: selectedMethod }]), {
      maxAge: 30 * 24 * 60 * 60, // Cookie expires in 30 days
      path: '/', // Cookie available site-wide
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-none rounded-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-900">Payment Method</h1>
        <p className="text-sm text-gray-500">
          Please select a payment method
        </p>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className="flex items-center space-x-2 text-gray-700"
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="text-black focus:ring-2 focus:ring-black"
              />
              <span>{method.label}</span>
            </label>
          ))}
        </div>

        <Button onClick={()=>{
            router.push('./place-order')
        }} type="submit" className="mt-2 w-fit">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
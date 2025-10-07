"use client";

import { useForm } from "react-hook-form";
import { setCookie, parseCookies } from "nookies";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


type ShippingAddressFormValues = {
  name: string;
  address: string;
  city: string;
  postalCode: string;
};

const COOKIE_KEY = "addresses";

const ShippingAddressForm = () => {
  const form = useForm<ShippingAddressFormValues>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = (values: ShippingAddressFormValues) => {
    const cookies = parseCookies();
    const existingAddresses: ShippingAddressFormValues[] = cookies[COOKIE_KEY]
      ? JSON.parse(cookies[COOKIE_KEY])
      : [];

    // Check if this address already exists (case-insensitive, trimmed)
    const isDuplicate = existingAddresses.some(
      (addr) =>
        addr.name.trim().toLowerCase() === values.name.trim().toLowerCase() &&
        addr.address.trim().toLowerCase() === values.address.trim().toLowerCase() &&
        addr.city.trim().toLowerCase() === values.city.trim().toLowerCase() &&
        addr.postalCode.trim().toLowerCase() === values.postalCode.trim().toLowerCase()
    );

    if (isDuplicate) {
      console.log("Duplicate address detected. Skipping save.");
      return;
    }

    const updatedAddresses = [...existingAddresses, values];

    setCookie(null, COOKIE_KEY, JSON.stringify(updatedAddresses), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    console.log("Saved to cookies:", updatedAddresses);
  };

  const router = useRouter()

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="h2-bold mt-4">Shipping Address</h1>
      <p className="text-sm text-muted-foreground">Please enter the address to ship to</p>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          {/* Name */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            name="address"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="123 Main St"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            name="city"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="New York"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            name="postalCode"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="10001"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button onClick={()=>{
            router.push('/payment-method')
          }} type="submit" className="w-full">
            Continue
          </Button>
        </Form>
      </form>
    </div>
  );
};

export default ShippingAddressForm;

"use client"; 
import { APP_NAME } from "@/lib/constants"; 
import Image from "next/image"; 
import { Button } from "@/components/ui/button"; 

// NotFoundPage component for handling 404-style "Page Not Found" errors
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* App logo displayed at the top */}
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`} // Dynamically insert app name into alt text
        width={48}
        height={48}
        priority={true} // Preloads this image for faster rendering
      />

      {/* Error message container */}
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          {/* Error message */}
          <p className="text-destructive">
            Could Not Find Requested Page
          </p>

          {/* Back to Home button */}
          <Button
            variant="outline"
            className="mt-4 ml-2"
            onClick={() => {
              window.location.href = "/"; // Redirects user back to homepage
            }}
          >
            Back To Home
          </Button>
        </h1>
      </div>
    </div>
  );
};

export default NotFoundPage;

"use client"; 

import Image from "next/image"; 
import { useState } from "react"; 
import { cn } from "@/lib/utils"; 

const ProductImages = ({ images }: { images: string[] }) => {
  // State to keep track of which image is currently displayed
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <Image
        src={images[current]} 
        alt="product image"  
        width={1000}          
        height={1000}         
        className="min-h-[300px] object-cover object-center" 
      />

      {/* Thumbnail images below the main image */}
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image} // Unique key for each thumbnail
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600', 
              current === index && 'border-orange-500'
            )}
            onClick={() => setCurrent(index)} // Change the main image when a thumbnail is clicked
          >
            {/* Small thumbnail image */}
            <Image src={image} alt={image} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages; 

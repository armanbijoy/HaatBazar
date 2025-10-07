'use client'
import { Ghost, ShoppingCart, UserIcon } from "lucide-react"; 
import Image from "next/image"; 
import Link from "next/link"; 
import { Button } from "@/components/ui/button"; 
import { APP_NAME } from "@/lib/constants"; 
import NodeToggle from "./node-toggle";
import Menu from "./menu";

import { useEffect } from "react";

const Header = () => {

 
  return (
    <header className="w-full border-b">
      {/* Full width header with a bottom border */}
      
      <div className="wrapper flex-between">
        {/* "wrapper" likely sets max-width and padding.
            "flex-between" means display flex + justify-between */}
        
        <div className="flext-start">
          {/* Left section of the header (logo + app name) */}

          <Link href="/" className="flex-start">
            {/* Clicking the logo will navigate to home ("/") */}

            <Image
              src="/images/logo.svg"      
              alt={`${APP_NAME} logo`}    
              width={48}                  //
              height={48}                 
            />

            <span className="hidden lg:block font-bold text-2xl ml-3">
              {/* App name shown only on large screens and above */}
              {APP_NAME}
            </span>
          </Link>
        </div>

          <Menu/>

      </div>
    </header>
  );
};

export default Header;


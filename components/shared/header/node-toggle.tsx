"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes"; 


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button"; // Custom button component
import { SunIcon, MoonIcon, SunMoon } from "lucide-react"; // Icons for different themes

// Theme toggle component
export default function NodeToggle() {
  const [mounted, setMounted] = useState(false); // Ensures component only renders after hydration
  const { theme, setTheme } = useTheme(); // Current theme and function to update theme

  // Mark component as mounted after client hydration to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until component is mounted
  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      {/* Trigger button that shows current theme icon */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {/* Conditionally render icon based on current theme */}
          {theme === "system" ? (
            <SunMoon /> // System theme icon
          ) : theme === "dark" ? (
            <MoonIcon /> // Dark theme icon
          ) : (
            <SunIcon /> // Light theme icon
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown menu content */}
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* System Theme Option */}
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuCheckboxItem>

        {/* Dark Theme Option */}
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>

        {/* Light Theme Option */}
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

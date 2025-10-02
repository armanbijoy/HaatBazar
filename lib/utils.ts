import { clsx, type ClassValue } from "clsx"
import { json } from "stream/consumers"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//convert a prisma to regular js object

export function convertToplainObject<T>(value:T): T{

  return JSON.parse(JSON.stringify(value))
}

import { Button } from "@/components/ui/button"
import NodeToggle from "./node-toggle"
import Link from "next/link"
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const Menu = ()=>{
    return(
        <div className="flex justify-end gap-3">
            {/* Desktop Nav */}
            <nav className="hidden md:flex w-full max-w-xs gap-1">
                <div className="space-x-2">
                    <NodeToggle/>

                    <Button asChild variant="ghost">
                        <Link href="/cart">
                          <ShoppingCart /> Cart
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href="/sign-in">
                          <UserIcon /> Sign In
                        </Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile Nav */}
            <nav className="flex md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical/>
                    </SheetTrigger>
                    <SheetContent className='flex flex-col items-start'>
                        <SheetTitle>Menu</SheetTitle>
                        <NodeToggle/>
                        <Button asChild variant='ghost'>
                          <Link href="/cart">
                            <ShoppingCart /> Cart
                          </Link>
                        </Button>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}
export default Menu

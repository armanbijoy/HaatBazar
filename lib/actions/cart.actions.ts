'use server'

import { CartItem } from "@/types"
import { PrismaClient } from "@prisma/client"
import { convertToplainObject } from "../utils"




export async function addItemCart(data:CartItem){
    return{
        success:true,
        message: 'Item Added To Cart'
    }
}


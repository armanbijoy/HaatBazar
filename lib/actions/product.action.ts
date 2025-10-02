'use server'
import { PrismaClient } from "@prisma/client"
import { convertToplainObject } from "../utils"
import { LATEST_PRODUCT_LIMIT } from "../constants"
import { prisma } from "@/db/prisma"


//Get Products

export async function getLatestProducts(){
    const prisma = new PrismaClient()

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCT_LIMIT,
        orderBy: {createdAt:'desc'}
    })

    return convertToplainObject(data)
}

export async function getProductbyslug(slug:string){
     const prisma = new PrismaClient()
    return await prisma.product.findFirst({
        where: {slug:slug}
    })

}
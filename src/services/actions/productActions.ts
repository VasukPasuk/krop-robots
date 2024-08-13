"use server"

import {Product, Variant} from "@prisma/client";
import prisma from "../../../prisma/prisma-client";

export async function getAllProducts(limit?: number, skip?: number): Promise<Product[]> {
  try {
    const total = await prisma.product.findMany({
      take: limit || 9,
      skip: skip || 0,
    })
    if (!total) {
      return []
    }
    return total
  } catch (error) {
    return error
  }
}


export async function getProductById(id: number): Promise<{ product: Product, variants: Variant[] }> {
  const {variants, ...rest} = await prisma.product.findUnique({where: {id}, include: {variants: true}})

  return {
    product: rest,
    variants: variants
  }
}
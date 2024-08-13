import {NextRequest, NextResponse} from "next/server";
import {Product} from "@prisma/client";
import prisma from "../../../../prisma/prisma-client";




export async function GET(req:NextRequest, res:NextResponse) {
  const params = {
    skip: Number(req.nextUrl.searchParams.get("skip")) || 0,
    take: Number(req.nextUrl.searchParams.get("take")) || 10,
    category: req.nextUrl.searchParams.get("category") || "",
    search: req.nextUrl.searchParams.get("search") || ""
  }
  try {
    const products = await prisma.product.findMany({
      where: {
        category_name: {
          mode: "insensitive",
          contains: params.category,
        },
        name: {
          mode: "insensitive",
          contains: params.search,
        }
      },
      take: params.take,
      skip: params.skip
    })
    const total = await prisma.product.count({
      where: {
        category_name: {
          mode: "insensitive",
          contains: params.category,
        },
        name: {
          mode: "insensitive",
          contains: params.search,
        }
      },
    })
    return Response.json({
      products: products,
      total: total,
    })
  } catch (e) {
    return Response.error()
  }
}
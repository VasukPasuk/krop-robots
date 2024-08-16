import {NextRequest, NextResponse} from "next/server";
import {Product} from "@prisma/client";
import prisma from "../../../../prisma/prisma-client";


export async function GET(req: NextRequest, res: NextResponse) {
  const params = {
    skip: Number(req.nextUrl.searchParams.get("skip")) || 0,
    take: Number(req.nextUrl.searchParams.get("take")) || 10,
    category: req.nextUrl.searchParams.get("category") || "",
    search: req.nextUrl.searchParams.get("search") || ""
  }
  try {
    const products = await prisma.product.findMany({
      where: {
        category_name: params.category ? {
          mode: "insensitive",
          contains: params.category,
        } : undefined,
        name: params.search ? {
          mode: "insensitive",
          contains: params.search,
        } : undefined,
        description: {
          not: "t"
        }
      },
      take: params.take,
      skip: params.skip,
      orderBy: {
        variants: {
          _count: "desc"
        },
      },
    })
    const total = await prisma.product.count({
      where: {
        category_name: params.category ? {
          mode: "insensitive",
          equals: params.category,
        } : undefined,
        name: params.search ? {
          mode: "insensitive",
          equals: params.search,
        } : undefined,
        description: {
          not: "t"
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
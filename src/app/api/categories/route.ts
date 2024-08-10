import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest, res: NextResponse) {
  let categories = [];
  const params = {
    skip: Number(req.nextUrl.searchParams.get("skip")) || 0,
    take: Number(req.nextUrl.searchParams.get("take")) || 10,
  }
  try {
    categories = await prisma.category.findMany({
      skip: params.skip,
      take: params.take,
    })
  } catch (e) {
    return NextResponse.error()
  }

  return NextResponse.json(
    categories
  )
}
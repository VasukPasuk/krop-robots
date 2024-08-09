import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest, res: NextResponse) {
  let categories = [];
  try {
    categories = await prisma.category.findMany()
  } catch (e) {
    return NextResponse.error()
  }

  return NextResponse.json({
    categories: categories
  })
}
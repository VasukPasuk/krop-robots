import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const product_id = Number(req.nextUrl.searchParams.get("id"));

    const variants = await prisma.variant.findMany({
      where: {
        product_id
      }
    });

    return Response.json(variants)
  } catch (e) {
    return Response.error()
  }
}
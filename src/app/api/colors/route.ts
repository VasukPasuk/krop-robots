import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const colors = await prisma.color.findMany();
    return Response.json(colors)
  } catch (e) {
    return Response.error()
  }
}
import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest, res: NextResponse) {
  const params = {
    skip: Number(req.nextUrl.searchParams.get("skip")) || 0,
    take: Number(req.nextUrl.searchParams.get("take")) || 9,
  }
  try {
    const result = await prisma.category.findMany({
      skip: params.skip,
      take: params.take,
    })
    return Response.json(result)
  } catch (e) {
    return Response.error()
  }
}

type PostRequestBody = {
  name: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data:PostRequestBody = await req.json()
    const result = await prisma.category.create({
      data: {
        name: data.name,
      }
    })
    return Response.json(result);
  } catch (e) {
    return Response.error();
  }
}


export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const result = await prisma.category.deleteMany()
    return Response.json(result)
  } catch (e) {
    return Response.json({message: 'Something went wrong'});
  }
}
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

type RequestBody = {
  name: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = req.body as unknown as string
    const result = await prisma.category.create({
      data: {
        name: JSON.parse(data),
      }
    })
    return Response.json({message: 'Something went wrong'});
  } catch (e) {
    return Response.json({message: 'Something went wrong'});
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

import prisma from "../../../../../prisma/prisma-client";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest,  { params: {name} }: { params: { name: string } }) {
  try {
    if (name === "") throw new Error(`Invalid product name "${name}"`);
    const category = await prisma.category.findUnique({where: {name: name}});
    return Response.json(category)
  } catch (e) {
    Response.json("Error.")
  }
}
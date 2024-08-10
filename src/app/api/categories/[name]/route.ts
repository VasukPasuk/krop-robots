import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../../../prisma/prisma-client";

export async function GET(req: NextApiRequest,  { params: {name} }: { params: { name: string } }) {
  try {
    if (name === "") throw new Error(`Invalid product name "${name}"`);
    const category = await prisma.category.findUnique({where: {name: name}});
    return Response.json(category)
  } catch (e) {
    Response.json("Error.")
  }
}
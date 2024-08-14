import prisma from "../../../../../prisma/prisma-client";


export async function GET(
  request: Request,
  {params}: { params: { id: string } }
) {
  const id = Number(params.id)
  try {
    const result = await prisma.product.findUnique({where: {id: id}})
    if (!result) throw new Error(`Product with id ${id} not found`)
    return Response.json(result)
  } catch (e) {
    return  Response.error()
  }
}
import prisma from "../../../../../prisma/prisma-client";


export async function DELETE(
  request: Request,
  {params}: { params: { name: string } }
) {
  const name = params.name // 'a', 'b', or 'c'
  try {
    const result = await prisma.category.delete({where: {name: name}})
    return Response.json(result)
  } catch (e) {
    return console.log(e)
  }
}


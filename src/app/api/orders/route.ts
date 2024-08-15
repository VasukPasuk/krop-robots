import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../prisma/prisma-client";
import {UserCartItemType} from "@/features/localStorageFunctions";
import {OrderItems} from "@prisma/client";

type PostRequestBody = {
  phone_number: string,
  email: string,
  name: string,
  first_surname: string,
  second_surname: string,
  items: UserCartItemType[]
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {items, ...user}: PostRequestBody = await req.json()
    const preparedItemsData = items.map(({variant, amount, color, plastic, product}) => ({
      product_id: product.id,
      variant_id: variant.id,
      color_name: color.name,
      amount: amount,
      price: variant.price * amount,
      plastic: plastic,
    }))
    const totalPrice = items.reduce((prev, data) => prev + data.amount * data.variant.price, 0)
    const totalAmount = items.reduce((prev, data) => prev + data.amount, 0)

    const result = await prisma.order.create({
      data: {
        ...user,
        amount: totalAmount,
        price: totalPrice,
        order_items: {
          createMany: {
            data: preparedItemsData
          }
        }
      }
    })
    return Response.json(result);
  } catch (e) {
    return Response.error();
  }
}
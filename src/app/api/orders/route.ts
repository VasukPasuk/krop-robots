import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma-client";
import { UserCartItemType } from "@/features/localStorageFunctions";

type PostRequestBody = {
  phone_number: string;
  email: string;
  name: string;
  first_surname: string;
  second_surname: string;
  items: UserCartItemType[];
  dataJSON: string
  // locality: string;
  // department_index: number;
  // delivery_company: string;
  // payment_type: string;
  // commentary: string;
  // delivery_type: string;
  //
  // mail_index: number;
  // house: string;
  // floor: string;
  // street: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { items, ...rest }: PostRequestBody = await req.json();

    const preparedItemsData = items.map(({ variant, amount, color, plastic, product }) => ({
      product_id: product.id,
      variant_id: variant.id,
      color_name: color.name,
      amount: amount,
      price: variant.price * amount,
      plastic: plastic,
    }));

    const totalPrice = items.reduce((prev, data) => prev + data.amount * data.variant.price, 0);
    const totalAmount = items.reduce((prev, data) => prev + data.amount, 0);

    console.log(rest)

    const result = await prisma.order.create({
      data: {
        data: JSON.parse(rest.dataJSON),
        first_surname: rest.first_surname,
        name: rest.name,
        phone_number: rest.phone_number,
        second_surname: rest.second_surname,
        email: rest.email,

        amount: totalAmount,
        price: totalPrice,
        order_items: {
          createMany: {
            data: preparedItemsData,
          },
        },
      },
    });

    return Response.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}

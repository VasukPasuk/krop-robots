import {NextResponse} from "next/server";

export async function GET() {
  return NextResponse.json({
    products: ["prod1", "prod2", "prod3"]
  })
}
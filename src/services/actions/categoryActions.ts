"use server"

import prisma from "../../../prisma/prisma-client";
import {revalidatePath} from "next/cache";
import {URLS} from "@/constants";

export async function createCategory(name: string) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: name,
      }
    })
    if (!newCategory) throw new Error("Category already exists")
    revalidatePath("/d033e22ae348aeb5660fc2140aec35850c4da997/admin/managament/categories")
    return newCategory
  } catch (e) {
    return "Error"
  }
}

export async function deleteCategory(name: string) {
  try {
    const result = await prisma.category.delete({
      where: {
        name: name,
      }
    })
    revalidatePath("/d033e22ae348aeb5660fc2140aec35850c4da997/admin/managament/categories")
  } catch (e) {
    return "Error"
  }
}

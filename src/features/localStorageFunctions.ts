"use client"

import {IColor, IProduct, IVariant} from "@/interfaces";

export type UserCartItemType = {
  product: IProduct,
  variant: IVariant,
  color: IColor,
  plastic: "PLA" | "CoPET",
  photo: string,
  amount: number,
  price?: number
}

export function setProductToCart(data: UserCartItemType) {
  const userCartItem: UserCartItemType = {
    color: data.color,
    product: data.product,
    variant: data.variant,
    plastic: data.plastic,
    photo: data.photo,
    amount: data.amount || 1
  }

  const storedCartItems = localStorage.getItem("cartItems");
  const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : {}

  localStorage.setItem("cartItems", JSON.stringify({
    ...parsedCartItems,
    [userCartItem.color.hex + userCartItem.product.name + userCartItem.variant.price + userCartItem.plastic]: userCartItem
  }))
}

export function deleteProduct(key: string) {
  const fullCart = JSON.parse((localStorage.getItem("cartItems") || {}) as string);
  Object.entries(fullCart).forEach(([data_key]) => {
    if (data_key == key) delete fullCart[key]
  })
  localStorage.setItem("cartItems", JSON.stringify(fullCart));
}

export function deleteProductAndReturn(key: string) {
  const fullCart = JSON.parse((localStorage.getItem("cartItems") || {}) as string);
  Object.entries(fullCart).forEach(([data_key]) => {
    if (data_key == key) delete fullCart[key]
  })
  localStorage.setItem("cartItems", JSON.stringify(fullCart));
  return fullCart
}

export function clearProductCart() {
  localStorage.setItem("cartItems", JSON.stringify({}));
  return {}
}


export function getAllCartItems():{ [key: string]: UserCartItemType } {
  const storedCartItems = localStorage.getItem("cartItems");
  return storedCartItems ? JSON.parse(storedCartItems) : {};
}


export function incrementProduct(key: string) {
  let fullCart: { [key: string]: UserCartItemType } = JSON.parse((localStorage.getItem("cartItems") || {}) as string);
  fullCart[key].amount += 1
  localStorage.setItem("cartItems", JSON.stringify(fullCart));
}

export function decrementProduct(key: string) {
  let fullCart: { [key: string]: UserCartItemType } = JSON.parse((localStorage.getItem("cartItems") || {}) as string);
  fullCart[key].amount = fullCart[key].amount !== 1 ? fullCart[key].amount - 1  :  1
  localStorage.setItem("cartItems", JSON.stringify(fullCart));
}
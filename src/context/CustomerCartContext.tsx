'use client'
import React, {createContext, FC, useState, ReactNode, useEffect, useMemo} from "react";
import {ToastContainer} from "react-toastify";
import {IColor, IProduct, IVariant} from "@/interfaces";
import {TPlastic} from "@/types";


export interface ICustomerCartContext {
  setItemToCart: (data: ICustomerCartData) => void,
  clearCart: () => void,
  deleteItem: (key: string) => void,
  cartItems: ICustomerCart,
  setAmount: (key: string, amount: number) => void
}

export const CustomerCartContext = createContext<ICustomerCartContext | undefined>(undefined);


export interface ICustomerCartData {
  product: IProduct,
  color: IColor,
  variant: IVariant,
  plastic: TPlastic,
  photo: string,
  amount: number
}

export interface ICustomerCart {
  [key: string]: ICustomerCartData;
}


export interface CustomerCartProviderProps {
  children: ReactNode;
}

export const CustomerCartProvider: FC<CustomerCartProviderProps> = ({children}) => {

  const [userCart, setUserCart] = useState<ICustomerCart>({})

  const setItemToCart = (data: ICustomerCartData) => {
    const uniqueCartItemKey = `${data.product.name}${data.color.name}${data.plastic}${data.variant.size_label}`
    setUserCart(prev => ({...prev, [uniqueCartItemKey]: data}))
  }

  const clearCart = () => {
    setUserCart({})
    localStorage.removeItem("cart");
  }

  const deleteItem = (key: string) => {
    setUserCart(prev => {
      const newData = {...prev};
      delete newData[key];
      return newData;
    });
  };

  const setAmount = (key: string, amount: number) => {
    setUserCart(prev => {
      const newData = {...prev};
      newData[key] = {...newData[key], amount};
      return newData;
    });
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart") || 'null');
    if (storedItems) {
      setUserCart(storedItems);
    }
  }, []);

  useEffect(() => {

    if (Object.keys(userCart).length > 0) {
      localStorage.setItem("cart", JSON.stringify(userCart));
    } else {
      localStorage.removeItem("cart");
    }

  }, [userCart]);

  return (
    <CustomerCartContext.Provider value={{setItemToCart, clearCart, deleteItem, cartItems: userCart, setAmount}}>
      {children}
    </CustomerCartContext.Provider>
  );
};

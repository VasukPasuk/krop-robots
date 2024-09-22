'use client';
import React, {createContext, FC, useState, ReactNode, SetStateAction, Dispatch} from "react";
import {IVariant} from "@/interfaces";
import {useMutation} from "@tanstack/react-query";
import ProductService from "@/services/product.service";
import {toast} from "react-toastify";


interface ICreateProductContextValue {
  setProductData: (obj: Partial<ICreateProductDTO>) => void,
  productData: ICreateProductDTO,
  stateFn: Dispatch<SetStateAction<ICreateProductDTO>>,
  post: () => void
}


export const CreateProductContext = createContext<ICreateProductContextValue | undefined>(undefined);

type CreateProductProviderProps = {
  children: ReactNode;
}

const initialState: ICreateProductDTO = {
  photos: [],
  name: "",
  category_name: "",
  description: "",
  tags: [],
  variants: [],
}

export interface ICreateProductDTO {
  photos: File[]
  name: string
  category_name: string
  description: string
  tags: string[]
  variants: Omit<IVariant, "updated_at" | "created_at" | "id">[]
}

export const CreateProductProvider: FC<CreateProductProviderProps> = ({children}) => {
  const [productData, setProductData] = useState<ICreateProductDTO>(initialState)
  const setData = (obj: ICreateProductDTO) => {
    setProductData(prev => ({
      ...prev,
      ...obj
    }))
  }

  console.log(productData)

  const productMutation = useMutation({
    mutationFn:  async () =>  {
      return await ProductService.create(productData)
    },
    onSuccess: () => {
      toast.success("Продукт успішно створено!")
    },
    onError: err => {
      toast.error(err.message)
    }
  })

  return (
    <CreateProductContext.Provider value={{productData, setProductData: setData, stateFn: setProductData, post: () => productMutation.mutate()}}>
      {children}
    </CreateProductContext.Provider>
  );
};

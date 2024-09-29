'use client';
import React, {createContext, FC, useState, ReactNode, SetStateAction, Dispatch} from "react";
import {IVariant} from "@/interfaces";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ProductService from "@/services/product.service";
import {toast} from "react-toastify";
import {AxiosError} from "axios";


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

  const client = useQueryClient()

  const productMutation = useMutation({
    mutationFn: async () => {
      if (!productData.name.trim()) {
        toast.warn("І'мя товару не може бути пустим!");
        return Promise.reject()
      } else if (!productData.photos.length) {
        toast.warn("Для створення товару потрібне хоча б одне фото.");
        return Promise.reject()
      } else if (!productData.description.trim()) {
        toast.warn("Опис товару не повинен бути пустим.");
        return Promise.reject()
      } else if (!productData.description.trim()) {
        toast.warn("Опис товару не повинен бути пустим.");
        return Promise.reject()
      } else {
        return await ProductService.create(productData);
      }
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ["products"]
      })
      toast.success("Продукт успішно створено!");
      setProductData(initialState);
    },
    onError: (err: AxiosError) => {
      // @ts-ignore
      toast.error(err.response.data.message);
    }
  });


  return (
    <CreateProductContext.Provider
      value={{productData, setProductData: setData, stateFn: setProductData, post: () => productMutation.mutate()}}>
      {children}
    </CreateProductContext.Provider>
  );
};

"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Button, CircularProgress, Modal, Paper, Typography} from "@mui/material";
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
import CartButton from "@/custom-components/ui/CartButton";
import {Color, Product, Variant} from "@prisma/client";
import {getProductById} from "@/services/actions/productActions";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";

const SIZES = {}

function ProductPage({params}: { params: { id: string } }) {
  const [currentVariant, setCurrentVariant] = useState<number>(0)
  const [plasticVariant, setPlasticVariant] = useState<"PLA"|"CoPET">("PLA")
  const [currentColor, setCurrentColor] = useState<string | "Чорний">("Чорний")

  const [modal, setModal] = useState<boolean>(false)

  const {data, isLoading, isFetched} = useQuery({
    queryKey: ["product-page", params.id],
    queryFn: async () => {
      const result1 = await fetch(`/api/products/${params.id}`)
      const result2 = await fetch(`/api/variants?id=${params.id}`)
      const result3 = await fetch("/api/colors")
      if (!result1.ok || !result2.ok || !result3.ok) throw new Error("Error response")
      return {
        product: await result1.json() as Product,
        variants: await result2.json() as Variant[],
        colors: await result3.json() as Color[],
      }
    }
  })


  if (isLoading) {
    return (
      <div className={"container max-w-[1200px] h-[800px] flex items-center justify-center mx-auto mt-[112px] mb-64"}>
        <CircularProgress/>
      </div>
    )
  }

  const onAddToCartButtonHandler = () => {
    setModal(true)
  }

  const onModalButtonHandler = () => {
    toast.success(`Товар ${data.product.name} додано до кошика.`)
  }

  return (
    <>
      <ShopUpperBar/>
      <section className="container max-w-[1200px] flex flex-row mx-auto mt-[112px] mb-64 px-6 py-8 gap-x-8">
        <div className="rounded overflow-hidden h-fit">
          <Image className="hover:scale-110 transition-transform duration-700" width={400} height={400}
                 alt={"Product image"}
                 src={`https://drive.google.com/uc?export=view&id=${data.product.image_name}`}></Image>
        </div>
        <div>
          <Typography variant="h4" className="text-neutral-900 text-3xl">
            {data.product.name} - {currentColor}
          </Typography>
          <Typography variant="h5" className="text-neutral-800 text-xl">
            {data.product.category_name}
          </Typography>
          <div className="mt-6">
            <Typography variant="h5" className="text-neutral-700 text-3xl font-bold">
              {data.variants[currentVariant].price} грн. / шт.
            </Typography>
            {/*<Typography variant="h5" className="text-neutral-700 text-xl">*/}
            {/*  Discount (optional)*/}
            {/*</Typography>*/}
          </div>
          <div className="w-full mt-4">
            <Typography variant="h6" className="text-neutral-600 text-lg">
              Розмір / вага (мм. / гр.):
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              {data.variants.map(({weight, height, width, length}, index) => (
                <Button
                  key={index}
                  variant={currentVariant === index ?"contained" : "outlined"}
                  color={"info"}
                  size={"small"}
                  onClick={() => {
                    setCurrentVariant(prev => index)
                  }}
                >
                  {`${length}x${height}x${width} / ${weight}`}
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full mt-4">
            <Typography variant="h6" className="text-neutral-600 text-lg">
              Вид пластику:
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              <Button variant={plasticVariant === "PLA" ? "contained" : "outlined"} color={"info"} size={"small"} onClick={() => setPlasticVariant("PLA")}>
                PLA
              </Button>
              <Button variant={plasticVariant === "CoPET" ? "contained" : "outlined"} color={"info"} size={"small"} onClick={() => setPlasticVariant("CoPET")}>
                CoPET
              </Button>
            </div>
          </div>
          <div className="w-full mt-4">
            <Typography variant="h6" className="text-neutral-600 text-lg">
              Кольори:
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-2 mt-2">
              {data.colors.map(({hex, name}) => (
                <Paper className={`w-6 h-6 cursor-pointer`} style={{background: hex}} variant={"outlined"} onClick={() => setCurrentColor(name)}>

                </Paper>
              ))}
            </div>
          </div>
          <div className="w-full mt-8 flex flex-row justify-end gap-x-4">
            <CartButton cart={"add"} variant={"contained"} onClick={onAddToCartButtonHandler}/>
            {/*<CartButton cart={"remove"} variant={"contained"} color={"warning"}/>*/}
          </div>
        </div>
      </section>
      <Modal disableScrollLock className={"flex justify-center items-center"} open={modal} onClose={() => setModal(false)}>
        <Paper elevation={4} className="px-8 pr-24 pt-8 pb-6 flex flex-col items-start justify-center gap-y-8">
          <Typography variant={"h4"} className={"font-bold text-neutral-700"}> Деталі товару </Typography>
          <div className="flex flex-row items-start justify-center gap-x-8">
            <div className={"overflow-hidden rounded flex flex-row items-center justify-center relative"}>
              <Image className={"hover:scale-110 transition-transform duration-700"} width={250} height={250}
                     src={`https://drive.google.com/uc?export=view&id=${data.product.image_name}`}
                     alt={"Product image"}/>
            </div>
            <div className="flex flex-col items-start justify-center">
              <Typography variant={"h5"} className={"font-bold text-neutral-800"}>
                {data.product.name}
              </Typography>
              <Typography variant={"h6"} className={"text-neutral-700"}>
                {data.product.category_name}
              </Typography>
              <Typography variant={"subtitle1"}>
                Колір: {currentColor}
              </Typography>
              <Typography variant={"subtitle1"}>
                Розмірність: {data.variants[currentVariant].height}x{data.variants[currentVariant].width}x{data.variants[currentVariant].length}
              </Typography>
              <Typography variant={"subtitle1"}>
                Вага: {data.variants[currentVariant].weight} грам
              </Typography>
              <Typography variant={"subtitle1"}>
                Тип пластику: {plasticVariant}
              </Typography>
              <Typography variant={"h5"}>
                Ціна: {data.variants[currentVariant].price} грн
              </Typography>
            </div>
          </div>
          <CartButton
            cart={"add"}
            className={"self-end mr-[-4rem]"}
            variant={"contained"}
            onClick={onModalButtonHandler}
          />
        </Paper>
      </Modal>
    </>
  )
}

export default ProductPage
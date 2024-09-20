"use client"

import {Button, Divider, Paper, Rating, Tooltip} from "@mui/material";
import Image from "next/image";
import clsx from "clsx";
import {BiHeart} from "react-icons/bi";
import {MdAddShoppingCart, MdShoppingCart} from "react-icons/md";
import {useQueries, useQuery} from "@tanstack/react-query";
import ProductFetcher from "@/services/fetchers/ProductFetcher";
import {useState} from "react";
import ColorFetcher from "@/services/fetchers/ColorFetcher";
import {setProductToCart} from "@/features/localStorageFunctions";
import {IColor} from "@/interfaces";

type TypePlastic = "PLA" | "CoPET"

const PlasticVariants: TypePlastic[] = ["PLA", "CoPET"]

function ProductAbout({productName}: { productName: string }) {
  const [currentPhoto, setCurrentPhoto] = useState<number>(0)
  const [currentVariant, setCurrentVariant] = useState<string>("Стандарт")
  const [plastic, setPlastic] = useState<TypePlastic>("PLA")
  const [currentColor, setCurrentColor] = useState<string>("Чорний")
  const [productData, colorsData] = useQueries({
    queries: [
      {
        queryKey: ["product-with-details", productName],
        queryFn: () => ProductFetcher.getOneWithDetails(productName)
      },
      {
        queryKey: ["colors"],
        queryFn: () => ColorFetcher.getAll()
      }
    ]
  })

  if (productData.isLoading || colorsData.isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!productData.data || productData.isError || !colorsData.data || colorsData.isError) {
    return (
      <div>
        Error...
      </div>
    )
  }

  const {photos, variants, ProductHaveTag, category, ...product} = productData.data

  const variantObject = variants.find((variant) => variant.size_label === currentVariant);

  const colorsObject: IColor = colorsData.data.items.find((color) => color.name === currentColor);

  const addToCartHandler = () => {
    setProductToCart({
      product: product,
      plastic: plastic,
      color: colorsObject,
      variant: variantObject,
      amount: 1,
      photo: photos[0].source
    })
  }

  return (
    <div className="flex lg:flex-row flex-col gap-y-4 lg:gap-x-4 mb-16">
      <div className="flex flex-col gap-y-4 flex-1">
        <Paper elevation={1} className="sm:p-6 py-8 flex flex-col items-center justify-center">
          <Paper
            className="relative w-[20rem] h-[16rem] sm:w-[28rem] sm:h-[20rem]  lg:w-[34rem] lg:h-[26rem] overflow-hidden rounded">
            <Image
              className="hover:scale-110 transition-transform duration-700"
              alt="Фото продукта"
              src={`${process.env.NEXT_PUBLIC_API_URL}/${photos[currentPhoto].source}`}
              fill
            />
          </Paper>
          <div className="flex flex-row gap-x-4 mt-4 justify-start w-full px-5 overflow-x-auto">
            {photos.length > 2 && (
              <>
                {photos.map((photo, i) => (
                  <Paper
                    onClick={() => setCurrentPhoto(i)}
                    className={clsx("relative h-24 w-24 hover:scale-105 transition-transform duration-700 rounded cursor-pointer overflow-hidden", {
                      "border-solid border-2 border-amber-950": i === currentPhoto
                    })}
                  >
                    <Image key={photo.source} src={`${process.env.NEXT_PUBLIC_API_URL}/${photo.source}`} fill
                           alt="Фото продукта"/>
                  </Paper>
                ))}
              </>
            )}
          </div>
        </Paper>
        <Paper elevation={1} className="p-6 col-span-6 flex flex-col gap-y-2">
          <h4>
            Характеристика
          </h4>
          <div className="flex flex-row gap-x-2 items-center">
            Висота
            <div className="w-full h-[1px] bg-neutral-300"/>
            <div className="flex gap-x-1">
              {variantObject.height}
              <span>мм.</span>
            </div>
          </div>
          <div className="flex flex-row gap-x-2 items-center">
            Довжина
            <div className="w-full h-[1px] bg-neutral-300"/>
            <div className="flex gap-x-1">
              {variantObject.length}
              <span>мм.</span>
            </div>
          </div>
          <div className="flex flex-row gap-x-2 items-center">
            Ширина
            <div className="w-full h-[1px] bg-neutral-300"/>
            <div className="flex gap-x-1">
              {variantObject.width}
              <span>мм.</span>
            </div>
          </div>
          <div className="flex flex-row gap-x-2 items-center">
            Вага
            <div className="w-full h-[1px] bg-neutral-300"/>
            <div className="flex gap-x-1">
              {variantObject.weight}
              <span>
                г.
              </span>
            </div>
          </div>
        </Paper>
      </div>
      <div className="flex flex-col gap-y-4 flex-1">
        <div className="p-4 shadow flex flex-col gap-y-2">
          <div className={"text-neutral-800 text-3xl text-bold"}>
            {product.name}
          </div>
          <div className={"text-neutral-800/70 text-xl text-semibold"}>
            {product.category_name}
          </div>
          <div className={"text-neutral-800"}>
            {product.description}
          </div>
        </div>
        <div className="p-4 shadow flex flex-col gap-y-2">
          <div>
            Колір: {currentColor}
          </div>
          <div className="flex gap-x-2">
            {colorsData.data.items.map((color, i) => (
              <Tooltip title={color.name}>
                <Paper
                  onClick={() => setCurrentColor(color.name)}
                  className="w-6 h-6 rounded cursor-pointer"
                  style={{backgroundColor: color.hex}}
                />
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="p-4 shadow flex flex-col gap-y-2">
          <div>
            Пластик: {plastic}
          </div>
          <div className="flex gap-x-2">
            {PlasticVariants.map((kind, i) => (
              <Button variant={"contained"} color={kind !== plastic ? "primary" : "secondary"} onClick={() => {
                setPlastic(kind)
              }}>
                {kind}
              </Button>
            ))}
          </div>
        </div>
        <div className="p-4 shadow flex flex-col gap-y-2">
          <div>
            Варіант: {currentVariant}
          </div>
          <div className="flex gap-x-2">
            {variants.map((variant, i) => (
              <Button
                onClick={() => setCurrentVariant(_ => variant.size_label)}
                variant="contained"
                color={variant.size_label === currentVariant ? "secondary" : "primary"}
              >
                {variant.size_label}
              </Button>
            ))}
          </div>
        </div>
        <div className="p-4 shadow flex justify-between items-center">
          <div>
            <span className="text-3xl">
              {variantObject.price}
            </span>
            <span className="ml-1 text-3xl">
              грн.
            </span>
          </div>
          <div>
            <Button
              variant={"contained"}
              color={"success"}
              onClick={addToCartHandler}
              endIcon={<MdAddShoppingCart/>}
              className="normal-case"
            >
              До кошика
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAbout
"use client"

import {Button, Divider, Paper, Rating, Tooltip} from "@mui/material";
import Image from "next/image";
import clsx from "clsx";
import {BiHeart} from "react-icons/bi";
import {MdShoppingCart} from "react-icons/md";
import {useQuery} from "@tanstack/react-query";
import ProductFetcher from "@/services/fetchers/ProductFetcher";
import {useState} from "react";

type TypePlastic = "PLA" | "CoPET"

const PlasticVariants: TypePlastic[] = ["PLA", "CoPET"]

function ProductAbout({productName}: { productName: string }) {
  const [currentPhoto, setCurrentPhoto] = useState<number>(0)
  const [currentVariant, setCurrentVariant] = useState<string>("Стандарт")
  const [plastic, setPlastic] = useState<TypePlastic>("PLA")
  const {data, isLoading, isError} = useQuery({
    queryKey: ["product-with-details", productName],
    queryFn: () => ProductFetcher.getOneWithDetails(productName)
  })

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div>
        Error...
      </div>
    )
  }

  const {photos, variants, ProductHaveTag, category, ...product} = data

  const variantObject = variants.find((variant) => variant.size_label === currentVariant);


  return (
    <div className="flex gap-x-4 mb-16">
      <div className="flex flex-col gap-y-4 flex-1">
        <Paper elevation={1} className="p-6 py-8 col-span-6 flex flex-col items-center justify-center">
          <Paper className="relative w-[34rem] h-[26rem] overflow-hidden rounded">
            <Image
              className="hover:scale-110 transition-transform duration-700"
              alt="Фото продукта"
              src={`${process.env.NEXT_PUBLIC_API_URL}/${data.photos[currentPhoto].source}`}
              fill
            />
          </Paper>
          <div className="flex flex-row gap-x-4 mt-4">
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
        <Paper elevation={1} className="p-6 col-span-6 flex flex-col gap-y-2 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-bold text-3xl">
              {product.name}
            </h3>


            <Tooltip title="Додати до улюбленого">
              <div className="p-2 rounded hover:bg-black/5 transition-colors duration-500 ease-in-out cursor-pointer">
                <BiHeart size={28}/>
              </div>
            </Tooltip>
          </div>
          <div>
            <Rating precision={0.5} />

          </div>
          <h4 className="text-bold text-xl text-neutral-600">
            {product.category_name}
          </h4>

          <h5 className="mt-2">
            {product.description}
          </h5>
          <div className="flex flex-wrap gap-2 mb-4 mt-4">
            {ProductHaveTag.map((tag, i) => (
              <div
                className="px-2 py-1 rounded border-[1px] border-solid border-neutral-400 font-light hover:bg-black/5 transition-colors duration-300 ease-in">
                {tag.tag_name}
              </div>
            ))}
          </div>

          <Divider/>

          <h5 className="mt-2">
            Пластик: {plastic}
          </h5>
          <div className="mb-4 flex gap-x-4">
            {PlasticVariants.map((kind, i) => (
              <Button variant={"contained"} color={kind !== plastic ? "primary" : "secondary"} onClick={() => {
                setPlastic(kind)
              }}>
                {kind}
              </Button>
            ))}
          </div>

          <Divider/>

          <h5 className="mt-2">
            Поточний варіант: {currentVariant}
          </h5>
          <div className="flex gap-x-3">
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
          <h5 className="mt-12 text-3xl font-bold">
            {variants.find((variant) => variant.size_label === currentVariant).price} грн.
          </h5>
          <h5 className="flex gap-x-4 mt-2">
            <Button size="large" className="normal-case" variant="contained" color="success"
                    endIcon={<MdShoppingCart/>}>
              Купити
            </Button>
          </h5>
        </Paper>
      </div>
    </div>
  )
}

export default ProductAbout
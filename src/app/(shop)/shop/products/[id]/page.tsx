"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Button, CircularProgress, Paper, Typography} from "@mui/material";
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
import CartButton from "@/custom-components/ui/CartButton";
import {Product, Variant} from "@prisma/client";
import {getProductById} from "@/services/actions/productActions";

const SIZES = {}

function ProductPage({params}: { params: { id: string } }) {
  const [product, setProduct] = useState<Product>()
  const [variants, setVariants] = useState<Variant[]>()
  const [currentVariant, setCurrentVariant] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true);
  const [plasticVariant, setPlasticVariant] = useState<"PLA"|"CoPET">("PLA")

  useEffect(() => {
    const initData = async () => {
      const {variants, product} = await getProductById(Number(params.id))
      setProduct(product)
      setVariants(variants)
      setLoading(false)
    }
    initData().catch(e => console.log(e))
  }, []);

  if (loading) {
    return <>
      <CircularProgress/>
    </>
  }

  return (
    <>
      <ShopUpperBar/>
      <section className="container max-w-[1200px] flex flex-row mx-auto mt-[112px] mb-64 px-6 py-8 gap-x-8">
        <div className="rounded overflow-hidden h-fit">
          <Image className="hover:scale-110 transition-transform duration-700" width={400} height={400}
                 alt={"Product image"}
                 src={`https://drive.google.com/uc?export=view&id=${product.image_name}`}></Image>
        </div>
        <div>
          <Typography variant="h4" className="text-neutral-900 text-3xl">
            {product.name}
          </Typography>
          <Typography variant="h5" className="text-neutral-800 text-xl">
            {product.category_name}
          </Typography>
          <div className="mt-6">
            <Typography variant="h5" className="text-neutral-700 text-xl">
              {variants[currentVariant].price} грн. / шт.
            </Typography>
            {/*<Typography variant="h5" className="text-neutral-700 text-xl">*/}
            {/*  Discount (optional)*/}
            {/*</Typography>*/}
          </div>
          <div className="w-full mt-4">
            <Typography variant="h6" className="text-neutral-600 text-lg">
              Розмір / вага (мм. / кг.):
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              {variants.map(({weight, height, width, length}, index) => (
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
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              <Paper className="w-6 h-6" variant={"outlined"}>

              </Paper>
            </div>
          </div>
          <div className="w-full mt-8 flex flex-row justify-end gap-x-4">
            <CartButton cart={"add"} variant={"contained"}/>
            <CartButton cart={"remove"} variant={"contained"} color={"warning"}/>
          </div>
        </div>
      </section>
    </>

  )
}

export default ProductPage
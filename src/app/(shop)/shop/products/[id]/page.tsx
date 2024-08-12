import React from 'react';
import Image from "next/image";
import {Button, Paper, Typography} from "@mui/material";
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";
import CartButton from "@/custom-components/ui/CartButton";

const SIZES = {}

function ProductPage({params}: { params: { id: string } }) {

  const id = params.id
  return (
    <>
      <ShopUpperBar/>
      <section className="container max-w-[1200px] flex flex-row mx-auto mt-[112px] px-6 py-8 gap-x-8">
        <div className="rounded overflow-hidden">
          <Image className="hover:scale-110 transition-transform duration-700" width={400} height={400}
                 alt={"Product image"}
                 src={"/ProductTestImage.webp"}></Image>
        </div>
        <div>
          <Typography variant="h4" className="text-neutral-900 text-3xl">
            Name
          </Typography>
          <Typography variant="h5" className="text-neutral-800 text-xl">
            Category
          </Typography>
          <div className="mt-6">
            <Typography variant="h5" className="text-neutral-700 text-xl">
              30 грн. / шт.
            </Typography>
            <Typography variant="h5" className="text-neutral-700 text-xl">
              Discount (optional)
            </Typography>
          </div>
          <div className="w-full mt-4">
            <Typography variant="h6" className="text-neutral-600 text-lg">
              Розмір / вага (мм. / кг.):
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              <Button variant="contained" color={"info"} size={"small"}>
                56x76x94 / 0.5
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94 / 0.5
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94 / 0.5
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94 / 0.5
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94 / 0.5
              </Button>
            </div>
          </div>
          <div className="w-full mt-4">
            <Typography variant="h6" className="text-neutral-600 text-lg">
              Вид пластику:
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              <Button variant="contained" color={"info"} size={"small"}>
                PLH
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
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
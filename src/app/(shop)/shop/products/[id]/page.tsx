import React from 'react';
import Image from "next/image";
import {Button, Typography} from "@mui/material";
import ShopUpperBar from "@/custom-components/ui/ShopUpperBar/ShopUpperBar";


const SIZES = {}

function ProductPage({params}: { params: { id: string } }) {
  const id = params.id
  return (
    <>
      <ShopUpperBar/>
      <section className="container max-w-[1200px] flex flex-row mx-auto mt-[112px] px-6 py-8 gap-x-8">
        <div className="rounded overflow-hidden">
          <Image className="hover:scale-110 transition-transform duration-700" width={400} height={400} alt={"Product image"}
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
              Доступні розміри (мм.):
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              <Button variant="contained" color={"info"} size={"small"}>
                56x76x94
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94
              </Button>
            </div>
          </div>
          <div className="w-full mt-4">
            <Typography variant="h6" className="text-neutral-600 text-lg">
              Вид пластику:
            </Typography>
            <div className="flex flex-row flex-wrap items-center justify-start gap-x-4 mt-2">
              <Button variant="contained" color={"info"} size={"small"}>
                56x76x94
              </Button>
              <Button variant="outlined" color={"info"} size={"small"}>
                56x76x94
              </Button>
            </div>
          </div>
          <Typography variant="h6" className="text-neutral-600 text-base mt-4">

          </Typography>
        </div>
      </section>
    </>

  )
}

export default ProductPage
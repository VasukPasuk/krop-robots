import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {IoCart} from "react-icons/io5";
import Image from "next/image";

interface IProductCardProps {
  children?: React.ReactNode
}

function ProductCard(props: IProductCardProps) {
  const {} = props;
  return (
    <Card className="flex flex-col justify-between pt-1 pb-1 min-h-64 hover:shadow-xl">
      <CardContent className="flex flex-row h-full">
        <div className="w-[80%] bg-amber-400 relative rounded overflow-hidden">
          <Image fill alt={"Product image"} src={"/ProductTestImage.webp"}/>
        </div>
        <div className="container w-full flex flex-col pl-3">
          <Typography variant="h5" className="text-neutral-900 text-[1.45rem] font-bold">
            Назва
          </Typography>
          <Typography variant="h6" className="text-neutral-600 text-[.95rem]">
            Аксесуар
          </Typography>
        </div>
      </CardContent>
      <CardActions className="flex justify-end">
        <Button size="small" variant="text">
          <IoCart size={24}/>
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
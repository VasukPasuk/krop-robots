import React from 'react';
import {Button, Card, CardActions, CardContent, IconButton, Input, Typography} from "@mui/material";
import Image from "next/image";
import {MdHorizontalRule, MdPlusOne} from "react-icons/md";
import {FaPlus} from "react-icons/fa6";

function CartItem() {

  return (
    <div className="p-1">
      <Card className="flex h-full flex-col w-full">
        <CardContent className="h-full container flex flex-row gap-x-4">
          <div className="relative overflow-hidden rounded w-[100px] h-[100px]">
            <Image fill src={"/ProductTestImage.webp"} alt={"Cart product item"}/>
          </div>
          <div>
            <Typography variant="h5" className="text-neutral-900 text-[1.345rem] font-bold">
              Product
            </Typography>
            <Typography variant="h6" className="text-neutral-500 text-[.85rem]">
              Accessory
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <div className="flex justify-start items-start gap-x-4">
            <IconButton color="primary">
              <FaPlus className="text-xl"/>
            </IconButton>
            <Input className="w-12 text-center" defaultValue={1}>
            </Input>
            <IconButton color="error">
              <MdHorizontalRule className="text-xl" />
            </IconButton>
          </div>
          <Button>

          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CartItem
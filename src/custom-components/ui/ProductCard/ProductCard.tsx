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
    <Card className="flex flex-col justify-between pt-1 pb-1">
      <CardContent className="flex flex-row h-full">
        {/*<Typography className="text-1xl" color="text.secondary" gutterBottom>*/}
        {/*  Word of the Day*/}
        {/*</Typography>*/}
        {/*<Typography variant="h5" component="div">*/}
        {/*  tEST*/}
        {/*</Typography>*/}
        {/*<Typography className="mb-2" color="text.secondary">*/}
        {/*  adjective*/}
        {/*</Typography>*/}
        {/*<Typography variant="body2">*/}
        {/*  well meaning and kindly.*/}
        {/*  <br />*/}
        {/*  {'"a benevolent smile"'}*/}
        {/*</Typography>*/}

        <div className="w-[80%] bg-amber-400 relative rounded overflow-hidden">
          <Image fill alt={"Product image"} src={"/ProductTestImage.webp"}/>
        </div>
        <div className="container w-full">

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
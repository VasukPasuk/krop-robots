"use client"


import {IProduct} from "@/interfaces";
import Image from "next/image";
import {IconButton} from "@mui/material";
import {MdShoppingCart} from "react-icons/md";
import {useRouter} from "next/navigation";

interface ICatalogCardProps {
  data: IProduct
}


function CatalogCard(props: ICatalogCardProps) {
  const {popular, name, discount, description, category_name, updated_at, id, created_at, photos, variants} = props.data

  const router = useRouter();
  const moveToProductPage = () => router.push(`${location.href}/${name}`);

  const addToFavouritesClick = () => {};

  const onCardClick = () => {
    moveToProductPage()
  }

  return (
    <div
      className="h-[350px] bg-black/5 flex flex-col flex-1 overflow-hidden rounded-md hover:-translate-y-2 transition-transform duration-1000 ease-out cursor-pointer"
      onClick={onCardClick}
    >
      <div className="relative h-56 overflow-hidden">
        <Image className="hover:scale-110 transition-transform duration-1000 ease-out" alt={"photo"} src={process.env.NEXT_PUBLIC_API_URL + `/${photos[0].source}`} fill/>
      </div>
      <div className="p-2 flex flex-col flex-1 h-full justify-between">
        <div>
          <span className="text-lg font-bold line-clamp-2 leading-5">{name}</span>
          <span>{category_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {variants[0]?.price} грн.
          </span>
          <IconButton>
            <MdShoppingCart/>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default CatalogCard;
"use client"


import {IProduct} from "@/interfaces";
import Image from "next/image";
import {IconButton, Paper} from "@mui/material";
import {MdShoppingCart} from "react-icons/md";
import {useRouter} from "next/navigation";

interface ICatalogCardProps {
  data: IProduct
}


function CatalogCard(props: ICatalogCardProps) {
  const {popular, name, discount, description, category_name, updated_at, id, created_at, photos, variants} = props.data

  const router = useRouter();
  const moveToProductPage = () => router.push(`${location.pathname}/${name}`);

  const addToFavouritesClick = () => {};

  const onCardClick = () => {
    moveToProductPage()
  }

  return (
    <div
      className="h-[350px] flex flex-col flex-1 overflow-hidden rounded-md hover:-translate-y-2 transition-transform duration-1000 ease-out cursor-pointer shadow"
      onClick={onCardClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          className="hover:scale-110 transition-transform duration-1000 ease-out w-full h-full"
          alt={"photo"}
          src={process.env.NEXT_PUBLIC_API_URL + `/static/${photos[0].source}`}
        />
      </div>
      <div className="p-2 flex flex-col flex-1 h-full justify-between">
        <div>
          <span className="text-xl font-medium line-clamp-2 leading-5">{name}</span>
          <span className="text-[0.95rem] text-neutral-800/80">{category_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-medium">
            ₴ {variants[0]?.price} / шт.
          </span>
          <div className="p-2 rounded bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-700 ease-in-out">
            <MdShoppingCart size={24}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogCard;
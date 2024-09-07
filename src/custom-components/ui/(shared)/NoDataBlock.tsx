import {BsClipboardData} from "react-icons/bs";
import React from "react";
import clsx from "clsx";

interface INoDataBlockProps {
  children?: React.ReactNode;
}

export default function NoDataBlock({children}:INoDataBlockProps) {
  return (
    <div className="flex flex-col gap-y-4 w-full h-[80dvh] items-center justify-center text-2xl text-neutral-400 font-light">
      <BsClipboardData className="text-9xl"/>
      {children}
    </div>
  )
}
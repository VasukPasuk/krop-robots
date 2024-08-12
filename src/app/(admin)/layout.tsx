import React from "react";
import {Metadata} from "next";

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Krop Robots Admin",
  robots: {index: false}
}

export default function layout({children}: LayoutProps) {
  return (
    <>
      {children}
    </>
  )
}
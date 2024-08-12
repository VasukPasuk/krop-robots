import React from "react";

type LayoutProps = {
  children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <>
      {children}
    </>
  )
}
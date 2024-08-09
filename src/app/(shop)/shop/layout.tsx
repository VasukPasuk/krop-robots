import React from 'react';

type LayoutProps = Readonly<{
  children: React.ReactNode,
  product: React.ReactNode
}>

function Layout({children, product}: LayoutProps) {
  return (
    <>
      {children}
      {product}
    </>
  )
}

export default Layout
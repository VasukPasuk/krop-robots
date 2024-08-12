import React from 'react';
import Image from "next/image"


interface IAdminHeaderProps {
  children?: React.ReactNode
}

function AdminHeader(props: IAdminHeaderProps) {
  const {} = props;
  return (
    <header className="flex items-center justify-between px-8 h-16 bg-blue-600 fixed w-full z-50">
      <Image width={160} height={64} src="/logo_white.png" alt={"logo"} />
      <div/>
    </header>
  )
}

export default AdminHeader
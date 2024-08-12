import React from 'react';
import Image from "next/image"


interface IAdminHeaderProps {
  children?: React.ReactNode
}

function AdminHeader(props: IAdminHeaderProps) {
  const {} = props;
  return (
    <header className="flex items-center justify-end px-8">
      <Image width={112} height={64} src="/logo-.png" alt={"logo"} />
    </header>
  )
}

export default AdminHeader
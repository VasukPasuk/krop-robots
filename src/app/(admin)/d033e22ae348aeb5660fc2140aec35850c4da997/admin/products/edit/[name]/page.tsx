import React from 'react';
import AdminEditProductWrapper from "@/custom-components/ui/(admin)/ProductEditPage/AdminEditProductWrapper";


function Page({params}: { params: { name: string } }) {
  return (
    <>
      <AdminEditProductWrapper productName={decodeURI(params.name)}/>
    </>
  )
}

export default Page
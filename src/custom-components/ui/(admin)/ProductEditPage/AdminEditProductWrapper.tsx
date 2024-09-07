"use client"
import AdminEditProductForm from "@/custom-components/ui/(admin)/ProductEditPage/AdminEditProductForm";
import AdminManageVariantsForm from "@/custom-components/ui/(admin)/ProductEditPage/AdminManageVariantsForm";
import {axiosWithAuth} from '@/services/axios/axios.interceptors'
import queryString from "query-string";
import {SearchQuery} from "@/utils/SearchQuery";
import {notFound} from "next/navigation";
import {CircularProgress} from "@mui/material";
import {PRODUCT_INCLUDES} from "@/constants/enums";
import {IProduct} from "@/interfaces";
import {ImagesUploader} from "@/custom-components/ui/(admin)/ProductEditPage/ImagesUploader";

function AdminEditProductWrapper({productName} : {productName: string}) {


  return (
    <div className={"flex flex-col gap-y-8"}>
      <div className={"flex flex-row w-full gap-x-8"}>
        <ImagesUploader productName={productName}/>
        <AdminEditProductForm productName={productName}/>
      </div>
      <AdminManageVariantsForm productName={productName}/>
    </div>
  )
}

export default AdminEditProductWrapper;
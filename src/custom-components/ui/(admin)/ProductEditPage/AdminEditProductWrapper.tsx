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
    <div className={"flex flex-col gap-y-4 p-2"}>
      <div className={"flex flex-1 lg:flex-row gap-4 flex-col w-full"}>
        <ImagesUploader productName={productName}/>
        <AdminEditProductForm productName={productName}/>
      </div>
      <div className="overflow-x-hidden">
        <AdminManageVariantsForm productName={productName}/>
      </div>
    </div>
  )
}

export default AdminEditProductWrapper;
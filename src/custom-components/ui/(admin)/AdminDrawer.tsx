import React from 'react';
import {Box} from "@mui/system";
import Link from "next/link";
import {URLS} from "@/constants";
import {Button, Paper, Typography} from "@mui/material";
import {MdBorderColor, MdFactCheck} from "react-icons/md";

interface IAdminDrawerProps {
  children?: React.ReactNode
}

function AdminDrawer(props: IAdminDrawerProps) {
  const {} = props;
  return (
    <Paper variant={"outlined"} className="flex flex-col items-center justify-start py-8 px-6 gap-y-2 rounded-none">
      <Typography variant="h5" className={"text-nowrap mb-6"}> Панель навігації </Typography>
      <Link href={URLS.ADMIN_ROOT_URL + "/admin/orders"} className={"w-full"}>
        <Button variant="outlined" fullWidth startIcon={<MdBorderColor/>}>
          Замовлення
        </Button>
      </Link>
      <Link href={URLS.ADMIN_ROOT_URL + "/admin/managament/products"} className={"w-full"}>
        <Button variant="outlined" fullWidth startIcon={<MdFactCheck/>}>
          Менеджмент
        </Button>
      </Link>
    </Paper>
  )
}

export default AdminDrawer
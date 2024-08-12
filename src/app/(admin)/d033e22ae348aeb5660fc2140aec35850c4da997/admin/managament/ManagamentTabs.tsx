"use client"
import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {useRouter} from "next/navigation";
import {URLS} from "@/constants";

interface IManagamentTabsProps {
  children?: React.ReactNode
}

function ManagamentTabs(props: IManagamentTabsProps) {
  const {} = props;
  const [tab, setTab] = useState<string>("categories")
  const router = useRouter();
  const onChangeHandler = (event: React.SyntheticEvent, value: any) => {
    setTab(value)
    router.push(URLS.ADMIN_ROOT_URL + "/admin/managament/" + value);
  }
  return (
    <div>
      <Tabs value={tab} onChange={onChangeHandler}>
        <Tab label="Список продуктів" value={"products"}/>
        <Tab label="Додати продукт" value={"products/add"}/>
        <Tab label="Список категорій" value={"categories"}/>
      </Tabs>
    </div>
  )
}

export default ManagamentTabs
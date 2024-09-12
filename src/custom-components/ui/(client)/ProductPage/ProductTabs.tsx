"use client"
import {Paper, Tab, Tabs} from "@mui/material";
import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";

type TypeTab = "about" | "reviews"

enum TabsEnum {
  "about" = "about",
  "reviews" = "reviews",
}

interface ITabsConfig {
  [key: string]: {
    label: string
  }
}

const TabsConfig:ITabsConfig = {
  "about": {
    label: "Про товар",
  },
  "reviews": {
    label: "Відгуки",
  }
}

function ProductTabs() {
  const [currentTab, setCurrentTab] = useState<string>()
  const router  = useRouter();
  const {id: param} = useParams()
  const tabOnChangeHandler = (event: React.SyntheticEvent, value: TypeTab) => {
    setCurrentTab(_ => value)
    const isNotDefaultTab = "/" + (value !== "about" ?  value : "");
    router.push("/shop/products/" + param + isNotDefaultTab)
  }
  return (
    <Paper elevation={1} className="w-full rounded overflow-hidden">
      <Tabs onChange={tabOnChangeHandler} value={currentTab}>
        {Object.keys(TabsConfig).map(key => (
          <Tab key={key} value={key} label={TabsConfig[key].label}/>
        ))}
      </Tabs>
    </Paper>
  )
}

export default ProductTabs
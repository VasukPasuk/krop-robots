"use client"
import React, {useContext, useState} from 'react';
import Link from "next/link";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Paper} from "@mui/material";
import {MdCircle} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import clsx from "clsx";
import {ADMIN_URLS} from "@/constants/enums";
import {LuTags} from "react-icons/lu";
import {FaListCheck, FaUsers} from "react-icons/fa6";
import {AiFillMail, AiFillProduct} from "react-icons/ai";
import {BiBrush, BiCategory, BiComment} from "react-icons/bi";
import {IoAnalytics} from "react-icons/io5";
import {useRouter} from "next/navigation";
import {AdminLayoutContext} from "@/context/AdminLayoutContext";


interface IAdminDrawerProps {
  children?: React.ReactNode
}

const DATA = [
  {title: "Кольори", icon: <BiBrush className="text-2xl"/>, data: [{href: "colors", name: "Список"}]},
  {title: "Категорії", icon: <BiCategory className="text-2xl"/>, data: [{href: "categories", name: "Список"}]},
  {
    title: "Продукти",
    icon: <AiFillProduct className="text-2xl"/>,
    data: [{href: "products", name: "Список"}, {href: "products/create", name: "Створити"}]
  },
  {title: "Замовлення", icon: <FaListCheck className="text-2xl"/>, data: [{href: "orders", name: "Список"}]},
  {title: "Користувачі", icon: <FaUsers className="text-2xl"/>, data: [{href: "customers", name: "Список"}]},
  {title: "Теги", icon: <LuTags className="text-2xl"/>, data: [{href: "tags", name: "Список"}]},
]

const SINGLE_LINKS = [
  {name: "Коментарі", href: "reviews", icon: <BiComment className="text-2xl"/>},
  {name: "Аналітика", href: "analytics", icon: <IoAnalytics className="text-2xl"/>},
  {name: "Пошта", href: "mails", icon: <AiFillMail className="text-2xl"/>}
]

function AdminDrawer(props: IAdminDrawerProps) {
  const {drawerState} = useContext(AdminLayoutContext)
  const router = useRouter()
  const [activeAccordion, setActiveAccordion] = useState<number>(0)
  return (
    (drawerState) && <Paper
      variant="outlined"
			className={"flex flex-col items-start justify-start py-4 px-3 w-64 rounded-none h-dvh"}
		>
			<div className="mb-6 relative w-full">
				<img
					width={160}
					height={64}
					src="/logo_shop_blue.png"
					alt={"logo"}
					className="cursor-pointer"
					onClick={() => router.push(ADMIN_URLS.BASE_ADMIN_URL)}
				/>
			</div>
			<div className={"flex flex-col w-full gap-y-2"}>
        {DATA.map(({data, title, icon}, index) => (
          <DrawerLinksAccordion
            expanded={activeAccordion === (index + 1)}
            data={data}
            title={title}
            key={title}
            order={(index + 1)}
            setActive={setActiveAccordion}
            titleIcon={icon}
          />
        ))}
        {SINGLE_LINKS.map(({href, name, icon}, index) => (
          <>
            <Divider/>
            <Link
              className="w-full p-1 ml-1 border-none hover:bg-neutral-100 transition-colors rounded-md px-4 py-2 flex flex-row gap-x-4 items-center justify-start"
              href={ADMIN_URLS.BASE_ADMIN_URL + "/" + href}
            >
              {icon}
              {name}
            </Link>
          </>
        ))}
			</div>
		</Paper>
  )
}

export default AdminDrawer


interface IDrawerLinksAccordionProps {
  children?: React.ReactNode
  data: { href: string, name: string }[]
  title: string
  setActive: (state: number) => number | void
  order: number
  expanded: boolean
  titleIcon?: React.ReactNode
}

function DrawerLinksAccordion({data, title, order, setActive, expanded, titleIcon}: IDrawerLinksAccordionProps) {
  return (
    <>
      <Accordion
        disableGutters
        variant={"outlined"}
        className={"w-full rounded-md p-1 border-none"}
        expanded={expanded}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown/>}
          aria-controls="panel1-content"
          onClick={() => setActive(order)}
          className={clsx("hover:bg-neutral-100 transition-colors rounded-md", {
            'bg-neutral-100': expanded
          })}
        >
          <span className={clsx("", {'flex flex-row gap-x-4 items-center justify-start': Boolean(titleIcon)})}>
            {titleIcon}
            {title}
          </span>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-y-2 ">
          {data.map(({href, name}) => (
            <Link
              href={ADMIN_URLS.BASE_ADMIN_URL + "/" + href}
              className="flex flex-row gap-x-4 items-center rounded-md hover:bg-neutral-100 transition-colors px-4 py-2">
              <MdCircle size={8}/>
              <span>{name}</span>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
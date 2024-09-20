"use client"
import {Button, Drawer, Paper, Tooltip} from "@mui/material";
import {MdNotifications, MdShoppingCart} from "react-icons/md";
import {FaUser} from "react-icons/fa6";
import CartDrawer from "@/custom-components/ui/(client)/CartDrawer";
import {useState} from "react";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import {useMediaQuery} from "@mui/system";
import CatalogFilter from "@/custom-components/ui/(client)/CatalogPage/CatalogFilter";

function AppBar() {
  const [activeCardDrawer, setActiveCardDrawer] = useState<boolean>(false)
  const [activeFilterDrawer, setActiveFilterDrawer] = useState<boolean>(false)
  const {id} = useParams()
  const pathname = (usePathname() === "/shop/products")
  const mq = useMediaQuery("(max-width:1024px)")

  return (
    <div className="w-full h-16 mt-16 flex justify-between items-center px-4 gap-x-4 rounded-none shadow">
      {!!id && <div>
				<Link href={"/shop/products"}>
					<Button variant="text" className="normal-case text-base" color="primary">
						Повернутися до товарів
          </Button>
				</Link>
			</div>}

      {
        (pathname && mq) && (
          <>
            <Button variant="outlined" onClick={() => setActiveFilterDrawer(true)}>
              Фільтри
            </Button>
            <Drawer
              open={activeFilterDrawer}
              onClose={() => setActiveFilterDrawer(false)}
              disableScrollLock
            >
              <div className="w-dvw s420:w-[360px] h-dvh">
                <CatalogFilter/>
              </div>
            </Drawer>
          </>
        )
      }

      <div className="flex gap-x-2">
        <Tooltip title="Кабінет">
          <div
            className="cursor-pointer text-neutral-700 transition-colors duration-700 ease-out hover:bg-black/15 rounded p-2">
            <FaUser className="text-2xl"/>
          </div>
        </Tooltip>

        <Tooltip title="Повідомлення">
          <div
            className="cursor-pointer text-neutral-700 transition-colors duration-700 ease-out hover:bg-black/15 rounded p-2">
            <MdNotifications className="text-2xl"/>
          </div>
        </Tooltip>

        <Tooltip title="Кошик">
          <div
            onClick={() => setActiveCardDrawer(true)}
            className="cursor-pointer text-neutral-700 transition-colors duration-700 ease-out hover:bg-black/15 rounded p-2"
          >
            <MdShoppingCart className="text-2xl"/>
          </div>
        </Tooltip>

        <CartDrawer handleClose={() => setActiveCardDrawer(false)} open={activeCardDrawer}/>
      </div>
    </div>
  )
}

export default AppBar;
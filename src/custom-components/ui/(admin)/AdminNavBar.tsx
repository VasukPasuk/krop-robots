"use client"
import React, {useState} from 'react';
import {Avatar, Badge, Divider, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {MdLanguage, MdNotifications, MdShoppingCart, MdLogout, MdSunny, MdSettings} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import ThemeChangeIcon from "@/custom-components/ui/(admin)/ThemeChangeIcon";

interface IAdminNavBarProps {

}


function AdminNavBar(props: IAdminNavBarProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <div className={"flex flex-row items-center justify-between px-6 py-4"}>
      <div>

      </div>
      <div className={"flex gap-x-8"}>
        <div className={"flex items-center justify-center gap-x-4"}>
          <Tooltip title="Змінити тему">
            <ThemeChangeIcon/>
          </Tooltip>
          <Tooltip title="Змінити мову">
            <IconButton className={"bg-neutral-200/55 p-3"} aria-label="cart">
              <MdLanguage size={20}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Повідомлення">
            <IconButton className={"bg-neutral-200/55 p-3"} aria-label="cart">
              <Badge badgeContent={0} color="secondary">
                <MdNotifications size={20}/>
              </Badge>
            </IconButton>
          </Tooltip>



        </div>
        <Box sx={{flexGrow: 0}}>
          <Tooltip title="Відкрити налаштування">
            <div onClick={handleOpenUserMenu} className={"flex gap-x-2 cursor-pointer"}>
              <IconButton sx={{p: 0}}>
                <Avatar sx={{width: 42, height: 42}} alt="Remy Sharp" src="/lord-avatar3.jpg"/>
              </IconButton>
              <div className={"flex flex-col"}>
                <span className="text-neutral-800"> Денис Павлюк </span>
                <span className="text-neutral-500 text-sm"> Адмін </span>
              </div>
            </div>

          </Tooltip>
          <Menu
            sx={{mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            disableScrollLock
          >
            <MenuItem className={"m-2 rounded flex items-center justify-start gap-x-2"} onClick={handleCloseUserMenu}>
              <CgProfile size={20}/> <span>Профіль</span>
            </MenuItem>
            <MenuItem className={"m-2 rounded flex items-center justify-start gap-x-2"} onClick={handleCloseUserMenu}>
              <MdSettings size={20}/> <span>Налаштування</span>
            </MenuItem>
            <Divider/>
            <MenuItem className={"m-2 rounded flex items-center justify-start gap-x-2"} onClick={handleCloseUserMenu}>
              <MdLogout size={20}/> <span>Вийти</span>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  )
}

export default AdminNavBar
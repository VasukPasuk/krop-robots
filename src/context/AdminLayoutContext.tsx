'use client';
import React, { createContext, FC, useState, ReactNode } from "react";
import {useMediaQuery} from "@mui/system";

interface IAdminLayoutContextValue {
  enableDrawer: () => void,
  disableDrawer: () => void
  drawerState: boolean,
  match: boolean
}


export const AdminLayoutContext = createContext<IAdminLayoutContextValue | undefined>(undefined);

type AdminLayoutProviderProps = {
  children: ReactNode;
}

export const AdminLayoutProvider: FC<AdminLayoutProviderProps> = ({ children }) => {
  const [activeSideDrawer, setActiveSideDrawer] = useState(true)
  const match = useMediaQuery("(max-width:640px)")
  const enableDrawer = () => setActiveSideDrawer(true);
  const disableDrawer = () => setActiveSideDrawer(false);


  return (
    <AdminLayoutContext.Provider value={{enableDrawer, disableDrawer, drawerState: activeSideDrawer, match}}>
      {children}
    </AdminLayoutContext.Provider>
  );
};

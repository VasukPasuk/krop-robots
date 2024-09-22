'use client';
import React, { createContext, FC, useState, ReactNode } from "react";

interface IAdminLayoutContextValue {
  enableDrawer: () => void,
  disableDrawer: () => void
  drawerState: boolean
}


export const AdminLayoutContext = createContext<IAdminLayoutContextValue | undefined>(undefined);

type AdminLayoutProviderProps = {
  children: ReactNode;
}

export const AdminLayoutProvider: FC<AdminLayoutProviderProps> = ({ children }) => {
  const [activeSideDrawer, setActiveSideDrawer] = useState(true)

  const enableDrawer = () => setActiveSideDrawer(true);
  const disableDrawer = () => setActiveSideDrawer(false);


  return (
    <AdminLayoutContext.Provider value={{enableDrawer, disableDrawer, drawerState: activeSideDrawer}}>
      {children}
    </AdminLayoutContext.Provider>
  );
};

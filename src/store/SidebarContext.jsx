import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({children}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{isMenuOpen,setIsMenuOpen}} >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
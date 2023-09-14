"use client";
import { createContext, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3010");

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [bgImage, setBgImage] = useState("/images/wallpapers/13.jpg")

  return (
    <ToggleContext.Provider value={{sidebar,setSidebar,bgImage, setBgImage}}>
        {children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;
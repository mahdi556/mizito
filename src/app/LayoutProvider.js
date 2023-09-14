"use client";

import Header from "@/components/Header";
import OfficeChooseModal from "@/components/main/OfficeChooseModal";
import SideBar from "@/components/sidebar/SideBare";
import { QueProvider } from "@/context/QueContext ";
import { ReserveProvider } from "@/context/ReserveContext";
import { ToggleProvider } from "@/context/ToggleContext";
// Use usePathname for catching route name.
import { usePathname } from "next/navigation";

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();

  if (pathname === "/auth/login") {
    return <>{children}</>;
  } else {
    return (
      <>
        <ToggleProvider>
          <QueProvider>
            <Header />
            <div className="d-flex justify-content-start  col-12 ">
              <SideBar />
              <div
                style={{
                  height: "100vh",
                  overflowY: "scroll",
                  width: "100%",
                }}
              >
                {children}
              </div>
            </div>
            <OfficeChooseModal />
          </QueProvider>
        </ToggleProvider>
      </>
    );
  }
};

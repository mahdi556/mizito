"use client";
import styles from "@/components/main/Main.module.css";
import Profile from "./leftCol/Profile";
import { useContext, useEffect, useState } from "react";
import ToggleContext from "@/context/ToggleContext";
import Data from "./rightCol/Data";
import OfficeChooseModal from "./OfficeChooseModal";
import QueContext from "@/context/QueContext ";

const Main = () => {
  const { bgImage } = useContext(ToggleContext);
  const [bgImage1, setBgImage1] = useState("../../../images/wallpapers/13.jpg");
  useEffect(() => {
    setBgImage1(bgImage);
  }, [bgImage]);
  const { office } = useContext(QueContext);
  useEffect(() => {}, [office]);
  return (
    <>
      <main
        style={{
          backgroundImage: `url(${bgImage1})`,
        }}
        className={` d-flex col-12 ${styles.main}`}
      >
        <Data />
        <Profile />
      </main>
    </>
  );
};
export default Main;

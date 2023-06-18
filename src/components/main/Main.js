"use client";
import styles from "@/components/main/Main.module.css";
import Image from "next/image";
import Profile from "./leftCol/Profile";
import { useContext, useEffect, useState } from "react";
import ToggleContext from "@/context/ToggleContext";
import Data from "./rightCol/Data";

const Main = () => {
  const { bgImage } = useContext(ToggleContext);
  const [bgImage1, setBgImage1] = useState("../../../images/wallpapers/13.jpg");
  useEffect(() => {
    setBgImage1(bgImage);
  }, [bgImage]);
  return (
    <>
      <main
        style={{
          backgroundImage: `url(${bgImage1})`,
        }}
        className={styles.main}
      >
        <Data />

        <Profile />
      </main>
    </>
  );
};
export default Main;

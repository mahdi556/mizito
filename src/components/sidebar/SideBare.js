"use client";

import styles from "@/components/sidebar/Sidebar.module.css";
import ToggleContext from "@/context/ToggleContext";
import Link from "next/link";
import { useContext } from "react";
const SideBar = () => {
  const { sidebar } = useContext(ToggleContext);
   return (
    <>
       <main className={sidebar ? styles.mainOpen : styles.mainClose}>
        <div className="ps-5">
          <Link href="#" className={styles.navTitle}>
            داشبورد
          </Link>
        </div>
      </main>
    </>
  );
};
export default SideBar;

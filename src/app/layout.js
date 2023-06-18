import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Script from "next/script";
import Header from "../components/Header";
import { ToggleProvider } from "@/context/ToggleContext";
import SideBar from "@/components/sidebar/SideBare";
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          paddingTop: 65,
        }}
      >
        <ToggleProvider>
          <Header />
          <div className="d-flex justify-content-start   ">
            <SideBar />
            {children}
          </div>
        </ToggleProvider>
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"
      />
    </html>
  );
}

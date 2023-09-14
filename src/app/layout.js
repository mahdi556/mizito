"use client";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Script from "next/script";
import Head from "next/head";
import axios from "axios";
import "sweetalert2/src/sweetalert2.scss";
import "react-toastify/dist/ReactToastify.css";
import { LayoutProvider } from "./LayoutProvider";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import LoadingModal from "@/components/LoadingModal";
export default function RootLayout({ children }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  return (
    <html lang="fa" dir="rtl">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <body
        style={{
          paddingTop: 65,
        }}
      >
        <ToastContainer />
        <AuthProvider>
          <LayoutProvider children={children} />
          <LoadingModal />
        </AuthProvider>
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"
      />
    </html>
  );
}

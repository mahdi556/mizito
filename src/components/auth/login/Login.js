"use client";
import styles from "@/components/auth/page.module.css";
import AuthContext from "@/context/AuthContext";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async(e) => {
    e.preventDefault();
    if (cellphone == "") {
      toast.error("شماره همراه اجباری است");
      return;
    }
    if (password == "") {
      toast.error("رمز عبور  اجباری است");
      return;
    }
    await login(cellphone, password);
  };
  return (
    <>
      <div
        className={`${styles.body} col-12 d-flex h-100 justify-content-center align-items-center `}
      >
        <div className={`col-4 d-flex flex-column ${styles.loginBox}`}>
          <div className={`col-12  px-4 py-4 ${styles.loginHeader}`}>
            میک اَپ
          </div>
          <form action="onSubmit" onSubmit={(e) => handleLogin(e)}>
            <div className={`col-12 px-4 py-5 d-flex flex-column`}>
              <div
                className={`  ps-4 ${
                  cellphone
                    ? styles.cellphoneInputWrapperfilled
                    : styles.cellphoneInputWrapper
                }`}
              >
                <Image
                  className={`${styles.loginIcon}`}
                  src="/images/user.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <input
                  className={` col-12 ${styles.cellphoneInput}`}
                  type="text"
                  onChange={(e) => setCellphone(e.target.value)}
                />
              </div>
              <div
                className={`ps-4 mt-5 ${
                  password
                    ? styles.passwordInputWrapperfilled
                    : styles.passwordInputWrapper
                }`}
              >
                <Image
                  className={`${styles.loginIcon}`}
                  src="/images/lock.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <input
                  className={` col-12 ${styles.cellphoneInput}`}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center ">
                <button
                  type="submit"
                  className="btn btn-primary mt-5 me-3 px-5"
                >
                  ورود
                </button>
                <button className="btn btn-outline-primary mt-5   ">
                  کلمه عبور را فراموش کردم
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;

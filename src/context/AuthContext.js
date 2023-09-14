import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Check if user logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (res.ok) {
      setUser({ user: data.user, token: data.token });
      console.log(data.token)
    } else {
      setUser(null);
      router.push("/auth/login");
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  const handleError = (message) => {
    const errors = [];
    Object.keys(message).map((key) => {
      message[key].map((e) => {
        errors.push(e);
      });
    });
    return errors.join();
  };

  const login = async (cellphone, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,
        {
          cellphone,
          password,
        }
      );
      setUser({ user: res.data.user, token: res.data.token });
      setLoading(false);
      toast.success("شما با موفقیت وارد شدید");
      router.push("/");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(handleError(err.response.data.message));
      // toast.error(err.response.data.message[0])
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

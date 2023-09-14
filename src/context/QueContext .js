"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import moment from "jalali-moment";

const QueContext = createContext();

export const QueProvider = ({ children }) => {
  const [reserves, setReserves] = useState(null);
  const [monthlyReserves, setmonthlyReserves] = useState(null);
  const [offices, setOffices] = useState([]);
  const [office, setOffice] = useState(null);
  const [officeChModal, setOfficeChModal] = useState(false);
  const [activeDate, setActiveDate] = useState(null);
  const [intervals, setIntervals] = useState([]);
  const [srModal, setSrModal] = useState(false);
  const { user, setLoading } = useContext(AuthContext);
  const getOffices = async () => {
    setLoading(true);
    try {
      await axios({
        url: `panel/getOffices`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          setOffices(response.data.data.offices);
          response.data.data.offices.forEach((item) => {
            if (item.is_default == 1) {
              setOffice(item.id);
            }
          });
        })
        // .then(() => {
        // if (!office) {
        //   setOfficeChModal(true);
        // }
        // })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);

      // res.status(500).json({ message: { err: ["Server Error"] } });
    } finally {
      setLoading(false);
    }
  };
  const getDailyReserves = async () => {
    setLoading(true);
    try {
      await axios({
        url: `panel/getDailyReserves/${office}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          setOffice(response.data.data.office);
          setReserves(response.data.data.reserves);
          setmonthlyReserves(
            response.data.data.monthly_reserves.original.reserves
          );
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.status);
        });
    } catch (e) {
      console.log(e);

      // res.status(500).json({ message: { err: ["Server Error"] } });
    } finally {
      setLoading(false);
    }
  };
  const getReserves = async () => {
    setLoading(true);
    try {
      await axios({
        url: `panel/reserves/${office.id}/${
          activeDate
            ? moment(activeDate).locale("en").format("YYYY-MM-DD")
            : moment().locale("en").format("YYYY-MM-DD")
        }`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          setReserves(response.data.data.reserves);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);

      // res.status(500).json({ message: { err: ["Server Error"] } });
    } finally {
      setLoading(false);
    }
  };
  const getmonthlyReserves = async (month) => {
    setLoading(true);
    try {
      await axios({
        url: `panel/getmonthlyReserves/${month}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          setmonthlyReserves(response.data.reserves);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);

      // res.status(500).json({ message: { err: ["Server Error"] } });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    user && getOffices();
  }, [user]);
  useEffect(() => {
    office && getDailyReserves();
  }, [office]);
  useEffect(() => {
    getReserves();
  }, [activeDate]);

  return (
    <QueContext.Provider
      value={{
        offices,
        officeChModal,
        setOfficeChModal,
        setOffice,
        reserves,
        getReserves,
        activeDate,
        setActiveDate,
        office,
        intervals,
        setIntervals,
        srModal,
        setSrModal,
        monthlyReserves,
        getmonthlyReserves,
      }}
    >
      {children}
    </QueContext.Provider>
  );
};

export default QueContext;

"use client";
import splitTime from "@/components/Booking/SplitTime";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import moment from "jalali-moment";

const ReserveContext = createContext();

export const ReserveProvider = ({ children }) => {
  const [intervals, setIntervals] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [office, setOffice] = useState(null);
  const [reserves, setReserves] = useState(null);
  const [officeID, setOfficeID] = useState(null);
  const [srModal, setSrModal] = useState(false);

  useEffect(() => {
    officeID && getOffice();
    office && setIntervals(splitTime(office, reserves, activeDate));
  }, [officeID, activeDate]);
  useEffect(() => {
    office && setIntervals(splitTime(office, reserves, activeDate));
  }, [reserves, office]);
  return (
    <ReserveContext.Provider
      value={{
        intervals,
        activeDate,
        setActiveDate,
        office,
        setOfficeID,
        getOffice,
        srModal,
        setSrModal,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export default ReserveContext;

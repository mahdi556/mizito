"use client";
import React, { useContext, useEffect, useState } from "react";
import jMoment from "moment-jalaali";
import styles from "@/components/Booking/calendar/Calendar.module.css";
import Image from "next/image";
import QueContext from "@/context/QueContext ";

const IndexPage = () => {
  // Set initial start and end dates
  const { activeDate, setActiveDate } = useContext(QueContext);
  const startDate = jMoment("1402/01/10", "jYYYY/jM/jD");
  const endDate = jMoment("1403/01/20", "jYYYY/jM/jD");
  // Set days of week in Persian
  const persianDaysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  // Set month names in Persian
  const persianMonthNames = {
    0: "فروردین",
    1: "اردیبهشت",
    2: "خرداد",
    3: "تیر",
    4: "مرداد",
    5: "شهریور",
    6: "مهر",
    7: "آبان",
    8: "آذر",
    9: "دی",
    10: "بهمن",
    11: "اسفند",
  };

  // Initialize state for current date
  const [currentDate, setCurrentDate] = useState(startDate);
   useEffect(() => {
    if (!activeDate) {
      setCurrentDate(jMoment());
      setActiveDate(jMoment());
    }
    if (activeDate) {
      setCurrentDate(activeDate);
    }
  }, [activeDate]);
  // Function to display previous month's dates
  const handlePrevMonth = () => {
    const newDate = currentDate.clone().subtract(1, "month");
    setCurrentDate(newDate);
  };

  // Function to display next month's dates
  const handleNextMonth = () => {
    const newDate = currentDate.clone().add(1, "month");
    setCurrentDate(newDate);
  };
  // Calculate dates to display based on current date
  let startOfMonth = currentDate.clone().startOf("jMonth");
  let endOfMonth = currentDate.clone().endOf("jMonth");
  if (startOfMonth.day() !== 0) {
    startOfMonth.subtract(startOfMonth.day() + 0, "days");
  }
  if (endOfMonth.day() !== 6) {
    endOfMonth.add(6 - endOfMonth.day(), "days");
  }

  // Create an array of arrays to store the dates by week
  const persianDatesByWeek = [];
  let currentDay = startOfMonth.clone();
  let currentWeek = [];
  while (currentDay.isBefore(endOfMonth) || currentDay.isSame(endOfMonth)) {
    currentWeek.push(currentDay.clone().subtract(1, "day"));
    if (currentDay.day() === 6) {
      persianDatesByWeek.push(currentWeek);
      currentWeek = [];
    }
    currentDay = currentDay.add(1, "day");
  }
  persianDatesByWeek.push(currentWeek);
  const persianCurrentMonth = persianMonthNames[currentDate.jMonth()];
  const handleClickDay = (date) => {
    setActiveDate(date);
  };
  // Render component
  return (
    <>
      {activeDate && (
        <div className={` mt-3 mx-auto ${styles.main}`}>
          <div className="d-flex mx-auto  ">
            <div className={` d-flex align-items-center mx-auto `}>
              {jMoment().jMonth() !== currentDate.jMonth() ||
              jMoment().jYear() !== currentDate.jYear() ? (
                <button
                  type=""
                  className={styles.todayBtn}
                  onClick={() => setCurrentDate(jMoment())}
                >
                  امروز
                </button>
              ) : null}
              <button className={styles.navButton} onClick={handlePrevMonth}>
                <Image
                  src="/images/chevronRight.svg"
                  height={10}
                  width={10}
                  alt=""
                />
              </button>
              <div className={styles.monthTitle}>
                {persianCurrentMonth} {currentDate.format("jYYYY")}
              </div>
              <button className={styles.navButton} onClick={handleNextMonth}>
                <Image
                  src="/images/chevronLeft.svg"
                  height={10}
                  width={10}
                  alt=""
                />
              </button>
            </div>
          </div>

          <table className="col-12">
            <thead>
              <tr>
                {persianDaysOfWeek.map((day) => (
                  <th className={styles.th} key={day}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {persianDatesByWeek.map((week) => (
                <tr className="col-7">
                  {week.map((date) => {
                    // const persianDayOfWeek = persianDaysOfWeek[date.day()];
                    const persianMonth = persianMonthNames[date.jMonth()];
                    return (
                      <td
                        className={
                          activeDate.format("jYYYY/jM/jD") ===
                          date.format("jYYYY/jM/jD")
                            ? styles.activeDay
                            : jMoment().format("jYYYY/jM/jD") ===
                              date.format("jYYYY/jM/jD")
                            ? styles.today
                            : date.isAfter(jMoment())
                            ? styles.tdaf
                            : currentDate.jMonth() == date.jMonth()
                            ? styles.td
                            : styles.tdlm
                        }
                        onClick={() => handleClickDay(date)}
                      >
                        {jMoment().format("jYYYY/jM/jD") ===
                        date.format("jYYYY/jM/jD")
                          ? ` ${date.format(`jD `)}  `
                          : date.format(`jD `)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default IndexPage;

"use client";
import React, { useEffect, useState } from "react";
import jMoment from "moment-jalaali";
import styles from "@/components/calendar/Calendar.module.css";
import Image from "next/image";

const IndexPage = () => {
  // Set initial start and end dates
  const startDate = jMoment("1402/01/10", "jYYYY/jM/jD");
  const endDate = jMoment("1403/01/20", "jYYYY/jM/jD");
  // Set days of week in Persian
  const persianDaysOfWeek = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];

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
    setCurrentDate(jMoment());
  }, []);
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
  console.log(currentDay);
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
  // Render component
  return (
    <div className={styles.main}>
      <div className="d-flex   ">
        <div className=" d-flex me-4 ms-auto">
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
            <Image src="/images/chevronRight.svg" height={10} width={10} />
          </button>
          <div className={styles.monthTitle}>
            {persianCurrentMonth} {currentDate.format("jYYYY")}
          </div>
          <button className={styles.navButton} onClick={handleNextMonth}>
            <Image src="/images/chevronLeft.svg" height={10} width={10} />
          </button>
        </div>
      </div>
      <div
        style={{
          height: "80vh",
          overflowY: "scroll",
        }}
      >
        <table className="col-12">
          <thead>
            <tr>
              {persianDaysOfWeek.map((day) => (
                <th className={styles.th}>{day}</th>
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
                        jMoment().format("jYYYY/jM/jD") ===
                        date.format("jYYYY/jM/jD")
                          ? styles.today
                          :  date.isAfter(jMoment())
                          ? styles.tdaf
                          : currentDate.jMonth() == date.jMonth()
                          ? styles.td
                          : styles.tdlm
                      }
                    >
                      {jMoment().format("jYYYY/jM/jD") ===
                      date.format("jYYYY/jM/jD")
                        ? ` امروز: ${date.format(`jD ${persianMonth}`)}  `
                        : date.format(`jD ${persianMonth}`)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexPage;

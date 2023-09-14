"use client";
import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import styles from "@/components/Booking/page.module.css";

const Quetimes = () => {
  moment.locale("fa");
  const startTime = moment({ hour: 8, minute: 0 });
  const endTime = moment({ hour: 17, minute: 0 });

  function splitTime() {
    let time = startTime.add(30, "m");

    const intervals = [];

    let current = startTime;
    while (current <= endTime) {
      intervals.push(time.toString());
      time = time.add(15, "m");
    }

    return intervals;
  }

  // Example usage
  const intervals = splitTime();
  return (
    <>
      <div className="row g-3 px-4 mt-3 w-100" dir="ltr">
        {intervals.map((item, key) => (
          <div className="col-4 pointer">
            <div className={`py-2 ${styles.timeSell}`} key={key}>
              {moment(item).locale("fa").format("HH:mm")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Quetimes;

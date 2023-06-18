"use client";
import React, { useEffect, useState } from "react";
import jMoment from "moment-jalaali";
import Image from "next/image";
import styles from "@/components/calendar/Calendar.module.css";

const CalendarTest = () => {
   const startDate = jMoment("1401/1/26", "jYYYY/jM/jD");
  const endDate = jMoment("1402-01-31", "jYYYY/jM/jD");
  // Set days of week in Persian
   // Initialize state for current date
  const [currentDate, setCurrentDate] = useState(startDate);
  useEffect(() => {
    // console.log(currentDate)
  }, [currentDate]);
  // Function to display previous month's dates
  const handlePrevMonth = () => {
    const newDate = currentDate.clone().subtract(1, "month");
    setCurrentDate(newDate);
  };
  let m = jMoment('1401/1/26', 'jYYYY/jM/jD') ;
  // console.log(m.startOf('jMonth'))

  // Function to display next month's dates
  const handleNextMonth = () => {
    const newDate = currentDate.clone().add(1, "month");
    // console.log(m.clone().add(1, "month").startOf("jMonth"))
    console.log(currentDate.clone().add(1, "month").startOf("jMonth"))                                                                  
    setCurrentDate(newDate);
  };
  // Calculate dates to display based on current date
  let startOfMonth = currentDate.clone().startOf("jMonth");
  let endOfMonth = currentDate.clone().endOf("jMonth");
 
  // Create an array of arrays to store the dates by week
   return (
     <>
     <div>
     <div className=" d-flex ms-auto">
          <button className={styles.navButton} onClick={handlePrevMonth}>
            <Image src="/images/chevronRight.svg" alt="" height={10} width={10} />
          </button>
           <button className={styles.navButton} onClick={handleNextMonth}>
            <Image src="/images/chevronLeft.svg" alt="" height={10} width={10} />
          </button>
        </div>
      </div>
     </>
    
  );
};

export default CalendarTest;

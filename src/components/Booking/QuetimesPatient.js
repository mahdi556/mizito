"use client";
import React, { useContext, useEffect, useState } from "react";
import moment from "jalali-moment";
import styles from "@/components/Booking/page.module.css";
import ReserveModal from "./ReserveModal";
import QueContext from "@/context/QueContext ";
import splitTime from "./SplitTime";
const QuetimesPatient = () => {
  const { intervals, activeDate, office, reserves, setSrModal, setIntervals } =
    useContext(QueContext);
  moment.locale("fa");
  const [modalData, setModalData] = useState();

  const handleNewReserve = async (item) => {
    setSrModal(true);
    setModalData(item);
  };
  useEffect(() => {
    reserves && setIntervals(splitTime(office, reserves, activeDate));
  }, [reserves]);
  return (
    <>
      <div
        className="row align-items-baseline mb-5 g-3 px-4 mt-3  w-100"
        dir="ltr"
      >
        {intervals.map((item1) => (
          <>
            {activeDate && (
              <div
                className={`py-2 numfont ${styles.queShift} `}
                key1={item1.name}
              >
                نوبت {item1.name} --------{" "}
                {moment(activeDate).locale("fa").format("YYYY/MM/DD")}
              </div>
            )}
            <div className={`row py-3 g-3 px-4 mt-3 ${styles.queWrapper}`}>
              {item1.array.map((item) => (
                <div className={"col-4 col-md-3 col-lg-2 "}>
                  {item.res ? (
                    <>
                      <div
                        key={item.id}
                        className={`py-2 px-2 d-flex align-items-center pointer justify-content-center ${
                          item.status == "wait"
                            ? styles.timeSell
                            : item.status == "done"
                            ? styles.timeDone
                            : null
                        }`}
                        onClick={() => handleNewReserve(item)}
                      >
                        {moment(item.time).locale("fa").format("HH:mm")}
                      </div>
                    </>
                  ) : !item.res ? (
                    <div
                      key={item.id}
                      className={`py-1 px-2 d-flex justify-content-center align-items-center pointer ${styles.timefree}`}
                      onClick={() => handleNewReserve(item)}
                    >
                      <span>
                        {moment(item.time).locale("fa").format("HH:mm")}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        ))}
        {office && modalData && (
          <ReserveModal
            data={modalData}
            office={office}
            activeDate={activeDate}
          />
        )}
      </div>
    </>
  );
};
export default QuetimesPatient;

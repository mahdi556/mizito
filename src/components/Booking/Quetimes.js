"use client";
import React, { useContext, useEffect, useState } from "react";
import moment from "jalali-moment";
import styles from "@/components/Booking/page.module.css";
import splitTime from "./SplitTime";
import HandleQue from "./HandleWaits";
import QueContext from "@/context/QueContext ";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ReserveModal from "./ReserveModal";
const Quetimes = ({ id }) => {
  const { intervals, setIntervals, activeDate } = useContext(QueContext);
  moment.locale("fa");
  const [srModal, setSrModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [reserves, setReserves] = useState(null);
  const [office, setOffice] = useState(null);
  const handleClose = () => {
    setSrModal(false);
  };

  useEffect(() => {
    getOffice();
  }, []);

  useEffect(() => {
    office && setIntervals(splitTime(office, reserves, activeDate));
  }, [office, activeDate]);
  // console.log(intervals)
  const getOffice = async () => {
    try {
      await axios({
        url: `offices/22/?time=${moment(activeDate)
          .locale("en")
          .format("YYYY-MM-DD")}`,
        method: "get",
        headers: {
          // Authorization: `Bearer ${req.cookies.token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          setOffice(response.data.data.office);
          setReserves(response.data.data.reserves);
        })
        .catch(function (error) {
          console.log(error.response.data);
          // console.log(error);
        });
    } catch (e) {
      // res.status(500).json({ message: { err: ["Server Error"] } });
    }
  };
  const refreshReserve = async () => {
    try {
      await axios({
        url: "refreshReserve",
        method: "get",
        headers: {
          // Authorization: `Bearer ${req.cookies.token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          setReserves(response.data.data.reserves);
        })
        .catch(function (error) {
          console.log(error.response.data);
          // console.log(error);
        });
    } catch (e) {
      // res.status(500).json({ message: { err: ["Server Error"] } });
    }
  };
  const handleClick = (item) => {
    HandleQue(item);
  };
  const handleNewReserve = async (item) => {
    setModalData(item);
    setSrModal(true);
  };
  // console.log(moment(activeDate).locale("en").format("YYYY-MM-DD HH:mm:ss"));
  return (
    <>
      <button
        className="btn btn-primary col-3"
        onClick={() => getOffice()}
        type=""
      >
        refresh
      </button>
      <button
        className="btn btn-primary col-3"
        onClick={() => refreshReserve()}
        type=""
      >
        refreshReserve
      </button>
      <div className="row align-items-baseline g-3 px-4 mt-3 w-100" dir="ltr">
        {intervals.map((item1, key1) => (
          <>
            <div className="btn btn-primary" key1={item1.id}>
              نوبت {item1.name}
            </div>
            {item1.array.map((item, key) => (
              <div
                className="col-4 col-md-3 col-lg-2     pointer"
                key={item.id}
              >
                {item.res && item.status == "wait" ? (
                  <>
                    <div
                      className={`py-2 px-2 d-flex flex-column ${styles.timeSell}`}
                      onClick={() => handleClick(item)}
                    >
                      <div className={`d-flex justify-content-between`}>
                        <h6 className="bg-dark">
                          {moment(item.displayTime)
                            .locale("fa")
                            .format("HH:mm")}
                        </h6>
                        <h6 className="bg-primary">
                          {moment(item.time).locale("fa").format("HH:mm")}
                        </h6>
                      </div>
                      <div className="d-flex justify-content-between px-2">
                        <span
                          style={{
                            fontSize: 12,
                          }}
                        >
                          {" "}
                          دقیقه {item.len}
                        </span>
                        {item.type}
                      </div>
                    </div>
                  </>
                ) : item.res && item.status == "non-referral" ? (
                  <>
                    <div
                      className={`py-2 px-2 d-flex flex-column ${styles.timeNotrefer}`}
                      // onClick={() => handleClick(item)}
                    >
                      <div className={`d-flex justify-content-between`}>
                        <h6 className="bg-dark">
                          {moment(item.displayTime)
                            .locale("fa")
                            .format("HH:mm")}
                        </h6>
                        <h6 className="bg-primary">
                          {moment(item.time).locale("fa").format("HH:mm")}
                        </h6>
                      </div>
                      <div className="d-flex justify-content-between px-2">
                        <span
                          style={{
                            fontSize: 12,
                          }}
                        >
                          {" "}
                          دقیقه {item.len}
                        </span>
                        {item.type}
                      </div>
                    </div>
                  </>
                ) : item.res && item.status == "delay" ? (
                  <div
                    className={`py-2 ${styles.timeDelay}`}
                    onClick={() => handleClick(item)}
                  >
                    {moment(item.displayTime).locale("fa").format("HH:mm")}
                    <br />
                    <span
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {" "}
                      {item.len} دقیقه
                    </span>
                  </div>
                ) : item.res && item.status == "done" ? (
                  <div
                    className={`py-2 ${styles.timeDone}`}
                    onClick={() => handleClick(item)}
                  >
                    {moment(item.displayTime).locale("fa").format("HH:mm")}
                    <br />
                    <span
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {" "}
                      {item.len} دقیقه
                    </span>
                  </div>
                ) : !item.res ? (
                  <div
                    className={`py-2 px-2 d-flex justify-content-between align-items-start  ${styles.timefree}`}
                    onClick={() => handleNewReserve(item)}
                  >
                    <span className="bg-dark">
                      {moment(item.displayTime).locale("fa").format("HH:mm")}
                    </span>
                    <span className="me-auto bg-primary">
                      {moment(item.time).locale("fa").format("HH:mm")}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </>
        ))}
        {office && modalData && (
          <ReserveModal
            show={srModal}
            data={modalData}
            office={office}
            handleRMClose={handleClose}
            getOffice={getOffice}
            activeDate={activeDate}
          />
        )}
      </div>
    </>
  );
};
export default Quetimes;

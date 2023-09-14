"use client";
import styles from "@/components/main/Main.module.css";
import QueContext from "@/context/QueContext ";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WaitQuesWidget from "./WaitQuesWidget";
import DoneQuesWidget from "./DoneQuesWidget";
const QuesWidget = () => {
  const { reserves } = useContext(QueContext);
  useEffect(() => {}, [reserves]);
  const [filter, setFilter] = useState({ wait: true, done: false, all: false });
  console.log(reserves);
  const router = useRouter();
  return (
    <>
      <div className="d-flex justify-content-between align-items-start col-12">
        <div className="col px-1 ">
          <div className={` d-flex flex-column ${styles.queswrapper}`}>
            <div
              className={` py-2 d-flex flex-column col-12 px-1 ${styles.quesheader}`}
            >
              <span className={styles.quesheaderTitle}>آخرین نوبت ها</span>
              <div className={` d-flex    ${styles.quesfilter}`}>
                <div className="form-check ms-2 pointer">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={filter.all}
                    onChange={() =>
                      setFilter({ wait: false, done: false, all: true })
                    }
                  />
                  <label
                    className={`form-check-label ${styles.radiofilter} `}
                    for="flexRadioDefault1"
                  >
                    همه نوبت ها
                  </label>
                </div>
                <div className="form-check ms-2 pointer">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={filter.wait}
                    onChange={() =>
                      setFilter({ wait: true, done: false, all: false })
                    }
                  />
                  <label
                    className={`form-check-label ${styles.radiofilter} `}
                    for="flexRadioDefault2"
                  >
                    در انتظار پذیرش
                  </label>
                </div>
                <div className="form-check ms-2 pointer">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={filter.done}
                    onChange={() =>
                      setFilter({ wait: false, done: true, all: false })
                    }
                  />
                  <label
                    className={`form-check-label ${styles.radiofilter} `}
                    for="flexRadioDefault2"
                  >
                    پذیرش شده
                  </label>
                </div>
              </div>
            </div>
            {/* <div className={` py-2 ${styles.quesfilter}`}>آخرین نوبت ها</div> */}
            <div
              className={`d-felx flex-column overflow-scroll ${styles.queScrollWrapper}`}
            >
              {reserves &&
                reserves.map((item) =>
                  item.status == "wait" && (filter.wait || filter.all) ? (
                    <WaitQuesWidget item={item} />
                  ) : item.status == "done" && (filter.done || filter.all) ? (
                    <DoneQuesWidget item={item} />
                  ) : null
                )}
            </div>
            <div className={`col-12 d-flex py-2 px-3 ${styles.moreQues}`}>
              <button
                className="btn btn-success ms-auto btn-sm"
                onClick={() => router.push("/calendar")}
              >
                مشاهده همه
              </button>
            </div>
          </div>
        </div>
        {/* <div className="col px-2 ">
          <div className={` d-flex flex-column ${styles.queswrapper}`}>
            <div className={` py-1 ${styles.quesheader}`}>آخرین نوبت ها</div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default QuesWidget;

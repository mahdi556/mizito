import styles from "@/components/main/Main.module.css";
import Image from "next/image";
import QuesWidget from "./quesWidget/QuesWidget";

const Data = () => {
  return (
    <>
      <div className="d-flex col-9 flex-column px-3">
        <div className="d-flex justify-content-between ">
          <h4 className="text-black fw-bold">میز کار «دکتر مهدی حقیقتی»</h4>
        </div>
        <div className="d-flex mt-4">
          <div className={`col-auto  ${styles.works}`}>
            <Image
              src="/images/done.svg"
              className={styles.reportIcon}
              height={35}
              width={35}
            />
            <span className={styles.reportText}> بیماران ویزیت شده</span>
            <span className={` green ${styles.reportNumber}`}> 0</span>
          </div>
          <div className={`col-auto  ${styles.works}`}>
            <Image
              src="/images/note.svg"
              className={styles.reportIcon}
              height={35}
              width={35}
            />
            <span className={styles.reportText}> در انتظار ویزیت</span>
            <span className={` orange ${styles.reportNumber}`}> 5</span>
          </div>
          <div className={`col-auto  ${styles.works}`}>
            <Image
              src="/images/timer.svg"
              className={styles.reportIcon}
              height={35}
              width={35}
            />
            <span className={styles.reportText}> در انتظار ثبت</span>
            <span className={` blue ${styles.reportNumber}`}> 2</span>
          </div>
        </div>
        <QuesWidget  />
      </div>
    </>
  );
};

export default Data;

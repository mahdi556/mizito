import { AcceptReserve } from "@/components/Booking/HandleWaits";
import { handleError } from "@/components/helper/helper";
import styles from "@/components/main/Main.module.css";
import AuthContext from "@/context/AuthContext";
import QueContext from "@/context/QueContext ";
import moment from "jalali-moment";
import Image from "next/image";
import { useContext } from "react";
import { toast } from "react-toastify";
const WaitQuesWidget = ({ item }) => {
  const { getReserves } = useContext(QueContext);
  const { user, setLoading } = useContext(AuthContext);

  const handleAcceptReserve = async (id) => {
    setLoading(true);
    const result = await AcceptReserve(id, user.token);
    setLoading(false);
    if (result == "success") {
      toast.success("پذیرش با موفقیت انجام شد.");
    } else {
      toast.error(handleError(result));
    }
    getReserves();
  };

  return (
    <>
      <div
        className={`col-12 d-flex align-items-center py-3 px-3 ${styles.queRow}`}
        key={item.id}
      >
        <span className="col-2 ">
          <Image
            src="images/person.svg"
            className="me-2"
            width={20}
            height={20}
          />
          {item.patient_name}
        </span>
        <span className={`ms-3 col-2   ${styles.nTimeSpan}`}>
          <Image
            src="images/phone.svg"
            className="me-2"
            width={20}
            height={20}
          />

          {item.patient_cellphone}
        </span>
        <span className={` col-2 badge text-bg-light ${styles.nTimeSpan}`}>
          <Image
            src="images/stethoscope.svg"
            className="me-2"
            width={14}
            height={14}
          />
          {item.type}
        </span>
        <span
          className={` col-1 btn btn-sm btn-outline-success    ${styles.nTimeSpan}`}
        >
          <Image
            src="images/clock.svg"
            className="me-2"
            width={14}
            height={14}
          />
          {moment(item.time).locale("fa").format("HH:mm")}
        </span>
        {/* <span
                    className={`ms-3 col-1   badge text-bg-danger ${styles.nTimeSpan}`}
                    >
                    19:45
                  </span> */}

        <Image
          src={
            item.source == "app"
              ? "images/app.svg"
              : item.source == "office"
              ? "images/secretary.svg"
              : null
          }
          className="ms-2"
          width={30}
          height={30}
        />
        <div class="led-green"></div>

        <button
          className={`ms-3 badge ms-auto text-bg-success ${styles.nTimeSpan}`}
          onClick={() => handleAcceptReserve(item.id)}
        >
          پذیرش
        </button>
        <button className={`ms-3 badge text-bg-danger ${styles.nTimeSpan}`}>
          لغو نوبت
        </button>
      </div>
    </>
  );
};
export default WaitQuesWidget;

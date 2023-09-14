import styles from "@/components/main/Main.module.css";
import moment from "jalali-moment";
import Image from "next/image";
const DoneQuesWidget = ({ item }) => {
  const handleBackToWait = async (id, token) => {
    setSrModal(false);
    setLoading(true);
    const result = await BackTowait(id, token);
    setLoading(false);
    if (result == "success") {
      toast.success("لغو با موفقیت انجام شد.");
    } else {
      toast.error(handleError(result));
    }
    getReserves();
  };

  return (
    <>
      <div
        className={`col-12 d-flex align-items-center py-3 px-3 ${styles.queRow} `}
        key={item.id}
        style={{
          backgroundColor: "#ced6e0",
        }}
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

        <div className="ms-3">
          <span
            className="stamp "
            style={{
              transform: "rotate(0deg)",
            }}
          >
            پذیرش شد
          </span>
        </div>

        <button className={`ms-auto  btn btn-outline-danger ${styles.nTimeSpan}`}
                      onClick={() => handleBackToWait(data.res_id, user.token)}
        >
          برگشت به در انتظار پذیرش
        </button>
      </div>
    </>
  );
};
export default DoneQuesWidget;

"use client";
import Box from "@mui/material/Box";
import Image from "next/image";
import moment from "jalali-moment";
import { useContext } from "react";
import QueContext from "@/context/QueContext ";
import AuthContext from "@/context/AuthContext";
import { BackTowait } from "../../HandleWaits";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "8px solid #11999e",
  boxShadow: 24,
  p: 4,
};

const DoneReserve = ({ data }) => {
  const { user, setLoading } = useContext(AuthContext);
  const { setSrModal, getReserves } = useContext(QueContext);
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
      <Box sx={style}>
        <h6 className="mx-auto text-center fs-6 px-4 py-2 nav-bg text-white rounded-4 ">
          اطلاعات رزرو
        </h6>
        <div className="d-flex flex-wrap ">
          <div className="col-6 my-2">
            <Image
              src="/images/patient.svg"
              className="me-2"
              width={20}
              height={20}
              alt=""
            />
            <span className="text-secondary">نام بیمار</span> :{" "}
            {data.patient.name}
          </div>
          <div className="col-6 my-2">
            {" "}
            <Image
              src="/images/userphone.svg"
              className="me-2"
              width={20}
              height={20}
              alt=""
            />
            <span className="text-secondary">تلفن</span> :{" "}
            {data.patient.cellphone}
          </div>
          <div className="col-6 my-2">
            {" "}
            <Image
              src="/images/idcard.svg"
              className="me-2"
              width={20}
              height={20}
              alt=""
            />
            <span className="text-secondary">کد ملی</span>:{" "}
            {data.patient.codemelli}
          </div>
          <div className="col-6 my-2  ">
            {" "}
            <Image
              src="/images/user.svg"
              className="me-2"
              width={20}
              height={20}
              alt=""
            />
            <span className="text-secondary">نوع ویزیت</span> : {data.type}
          </div>
          <div className="col-12 my-2">
            {" "}
            <Image
              src="/images/calendar.svg"
              className="me-2"
              width={20}
              height={20}
              alt=""
            />{" "}
            <span className="text-secondary">تاریخ نوبت</span> :{" "}
            {moment(data.time).locale("fa").format("YYYY/MM/DD")} ساعت{" "}
            {moment(data.time).locale("fa").format("HH:mm")}
          </div>
          <div className="col-12 my-2">
            {" "}
            <Image
              src="/images/calendar.svg"
              className="me-2"
              width={20}
              height={20}
              alt=""
            />{" "}
            <span className="text-secondary">تاریخ ثبت نوبت</span> :{" "}
            {moment(data.time).locale("fa").format("YYYY/MM/DD")}
          </div>
        </div>
        <div className="col-6 my-2">
          {" "}
          <Image
            src="/images/status.svg"
            className="me-2"
            width={20}
            height={20}
            alt=""
          />
          <span className="text-secondary">وضعیت</span>:{" "}
          <span className=" badge bg-success ">پذیرش شده</span>{" "}
        </div>
        <hr />
        <div className="d-flex flex-row justify-content-between py-2">
          <div className="   ">
            <button
              className="btn btn-outline-danger"
              type=""
              onClick={() => handleBackToWait(data.res_id, user.token)}
            >
              برگشت به در انتظار پذیرش
            </button>
          </div>
          <button
            className="btn btn-secondary   "
            type=""
            onClick={() => setSrModal(false)}
          >
            انصراف
          </button>
        </div>
      </Box>
    </>
  );
};
export default DoneReserve;

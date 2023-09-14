"use client";
import Image from "next/image";
import moment from "jalali-moment";
import { useContext } from "react";
import { AcceptReserve, CanselReserve } from "../../HandleWaits";
import AuthContext from "@/context/AuthContext";
import QueContext from "@/context/QueContext ";
import { toast } from "react-toastify";
import { handleError } from "@/components/helper/helper";

const WaitReserve = ({ data }) => {
  const { setSrModal, getReserves } = useContext(QueContext);
  const { user, setLoading } = useContext(AuthContext);
  const handleAcceptReserve = async (id, token) => {
    setSrModal(false);
    setLoading(true);
    const result = await AcceptReserve(id, token);
    setLoading(false);
    if (result == "success") {
      toast.success("پذیرش با موفقیت انجام شد.");
    } else {
      toast.error(handleError(result));
    }
    getReserves();
  };
  const handleCanselReserve = async (id, token) => {
    setSrModal(false);
    setLoading(true);
    const result = await CanselReserve(id, token);
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
        <span className=" badge bg-primary ">در انتظار پذیرش</span>{" "}
      </div>
      <hr />
      <div className="d-flex flex-row justify-content-between py-2">
        <button
          className="btn btn-success col-3"
          type=""
          onClick={() => handleAcceptReserve(data.res_id, user.token)}
        >
          پذیرش
        </button>
        <button
          className="btn btn-danger  col-3 "
          type=""
          onClick={() => handleCanselReserve(data.res_id, user.token)}
        >
          لغو نوبت{" "}
        </button>
        <button
          className="btn btn-secondary  col-3 "
          type=""
          onClick={() => setSrModal(false)}
        >
          انصراف
        </button>
      </div>
    </>
  );
};
export default WaitReserve;

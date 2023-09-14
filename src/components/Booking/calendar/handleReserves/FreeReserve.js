"use client";
import QueContext from "@/context/QueContext ";
import Box from "@mui/material/Box";
import moment from "jalali-moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useContext, useState } from "react";
import { SendCellphone, SendReserve } from "../../HandleWaits";
import AuthContext from "@/context/AuthContext";
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
const FreeReserve = ({ data }) => {
  const { setSrModal, office, getReserves } = useContext(QueContext);
  const { user, setLoading } = useContext(AuthContext);
  const [patient, setPatient] = useState(null);
  const [status, setStatus] = useState("cellphone");
  const [error1, setError1] = useState(false);
  const [cellphone, setCellphone] = useState(null);
  const handleCellphone = (event) => {
    if (!event.target.validity.valid) {
      setError1(true);
    } else {
      setError1(false);
      setCellphone(event.target.value);
    }
  };
  const handleSendCellphone = async () => {
    setLoading(true);
    const result = await SendCellphone(cellphone, user.token);
    if (result.status == 200) {
      setPatient(result.data.data.user);
      setStatus("oldUser");
    } else {
      setStatus("newUser");
      toast.warning("عضو جدید! مشخصات را تکمیل کنید");
    }
    setLoading(false);
  };
  const handleReserve = async (item) => {
    setSrModal(false);
    const result = await Swal.fire({
      html: `
          <div> تاریخ: ${moment(data.time)
            .locale("fa")
            .format("YYYY/MM/DD")}</div>
        <br>   <div> ساعت: ${moment(data.time)
          .locale("fa")
          .format("HH:mm")}</div>
        <br>  <div>    مطب  <b >: مطب اصلی </b>  </div>
        <br>   <div>  نام پزشک  <b >: دکتر مهدی حقیقتی </b> </div>
        
        <br>  <div> مبلغ قابل پرداخت  <b >: 10000 تومان </b> </div>
        
        `,
      icon: "warning",
      iconHtml: "i",
      confirmButtonText: "تائید و پرداخت",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      showCloseButton: true,
    });
    if (result.isConfirmed) {
      const response = await SendReserve(data, item, patient, user.token);
      if (response.status == 200) {
        toast.success("رزرو با موفقیت انجام شد");
        getReserves();
      } else if (response == 406) {
        Swal.fire({
          icon: "error",
          title: "خطا!",
          text: "با توجه به مدت زمان مورد نیاز جهت ثبت ویزیت و نوبت بعدی رزرو شده،امکان رزرو این ساعت وجود ندارد",
          confirmButtonText: "قبول",
        });
      } else {
        toast.error("خطای سرور");
      }
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        "انصراف",
        "شما از ثبت رزرو منصرف شده اید :)",
        "error"
      );
    }
    // });
  };
  return (
    <>
      {status == "cellphone" ? (
        <Box sx={style}>
          <form
            id="cellphone"
            action="onSubmit"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendCellphone();
            }}
          >
            <div className="d-flex flex-column">
              <div className="mb-2">
                <div className="d-flex align-items-center ">
                  <label className="me-2"> تلفن همراه بیمار</label>
                  <input
                    type="text"
                    className="ms-auto"
                    dir="ltr"
                    pattern="09[0-9]{9}"
                    title="تلفن همراه را به درستی وارد نمایید"
                    onChange={handleCellphone}
                    name="cellphone"
                  />
                </div>
                {error1 && (
                  <span
                    className="text-danger"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    تلفن همراه را به درستی وارد نمایید. مثال:09123456789
                  </span>
                )}
              </div>
            </div>
            <button
              className="btn btn-success btn-sm mt-3 col-12 ms-auto"
              type="submit"
              // onClick={() => handleClose()}
            >
              ارسال
            </button>
            <button
              className="btn btn-danger btn-sm mt-3 col-12 ms-auto"
              type=""
              onClick={() => setSrModal(false)}
            >
              انصراف
            </button>
          </form>
        </Box>
      ) : status == "oldUser" ? (
        <Box sx={style}>
          <div className="d-flex flex-column">
            <h6 className=" fw-bold  nav-bg text-white px-3 py-2 rounded-3 mx-auto">
              اطلاعات بیمار
            </h6>
            <div className="d-flex flex-wrap mb-3">
              <div className="my-2 me-3">
                <label className="me-2" htmlFor="">
                  نام و نام خانودگی
                </label>
                <input
                  type="text"
                  value={patient.name}
                  onChange={(e) =>
                    setPatient({ ...patient, name: e.target.value })
                  }
                />
              </div>
              <div className="my-2 me-1">
                <label className="me-2" htmlFor="">
                  شماره همراه
                </label>
                <input
                  type="text"
                  value={patient.cellphone}
                  onChange={(e) =>
                    setPatient({ ...patient, cellphone: e.target.value })
                  }
                />
              </div>
              <div className="my-2 me-1">
                <label className="me-2" htmlFor="">
                  کد ملی
                </label>
                <input
                  type="text"
                  value={patient.codemelli}
                  onChange={(e) =>
                    setPatient({ ...patient, codemelli: e.target.value })
                  }
                />
              </div>
            </div>
            <hr />
            نوع ویزیت را انتخاب نمایید
            <div className="d-flex flex-row justify-content-between py-2">
              {office.visit_type.map((item, key) => (
                <div className="   " key={item.id}>
                  <button
                    className="btn btn-success"
                    type=""
                    onClick={() => handleReserve(item)}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="btn btn-danger btn-sm mt-3 col-12 ms-auto"
              type=""
              onClick={() => setSrModal(false)}
            >
              انصراف
            </button>
          </div>
        </Box>
      ) : status == "newUser" ? (
        <Box sx={style}>
          <div className="d-flex flex-column">
            <h6 className=" fw-bold  nav-bg text-white px-3 py-2 rounded-3 mx-auto">
              اطلاعات بیمار
            </h6>
            <div className="d-flex flex-wrap mb-3">
              <div className="my-2 me-3">
                <label className="me-2" htmlFor="">
                  نام و نام خانودگی
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPatient({ ...patient, name: e.target.value })
                  }
                />
              </div>
              <div className="my-2 me-1">
                <label className="me-2" htmlFor="">
                  شماره همراه
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPatient({ ...patient, cellphone: e.target.value })
                  }
                />
              </div>
              <div className="my-2 me-1">
                <label className="me-2" htmlFor="">
                  کد ملی
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setPatient({ ...patient, codemelli: e.target.value })
                  }
                />
              </div>
            </div>
            <hr />
            نوع ویزیت را انتخاب نمایید
            <div className="d-flex flex-row justify-content-between py-2">
              {office.visit_type.map((item, key) => (
                <div className="   " key={item.id}>
                  <button
                    className="btn btn-success"
                    type=""
                    onClick={() => handleReserve(item)}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="btn btn-danger btn-sm mt-3 col-12 ms-auto"
              type=""
              onClick={() => setSrModal(false)}
            >
              انصراف
            </button>
          </div>
        </Box>
      ) : null}
    </>
  );
};
export default FreeReserve;

import axios from "axios";
import moment from "jalali-moment";
import Swal from "sweetalert2/dist/sweetalert2.js";

const sendReserve = async (data, item, userId,token) => {
   try {
    const response = await axios({
      url: "payment/send",
      method: "post",

      data: {
        user_id: userId,
        order_items: [{
          product_id: 1,
          quantity: item.rate,
        }],
        request_from:'web',
        time: moment(data.time).locale("en").format("YYYY-MM-DD HH:mm:ss"),
        display_time: moment(data.displayTime)
          .locale("en")
          .format("YYYY-MM-DD HH:mm:ss"),
        hour: moment(data.time).locale("fa").format("HH"),
        minute: moment(data.time).locale("fa").format("mm"),
        qty: item.rate,
        type: item.name,
        section: data.section,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
     return response;
  } catch (error) {
    if (error.response.status == 406) {
      Swal.fire({
        icon: "error",
        title: "خطا!",
        text: "با توجه به مدت زمان مورد نیاز جهت ویزیت شما و نوبت بعدی رزرو شده،امکان رزرو این ساعت وجود ندارد",
        confirmButtonText: "قبول",
      });
      return error
    }

    throw error;
  }
};

export default sendReserve;

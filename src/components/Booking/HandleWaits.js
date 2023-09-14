import axios from "axios";
import moment from "jalali-moment";

export const AcceptReserve = async (id, token) => {
  try {
    const res = await axios({
      url: `panel/reserve/accept/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return "success";
    } else {
      return res;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
    return { password: ["خطای سرور"] };
  }
};
export const CanselReserve = async (id, token) => {
  try {
    const res = await axios({
      url: `panel/reserve/delete/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return "success";
    } else {
      return res;
    }
  } catch (e) {
    if (error.response) {
      return error.response.data.message;
    }
    return { password: ["خطای سرور"] };
  }
};
export const BackTowait = async (id, token) => {
  try {
    const res = await axios({
      url: `panel/reserve/backToWait/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return "success";
    } else {
      return res;
    }
  } catch (e) {
    if (error.response) {
      return error.response.data.message;
    }
    return { password: ["خطای سرور"] };
  }
};
export const SendCellphone = async (cellphone, token) => {
  try {
    const res = await axios({
      url: `panel/auth/checkCellphone`,
      method: "post",
      data: {
        cellphone: cellphone,
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    if (error.response.status == 404) {
      return "newUser";
    }
    return { password: ["خطای سرور"] };
  }
};
export const SendReserve = async (data, item, patient, token) => {
  try {
    const response = await axios({
      url: "panel/reserve/store",
      method: "post",
      data: {
        patient: patient,
        request_from: "office",
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
      return 406;
    }

    throw error;
  }
};

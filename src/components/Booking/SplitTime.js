import moment from "jalali-moment";

function splitTime(office, reserves, activeDate) {
  var id = 1;
  var temp = [];
  office.work_time.forEach((item) => {
    var delay = 0;
    let time = moment({
      year: moment(activeDate).locale("en").format("YYYY"),
      month: moment(activeDate).locale("en").format("MM") - 1,
      day: moment(activeDate).locale("en").format("DD"),
      hour: item.start,
      minute: 0,
    });
    let end = moment({
      year: moment(activeDate).locale("en").format("YYYY"),
      month: moment(activeDate).locale("en").format("MM") - 1,
      day: moment(activeDate).locale("en").format("DD"),
      hour: item.finish,
      minute: 0,
    });
    let newArray = [];
    while (time <= end) {
      var period = 0;
      var isReserved = false;
      var type = "";
      var related = false;
      var status = "free";
      var patient = {};
      var res_id = 0;

      reserves.forEach((case1) => {
        if (
          moment(time).locale("en").format("YYYY-MM-DD HH:mm:ss") === case1.time
        ) {
          res_id = case1.id;
          type = case1.type;
          period = case1.qty;
          isReserved = true;
          related = case1.related;
          delay = case1.delay;
          status = case1.status;
          patient = {
            name: case1.patient_name,
            cellphone: case1.patient_cellphone,
            codemelli: case1.patient_codemelli,
          };
        }
      });
      if (isReserved && !related) {
        newArray.push({
          res_id: res_id,
          section: item.name,
          time: time.toString(),
          displayTime: moment(time).add(delay, "m").toString(),
          res: true,
          status: status,
          id: id,
          type: type,
          len: period * office.interval,
          related: related,
          patient: patient,
        });
      } else if (!isReserved && !related) {
        // if (
        // moment(time).isAfter(moment()) ) {

        newArray.push({
          section: item.name,
          time: time.toString(),
          displayTime: moment(time).add(delay, "m").toString(),
          res: false,
          status: "free",
          id: id,
          type: type,
        });
      }
      //  }
      time = time.add(office.interval, "m");
      id = id + 1;
    }
    temp.push({ name: item.name, array: newArray });
  });

  return temp;
}
export default splitTime;

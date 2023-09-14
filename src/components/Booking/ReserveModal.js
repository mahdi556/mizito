"use client";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import WaitReserve from "./calendar/handleReserves/WaitReserve";
import FreeReserve from "./calendar/handleReserves/FreeReserve";
import DoneReserve from "./calendar/handleReserves/DoneReserve";
import QueContext from "@/context/QueContext ";
import { Box } from "@mui/material";
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

export default function ReserveModal({ data }) {
  const { srModal, setSrModal } = React.useContext(QueContext);
  React.useEffect(() => {}, [srModal, data]);

  return (
    <div>
      <Modal
        open={srModal}
        onClose={() => setSrModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {data.status == "wait" ? (
            <WaitReserve data={data} />
          ) : data.status == "free" ? (
            <FreeReserve data={data} />
          ) : data.status == "done" ? (
            <DoneReserve data={data} />
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
